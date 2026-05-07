import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";
import QRCode from "npm:qrcode@1.5.4";

const app = new Hono();

// Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

// Helper function to get user ID from token (supports demo tokens)
async function getUserIdFromToken(accessToken: string | undefined): Promise<{ userId: string | null; isAdmin: boolean }> {
  if (!accessToken) {
    return { userId: null, isAdmin: false };
  }

  // Handle demo tokens
  if (accessToken === "demo-patient-token") {
    return { userId: "U002", isAdmin: false };
  }
  if (accessToken === "demo-admin-token") {
    return { userId: "U001", isAdmin: true };
  }
  if (accessToken === "demo-doctor-token") {
    return { userId: "U003", isAdmin: false };
  }

  // Real token - validate with Supabase
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return { userId: null, isAdmin: false };
    }

    // Check if user is admin
    const userData = await kv.get(`user:${user.id}`);
    return { userId: user.id, isAdmin: userData?.role === "admin" };
  } catch (error) {
    console.error("Error validating token:", error);
    return { userId: null, isAdmin: false };
  }
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6df55b61/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize demo users and data (one-time setup)
app.post("/make-server-6df55b61/init-demo-data", async (c) => {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create admin user
    const adminEmail = "admin@ehealthconnect.lk";
    const adminPassword = "admin123";
    
    // Check if admin already exists
    const existingAdmins = await kv.getByPrefix("user:");
    const adminExists = existingAdmins?.some((u: any) => u.email === adminEmail);
    
    if (!adminExists) {
      const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        user_metadata: { name: "Admin User", phone: "+94771234567" },
        email_confirm: true,
      });

      if (adminError && !adminError.message.includes("already been registered")) {
        console.error("Admin creation error:", adminError);
      } else if (adminData?.user) {
        await kv.set(`user:${adminData.user.id}`, {
          id: adminData.user.id,
          email: adminEmail,
          name: "Admin User",
          phone: "+94771234567",
          role: "admin",
          createdAt: new Date().toISOString(),
        });
        console.log("✅ Admin user created:", adminEmail);
      }
    } else {
      console.log("ℹ️ Admin user already exists");
    }

    // Create test patient user
    const patientEmail = "patient@test.lk";
    const patientPassword = "patient123";
    
    const patientExists = existingAdmins?.some((u: any) => u.email === patientEmail);
    
    if (!patientExists) {
      const { data: patientData, error: patientError } = await supabase.auth.admin.createUser({
        email: patientEmail,
        password: patientPassword,
        user_metadata: { name: "Test Patient", phone: "+94777654321" },
        email_confirm: true,
      });

      if (patientError && !patientError.message.includes("already been registered")) {
        console.error("Patient creation error:", patientError);
      } else if (patientData?.user) {
        await kv.set(`user:${patientData.user.id}`, {
          id: patientData.user.id,
          email: patientEmail,
          name: "Test Patient",
          phone: "+94777654321",
          role: "patient",
          status: "active",
          createdAt: new Date().toISOString(),
        });
        console.log("✅ Test patient created:", patientEmail);
      }
    } else {
      console.log("ℹ️ Test patient already exists");
    }

    // Create test doctor user
    const doctorEmail = "doctor@test.lk";
    const doctorPassword = "doctor123";
    
    const doctorExists = existingAdmins?.some((u: any) => u.email === doctorEmail);
    
    if (!doctorExists) {
      const { data: doctorData, error: doctorError } = await supabase.auth.admin.createUser({
        email: doctorEmail,
        password: doctorPassword,
        user_metadata: { name: "Dr. Test Doctor", phone: "+94778889999" },
        email_confirm: true,
      });

      if (doctorError && !doctorError.message.includes("already been registered")) {
        console.error("Doctor creation error:", doctorError);
      } else if (doctorData?.user) {
        await kv.set(`user:${doctorData.user.id}`, {
          id: doctorData.user.id,
          email: doctorEmail,
          name: "Dr. Test Doctor",
          phone: "+94778889999",
          role: "doctor",
          status: "active",
          specialization: "General Physician",
          createdAt: new Date().toISOString(),
        });
        console.log("✅ Test doctor created:", doctorEmail);
      }
    } else {
      console.log("ℹ️ Test doctor already exists");
    }

    return c.json({ 
      success: true, 
      message: "Demo data initialized successfully",
      accounts: {
        admin: { email: adminEmail, password: adminPassword },
        patient: { email: patientEmail, password: patientPassword },
        doctor: { email: doctorEmail, password: doctorPassword }
      }
    });
  } catch (error: any) {
    console.error("Demo data initialization error:", error);
    return c.json({ 
      error: "Failed to initialize demo data: " + (error?.message || "Unknown error") 
    }, 500);
  }
});

// ==================== AUTH ROUTES ====================

