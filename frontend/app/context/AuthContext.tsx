import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "admin" | "doctor";
  phone?: string;
  status?: "active" | "pending";
  specialization?: string;
  hospitalId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone: string, role?: "patient" | "doctor" | "admin", specialization?: string, hospitalId?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For local testing - mock API URL
const API_URL = 'http://localhost:3004/api/auth';

// Demo users for testing
const DEMO_USERS = [
  { email: 'admin@ehealthconnect.lk', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  { email: 'patient@test.lk', password: 'patient123', name: 'Test Patient', role: 'patient' as const },
  { email: 'doctor@test.lk', password: 'doctor123', name: 'Dr. Test Doctor', role: 'doctor' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log("🔐 Login attempt for:", email);

    try {
      // First try local backend
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          console.log("✅ Login successful:", email);
          return;
        }
      } catch (backendError) {
        console.log("Backend not available, trying demo login");
      }

      // Fallback to demo login
      const demoUser = DEMO_USERS.find(user => user.email === email.trim() && user.password === password);

      if (!demoUser) {
        throw new Error('Invalid email or password');
      }

      const mockUser = {
        id: `demo-${demoUser.role}`,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
      };

      const mockToken = `demo-token-${Date.now()}`;

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", mockToken);

      console.log("✅ Demo login successful:", email);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, phone: string, role?: "patient" | "doctor" | "admin", specialization?: string, hospitalId?: string) => {
    console.log("📝 Registration attempt for:", email);

    try {
      // First try local backend
      try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
            name: name.trim(),
            phone: phone.trim(),
            role: role || 'patient',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          console.log("✅ Registration successful:", email);
          return;
        }
      } catch (backendError) {
        console.log("Backend not available, using demo registration");
      }

      // Demo registration - just create a mock user
      const mockUser = {
        id: `demo-${Date.now()}`,
        email: email.trim(),
        name: name.trim(),
        role: role || 'patient',
        phone: phone.trim(),
      };

      const mockToken = `demo-token-${Date.now()}`;

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", mockToken);

      console.log("✅ Demo registration successful:", email);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}