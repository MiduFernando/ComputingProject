import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("🔍 AdminRoute - user:", user);
    
    // Check if user is logged in and is an admin
    if (!user) {
      // Not logged in, redirect to login and save intended destination
      console.log("⚠️ No user, redirecting to login with from:", location.pathname);
      navigate("/login", { state: { from: location.pathname }, replace: true });
    } else if (user.role !== "admin") {
      // Logged in but not admin, redirect to appropriate dashboard
      console.log("⚠️ User is not admin, role:", user.role);
      if (user.role === "doctor") {
        navigate("/doctor", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } else {
      // User is admin, allow access
      console.log("✅ Admin access granted");
      setIsChecking(false);
    }
  }, [user, navigate, location]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // User is admin, show admin content
  return <>{children}</>;
}