// Register new user
app.post("/make-server-6df55b61/auth/register", async (c) => {
  try {
    const { email, password, name, phone, role = "patient", specialization, hospitalId } = await c.req.json();

    // Create user with Supabase Auth
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phone, role, specialization, hospitalId },
      email_confirm: true, // Auto-confirm since email server isn't configured
    });

    if (authError) {
      // Return user-friendly error messages
      if (authError.message.includes("already been registered") || authError.code === "email_exists") {
        console.log(`Registration attempt with existing email: ${email}`);
        return c.json({ 
          error: "This email is already registered. Please login instead or use a different email." 
        }, 422);
      }
      
      console.error("Registration auth error:", authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store additional user data in KV store
    const userId = authData.user.id;
    
    // Determine status based on role
    // Patients are auto-approved, Doctors and Admins need approval
    const status = role === "patient" ? "active" : "pending";
    
    const userData = {
      id: userId,
      email,
      name,
      phone,
      role,
      status,
      createdAt: new Date().toISOString(),
      ...(specialization && { specialization }),
      ...(hospitalId && { hospitalId }),
    };
    
    await kv.set(`user:${userId}`, userData);
    
    // If pending approval, add to pending approvals list
    if (status === "pending") {
      await kv.set(`pending-approval:${userId}`, {
        userId,
        email,
        name,
        phone,
        role,
        specialization,
        hospitalId,
        requestedAt: new Date().toISOString(),
      });
      
      console.log(`${role} registration pending approval: ${email}`);
      
      return c.json({
        message: "Registration successful! Your account is pending admin approval.",
        user: userData,
        needsApproval: true,
      });
    }

    // Return user data and token for auto-approved patients
    const session = await supabase.auth.signInWithPassword({ email, password });
    
    console.log(`New user registered successfully: ${email}`);
    
    return c.json({
      user: userData,
      token: session.data.session?.access_token,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return c.json({ error: "Registration failed: " + (error?.message || "Unknown error") }, 500);
  }
});

// Login user
app.post("/make-server-6df55b61/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      return c.json({ error: error.message }, 401);
    }

    // Get user data from KV store
    const userData = await kv.get(`user:${data.user.id}`);

    return c.json({
      user: userData || {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
        phone: data.user.user_metadata.phone,
        role: "patient",
      },
      token: data.session.access_token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Login failed" }, 500);
  }
});

// ==================== HOSPITAL ROUTES ====================

// Get all hospitals
app.get("/make-server-6df55b61/hospitals", async (c) => {
  try {
    const hospitals = await kv.getByPrefix("hospital:");
    return c.json({ hospitals: hospitals || [] });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return c.json({ error: "Failed to fetch hospitals" }, 500);
  }
});

// Get hospital by ID
app.get("/make-server-6df55b61/hospitals/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const hospital = await kv.get(`hospital:${id}`);
    
    if (!hospital) {
      return c.json({ error: "Hospital not found" }, 404);
    }
    
    return c.json({ hospital });
  } catch (error) {
    console.error("Error fetching hospital:", error);
    return c.json({ error: "Failed to fetch hospital" }, 500);
  }
});

// ==================== DOCTOR ROUTES ====================

// Get doctors by hospital ID
app.get("/make-server-6df55b61/doctors/hospital/:hospitalId", async (c) => {
  try {
    const hospitalId = c.req.param("hospitalId");
    const allDoctors = await kv.getByPrefix("doctor:");
    
    const doctors = allDoctors.filter((doc: any) => doc.hospitalId === hospitalId);
    
    return c.json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return c.json({ error: "Failed to fetch doctors" }, 500);
  }
});

// Get doctor by ID
app.get("/make-server-6df55b61/doctors/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const doctor = await kv.get(`doctor:${id}`);
    
    if (!doctor) {
      return c.json({ error: "Doctor not found" }, 404);
    }
    
    return c.json({ doctor });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return c.json({ error: "Failed to fetch doctor" }, 500);
  }
});

// ==================== APPOINTMENT ROUTES ====================

// Create appointment
app.post("/make-server-6df55b61/appointments", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const appointmentData = await c.req.json();
    const appointmentId = `APT${Date.now()}`;
    
    // Get current appointments for the doctor on the same date
    const allAppointments = await kv.getByPrefix("appointment:");
    const doctorAppointments = allAppointments.filter((apt: any) => 
      apt.doctorId === appointmentData.doctorId && 
      apt.date === appointmentData.date &&
      apt.status !== "cancelled"
    );
    
    // Check daily limit
    const doctor = await kv.get(`doctor:${appointmentData.doctorId}`);
    if (doctor && doctorAppointments.length >= doctor.dailyLimit) {
      return c.json({ error: "Doctor fully booked for this date" }, 400);
    }
    
    const tokenNumber = `${appointmentData.doctorId.substring(0, 1).toUpperCase()}-${String(doctorAppointments.length + 1).padStart(3, '0')}`;
    
    const appointment = {
      id: appointmentId,
      userId: userId,
      ...appointmentData,
      tokenNumber,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`appointment:${appointmentId}`, appointment);
    
    return c.json({ appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return c.json({ error: "Failed to create appointment" }, 500);
  }
});

