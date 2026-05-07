import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  Users,
  Activity,
  Building2,
  Stethoscope,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Shield,
  Bell,
  Star,
  Eye,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

interface Hospital {
  id: string;
  name: string;
  location: string;
  type: string;
  departments: string[];
  contact: string;
  email: string;
  website: string;
  beds: number;
  rating: number;
  status: "active" | "inactive";
  dailyLimit?: number;
  appointmentsToday?: number;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience: number;
  rating: number;
  appointments: number;
  email: string;
  phone: string;
  status: "available" | "busy" | "offline";
  languages: string[];
  education: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  joinDate: string;
  lastLogin: string;
  appointmentsCount: number;
  status: "active" | "inactive";
  phone: string;
}

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  hospital: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "in-progress" | "cancelled";
  fee: number;
  type: string;
}

// Mock Data
const mockHospitals: Hospital[] = [
  {
    id: "H001",
    name: "Colombo General Hospital",
    location: "Colombo 08",
    type: "Private",
    departments: ["Cardiology", "Neurology", "Pediatrics"],
    contact: "+94 11 269 1111",
    email: "info@cnh.lk",
    website: "www.cnh.lk",
    beds: 850,
    rating: 4.5,
    status: "active",
    dailyLimit: 80,
    appointmentsToday: 65,
  },
  {
    id: "H002",
    name: "Asiri Central Hospital",
    location: "Colombo 10",
    type: "Private",
    departments: ["Cardiology", "Orthopedics", "Emergency"],
    contact: "+94 11 452 4400",
    email: "info@asiricentral.com",
    website: "www.asiricentral.com",
    beds: 420,
    rating: 4.8,
    status: "active",
    dailyLimit: 60,
    appointmentsToday: 42,
  },
];

const mockDoctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr. Nimal Perera",
    specialty: "Cardiologist",
    hospital: "Colombo General Hospital",
    experience: 15,
    rating: 4.7,
    appointments: 245,
    email: "nimal.perera@cnh.lk",
    phone: "+94 77 123 4567",
    status: "available",
    languages: ["English", "Sinhala", "Tamil"],
    education: "MBBS, MD (Cardiology)",
  },
  {
    id: "D002",
    name: "Dr. Lakshmi Fernando",
    specialty: "Pediatrician",
    hospital: "Asiri Central Hospital",
    experience: 12,
    rating: 4.9,
    appointments: 312,
    email: "lakshmi.fernando@asiricentral.com",
    phone: "+94 77 234 5678",
    status: "busy",
    languages: ["English", "Sinhala"],
    education: "MBBS, MD (Pediatrics)",
  },
];

const mockUsers: User[] = [
  {
    id: "U001",
    name: "System Admin",
    email: "admin@ehealthconnect.lk",
    role: "admin",
    joinDate: "2024-01-01",
    lastLogin: "2024-02-21",
    appointmentsCount: 0,
    status: "active",
    phone: "+94 77 000 0000",
  },
  {
    id: "U002",
    name: "Dr. Nimal Perera",
    email: "nimal.perera@cnh.lk",
    role: "doctor",
    joinDate: "2024-01-10",
    lastLogin: "2024-02-21",
    appointmentsCount: 245,
    status: "active",
    phone: "+94 77 123 4567",
  },
  {
    id: "U003",
    name: "Kasun Silva",
    email: "kasun.silva@email.com",
    role: "patient",
    joinDate: "2024-01-15",
    lastLogin: "2024-02-20",
    appointmentsCount: 5,
    status: "active",
    phone: "+94 71 234 5678",
  },
  {
    id: "U004",
    name: "Anura Jayawardena",
    email: "anura.j@email.com",
    role: "patient",
    joinDate: "2024-02-01",
    lastLogin: "2024-02-21",
    appointmentsCount: 3,
    status: "active",
    phone: "+94 71 345 6789",
  },
  {
    id: "U005",
    name: "Dr. Lakshmi Fernando",
    email: "lakshmi.fernando@asiricentral.com",
    role: "doctor",
    joinDate: "2024-01-12",
    lastLogin: "2024-02-21",
    appointmentsCount: 312,
    status: "active",
    phone: "+94 77 234 5678",
  },
];

