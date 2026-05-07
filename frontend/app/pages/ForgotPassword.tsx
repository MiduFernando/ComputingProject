import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { toast } from "sonner";
import { Mail, HeartPulse, ArrowLeft } from "lucide-react";

export function ForgotPassword() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to process request");
        return;
      }

      setSubmitted(true);
      toast.success("Password reset link sent to your email!");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-teal-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
                <CardDescription className="text-cyan-100 mt-1">
                  We'll send you a reset link
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <p>
                    Enter the email address associated with your account, and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      required
                    />
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
                    "Send Reset Link"
                  )}
                </Button>

                {/* Back to Login Link */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 py-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    We've sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    The link will expire in 1 hour. If you don't see it, check your spam folder.
                  </p>
                </div>

                <Button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-base py-6 font-medium"
                >
                  Back to Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
