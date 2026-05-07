import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { toast } from "sonner";
import { Lock, HeartPulse, Eye, EyeOff } from "lucide-react";

export function ResetPassword() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      toast.error("No reset token provided");
    }
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to reset password");
        return;
      }

      toast.success("Password reset successfully!");
      setFormData({ newPassword: "", confirmPassword: "" });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-teal-100">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-6 h-6" />
              <CardTitle>{t("resetPassword") || "Reset Password"}</CardTitle>
            </div>
            <CardDescription className="text-cyan-100">Invalid reset link</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <p className="text-center text-gray-600 mb-4">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-teal-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">{t("resetPassword") || "Reset Password"}</CardTitle>
                <CardDescription className="text-cyan-100 mt-1">
                  Enter your new password below
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-gray-700 font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                    value={formData.newPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-700 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                    value={formData.confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-base py-6 font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("loading")}
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>

              {/* Back to Login Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
