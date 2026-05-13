import { Link, useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe, User, LogOut, Calendar, HeartPulse, LayoutDashboard, Activity } from "lucide-react";

const flags = {
  en: "🇬🇧",
  si: "🇱🇰",
  ta: "🇮🇳",
};

const languageNames = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-100 bg-white/95 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Enhanced 3D Design */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo Icon with 3D Effect */}
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-linear-to-br from-teal-400 to-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
              
              {/* Main Logo Container */}
              <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500 via-teal-600 to-cyan-600 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                {/* 3D Inner Shadow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/20 to-transparent"></div>
                <div className="absolute inset-0 rounded-2xl bg-linear-to-tl from-black/20 to-transparent"></div>
                
                {/* Icon */}
                <HeartPulse className="w-7 h-7 text-white relative z-10 drop-shadow-lg animate-pulse" />
                
                {/* Activity Pulse Indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-linear-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>

            {/* App Name with 3D Text Effect */}
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight relative group-hover:scale-105 transition-transform">
                {/* Text Shadow Layers for 3D Effect */}
                <span className="absolute inset-0 bg-linear-to-br from-teal-700 to-cyan-700 bg-clip-text text-transparent blur-sm opacity-50">
                  {t("appName")}
                </span>
                <span className="relative bg-linear-to-r from-teal-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
                  {t("appName")}
                </span>
                {/* Highlight Effect */}
                <span className="absolute inset-0 bg-linear-to-b from-white/40 to-transparent bg-clip-text text-transparent">
                  {t("appName")}
                </span>
              </span>
            </div>
          </Link>

          {/* Navigation - Enhanced */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="relative text-gray-700 hover:text-teal-600 font-bold transition-all group px-3 py-2 border border-teal-500 rounded-lg hover:bg-teal-50"
            >
              <span className="relative z-10">{t("home")}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/hospitals"
              className="relative text-gray-700 hover:text-teal-600 font-bold transition-all group px-3 py-2 border border-teal-500 rounded-lg hover:bg-teal-50"
            >
              <span className="relative z-10">{t("hospitals")}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="relative text-gray-700 hover:text-teal-600 font-bold transition-all group px-3 py-2 border border-teal-500 rounded-lg hover:bg-teal-50"
                >
                  <span className="relative z-10">{t("myAppointments")}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            )}
          </nav>

          {/* Right Side - Enhanced Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Selector - Enhanced */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all shadow-sm hover:shadow-md"
                >
                  <Globe className="w-4 h-4 text-teal-600" />
                  <span className="text-lg">{flags[language]}</span>
                  <span className="hidden sm:inline font-semibold text-gray-700">{languageNames[language]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-teal-100 shadow-xl">
                <DropdownMenuItem 
                  onClick={() => setLanguage("en")}
                  className="hover:bg-teal-50 cursor-pointer"
                >
                  <span className="text-lg mr-2">🇬🇧</span> English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("si")}
                  className="hover:bg-teal-50 cursor-pointer"
                >
                  <span className="text-lg mr-2">🇱🇰</span> සිංහල
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("ta")}
                  className="hover:bg-teal-50 cursor-pointer flex items-center"
                >
                  <span className="text-lg mr-2">🇮🇳</span>
                  <span>தமிழ்</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu - Enhanced */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="hidden sm:inline font-semibold text-gray-700">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-teal-100 shadow-xl">
                  <DropdownMenuItem 
                    onClick={() => navigate("/dashboard")}
                    className="hover:bg-teal-50 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-teal-600" />
                    {t("myAppointments")}
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem 
                      onClick={() => navigate("/admin")}
                      className="hover:bg-teal-50 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2 text-teal-600" />
                      {t("adminDashboard")}
                    </DropdownMenuItem>
                  )}
                  {user?.role === "doctor" && (
                    <DropdownMenuItem 
                      onClick={() => navigate("/doctor")}
                      className="hover:bg-teal-50 cursor-pointer"
                    >
                      <Activity className="w-4 h-4 mr-2 text-teal-600" />
                      Doctor Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-teal-100" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="hover:bg-red-50 cursor-pointer text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  onClick={() => navigate("/auth")} 
                  className="bg-linear-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-700 hover:via-teal-600 hover:to-cyan-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all px-4 py-2 h-9"
                >
                  {t("login")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}