// Get user appointments
app.get("/make-server-6df55b61/appointments/user", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const allAppointments = await kv.getByPrefix("appointment:");
    const userAppointments = allAppointments.filter((apt: any) => apt.userId === userId);
    
    return c.json({ appointments: userAppointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return c.json({ error: "Failed to fetch appointments" }, 500);
  }
});

// Get appointment by ID
app.get("/make-server-6df55b61/appointments/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const appointment = await kv.get(`appointment:${id}`);
    
    if (!appointment) {
      return c.json({ error: "Appointment not found" }, 404);
    }
    
    return c.json({ appointment });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return c.json({ error: "Failed to fetch appointment" }, 500);
  }
});

// Update appointment status
app.put("/make-server-6df55b61/appointments/:id/status", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const { status } = await c.req.json();
    
    const appointment = await kv.get(`appointment:${id}`);
    
    if (!appointment) {
      return c.json({ error: "Appointment not found" }, 404);
    }
    
    appointment.status = status;
    appointment.updatedAt = new Date().toISOString();
    
    await kv.set(`appointment:${id}`, appointment);
    
    return c.json({ appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return c.json({ error: "Failed to update appointment" }, 500);
  }
});

// Cancel appointment
app.delete("/make-server-6df55b61/appointments/:id", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const appointment = await kv.get(`appointment:${id}`);
    
    if (!appointment) {
      return c.json({ error: "Appointment not found" }, 404);
    }
    
    if (appointment.userId !== userId) {
      return c.json({ error: "Forbidden" }, 403);
    }
    
    appointment.status = "cancelled";
    appointment.cancelledAt = new Date().toISOString();
    
    await kv.set(`appointment:${id}`, appointment);
    
    return c.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return c.json({ error: "Failed to cancel appointment" }, 500);
  }
});

// ==================== DOCTOR ROUTES ====================

