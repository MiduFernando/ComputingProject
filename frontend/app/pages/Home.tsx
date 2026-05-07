import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Search,
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Shield,
  Activity,
  Heart,
  Brain,
  Stethoscope,
  Clipboard,
  UserCheck,
  ChevronRight,
  LogIn,
  Sparkles,
  ScanLine,
  QrCode,
  Camera,
  Lock,
  Mail,
  Settings,
} from "lucide-react";
import medicalTeamImage from "../../assets/MedicalTeamImage.png";
import consultationImage from "../../assets/ConsulationImage.png";
import facilitiesImage from "../../assets/facilitiesImage.png";
import heroImage from "../../assets/heroImage.png";


export function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: t("easyBooking"),
      description: t("easyBookingDesc"),
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      icon: Clock,
      title: t("realTimeQueue"),
      description: t("realTimeQueueDesc"),
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      icon: Users,
      title: t("securePayment"),
      description: t("securePaymentDesc"),
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Star,
      title: t("multiLanguage"),
      description: t("multiLanguageDesc"),
      color: "text-teal-700",
      bg: "bg-teal-100",
    },
  ];

  const stats = [
    { icon: Users, value: "50,000+", label: "Patients Served" },
    { icon: Stethoscope, value: "500+", label: "Expert Doctors" },
    { icon: Activity, value: "100+", label: "Hospitals" },
    { icon: Shield, value: "99.9%", label: "Secure & Safe" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/80 via-cyan-50/80 to-blue-50/80 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Hero Section - Enhanced 3D Design */}
      <section className="relative overflow-hidden">
        {/* Hero Background with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Healthcare Professional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/90 via-teal-600/85 to-blue-600/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-800/40 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-300/15 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-teal-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.7s' }}></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-purple-300/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title - Enhanced 3D Effect */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight relative">
              {/* Shadow Layer */}
              <span className="absolute inset-0 bg-gradient-to-br from-teal-800 to-cyan-800 bg-clip-text text-transparent blur-sm opacity-50">
                {t("welcomeTitle")}
              </span>
              {/* Main Layer */}
              <span className="relative bg-gradient-to-r from-white via-teal-50 to-cyan-50 bg-clip-text text-transparent drop-shadow-2xl">
                {t("welcomeTitle")}
              </span>
              {/* Highlight Layer */}
              <span className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent bg-clip-text text-transparent">
                {t("welcomeTitle")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-teal-50 font-medium drop-shadow-lg">
              {t("welcomeDesc")}
            </p>

            {/* CTA Buttons - Enhanced 3D Design */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-white text-teal-600 hover:bg-teal-50 text-lg px-10 py-7 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all font-bold w-full sm:w-auto relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-cyan-400/20 to-teal-400/0 group-hover:translate-x-full transition-transform duration-1000"></div>
                <UserCheck className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">{t("getStarted") || "Get Started"}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-teal-50 to-transparent"></div>
      </section>

      {/* Image Gallery Section - Enhanced */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {/* Card 1 */}
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl group border-2 border-teal-100">
              <ImageWithFallback
                src={medicalTeamImage}
                alt="Doctor consultation"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-700/50 to-transparent"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-bold text-xl drop-shadow-lg">Expert Consultations</p>
                  <p className="text-teal-100 text-sm mt-1">Professional medical advice</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl group border-2 border-cyan-100">
              <ImageWithFallback
                src={consultationImage}
                alt="Healthcare team"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-cyan-700/50 to-transparent"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-bold text-xl drop-shadow-lg">Professional Medical Team</p>
                  <p className="text-cyan-100 text-sm mt-1">Experienced healthcare experts</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl group border-2 border-blue-100">
              <ImageWithFallback
                src={facilitiesImage}
                alt="Modern hospital"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-700/50 to-transparent"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-bold text-xl drop-shadow-lg">Modern Facilities</p>
                  <p className="text-blue-100 text-sm mt-1">State-of-the-art equipment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Title - Enhanced */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-br from-teal-700 to-teal-700 bg-clip-text text-transparent blur-sm opacity-50">
                Why Choose e-Health Connect?
              </span>
              <span className="relative text-teal-600">
                Why Choose e-Health Connect?
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
          </div>

          {/* Features Grid - Enhanced 3D Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="border-2 border-teal-100 hover:border-teal-300 hover:shadow-2xl transition-all transform hover:scale-105 bg-white/90 backdrop-blur-sm overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all"></div>
                  <CardContent className="p-6 relative">
                    <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                      <Icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern - Calmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100"></div>
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758691462848-ba1e929da259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc3MTU4NzMzMnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Healthcare Technology"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-teal-50/30 to-cyan-50/40"></div>

        {/* Floating Elements - Softer */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-cyan-300/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-br from-teal-700 to-cyan-700 bg-clip-text text-transparent blur-sm opacity-40">
                Our Impact in Numbers
              </span>
              <span className="relative bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Our Impact in Numbers
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colors = [
                { bg: 'from-teal-500 to-teal-600', glow: 'teal-400/30', border: 'border-teal-200/50' },
                { bg: 'from-cyan-500 to-cyan-600', glow: 'cyan-400/30', border: 'border-cyan-200/50' },
                { bg: 'from-purple-500 to-purple-600', glow: 'purple-400/30', border: 'border-purple-200/50' },
                { bg: 'from-emerald-500 to-emerald-600', glow: 'emerald-400/30', border: 'border-emerald-200/50' }
              ];
              const color = colors[index];

              return (
                <div 
                  key={index} 
                  className="text-center group"
                >
                  {/* Card Container */}
                  <div className={`bg-white/95 backdrop-blur-md rounded-2xl p-8 border-2 ${color.border} shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden`}>
                    {/* Decorative Corner Glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color.glow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    
                    {/* Icon Container - Enhanced 3D */}
                    <div className="relative inline-block mb-4">
                      <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${color.bg} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 animate-pulse`}></div>
                      <div className={`relative w-20 h-20 bg-gradient-to-br ${color.bg} rounded-2xl flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-all`}>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-black/20 to-transparent"></div>
                        <Icon className="w-9 h-9 text-white relative z-10 drop-shadow-lg" />
                      </div>
                    </div>

                    {/* Value */}
                    <div className="text-4xl md:text-5xl font-black mb-2 relative">
                      <span className={`absolute inset-0 bg-gradient-to-br ${color.bg} bg-clip-text text-transparent blur-sm opacity-50`}>
                        {stat.value}
                      </span>
                      <span className={`relative bg-gradient-to-r ${color.bg} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </div>

                    {/* Label */}
                    <div className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Recommendation Feature Section - Only show when authenticated */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-br from-teal-700 to-cyan-700 bg-clip-text text-transparent blur-sm opacity-50">
                Smart Solutions
              </span>
              <span className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Smart Solutions
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Two Cards Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* AI Recommendation Card */}
            <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 shadow-2xl overflow-hidden transform hover:scale-105 transition-all group relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl group-hover:w-40 group-hover:h-40 transition-all"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl group-hover:w-40 group-hover:h-40 transition-all"></div>

              <CardContent className="p-8 relative">
                <div className="flex flex-col items-center text-center">
                  {/* Icon - Enhanced 3D */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-6 transition-all">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-black/20 to-transparent"></div>
                      <Brain className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
                      
                      {/* AI Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black mb-3 relative">
                    <span className="absolute inset-0 bg-gradient-to-br from-teal-700 to-cyan-700 bg-clip-text text-transparent blur-sm opacity-50">
                      AI-Powered Healthcare
                    </span>
                    <span className="relative bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      AI-Powered Healthcare
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 text-base font-medium">
                    Not sure which doctor to see? Our AI analyzes your symptoms and recommends the best specialists.
                  </p>

                  {/* Features List - Enhanced */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border-2 border-teal-100 shadow-lg w-full">
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Intelligent symptom analysis</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Personalized doctor matching</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Instant recommendations</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Button - Enhanced */}
                  <Button
                    size="lg"
                    onClick={() => navigate("/ai-recommend")}
                    className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 text-white font-bold text-base px-6 py-5 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all w-full relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-white/20 to-cyan-400/0 group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    <Brain className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Get AI Recommendations</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* QR Scanner Card */}
            <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 shadow-2xl overflow-hidden transform hover:scale-105 transition-all group relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl group-hover:w-40 group-hover:h-40 transition-all pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl group-hover:w-40 group-hover:h-40 transition-all pointer-events-none"></div>

              <CardContent className="p-8 relative">
                <div className="flex flex-col items-center text-center">
                  {/* Icon - Enhanced 3D */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 animate-pulse pointer-events-none"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-6 transition-all">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-black/20 to-transparent pointer-events-none"></div>
                      <QrCode className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
                      
                      {/* Scanner Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black mb-3 relative">
                    <span className="absolute inset-0 bg-gradient-to-br from-cyan-700 to-teal-700 bg-clip-text text-transparent blur-sm opacity-50">
                      QR Code Scanner
                    </span>
                    <span className="relative bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                      QR Code Scanner
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 text-base font-medium">
                    Healthcare providers can instantly access patient medical records by scanning QR codes.
                  </p>

                  {/* Features List - Enhanced */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border-2 border-cyan-100 shadow-lg w-full">
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Quick camera-based scanning</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Secure & encrypted access</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ScanLine className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Instant medical record retrieval</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Button - Enhanced */}
                  <Button
                    size="lg"
                    onClick={() => navigate("/qr-scanner")}
                    className="bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 hover:from-cyan-700 hover:via-teal-700 hover:to-blue-700 text-white font-bold text-base px-6 py-5 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all w-full relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-teal-400/0 group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                    <QrCode className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Open QR Scanner</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}