import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import { HeartPulse, User, Mail, Phone, Lock, UserCog, Stethoscope, Building2 } from "lucide-react";

export function Auth() {
  const { t } = useLanguage();
  const { login, register, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Get the redirect location from navigation state (if coming from protected route)
  const from = (location.state as any)?.from || "/hospitals";

  // Redirect if already authenticated
  useEffect(() => {
    console.log("🔍 Auth useEffect - isAuthenticated:", isAuthenticated, "user:", user, "from:", from);
    if (isAuthenticated && user) {
      // Redirect based on user role or intended destination
      if (user.role === "admin") {
        const destination = from === "/hospitals" ? "/admin" : from;
        console.log("✅ Admin user detected, redirecting to:", destination);
        navigate(destination);
      } else if (user.role === "doctor") {
        const destination = from === "/hospitals" ? "/doctor" : from;
        console.log("✅ Doctor user detected, redirecting to:", destination);
        navigate(destination);
      } else {
        console.log("✅ Patient user detected, redirecting to:", from);
        navigate(from);
      }
    }
  }, [isAuthenticated, user, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);

    try {
      await login(loginData.email.trim(), loginData.password);
      toast.success("Login successful!");
      // Navigation will happen in useEffect above based on user role and intended destination
    } catch (error: any) {
      const errorMessage = error?.message || "Invalid email or password";
      toast.error(errorMessage);
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (registerData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoadingRegister(true);
    try {
      await register(
        registerData.email.trim(),
        registerData.password,
        registerData.name.trim(),
        registerData.phone.trim()
      );
      toast.success("Account created successfully!");
      navigate("/hospitals");
    } catch (error: any) {
      const errorMessage = error?.message || "Registration failed";

      if (errorMessage.includes("already registered")) {
        toast.error(
          errorMessage,
          {
            action: {
              label: "Switch to Login",
              onClick: () => setActiveTab("login"),
            },
            duration: 8000,
          }
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Image */}
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl sticky top-8">
              <img
                src={activeTab === "login" 
                  ? "https://images.unsplash.com/photo-1758691463198-dc663b8a64e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwY29uc3VsdGF0aW9uJTIwcHJvZmVzc2lvbmFsJTIwb2ZmaWNlfGVufDF8fHx8MTc3MTYyODk5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  : "https://images.unsplash.com/photo-1764727291644-5dcb0b1a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwaG9zcGl0YWwlMjByZWdpc3RyYXRpb24lMjBkZXNrJTIwbW9kZXJufGVufDF8fHx8MTc3MTY3MjA4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                }
                alt={activeTab === "login" ? "Medical consultation" : "Healthcare registration"}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2">
                    {activeTab === "login" ? "Welcome Back!" : "Join Us Today!"}
                  </h2>
                  <p className="text-teal-100">
                    {activeTab === "login" 
                      ? "Access your healthcare appointments and medical records" 
                      : "Start your journey to better healthcare management"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <Card className="w-full shadow-2xl border-2 border-teal-100">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <HeartPulse className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-gray-800">
                {activeTab === "login" ? t("loginTitle") : t("registerTitle")}
              </CardTitle>
              <CardDescription className="text-base">
                {activeTab === "login"
                  ? "Enter your credentials to access your account"
                  : "Create a new account to book appointments"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                    {t("login")}
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                    {t("register")}
                  </TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-gray-700">{t("email")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-700">{t("password")}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-base py-6"
                      disabled={loadingLogin}
                    >
                      {loadingLogin ? t("loading") : t("login")}
                    </Button>
                    <div className="flex items-center justify-between text-sm">
                      <a href="/register" className="text-teal-600 hover:text-teal-700 font-medium">
                        Create account
                      </a>
                      <a href="/forgot-password" className="text-teal-600 hover:text-teal-700 font-medium">
                        Forgot password?
                      </a>
                    </div>
                  </form>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="text-gray-700">{t("fullName")}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-gray-700">{t("email")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone" className="text-gray-700">{t("phoneNumber")}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder="0771234567"
                          className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-gray-700">{t("password")}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password" className="text-gray-700">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
                        <Input
                          id="register-confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-base py-6"
                      disabled={loadingRegister}
                    >
                      {loadingRegister ? t("loading") : t("register")}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}