// Get doctor's appointments (doctor only)
app.get("/make-server-6df55b61/doctor/appointments", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId } = await getUserIdFromToken(accessToken);
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${userId}`);
    if (!userData || userData.role !== "doctor") {
      return c.json({ error: "Forbidden - Doctor access required" }, 403);
    }

    // Find doctor profile linked to this user
    const allDoctors = await kv.getByPrefix("doctor:");
    const doctorProfile = allDoctors.find((d: any) => d.email === userData.email);

    if (!doctorProfile) {
      return c.json({ error: "Doctor profile not found" }, 404);
    }

    // Get appointments for this doctor
    const allAppointments = await kv.getByPrefix("appointment:");
    const doctorAppointments = allAppointments.filter((apt: any) => apt.doctorId === doctorProfile.id);

    return c.json({ appointments: doctorAppointments, doctorProfile });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return c.json({ error: "Failed to fetch appointments" }, 500);
  }
});

// Update appointment status (doctor only)
app.put("/make-server-6df55b61/doctor/appointments/:id/status", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId } = await getUserIdFromToken(accessToken);
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userData = await kv.get(`user:${userId}`);
    if (!userData || userData.role !== "doctor") {
      return c.json({ error: "Forbidden - Doctor access required" }, 403);
    }

    const id = c.req.param("id");
    const { status } = await c.req.json();
    
    const appointment = await kv.get(`appointment:${id}`);
    
    if (!appointment) {
      return c.json({ error: "Appointment not found" }, 404);
    }
    
    // Verify doctor owns this appointment
    const allDoctors = await kv.getByPrefix("doctor:");
    const doctorProfile = allDoctors.find((d: any) => d.email === userData.email);
    
    if (!doctorProfile || appointment.doctorId !== doctorProfile.id) {
      return c.json({ error: "Forbidden - Not your appointment" }, 403);
    }
    
    appointment.status = status;
    appointment.updatedAt = new Date().toISOString();
    
    await kv.set(`appointment:${id}`, appointment);
    
    return c.json({ appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return c.json({ error: "Failed to update appointment" }, 500);
  }
});

// ==================== ADMIN ROUTES ====================

// Get all appointments (admin only)
app.get("/make-server-6df55b61/admin/appointments", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId || !isAdmin) {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const appointments = await kv.getByPrefix("appointment:");
    return c.json({ appointments });
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    return c.json({ error: "Failed to fetch appointments" }, 500);
  }
});

// Get dashboard statistics (admin only)
app.get("/make-server-6df55b61/admin/stats", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId || !isAdmin) {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const appointments = await kv.getByPrefix("appointment:");
    const users = await kv.getByPrefix("user:");
    
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter((apt: any) => apt.date === today);
    
    const stats = {
      totalAppointments: appointments.length,
      todayAppointments: todayAppointments.length,
      totalPatients: users.filter((u: any) => u.role === "patient").length,
      completedToday: todayAppointments.filter((apt: any) => apt.status === "completed").length,
      pendingToday: todayAppointments.filter((apt: any) => apt.status === "pending").length,
      cancelledToday: todayAppointments.filter((apt: any) => apt.status === "cancelled").length,
    };
    
    return c.json({ stats });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return c.json({ error: "Failed to fetch statistics" }, 500);
  }
});

// Delete user account (admin only)
app.delete("/make-server-6df55b61/admin/users/:userId", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId || !isAdmin) {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const userIdToDelete = c.req.param("userId");
    
    // Delete from Supabase Auth
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(userIdToDelete);
    
    if (deleteAuthError) {
      console.error("Error deleting user from auth:", deleteAuthError);
      // Continue even if auth deletion fails (user might not exist in auth)
    }
    
    // Delete from KV store
    await kv.del(`user:${userIdToDelete}`);
    
    // Delete user's appointments
    const allAppointments = await kv.getByPrefix("appointment:");
    const userAppointments = allAppointments.filter((apt: any) => apt.userId === userIdToDelete);
    for (const apt of userAppointments) {
      await kv.del(`appointment:${apt.id}`);
    }
    
    // Delete user's medical records
    const medicalRecords = await kv.getByPrefix(`medical-record:${userIdToDelete}:`);
    for (const record of medicalRecords) {
      await kv.del(`medical-record:${userIdToDelete}:${record.id}`);
    }
    
    // Delete user's prescriptions
    const prescriptions = await kv.getByPrefix(`prescription:${userIdToDelete}:`);
    for (const rx of prescriptions) {
      await kv.del(`prescription:${userIdToDelete}:${rx.id}`);
    }
    
    // Delete user's lab reports
    const labReports = await kv.getByPrefix(`lab-report:${userIdToDelete}:`);
    for (const report of labReports) {
      await kv.del(`lab-report:${userIdToDelete}:${report.id}`);
    }
    
    // Delete user's QR tokens
    await kv.del(`qr-token:${userIdToDelete}`);
    
    console.log(`User deleted successfully: ${userIdToDelete}`);
    
    return c.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return c.json({ error: "Failed to delete user: " + (error?.message || "Unknown error") }, 500);
  }
});

// Get all users (admin only)
app.get("/make-server-6df55b61/admin/users", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId || !isAdmin) {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const users = await kv.getByPrefix("user:");
    return c.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

// Admin password verification route
app.post("/make-server-6df55b61/admin/verify", async (c) => {
  try {
    const body = await c.req.json();
    const { password } = body;

    console.log("Admin verification request received");

    // Secure admin password (in production, use environment variable or database)
    const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD") || "ADMIN2024";

    if (password === ADMIN_PASSWORD) {
      console.log("✅ Admin password verified successfully");
      return c.json({ 
        success: true,
        message: "Authentication successful" 
      });
    } else {
      console.log("❌ Invalid admin password attempt");
      return c.json({ 
        success: false,
        message: "Invalid password" 
      }, 200); // Return 200 with success: false instead of 401
    }
  } catch (error) {
    console.error("Admin verification error:", error);
    return c.json({ 
      success: false,
      error: "Authentication failed" 
    }, 500);
  }
});

// Get pending approvals (admin only)
app.get("/make-server-6df55b61/admin/pending-approvals", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId || !isAdmin) {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const pendingApprovals = await kv.getByPrefix("pending-approval:");
    return c.json({ approvals: pendingApprovals });
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    return c.json({ error: "Failed to fetch pending approvals" }, 500);
  }
});

// Approve user registration (admin only)
app.post("/make-server-6df55b61/admin/approve-user/:userId", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId || !isAdmin) {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const userIdToApprove = c.req.param("userId");
    
    // Get user data
    const userData = await kv.get(`user:${userIdToApprove}`);
    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    // Update user status to active
    userData.status = "active";
    userData.approvedAt = new Date().toISOString();
    userData.approvedBy = userId;
    
    await kv.set(`user:${userIdToApprove}`, userData);
    
    // Remove from pending approvals
    await kv.del(`pending-approval:${userIdToApprove}`);
    
    console.log(`User approved: ${userData.email} (${userData.role})`);
    
    return c.json({ message: "User approved successfully", user: userData });
  } catch (error: any) {
    console.error("Error approving user:", error);
    return c.json({ error: "Failed to approve user: " + (error?.message || "Unknown error") }, 500);
  }
});

// Reject user registration (admin only)
app.delete("/make-server-6df55b61/admin/reject-user/:userId", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId || !isAdmin) {
      return c.json({ error: "Forbidden - Admin access required" }, 403);
    }

    const userIdToReject = c.req.param("userId");
    
    // Delete user from KV store
    await kv.del(`user:${userIdToReject}`);
    
    // Remove from pending approvals
    await kv.del(`pending-approval:${userIdToReject}`);
    
    // Delete from Supabase Auth
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    await supabase.auth.admin.deleteUser(userIdToReject);
    
    console.log(`User registration rejected: ${userIdToReject}`);
    
    return c.json({ message: "User registration rejected successfully" });
  } catch (error: any) {
    console.error("Error rejecting user:", error);
    return c.json({ error: "Failed to reject user: " + (error?.message || "Unknown error") }, 500);
  }
});

// ==================== PATIENT QR CODE & MEDICAL HISTORY ROUTES ====================

// Generate QR code for patient
app.get("/make-server-6df55b61/patient/qr/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    
    // Get user data
    const user = await kv.get(`user:${userId}`);
    
    if (!user) {
      return c.json({ error: "Patient not found" }, 404);
    }
    
    // Generate secure token
    const token = generateSecureToken(userId);
    
    // Create QR code URL with secure token
    const qrUrl = `${Deno.env.get("SUPABASE_URL")?.replace("/functions/v1", "")}/patient-history?id=${userId}&token=${token}`;
    
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);
    
    // Store token for verification
    await kv.set(`qr-token:${userId}`, { token, createdAt: new Date().toISOString() });
    
    return c.json({ 
      qrCode: qrCodeDataUrl,
      qrUrl,
      patientId: userId,
      patientName: user.name
    });
  } catch (error: any) {
    console.error("Error generating QR code:", error);
    return c.json({ error: "Failed to generate QR code: " + (error?.message || "Unknown error") }, 500);
  }
});

// Get patient medical history (requires valid token)
app.get("/make-server-6df55b61/patient/history/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const token = c.req.query("token");
    
    // Verify token
    const storedTokenData = await kv.get(`qr-token:${userId}`);
    
    if (!storedTokenData || !token || storedTokenData.token !== token) {
      return c.json({ error: "Invalid or expired QR code token" }, 401);
    }
    
    // Get patient data
    const user = await kv.get(`user:${userId}`);
    
    if (!user) {
      return c.json({ error: "Patient not found" }, 404);
    }
    
    // Get medical records
    const medicalRecords = await kv.getByPrefix(`medical-record:${userId}:`);
    
    // Get appointments
    const allAppointments = await kv.getByPrefix("appointment:");
    const patientAppointments = allAppointments.filter((apt: any) => apt.userId === userId);
    
    // Get prescriptions
    const prescriptions = await kv.getByPrefix(`prescription:${userId}:`);
    
    // Get lab reports
    const labReports = await kv.getByPrefix(`lab-report:${userId}:`);
    
    // Compile complete patient history
    const patientHistory = {
      patient: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup || "Not specified",
        dateOfBirth: user.dateOfBirth || "Not specified",
        age: user.age || "Not specified",
        gender: user.gender || "Not specified",
        address: user.address || "Not specified",
        allergies: user.allergies || [],
        chronicDiseases: user.chronicDiseases || [],
        emergencyContact: user.emergencyContact || "Not specified",
      },
      medicalRecords: medicalRecords.map((record: any) => ({
        id: record.id,
        date: record.date,
        diagnosis: record.diagnosis,
        symptoms: record.symptoms,
        doctorName: record.doctorName,
        doctorSpecialty: record.doctorSpecialty,
        notes: record.notes,
        treatmentPlan: record.treatmentPlan,
      })),
      appointments: patientAppointments.map((apt: any) => ({
        id: apt.id,
        date: apt.date,
        time: apt.time,
        doctorName: apt.doctorName,
        specialty: apt.specialty,
        hospital: apt.hospital,
        status: apt.status,
        tokenNumber: apt.tokenNumber,
      })),
      prescriptions: prescriptions.map((rx: any) => ({
        id: rx.id,
        date: rx.date,
        doctorName: rx.doctorName,
        medications: rx.medications,
        instructions: rx.instructions,
      })),
      labReports: labReports.map((report: any) => ({
        id: report.id,
        date: report.date,
        testName: report.testName,
        results: report.results,
        status: report.status,
      })),
      summary: {
        totalAppointments: patientAppointments.length,
        totalMedicalRecords: medicalRecords.length,
        totalPrescriptions: prescriptions.length,
        totalLabReports: labReports.length,
        lastVisit: patientAppointments.length > 0 
          ? patientAppointments.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
          : "No visits yet",
      }
    };
    
    return c.json({ history: patientHistory });
  } catch (error: any) {
    console.error("Error fetching patient history:", error);
    return c.json({ error: "Failed to fetch patient history: " + (error?.message || "Unknown error") }, 500);
  }
});

// Add medical record (doctor/admin only)
app.post("/make-server-6df55b61/medical-records", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const userData = await kv.get(`user:${userId}`);
    if (!userData || (userData.role !== "admin" && userData.role !== "doctor")) {
      return c.json({ error: "Forbidden - Doctor or Admin access required" }, 403);
    }
    
    const recordData = await c.req.json();
    const recordId = `MR${Date.now()}`;
    
    const medicalRecord = {
      id: recordId,
      ...recordData,
      createdBy: userId,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`medical-record:${recordData.patientId}:${recordId}`, medicalRecord);
    
    return c.json({ record: medicalRecord });
  } catch (error: any) {
    console.error("Error creating medical record:", error);
    return c.json({ error: "Failed to create medical record: " + (error?.message || "Unknown error") }, 500);
  }
});

// Update patient profile (add blood group, allergies, etc.)
app.put("/make-server-6df55b61/patient/profile", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];
    
    const { userId, isAdmin } = await getUserIdFromToken(accessToken);
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const profileData = await c.req.json();
    const userData = await kv.get(`user:${userId}`);
    
    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }
    
    const updatedUser = {
      ...userData,
      ...profileData,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`user:${userId}`, updatedUser);
    
    return c.json({ user: updatedUser });
  } catch (error: any) {
    console.error("Error updating patient profile:", error);
    return c.json({ error: "Failed to update profile: " + (error?.message || "Unknown error") }, 500);
  }
});

// Helper function to generate secure token
function generateSecureToken(userId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${userId}-${timestamp}-${random}`;
}

