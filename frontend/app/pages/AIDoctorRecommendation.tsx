import { useState } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Star, 
  Stethoscope,
  Clock,
  Award,
  TrendingUp,
  Loader2,
  ArrowRight,
  AlertCircle,
  Brain,
  Zap,
  Shield,
  Users
} from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface DoctorRecommendation {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  hospitalId: string;
  experience: number;
  rating: number;
  availability: string;
  matchScore: number;
  reason: string;
  consultationFee: number;
}

export function AIDoctorRecommendation() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<DoctorRecommendation[]>([]);
  const [formData, setFormData] = useState({
    symptoms: "",
    preferredLocation: "",
    urgency: "normal",
    ageGroup: "adult",
    gender: "",
    previousConditions: "",
  });

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-6df55b61`;

  // Quick symptom templates
  const symptomTemplates = [
    {
      id: 1,
      label: "Fever & Headache 🤒",
      symptoms: "High fever, severe headache, body aches, feeling weak",
      urgency: "urgent"
    },
    {
      id: 2,
      label: "Chest Pain ❤️",
      symptoms: "Chest pain, irregular heartbeat, difficulty breathing, high blood pressure",
      urgency: "emergency"
    },
    {
      id: 3,
      label: "Skin Problems 🧴",
      symptoms: "Skin rash, acne, itching, eczema, dry skin",
      urgency: "normal"
    },
    {
      id: 4,
      label: "Back Pain 🦴",
      symptoms: "Lower back pain, joint pain, difficulty walking, muscle stiffness",
      urgency: "normal"
    },
    {
      id: 5,
      label: "Stomach Issues 🤢",
      symptoms: "Stomach pain, nausea, diarrhea, indigestion, bloating",
      urgency: "normal"
    },
    {
      id: 6,
      label: "Cough & Cold 🤧",
      symptoms: "Persistent cough, cold, sore throat, congestion, runny nose",
      urgency: "normal"
    },
    {
      id: 7,
      label: "Eye Problems 👁️",
      symptoms: "Blurred vision, eye pain, redness, watery eyes, vision issues",
      urgency: "normal"
    },
    {
      id: 8,
      label: "Diabetes Check 💉",
      symptoms: "High blood sugar, frequent urination, excessive thirst, diabetes management",
      urgency: "normal"
    },
    {
      id: 9,
      label: "Mental Health 🧠",
      symptoms: "Anxiety, depression, stress, insomnia, mood swings",
      urgency: "urgent"
    },
    {
      id: 10,
      label: "General Checkup ✅",
      symptoms: "Regular health checkup, preventive care, routine examination",
      urgency: "normal"
    }
  ];

  const handleTemplateClick = (template: typeof symptomTemplates[0]) => {
    setFormData({
      ...formData,
      symptoms: template.symptoms,
      urgency: template.urgency
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first');
      setLoading(false);
      return;
    }

    fetch('http://localhost:3000/api/ai/recommend-doctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ symptoms: formData.symptoms }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to get recommendations');
        }
        return response.json();
      })
      .then(data => {
        setRecommendations(data.recommendations);
        toast.success("AI recommendations generated successfully!");
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Failed to get recommendations. Using demo data.');

        // Fallback to mock data
        const mockRecommendations: DoctorRecommendation[] = [
          {
            id: "D001",
            name: "Dr. Nimal Perera",
            specialty: "General Physician",
            hospital: "Colombo General Hospital",
            hospitalId: "H001",
            experience: 15,
            rating: 4.8,
            availability: "Available Today",
            matchScore: 95,
            reason: "Highly experienced in treating your symptoms with excellent patient reviews",
            consultationFee: 2500,
          },
          {
            id: "D002",
            name: "Dr. Lakshmi Fernando",
            specialty: "Internal Medicine",
            hospital: "Asiri Central Hospital",
            hospitalId: "H002",
            experience: 12,
            rating: 4.7,
            availability: "Available Tomorrow",
            matchScore: 88,
            reason: "Specialist in internal medicine with strong background in similar cases",
            consultationFee: 3500,
          },
          {
            id: "D003",
            name: "Dr. Sunil Wickramasinghe",
            specialty: "General Physician",
            hospital: "Nawaloka Hospital",
            hospitalId: "H003",
            experience: 10,
            rating: 4.6,
            availability: "Available in 2 days",
            matchScore: 82,
            reason: "Good patient satisfaction and nearby location match",
            consultationFee: 2000,
          },
        ];
        setRecommendations(mockRecommendations);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-300";
      case "urgent":
        return "bg-orange-100 text-orange-800 border-orange-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Background Image */}
      <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden opacity-10 pointer-events-none">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1674544362969-a4269ef0ea69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbWVkaWNhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcxNjc2OTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="AI Medical Technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-600/30 via-cyan-600/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-8 relative z-50">
        {/* Header - Enhanced */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            {/* Glow Effect */}
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse pointer-events-none"></div>
            
            {/* Icon Container */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-black/20 to-transparent"></div>
              <Brain className="w-10 h-10 text-white relative z-50 drop-shadow-lg animate-pulse" />
              
              {/* AI Badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-black mb-4 relative">
            {/* 3D Text Effect */}
            <span className="absolute inset-0 bg-gradient-to-br from-teal-700 to-cyan-700 bg-clip-text text-transparent blur-sm opacity-50">
              AI Doctor Recommendation
            </span>
            <span className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
              AI Doctor Recommendation
            </span>
            <span className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent bg-clip-text text-transparent">
              AI Doctor Recommendation
            </span>
          </h1>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Let our <span className="font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">AI-powered system</span> help you find the perfect doctor based on your symptoms and preferences
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-none px-4 py-1.5 shadow-lg">
              <Zap className="w-3 h-3 mr-1" />
              Instant Results
            </Badge>
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none px-4 py-1.5 shadow-lg">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-teal-600 text-white border-none px-4 py-1.5 shadow-lg">
              <Shield className="w-3 h-3 mr-1" />
              100% Secure
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form - Enhanced */}
          <div className="relative z-50">
            <Card className="shadow-2xl border-2 border-teal-100 bg-white backdrop-blur-sm overflow-visible relative z-50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none -z-10"></div>
              
              <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b-2 border-teal-100 relative">
                <CardTitle className="flex items-center gap-3 text-teal-800">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  Tell Us About Your Health Needs
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Provide details to get personalized doctor recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 relative z-50">
                <form onSubmit={handleSubmit} className="space-y-5 relative z-50">
                  <div className="space-y-2">
                    <Label htmlFor="symptoms" className="text-gray-700 font-semibold flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-teal-600" />
                      Symptoms or Health Concern *
                    </Label>
                    <Textarea
                      id="symptoms"
                      placeholder="Type your symptoms here... e.g., Fever, headache, chest pain, regular checkup..."
                      value={formData.symptoms}
                      onChange={(e) =>
                        setFormData({ ...formData, symptoms: e.target.value })
                      }
                      rows={4}
                      required
                      disabled={loading}
                      className="resize-none border-2 border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 bg-white text-gray-900 placeholder:text-gray-400 relative z-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Be specific about your symptoms for better recommendations
                    </p>

                    {/* Symptom Templates */}
                    <div className="mt-3">
                      <p className="text-sm text-gray-700 font-semibold mb-2 flex items-center gap-1">
                        <Zap className="w-4 h-4 text-teal-600" />
                        Quick Symptom Templates - Click to use:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {symptomTemplates.map(template => (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() => handleTemplateClick(template)}
                            className="text-left px-3 py-2 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 border-2 border-teal-200 hover:border-teal-400 transition-all text-sm font-medium text-teal-900 shadow-sm hover:shadow-md transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                          >
                            {template.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-gray-700 font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-600" />
                        Urgency Level
                      </Label>
                      <select
                        id="urgency"
                        value={formData.urgency}
                        onChange={(e) =>
                          setFormData({ ...formData, urgency: e.target.value })
                        }
                        disabled={loading}
                        className="w-full h-11 px-3 rounded-md border-2 border-teal-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative z-50"
                      >
                        <option value="normal">Normal - Can wait a few days</option>
                        <option value="urgent">Urgent - Need to see doctor soon</option>
                        <option value="emergency">Emergency - Immediate attention needed</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ageGroup" className="text-gray-700 font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 text-teal-600" />
                        Age Group
                      </Label>
                      <select
                        id="ageGroup"
                        value={formData.ageGroup}
                        onChange={(e) =>
                          setFormData({ ...formData, ageGroup: e.target.value })
                        }
                        disabled={loading}
                        className="w-full h-11 px-3 rounded-md border-2 border-teal-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative z-50"
                      >
                        <option value="child">Child (0-12 years)</option>
                        <option value="teen">Teen (13-19 years)</option>
                        <option value="adult">Adult (20-59 years)</option>
                        <option value="senior">Senior (60+ years)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredLocation" className="text-gray-700 font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-600" />
                        Preferred Location
                      </Label>
                      <Input
                        id="preferredLocation"
                        type="text"
                        placeholder="Type location... e.g., Colombo, Kandy, Galle"
                        value={formData.preferredLocation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredLocation: e.target.value,
                          })
                        }
                        disabled={loading}
                        className="border-2 border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 bg-white text-gray-900 placeholder:text-gray-400 h-11 relative z-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-gray-700 font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 text-teal-600" />
                        Preferred Doctor Gender
                      </Label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        disabled={loading}
                        className="w-full h-11 px-3 rounded-md border-2 border-teal-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative z-50"
                      >
                        <option value="">No Preference</option>
                        <option value="male">Male Doctor</option>
                        <option value="female">Female Doctor</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousConditions" className="text-gray-700 font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-600" />
                      Previous Medical Conditions (Optional)
                    </Label>
                    <Textarea
                      id="previousConditions"
                      placeholder="Type any previous conditions... e.g., Diabetes, hypertension, allergies"
                      value={formData.previousConditions}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousConditions: e.target.value,
                        })
                      }
                      rows={3}
                      disabled={loading}
                      className="resize-none border-2 border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 bg-white text-gray-900 placeholder:text-gray-400 relative z-50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 text-white font-bold text-lg py-6 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Get AI Recommendations
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Card - Enhanced */}
            <Card className="mt-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 shadow-xl overflow-hidden relative z-50">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/20 rounded-full blur-2xl pointer-events-none -z-10"></div>
              <CardContent className="p-5 relative z-50">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-teal-900">
                    <p className="font-bold mb-2 text-base">How it works:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Our AI analyzes your symptoms and preferences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Matches you with the most suitable specialists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Considers doctor ratings, experience, and availability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Provides personalized recommendations instantly</span>
                      </li>
                    </ul>

                    <div className="mt-4 pt-4 border-t-2 border-teal-200">
                      <p className="font-bold mb-2 text-teal-800">💡 Try these examples:</p>
                      <div className="space-y-2">
                        <div className="bg-white/60 rounded-lg p-2 text-xs">
                          <span className="font-semibold text-teal-700">Heart problems:</span> "Chest pain, irregular heartbeat, high blood pressure"
                        </div>
                        <div className="bg-white/60 rounded-lg p-2 text-xs">
                          <span className="font-semibold text-cyan-700">Skin issues:</span> "Acne, rash, skin irritation, eczema"
                        </div>
                        <div className="bg-white/60 rounded-lg p-2 text-xs">
                          <span className="font-semibold text-purple-700">General checkup:</span> "Regular health checkup, feeling tired"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Image Card */}
            <Card className="mt-6 overflow-hidden shadow-xl border-2 border-cyan-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwc3RldGhvc2NvcGV8ZW58MXx8fHwxNzcxNjc2OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Healthcare Professional"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-lg drop-shadow-lg">
                  Find Your Perfect Doctor Match
                </p>
                <p className="text-teal-100 text-sm">AI-powered recommendations you can trust</p>
              </div>
            </Card>
          </div>

          {/* Recommendations Display - Enhanced */}
          <div className="relative z-50">
            <Card className="shadow-2xl border-2 border-teal-100 min-h-[600px] bg-white backdrop-blur-sm overflow-hidden relative z-50">
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none -z-10"></div>
              
              <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b-2 border-teal-100 relative">
                <CardTitle className="flex items-center gap-3 text-teal-800">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  Recommended Doctors
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Top matches based on your requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 relative">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                      <div className="absolute inset-0 w-16 h-16 bg-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <Loader2 className="w-16 h-16 text-teal-600 animate-spin mb-4 relative" />
                    </div>
                    <p className="text-gray-800 font-semibold text-lg">Analyzing your symptoms...</p>
                    <p className="text-sm text-gray-600 mt-2">
                      AI is finding the best doctors for you
                    </p>
                  </div>
                ) : recommendations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 w-20 h-20 bg-teal-400 rounded-full blur-2xl opacity-30"></div>
                      <div className="relative w-20 h-20 bg-gradient-to-br from-teal-100 to-purple-100 rounded-2xl flex items-center justify-center">
                        <Brain className="w-10 h-10 text-teal-600" />
                      </div>
                    </div>
                    <p className="text-gray-700 text-xl font-bold mb-2">
                      No recommendations yet
                    </p>
                    <p className="text-gray-600 text-sm max-w-xs">
                      Fill out the form and click <span className="font-semibold text-teal-600">"Get AI Recommendations"</span> to see personalized doctor suggestions
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {recommendations.map((doctor, index) => (
                      <Card
                        key={doctor.id}
                        className="border-2 border-teal-100 hover:border-teal-300 hover:shadow-2xl transition-all relative overflow-hidden bg-white"
                      >
                        {/* Gradient Accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-500"></div>
                        
                        {/* Match Score Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-base px-3 py-1 shadow-lg">
                            {doctor.matchScore}% Match
                          </Badge>
                        </div>

                        <CardContent className="p-6">
                          {/* Rank Badge */}
                          {index === 0 && (
                            <Badge className="mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold shadow-lg">
                              <Award className="w-3 h-3 mr-1" />
                              Top Match
                            </Badge>
                          )}

                          <h3 className="text-2xl font-bold text-gray-900 mb-1 pr-24">
                            {doctor.name}
                          </h3>
                          <p className="text-teal-600 font-bold mb-4 text-lg">
                            {doctor.specialty}
                          </p>

                          <div className="space-y-3 mb-5">
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-teal-600" />
                              </div>
                              <span className="font-medium">{doctor.hospital}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                                <Award className="w-4 h-4 text-cyan-600" />
                              </div>
                              <span className="font-medium">{doctor.experience} years experience</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              </div>
                              <span className="font-medium">{doctor.rating}/5.0 Rating</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="font-medium">{doctor.availability}</span>
                            </div>
                          </div>

                          {/* AI Reason - Enhanced */}
                          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-4 mb-5">
                            <div className="flex items-start gap-2">
                              <Brain className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-bold text-teal-900 mb-1">AI Analysis:</p>
                                <p className="text-sm text-teal-800">
                                  {doctor.reason}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 font-medium">
                                Consultation Fee
                              </p>
                              <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                Rs. {doctor.consultationFee}
                              </p>
                            </div>
                            <Button
                              onClick={() => navigate(`/book/${doctor.id}`)}
                              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                              Book Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}