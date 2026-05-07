import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Hospitals } from "./pages/Hospitals";
import { Doctors } from "./pages/Doctors";
import { BookAppointment } from "./pages/BookAppointment";
import { Payment } from "./pages/Payment";
import { Auth } from "./pages/Auth";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { UserDashboard } from "./pages/UserDashboard";
import { AdminDashboardEnhanced } from "./pages/AdminDashboardEnhanced";
import { DoctorDashboard } from "./pages/DoctorDashboard";
import { QueueTracking } from "./pages/QueueTracking";
import { AIDoctorRecommendation } from "./pages/AIDoctorRecommendation";
import { PatientHistory } from "./pages/PatientHistory";
import { QRScanner } from "./pages/QRScanner";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { DoctorRoute } from "./components/DoctorRoute";
import { Layout } from "./components/Layout";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

// Wrapper component to provide context to all routes
function RootWrapper() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </LanguageProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootWrapper,
    children: [
      { index: true, Component: Home },
      { path: "auth", Component: Auth },
      { path: "login", Component: Auth },
      { path: "register", Component: Auth },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "reset-password", Component: ResetPassword },
      { 
        path: "patient-history/:patientId", 
        Component: PatientHistory
      },
      { 
        path: "ai-recommend", 
        element: (
          <ProtectedRoute>
            <AIDoctorRecommendation />
          </ProtectedRoute>
        )
      },
      { 
        path: "hospitals", 
        element: (
          <ProtectedRoute>
            <Hospitals />
          </ProtectedRoute>
        )
      },
      { 
        path: "doctors/:hospitalId", 
        element: (
          <ProtectedRoute>
            <Doctors />
          </ProtectedRoute>
        )
      },
      { 
        path: "book/:doctorId", 
        element: (
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        )
      },
      { 
        path: "payment/:appointmentId", 
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        )
      },
      { 
        path: "dashboard", 
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        )
      },
      { 
        path: "queue/:appointmentId", 
        element: (
          <ProtectedRoute>
            <QueueTracking />
          </ProtectedRoute>
        )
      },
      { 
        path: "admin", 
        element: (
          <AdminRoute>
            <AdminDashboardEnhanced key="admin-dashboard" />
          </AdminRoute>
        )
      },
      { 
        path: "doctor", 
        element: (
          <DoctorRoute>
            <DoctorDashboard key="doctor-dashboard" />
          </DoctorRoute>
        )
      },
      { path: "qr-scanner", Component: QRScanner },
      { path: "*", Component: NotFound },
    ],
  },
]);