// ==================== AI RECOMMENDATION ROUTES ====================

// AI Doctor Recommendation
app.post("/make-server-6df55b61/ai/recommend-doctors", async (c) => {
  try {
    console.log("=== AI Recommendation Request Started ===");
    
    const body = await c.req.json();
    console.log("Request body:", body);
    
    const { symptoms, preferredLocation, urgency, ageGroup, gender, previousConditions } = body;

    if (!symptoms || symptoms.trim() === "") {
      return c.json({ error: "Symptoms are required" }, 400);
    }

    console.log("AI Recommendation request:", { symptoms, preferredLocation, urgency, ageGroup });

    // Get all doctors with error handling
    let doctors: any[] = [];
    try {
      const doctorKeys = await kv.getByPrefix("doctor:");
      console.log("Raw doctor keys response:", doctorKeys);
      
      if (Array.isArray(doctorKeys) && doctorKeys.length > 0) {
        doctors = doctorKeys.map((item: any) => item.value || item);
      }
      console.log("Processed doctors:", doctors.length);
    } catch (kvError) {
      console.error("KV error fetching doctors:", kvError);
    }

    // If no doctors in database, provide sample data for demo
    if (doctors.length === 0) {
      console.log("No doctors in database, using sample data");
      doctors = getSampleDoctors();
      console.log("Sample doctors loaded:", doctors.length);
    }

    // Get all hospitals for location matching with error handling
    let hospitals: any[] = [];
    try {
      const hospitalKeys = await kv.getByPrefix("hospital:");
      console.log("Raw hospital keys response:", hospitalKeys);
      
      if (Array.isArray(hospitalKeys) && hospitalKeys.length > 0) {
        hospitals = hospitalKeys.map((item: any) => item.value || item);
      }
      console.log("Processed hospitals:", hospitals.length);
    } catch (kvError) {
      console.error("KV error fetching hospitals:", kvError);
    }

    // If no hospitals, use sample data
    if (hospitals.length === 0) {
      console.log("No hospitals in database, using sample data");
      hospitals = getSampleHospitals();
      console.log("Sample hospitals loaded:", hospitals.length);
    }

    // AI-like matching algorithm
    console.log("Starting AI matching algorithm...");
    const scoredDoctors = doctors.map((doctor: any) => {
      let score = 0;
      let reasons: string[] = [];

      try {
        // Symptom-to-specialty mapping
        const symptomKeywords = symptoms.toLowerCase();
        const specialtyMatch = matchSymptomToSpecialty(symptomKeywords);

        console.log("Doctor:", doctor.name, "Specialty:", doctor.specialty, "Match:", specialtyMatch);

        // Specialty matching (highest weight: 40 points)
        if (doctor.specialty && (
            doctor.specialty.toLowerCase().includes(specialtyMatch.toLowerCase()) || 
            specialtyMatch.toLowerCase().includes(doctor.specialty.toLowerCase())
        )) {
          score += 40;
          reasons.push(`Specialized in ${doctor.specialty} for your symptoms`);
        } else if (specialtyMatch === "General Physician") {
          score += 20;
          reasons.push("Suitable for general consultation");
        } else {
          // Partial match bonus
          score += 10;
          reasons.push("Available for consultation");
        }

        // Experience (up to 20 points)
        if (doctor.experience) {
          const experienceScore = Math.min(doctor.experience * 2, 20);
          score += experienceScore;
          if (doctor.experience >= 10) {
            reasons.push(`${doctor.experience}+ years of experience`);
          }
        }

        // Rating (up to 20 points)
        if (doctor.rating) {
          const ratingScore = (doctor.rating / 5) * 20;
          score += ratingScore;
          if (doctor.rating >= 4.5) {
            reasons.push(`Highly rated (${doctor.rating}/5.0)`);
          }
        }

        // Location preference (10 points)
        if (preferredLocation && doctor.hospital) {
          const hospital = hospitals.find((h: any) => h.id === doctor.hospitalId);
          if (hospital && hospital.location && hospital.location.toLowerCase().includes(preferredLocation.toLowerCase())) {
            score += 10;
            reasons.push(`Located in preferred area: ${hospital.location}`);
          }
        }

        // Age group matching (5 points)
        if (ageGroup === "child" || ageGroup === "teen") {
          if (doctor.specialty && doctor.specialty.toLowerCase().includes("pediatr")) {
            score += 5;
            reasons.push("Specializes in pediatric care");
          }
        } else if (ageGroup === "senior") {
          if ((doctor.specialty && doctor.specialty.toLowerCase().includes("geriatr")) || doctor.experience >= 15) {
            score += 5;
            reasons.push("Experienced with senior care");
          }
        }

        // Gender preference (5 points)
        if (gender && doctor.gender === gender) {
          score += 5;
        }
      } catch (scoringError) {
        console.error("Error scoring doctor:", doctor.name, scoringError);
      }

      return {
        ...doctor,
        matchScore: Math.min(Math.round(score), 100),
        reason: reasons.length > 0 ? reasons.join(". ") : "General practitioner available for consultation",
      };
    });

    // Sort by match score and take top 5
    const topRecommendations = scoredDoctors
      .sort((a: any, b: any) => b.matchScore - a.matchScore)
      .slice(0, 5);

    console.log("Returning recommendations:", topRecommendations.length);
    console.log("=== AI Recommendation Request Completed Successfully ===");
    
    return c.json({ recommendations: topRecommendations });
  } catch (error: any) {
    console.error("=== AI recommendation error ===");
    console.error("Error details:", error);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    return c.json({ 
      error: "Failed to generate recommendations: " + (error?.message || "Unknown error"),
      details: error?.stack 
    }, 500);
  }
});

