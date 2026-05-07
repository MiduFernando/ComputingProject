import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Users, Clock, CheckCircle2, Activity, Bell, ArrowLeft, Timer, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function QueueTracking() {
  const { appointmentId } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentToken, setCurrentToken] = useState(12);
  const [yourToken] = useState(18);
  const [estimatedWait, setEstimatedWait] = useState(30);

  useEffect(() => {
    // Simulate real-time queue updates
    const interval = setInterval(() => {
      setCurrentToken((prev) => {
        if (prev < yourToken) {
          const newToken = prev + 1;
          const remaining = yourToken - newToken;
          setEstimatedWait(remaining * 5); // 5 minutes per patient
          return newToken;
        }
        return prev;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [yourToken]);

  const queueProgress = (currentToken / yourToken) * 100;
  const peopleAhead = Math.max(0, yourToken - currentToken);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Background Image */}
      <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1581982231900-6a1a46b744c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMHdhaXRpbmclMjByb29tJTIwcGF0aWVudHMlMjBxdWV1ZXxlbnwxfHx8fDE3NzE2NzU1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Hospital waiting room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-600/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate("/dashboard")} 
          className="mb-6 bg-white/80 backdrop-blur-sm hover:bg-white border-teal-200 hover:border-teal-400 transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="space-y-6">
          {/* Header Card with Image */}
          <Card className="bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-600 text-white shadow-2xl border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl"></div>
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6 animate-pulse" />
                    </div>
                    {t("queueStatus")}
                  </CardTitle>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    <Bell className="w-3 h-3 mr-1" />
                    Live Tracking
                  </Badge>
                </div>
                <div className="hidden md:block">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcXVldWUlMjBudW1iZXIlMjBkaWdpdGFsJTIwZGlzcGxheXxlbnwxfHx8fDE3NzE2NzU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Queue display"
                    className="w-24 h-24 rounded-xl object-cover shadow-xl border-2 border-white/30"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white/90 font-semibold">Appointment ID: <span className="text-white">{appointmentId}</span></p>
                <p className="text-white/90 mt-1">Dr. Anura Perera - <span className="text-cyan-100 font-medium">Cardiology</span></p>
              </div>
            </CardContent>
          </Card>

          {/* Current Status - Enhanced with Background */}
          <Card className="shadow-2xl border-2 border-teal-100 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="py-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Current Token */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative text-center p-8 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border-2 border-teal-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-sm text-teal-700 font-semibold mb-2 uppercase tracking-wide">{t("currentToken")}</p>
                    <p className="text-6xl font-bold bg-gradient-to-br from-teal-600 to-teal-800 bg-clip-text text-transparent">
                      {currentToken < 10 ? `0${currentToken}` : currentToken}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-teal-600 font-medium">Now Serving</span>
                    </div>
                  </div>
                </div>

                {/* Your Token */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative text-center p-8 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl border-2 border-cyan-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-sm text-cyan-700 font-semibold mb-2 uppercase tracking-wide">{t("yourToken")}</p>
                    <p className="text-6xl font-bold bg-gradient-to-br from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
                      {yourToken < 10 ? `0${yourToken}` : yourToken}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-xs text-cyan-600 font-medium">Your Number</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar - Enhanced */}
              <div className="mb-8 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-100">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700 font-semibold">Queue Progress</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-none text-lg px-4 py-1">
                    {Math.round(queueProgress)}%
                  </Badge>
                </div>
                <Progress value={queueProgress} className="h-4 bg-teal-100" />
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>Start</span>
                  <span className="font-medium text-teal-600">Almost There!</span>
                </div>
              </div>

              {/* Stats - Enhanced with Images */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 opacity-10"></div>
                  <div className="relative flex items-center gap-4 p-6 bg-white border-2 border-teal-100 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                        {peopleAhead}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">People Ahead</p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 opacity-10"></div>
                  <div className="relative flex items-center gap-4 p-6 bg-white border-2 border-cyan-100 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                        {estimatedWait}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">{t("minutes")} {t("estimatedWait")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Card - Enhanced */}
          <Card className="shadow-xl border-2 border-teal-100 bg-white/90 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b-2 border-teal-100 relative">
              <CardTitle className="flex items-center gap-2 text-teal-800">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 relative">
              <div className="flex gap-3 p-3 bg-gradient-to-r from-teal-50 to-transparent rounded-lg hover:from-teal-100 transition-colors">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">
                  Please arrive at least <span className="font-semibold text-teal-700">10 minutes before</span> your estimated time.
                </p>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-lg hover:from-cyan-100 transition-colors">
                <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">
                  Queue times are estimates and may vary based on consultation duration.
                </p>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-teal-50 to-transparent rounded-lg hover:from-teal-100 transition-colors">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">
                  Bring your appointment confirmation and any relevant <span className="font-semibold text-teal-700">medical records</span>.
                </p>
              </div>
              <div className="flex gap-3 p-3 bg-gradient-to-r from-cyan-50 to-transparent rounded-lg hover:from-cyan-100 transition-colors">
                <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">
                  If you miss your turn, you may need to wait for the next available slot.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Turn Alert - Enhanced */}
          {currentToken >= yourToken - 2 && currentToken < yourToken && (
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 shadow-2xl animate-pulse overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20"></div>
              <CardContent className="py-6 relative">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-amber-900 mb-1">🔔 Your turn is coming up!</h3>
                    <p className="text-amber-800 font-medium">Please proceed to the consultation area.</p>
                  </div>
                  <Badge className="bg-amber-500 text-white border-none text-lg px-4 py-2">
                    Get Ready!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {currentToken >= yourToken && (
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 shadow-2xl animate-pulse overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20"></div>
              <CardContent className="py-6 relative">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-emerald-900 mb-1">✅ It's your turn!</h3>
                    <p className="text-emerald-800 font-medium">Please proceed to the doctor's room immediately.</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white border-none text-lg px-4 py-2 animate-pulse">
                    NOW!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}