const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patient: "Kasun Silva",
    doctor: "Dr. Nimal Perera",
    hospital: "Colombo General Hospital",
    date: "2024-02-25",
    time: "10:00 AM",
    status: "pending",
    fee: 2500,
    type: "Consultation",
  },
  {
    id: "A002",
    patient: "Anura Jayawardena",
    doctor: "Dr. Lakshmi Fernando",
    hospital: "Asiri Central Hospital",
    date: "2024-02-26",
    time: "02:00 PM",
    status: "completed",
    fee: 3500,
    type: "Follow-up",
  },
];

export function AdminDashboardEnhanced() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Data States
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);
  
  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("hospitals");

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        console.log("⚠️ No user, skipping appointment fetch");
        return;
      }
      
      console.log("🔄 Loading appointments for admin with mock data...");
      setIsLoadingAppointments(true);
      setAppointmentsError(null);

      // Use mock data - no backend API calls
      setAppointments(mockAppointments);
      setIsLoadingAppointments(false);
      console.log("✅ Admin Dashboard loaded with mock data");
      console.log(`📊 Total appointments: ${mockAppointments.length}`);
    };

    fetchAppointments();
  }, [user]);
  
  // Hospital Form States
  const [isHospitalDialogOpen, setIsHospitalDialogOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [hospitalForm, setHospitalForm] = useState({
    name: "",
    location: "",
    type: "Private",
    departments: "",
    contact: "",
    email: "",
    website: "",
    beds: 100,
    rating: 5,
    status: "active" as "active" | "inactive",
    dailyLimit: 50,
    appointmentsToday: 0,
  });

  // Doctor Form States
  const [isDoctorDialogOpen, setIsDoctorDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialty: "",
    hospital: "",
    experience: 0,
    rating: 5,
    email: "",
    phone: "",
    status: "available" as "available" | "busy" | "offline",
    languages: "",
    education: "",
  });

  // User Form States
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "patient" as "patient" | "doctor" | "admin",
    phone: "",
    status: "active" as "active" | "inactive",
  });

  // Removed admin check - AdminRoute already handles authorization

  // ============ HOSPITAL CRUD ============
  const openAddHospital = () => {
    setEditingHospital(null);
    setHospitalForm({
      name: "",
      location: "",
      type: "Private",
      departments: "",
      contact: "",
      email: "",
      website: "",
      beds: 100,
      rating: 5,
      status: "active",
      dailyLimit: 50,
      appointmentsToday: 0,
    });
    setIsHospitalDialogOpen(true);
  };

  const openEditHospital = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setHospitalForm({
      name: hospital.name,
      location: hospital.location,
      type: hospital.type,
      departments: hospital.departments.join(", "),
      contact: hospital.contact,
      email: hospital.email,
      website: hospital.website,
      beds: hospital.beds,
      rating: hospital.rating,
      status: hospital.status,
      dailyLimit: hospital.dailyLimit || 50,
      appointmentsToday: hospital.appointmentsToday || 0,
    });
    setIsHospitalDialogOpen(true);
  };

  const handleSaveHospital = () => {
    if (!hospitalForm.name || !hospitalForm.location) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const hospitalData: Hospital = {
      id: editingHospital?.id || `H${String(hospitals.length + 1).padStart(3, "0")}`,
      name: hospitalForm.name,
      location: hospitalForm.location,
      type: hospitalForm.type,
      departments: hospitalForm.departments.split(",").map((d) => d.trim()).filter(Boolean),
      contact: hospitalForm.contact,
      email: hospitalForm.email,
      website: hospitalForm.website,
      beds: hospitalForm.beds,
      rating: hospitalForm.rating,
      status: hospitalForm.status,
      dailyLimit: hospitalForm.dailyLimit,
      appointmentsToday: hospitalForm.appointmentsToday,
    };

    if (editingHospital) {
      setHospitals(hospitals.map((h) => (h.id === editingHospital.id ? hospitalData : h)));
      toast.success("Hospital updated successfully!");
    } else {
      setHospitals([...hospitals, hospitalData]);
      toast.success("Hospital added successfully!");
    }

    setIsHospitalDialogOpen(false);
  };

  const handleDeleteHospital = (id: string) => {
    setHospitals(hospitals.filter((h) => h.id !== id));
    toast.success("Hospital deleted successfully!");
  };

  // ============ DOCTOR CRUD ============
  const openAddDoctor = () => {
    setEditingDoctor(null);
    setDoctorForm({
      name: "",
      specialty: "",
      hospital: "",
      experience: 0,
      rating: 5,
      email: "",
      phone: "",
      status: "available",
      languages: "",
      education: "",
    });
    setIsDoctorDialogOpen(true);
  };

  const openEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setDoctorForm({
      name: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      experience: doctor.experience,
      rating: doctor.rating,
      email: doctor.email,
      phone: doctor.phone,
      status: doctor.status,
      languages: doctor.languages.join(", "),
      education: doctor.education,
    });
    setIsDoctorDialogOpen(true);
  };

  const handleSaveDoctor = () => {
    if (!doctorForm.name || !doctorForm.specialty || !doctorForm.hospital) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const doctorData: Doctor = {
      id: editingDoctor?.id || `D${String(doctors.length + 1).padStart(3, "0")}`,
      name: doctorForm.name,
      specialty: doctorForm.specialty,
      hospital: doctorForm.hospital,
      experience: doctorForm.experience,
      rating: doctorForm.rating,
      appointments: editingDoctor?.appointments || 0,
      email: doctorForm.email,
      phone: doctorForm.phone,
      status: doctorForm.status,
      languages: doctorForm.languages.split(",").map((l) => l.trim()).filter(Boolean),
      education: doctorForm.education,
    };

    if (editingDoctor) {
      setDoctors(doctors.map((d) => (d.id === editingDoctor.id ? doctorData : d)));
      toast.success("Doctor updated successfully!");
    } else {
      setDoctors([...doctors, doctorData]);
      toast.success("Doctor added successfully!");
    }

    setIsDoctorDialogOpen(false);
  };

  const handleDeleteDoctor = (id: string) => {
    setDoctors(doctors.filter((d) => d.id !== id));
    toast.success("Doctor deleted successfully!");
  };

  // ============ USER CRUD ============
  const openAddUser = () => {
    setEditingUser(null);
    setUserForm({
      name: "",
      email: "",
      role: "patient",
      phone: "",
      status: "active",
    });
    setIsUserDialogOpen(true);
  };

  const openEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
    });
    setIsUserDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const userData: User = {
      id: editingUser?.id || `U${String(users.length + 1).padStart(3, "0")}`,
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      joinDate: editingUser?.joinDate || new Date().toISOString().split("T")[0],
      lastLogin: editingUser?.lastLogin || new Date().toISOString().split("T")[0],
      appointmentsCount: editingUser?.appointmentsCount || 0,
      status: userForm.status,
      phone: userForm.phone,
    };

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? userData : u)));
      toast.success("User updated successfully!");
    } else {
      setUsers([...users, userData]);
      toast.success("User added successfully!");
    }

    setIsUserDialogOpen(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User deleted successfully!");
  };

  // ============ APPOINTMENT CRUD ============
  const handleUpdateAppointmentStatus = (id: string, newStatus: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus as any } : apt
      )
    );
    toast.success(`Appointment status updated to ${newStatus}!`);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
    toast.success("Appointment deleted successfully!");
  };

  // Helper Functions
  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: "bg-green-500 text-white",
      pending: "bg-yellow-500 text-white",
      "in-progress": "bg-blue-500 text-white",
      cancelled: "bg-red-500 text-white",
      active: "bg-green-500 text-white",
      inactive: "bg-gray-500 text-white",
      available: "bg-green-500 text-white",
      busy: "bg-yellow-500 text-white",
      offline: "bg-gray-500 text-white",
    };
    return variants[status] || "bg-gray-500 text-white";
  };

  // Filtered Data
  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = appointments.filter((a) =>
    a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Banner */}
        <Card className="overflow-hidden shadow-2xl border-2 border-teal-200 mb-8">
          <div className="relative h-48">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzQwMTY1Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Admin Dashboard"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-cyan-900/90 to-blue-900/85"></div>
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4">
              <div className="text-white text-center md:text-left mb-3 md:mb-0">
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                  <Shield className="w-8 md:w-10 h-8 md:h-10 animate-pulse" />
                  <h1 className="text-2xl md:text-4xl font-black">Admin Dashboard</h1>
                </div>
                <p className="text-teal-100 text-sm md:text-lg">Complete Hospital Management System</p>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                <Button
                  size="sm"
                  onClick={() => toast.success("Refreshing data...")}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/30"
                  title="Refresh Data"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast.info("Opening analytics...")}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/30 hidden md:flex"
                  title="Analytics"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast.info("Opening analytics...")}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/30 md:hidden"
                  title="Analytics"
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast.success("Exporting all data...")}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/30 hidden md:flex"
                  title="Export Report"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast.success("Exporting all data...")}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/30 md:hidden"
                  title="Export Report"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast.info("Notifications: 5 new")}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/30 relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    5
                  </span>
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast.info("Opening settings...")}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/30"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    toast.success("Logged out successfully!");
                    navigate("/");
                  }}
                  className="bg-red-500/80 hover:bg-red-600 border-2 border-white/30 hidden md:flex"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    toast.success("Logged out successfully!");
                    navigate("/");
                  }}
                  className="bg-red-500/80 hover:bg-red-600 border-2 border-white/30 md:hidden"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm font-medium">Total Hospitals</p>
                  <h3 className="text-4xl font-black mt-2">{hospitals.length}</h3>
                </div>
                <Building2 className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-sm font-medium">Total Doctors</p>
                  <h3 className="text-4xl font-black mt-2">{doctors.length}</h3>
                </div>
                <Stethoscope className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Users</p>
                  <h3 className="text-4xl font-black mt-2">{users.length}</h3>
                </div>
                <Users className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Appointments</p>
                  <h3 className="text-4xl font-black mt-2">{appointments.length}</h3>
                </div>
                <Calendar className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Info Card */}
        <Card className="mb-6 shadow-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-900">Admin Access Information</h3>
                  <p className="text-sm text-orange-700">
                    <strong>Total Admins:</strong> {users.filter(u => u.role === "admin").length} • 
                    <strong className="ml-2">Doctors:</strong> {users.filter(u => u.role === "doctor").length} • 
                    <strong className="ml-2">Patients:</strong> {users.filter(u => u.role === "patient").length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/80 px-4 py-2 rounded-lg border-2 border-orange-300">
                  <p className="text-xs text-orange-700 font-semibold">Default Admin Login</p>
                  <p className="text-sm font-mono text-orange-900">admin@ehealthconnect.lk</p>
                  <p className="text-xs text-orange-600">Password: admin123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card className="mb-6 shadow-lg border-2 border-teal-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-teal-600" />
              <Input
                placeholder="Search anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus:ring-0 text-lg"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  onClick={() => setSearchTerm("")}
                  className="text-gray-500"
                >
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white shadow-lg p-2 rounded-xl">
            <TabsTrigger value="hospitals" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Hospitals
            </TabsTrigger>
            <TabsTrigger value="doctors" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Stethoscope className="w-4 h-4 mr-2" />
              Doctors
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </TabsTrigger>
          </TabsList>

          {/* HOSPITALS TAB */}
          <TabsContent value="hospitals">
            <Card className="shadow-2xl border-2 border-teal-200">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b-2 border-teal-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-teal-700">Hospital Management</CardTitle>
                    <CardDescription>Add, edit, or remove hospitals</CardDescription>
                  </div>
                  <Button onClick={openAddHospital} className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Hospital
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-lg border-2 border-teal-100 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-teal-50">
                        <TableHead className="font-bold text-teal-700">ID</TableHead>
                        <TableHead className="font-bold text-teal-700">Name</TableHead>
                        <TableHead className="font-bold text-teal-700">Location</TableHead>
                        <TableHead className="font-bold text-teal-700">Type</TableHead>
                        <TableHead className="font-bold text-teal-700">Beds</TableHead>
                        <TableHead className="font-bold text-teal-700">Daily Limit</TableHead>
                        <TableHead className="font-bold text-teal-700">Rating</TableHead>
                        <TableHead className="font-bold text-teal-700">Status</TableHead>
                        <TableHead className="font-bold text-teal-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHospitals.map((hospital) => (
                        <TableRow key={hospital.id} className="hover:bg-teal-50/50">
                          <TableCell className="font-mono">{hospital.id}</TableCell>
                          <TableCell className="font-semibold">{hospital.name}</TableCell>
                          <TableCell>{hospital.location}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-teal-300">
                              {hospital.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{hospital.beds}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-teal-700">{hospital.appointmentsToday || 0}/{hospital.dailyLimit || 50}</span>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-full rounded-full ${
                                    (hospital.appointmentsToday || 0) >= (hospital.dailyLimit || 50)
                                      ? "bg-red-500"
                                      : (hospital.appointmentsToday || 0) > (hospital.dailyLimit || 50) * 0.8
                                      ? "bg-orange-500"
                                      : "bg-gradient-to-r from-teal-500 to-cyan-500"
                                  }`}
                                  style={{
                                    width: `${Math.min(
                                      ((hospital.appointmentsToday || 0) / (hospital.dailyLimit || 50)) * 100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{hospital.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(hospital.status)}>
                              {hospital.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditHospital(hospital)}
                                className="border-teal-300 text-teal-600 hover:bg-teal-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete {hospital.name}.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteHospital(hospital.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DOCTORS TAB */}
          <TabsContent value="doctors">
            <Card className="shadow-2xl border-2 border-cyan-200">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b-2 border-cyan-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-cyan-700">Doctor Management</CardTitle>
                    <CardDescription>Add, edit, or remove doctors</CardDescription>
                  </div>
                  <Button onClick={openAddDoctor} className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Doctor
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-lg border-2 border-cyan-100 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-cyan-50">
                        <TableHead className="font-bold text-cyan-700">ID</TableHead>
                        <TableHead className="font-bold text-cyan-700">Name</TableHead>
                        <TableHead className="font-bold text-cyan-700">Specialty</TableHead>
                        <TableHead className="font-bold text-cyan-700">Hospital</TableHead>
                        <TableHead className="font-bold text-cyan-700">Experience</TableHead>
                        <TableHead className="font-bold text-cyan-700">Rating</TableHead>
                        <TableHead className="font-bold text-cyan-700">Status</TableHead>
                        <TableHead className="font-bold text-cyan-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDoctors.map((doctor) => (
                        <TableRow key={doctor.id} className="hover:bg-cyan-50/50">
                          <TableCell className="font-mono">{doctor.id}</TableCell>
                          <TableCell className="font-semibold">{doctor.name}</TableCell>
                          <TableCell>{doctor.specialty}</TableCell>
                          <TableCell>{doctor.hospital}</TableCell>
                          <TableCell>{doctor.experience} years</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{doctor.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(doctor.status)}>
                              {doctor.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditDoctor(doctor)}
                                className="border-cyan-300 text-cyan-600 hover:bg-cyan-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete {doctor.name}.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteDoctor(doctor.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users">
            <Card className="shadow-2xl border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-blue-700">User Management</CardTitle>
                    <CardDescription>Add, edit, or remove users</CardDescription>
                  </div>
                  <Button onClick={openAddUser} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-lg border-2 border-blue-100 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="font-bold text-blue-700">ID</TableHead>
                        <TableHead className="font-bold text-blue-700">Name</TableHead>
                        <TableHead className="font-bold text-blue-700">Email</TableHead>
                        <TableHead className="font-bold text-blue-700">Role</TableHead>
                        <TableHead className="font-bold text-blue-700">Phone</TableHead>
                        <TableHead className="font-bold text-blue-700">Join Date</TableHead>
                        <TableHead className="font-bold text-blue-700">Status</TableHead>
                        <TableHead className="font-bold text-blue-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-blue-50/50">
                          <TableCell className="font-mono">{user.id}</TableCell>
                          <TableCell className="font-semibold">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                user.role === "admin" 
                                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 font-bold" 
                                  : user.role === "doctor"
                                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0"
                                  : "bg-gradient-to-r from-teal-500 to-green-500 text-white border-0"
                              }
                            >
                              {user.role === "admin" && "🛡️ "}
                              {user.role === "doctor" && "👨‍⚕️ "}
                              {user.role === "patient" && "👤 "}
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditUser(user)}
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete {user.name}.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* APPOINTMENTS TAB */}
          <TabsContent value="appointments">
            <Card className="shadow-2xl border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100">
                <CardTitle className="text-2xl text-purple-700">Appointment Management</CardTitle>
                <CardDescription>View and manage all appointments</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-lg border-2 border-purple-100 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-purple-50">
                        <TableHead className="font-bold text-purple-700">ID</TableHead>
                        <TableHead className="font-bold text-purple-700">Patient</TableHead>
                        <TableHead className="font-bold text-purple-700">Doctor</TableHead>
                        <TableHead className="font-bold text-purple-700">Hospital</TableHead>
                        <TableHead className="font-bold text-purple-700">Date</TableHead>
                        <TableHead className="font-bold text-purple-700">Time</TableHead>
                        <TableHead className="font-bold text-purple-700">Fee</TableHead>
                        <TableHead className="font-bold text-purple-700">Status</TableHead>
                        <TableHead className="font-bold text-purple-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id} className="hover:bg-purple-50/50">
                          <TableCell className="font-mono">{appointment.id}</TableCell>
                          <TableCell className="font-semibold">{appointment.patient}</TableCell>
                          <TableCell>{appointment.doctor}</TableCell>
                          <TableCell>{appointment.hospital}</TableCell>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell className="font-semibold">LKR {appointment.fee.toLocaleString()}</TableCell>
                          <TableCell>
                            <Select
                              value={appointment.status}
                              onValueChange={(value) => handleUpdateAppointmentStatus(appointment.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this appointment.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteAppointment(appointment.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Hospital Dialog */}
      <Dialog open={isHospitalDialogOpen} onOpenChange={setIsHospitalDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-teal-700">
              {editingHospital ? "Edit Hospital" : "Add New Hospital"}
            </DialogTitle>
            <DialogDescription>
              {editingHospital ? "Update hospital information" : "Fill in the details to add a new hospital"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2">
              <Label htmlFor="name">Hospital Name *</Label>
              <Input
                id="name"
                value={hospitalForm.name}
                onChange={(e) => setHospitalForm({ ...hospitalForm, name: e.target.value })}
                placeholder="Enter hospital name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={hospitalForm.location}
                onChange={(e) => setHospitalForm({ ...hospitalForm, location: e.target.value })}
                placeholder="City, Area"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={hospitalForm.type}
                onValueChange={(value) => setHospitalForm({ ...hospitalForm, type: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Semi-Government">Semi-Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                value={hospitalForm.contact}
                onChange={(e) => setHospitalForm({ ...hospitalForm, contact: e.target.value })}
                placeholder="+94 11 XXX XXXX"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={hospitalForm.email}
                onChange={(e) => setHospitalForm({ ...hospitalForm, email: e.target.value })}
                placeholder="info@hospital.com"
                className="mt-2"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={hospitalForm.website}
                onChange={(e) => setHospitalForm({ ...hospitalForm, website: e.target.value })}
                placeholder="www.hospital.com"
                className="mt-2"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="departments">Departments (comma-separated)</Label>
              <Input
                id="departments"
                value={hospitalForm.departments}
                onChange={(e) => setHospitalForm({ ...hospitalForm, departments: e.target.value })}
                placeholder="Cardiology, Neurology, Pediatrics"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="beds">Number of Beds</Label>
              <Input
                id="beds"
                type="number"
                value={hospitalForm.beds}
                onChange={(e) => setHospitalForm({ ...hospitalForm, beds: parseInt(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={hospitalForm.rating}
                onChange={(e) => setHospitalForm({ ...hospitalForm, rating: parseFloat(e.target.value) || 5 })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={hospitalForm.status}
                onValueChange={(value: "active" | "inactive") => setHospitalForm({ ...hospitalForm, status: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dailyLimit">Daily Appointment Limit</Label>
              <Input
                id="dailyLimit"
                type="number"
                min="1"
                max="500"
                value={hospitalForm.dailyLimit}
                onChange={(e) => setHospitalForm({ ...hospitalForm, dailyLimit: parseInt(e.target.value) || 50 })}
                placeholder="50"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="appointmentsToday">Today's Appointments</Label>
              <Input
                id="appointmentsToday"
                type="number"
                min="0"
                value={hospitalForm.appointmentsToday}
                onChange={(e) => setHospitalForm({ ...hospitalForm, appointmentsToday: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHospitalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveHospital} className="bg-teal-600 hover:bg-teal-700">
              {editingHospital ? "Update Hospital" : "Add Hospital"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Doctor Dialog */}
      <Dialog open={isDoctorDialogOpen} onOpenChange={setIsDoctorDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-700">
              {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
            </DialogTitle>
            <DialogDescription>
              {editingDoctor ? "Update doctor information" : "Fill in the details to add a new doctor"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2">
              <Label htmlFor="doctorName">Doctor Name *</Label>
              <Input
                id="doctorName"
                value={doctorForm.name}
                onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                placeholder="Dr. John Doe"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty *</Label>
              <Input
                id="specialty"
                value={doctorForm.specialty}
                onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                placeholder="Cardiologist"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="hospital">Hospital *</Label>
              <Select
                value={doctorForm.hospital}
                onValueChange={(value) => setDoctorForm({ ...doctorForm, hospital: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map((h) => (
                    <SelectItem key={h.id} value={h.name}>
                      {h.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">Experience (years)</Label>
              <Input
                id="experience"
                type="number"
                value={doctorForm.experience}
                onChange={(e) => setDoctorForm({ ...doctorForm, experience: parseInt(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="doctorRating">Rating (1-5)</Label>
              <Input
                id="doctorRating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={doctorForm.rating}
                onChange={(e) => setDoctorForm({ ...doctorForm, rating: parseFloat(e.target.value) || 5 })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="doctorEmail">Email</Label>
              <Input
                id="doctorEmail"
                type="email"
                value={doctorForm.email}
                onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                placeholder="doctor@hospital.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="doctorPhone">Phone</Label>
              <Input
                id="doctorPhone"
                value={doctorForm.phone}
                onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                placeholder="+94 77 XXX XXXX"
                className="mt-2"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="languages">Languages (comma-separated)</Label>
              <Input
                id="languages"
                value={doctorForm.languages}
                onChange={(e) => setDoctorForm({ ...doctorForm, languages: e.target.value })}
                placeholder="English, Sinhala, Tamil"
                className="mt-2"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={doctorForm.education}
                onChange={(e) => setDoctorForm({ ...doctorForm, education: e.target.value })}
                placeholder="MBBS, MD (Specialty)"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="doctorStatus">Status</Label>
              <Select
                value={doctorForm.status}
                onValueChange={(value: "available" | "busy" | "offline") => setDoctorForm({ ...doctorForm, status: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDoctorDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDoctor} className="bg-cyan-600 hover:bg-cyan-700">
              {editingDoctor ? "Update Doctor" : "Add Doctor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-700">
              {editingUser ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {editingUser ? "Update user information" : "Fill in the details to add a new user"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="userName">Name *</Label>
              <Input
                id="userName"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                placeholder="John Doe"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Email *</Label>
              <Input
                id="userEmail"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="user@email.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="userPhone">Phone</Label>
              <Input
                id="userPhone"
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                placeholder="+94 71 XXX XXXX"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="userRole">Role *</Label>
              <Select
                value={userForm.role}
                onValueChange={(value: "patient" | "doctor" | "admin") => setUserForm({ ...userForm, role: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>Patient</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="doctor">
                    <div className="flex items-center gap-2">
                      <span>👨‍⚕️</span>
                      <span>Doctor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <span>🛡️</span>
                      <span>Admin (Full Access)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {userForm.role === "admin" && (
                <div className="mt-2 p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                  <p className="text-xs text-orange-800 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <strong>Warning:</strong> Admin users have full system access including managing hospitals, doctors, and all users.
                  </p>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="userStatus">Status</Label>
              <Select
                value={userForm.status}
                onValueChange={(value: "active" | "inactive") => setUserForm({ ...userForm, status: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser} className="bg-blue-600 hover:bg-blue-700">
              {editingUser ? "Update User" : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

AdminDashboardEnhanced.displayName = 'AdminDashboardEnhanced';