// Helper function to match symptoms to specialties
function matchSymptomToSpecialty(symptoms: string): string {
  const specialtyMap: Record<string, string[]> = {
    "Cardiologist": ["heart", "chest pain", "cardiac", "blood pressure", "hypertension"],
    "Dermatologist": ["skin", "rash", "acne", "eczema", "allergy", "itch"],
    "Orthopedic": ["bone", "fracture", "joint", "back pain", "knee", "ankle", "sprain"],
    "Neurologist": ["headache", "migraine", "seizure", "nerve", "brain", "dizz"],
    "ENT Specialist": ["ear", "nose", "throat", "hearing", "sinus", "tonsil"],
    "Pediatrician": ["child", "baby", "infant", "vaccination"],
    "Gynecologist": ["pregnancy", "menstrual", "gyneco", "obstetric", "prenatal"],
    "Ophthalmologist": ["eye", "vision", "sight", "glasses", "cataract"],
    "Psychiatrist": ["mental", "depression", "anxiety", "stress", "insomnia"],
    "Gastroenterologist": ["stomach", "digestion", "abdomen", "nausea", "diarrhea", "constipation"],
    "Pulmonologist": ["lung", "breathing", "cough", "asthma", "respiratory"],
    "Endocrinologist": ["diabetes", "thyroid", "hormone", "sugar"],
    "Urologist": ["kidney", "bladder", "urinary", "prostate"],
  };

  for (const [specialty, keywords] of Object.entries(specialtyMap)) {
    if (keywords.some(keyword => symptoms.includes(keyword))) {
      return specialty;
    }
  }

  return "General Physician";
}

