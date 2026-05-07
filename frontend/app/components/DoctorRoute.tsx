import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function DoctorRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== "doctor") {
    return <Navigate to="/" replace />;
  }

  // Check if doctor is approved
  if (user.status === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Pending Approval</h2>
          <p className="text-gray-600 mb-6">
            Your doctor account is currently pending approval by an administrator. You will receive access once your account has been verified.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