// Sample data for demo
function getSampleDoctors() {
  return [
    {
      id: "DOC123",
      name: "Dr. Kamal Perera",
      specialty: "Cardiologist",
      experience: 15,
      rating: 4.8,
      hospitalId: "HOS123",
      hospital: "National Hospital Colombo",
      gender: "male",
      dailyLimit: 10,
      availability: "Mon, Wed, Fri - 9:00 AM to 4:00 PM",
      consultationFee: 3500,
    },
    {
      id: "DOC456",
      name: "Dr. Nimalka Fernando",
      specialty: "Dermatologist",
      experience: 10,
      rating: 4.7,
      hospitalId: "HOS123",
      hospital: "National Hospital Colombo",
      gender: "female",
      dailyLimit: 15,
      availability: "Tue, Thu, Sat - 10:00 AM to 5:00 PM",
      consultationFee: 2500,
    },
    {
      id: "DOC789",
      name: "Dr. Sunil Wickramasinghe",
      specialty: "Orthopedic",
      experience: 12,
      rating: 4.6,
      hospitalId: "HOS456",
      hospital: "Asiri Hospital Kandy",
      gender: "male",
      dailyLimit: 10,
      availability: "Mon to Fri - 2:00 PM to 6:00 PM",
      consultationFee: 3000,
    },
    {
      id: "DOC101",
      name: "Dr. Chamini Silva",
      specialty: "Neurologist",
      experience: 8,
      rating: 4.5,
      hospitalId: "HOS456",
      hospital: "Asiri Hospital Kandy",
      gender: "female",
      dailyLimit: 12,
      availability: "Mon, Wed, Fri - 8:00 AM to 2:00 PM",
      consultationFee: 3200,
    },
    {
      id: "DOC202",
      name: "Dr. Prasad Jayawardena",
      specialty: "ENT Specialist",
      experience: 14,
      rating: 4.9,
      hospitalId: "HOS789",
      hospital: "Lanka Hospital Galle",
      gender: "male",
      dailyLimit: 10,
      availability: "Tue, Thu, Sat - 9:00 AM to 3:00 PM",
      consultationFee: 2800,
    },
    {
      id: "DOC303",
      name: "Dr. Sanduni Rajapaksa",
      specialty: "Pediatrician",
      experience: 10,
      rating: 4.8,
      hospitalId: "HOS789",
      hospital: "Lanka Hospital Galle",
      gender: "female",
      dailyLimit: 15,
      availability: "Mon to Sat - 9:00 AM to 5:00 PM",
      consultationFee: 2200,
    },
    {
      id: "DOC404",
      name: "Dr. Rohan Gunasekara",
      specialty: "Gynecologist",
      experience: 12,
      rating: 4.7,
      hospitalId: "HOS123",
      hospital: "National Hospital Colombo",
      gender: "male",
      dailyLimit: 10,
      availability: "Mon, Wed, Fri - 1:00 PM to 6:00 PM",
      consultationFee: 3500,
    },
    {
      id: "DOC505",
      name: "Dr. Dilini Rathnayake",
      specialty: "Ophthalmologist",
      experience: 9,
      rating: 4.6,
      hospitalId: "HOS456",
      hospital: "Asiri Hospital Kandy",
      gender: "female",
      dailyLimit: 12,
      availability: "Tue, Thu - 10:00 AM to 4:00 PM",
      consultationFee: 2500,
    },
    {
      id: "DOC606",
      name: "Dr. Asanka Bandara",
      specialty: "Psychiatrist",
      experience: 15,
      rating: 4.8,
      hospitalId: "HOS789",
      hospital: "Lanka Hospital Galle",
      gender: "male",
      dailyLimit: 10,
      availability: "Mon to Fri - 3:00 PM to 7:00 PM",
      consultationFee: 4000,
    },
    {
      id: "DOC707",
      name: "Dr. Malini Samaraweera",
      specialty: "Gastroenterologist",
      experience: 10,
      rating: 4.7,
      hospitalId: "HOS123",
      hospital: "National Hospital Colombo",
      gender: "female",
      dailyLimit: 15,
      availability: "Mon, Wed, Fri - 8:00 AM to 2:00 PM",
      consultationFee: 3300,
    },
    {
      id: "DOC808",
      name: "Dr. Tharaka Dissanayake",
      specialty: "Pulmonologist",
      experience: 12,
      rating: 4.6,
      hospitalId: "HOS456",
      hospital: "Asiri Hospital Kandy",
      gender: "male",
      dailyLimit: 10,
      availability: "Tue, Thu, Sat - 9:00 AM to 3:00 PM",
      consultationFee: 3100,
    },
    {
      id: "DOC909",
      name: "Dr. Anusha De Silva",
      specialty: "Endocrinologist",
      experience: 9,
      rating: 4.5,
      hospitalId: "HOS789",
      hospital: "Lanka Hospital Galle",
      gender: "female",
      dailyLimit: 12,
      availability: "Mon, Wed, Fri - 10:00 AM to 4:00 PM",
      consultationFee: 2900,
    },
    {
      id: "DOC1010",
      name: "Dr. Sampath Wijesinghe",
      specialty: "Urologist",
      experience: 15,
      rating: 4.8,
      hospitalId: "HOS123",
      hospital: "National Hospital Colombo",
      gender: "male",
      dailyLimit: 10,
      availability: "Tue, Thu - 2:00 PM to 6:00 PM",
      consultationFee: 3400,
    },
    {
      id: "DOC1111",
      name: "Dr. Anura Mendis",
      specialty: "General Physician",
      experience: 20,
      rating: 4.9,
      hospitalId: "HOS123",
      hospital: "National Hospital Colombo",
      gender: "male",
      dailyLimit: 20,
      availability: "Mon to Sat - 9:00 AM to 5:00 PM",
      consultationFee: 2000,
    },
  ];
}

// Sample data for demo
function getSampleHospitals() {
  return [
    {
      id: "HOS123",
      name: "National Hospital Colombo",
      location: "Colombo",
      contact: "011-2691111",
    },
    {
      id: "HOS456",
      name: "Asiri Hospital Kandy",
      location: "Kandy",
      contact: "081-2234567",
    },
    {
      id: "HOS789",
      name: "Lanka Hospital Galle",
      location: "Galle",
      contact: "091-2234444",
    },
  ];
}

Deno.serve(app.fetch);