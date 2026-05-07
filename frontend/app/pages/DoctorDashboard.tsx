import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, FileText, Activity, Users, TrendingUp, Stethoscope, Heart, UserCheck, Mail, AlertCircle, Star, Award, Timer, ClipboardList, UserCircle, MapPin } from "lucide-react";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-6df55b61`;

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge?: number;
  patientGender?: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  reason?: string;
  priority?: "normal" | "elderly" | "disabled";
  createdAt: string;
  queueNumber?: number;
  appointmentType?: "consultation" | "follow-up" | "emergency";
  duration?: string;
  notes?: string;
}

interface DoctorProfile {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  experience?: number;
  qualifications?: string;
  consultationFee?: number;
  availableDays?: string[];
}

export function DoctorDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed">("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const fetchDoctorAppointments = () => {
    setLoading(true);
    setError(null);

    // Use mock data for demo - No backend API calls
    const mockDoctorProfile: DoctorProfile = {
      id: "DOC001",
      name: user?.name || "Doctor",
      specialization: user?.specialization || "General Physician",
      hospital: "e-Health Connect Hospital",
      experience: 12,
      qualifications: "MBBS, MD",
      consultationFee: 3500,
      availableDays: ["Mon", "Wed", "Fri"],
    };

    const mockAppointments: Appointment[] = [
        {
          id: "APT001",
          patientName: "Kamal Perera",
          patientEmail: "kamal@email.lk",
          patientPhone: "+94 77 123 4567",
          patientAge: 45,
          patientGender: "Male",
          date: new Date().toISOString().split('T')[0],
          time: "09:00 AM",
          status: "pending",
          reason: "Chest pain and shortness of breath",
          priority: "normal",
          appointmentType: "consultation",
          duration: "30 min",
          createdAt: new Date().toISOString(),
          queueNumber: 1,
        },
        {
          id: "APT002",
          patientName: "Nimalka Fernando",
          patientEmail: "nimalka@email.lk",
          patientPhone: "+94 77 234 5678",
          patientAge: 72,
          patientGender: "Female",
          date: new Date().toISOString().split('T')[0],
          time: "09:30 AM",
          status: "pending",
          reason: "Diabetes follow-up and blood pressure check",
          priority: "elderly",
          appointmentType: "follow-up",
          duration: "20 min",
          notes: "Patient has history of hypertension",
          createdAt: new Date().toISOString(),
          queueNumber: 2,
        },
        {
          id: "APT003",
          patientName: "Sunil Wickramasinghe",
          patientEmail: "sunil@email.lk",
          patientPhone: "+94 77 345 6789",
          patientAge: 34,
          patientGender: "Male",
          date: new Date().toISOString().split('T')[0],
          time: "10:00 AM",
          status: "confirmed",
          reason: "Severe headache and dizziness",
          priority: "normal",
          appointmentType: "consultation",
          duration: "25 min",
          createdAt: new Date().toISOString(),
          queueNumber: 3,
        },
        {
          id: "APT004",
          patientName: "Chamini Silva",
          patientEmail: "chamini@email.lk",
          patientPhone: "+94 77 456 7890",
          patientAge: 58,
          patientGender: "Female",
          date: new Date().toISOString().split('T')[0],
          time: "10:30 AM",
          status: "confirmed",
          reason: "Joint pain and mobility issues",
          priority: "disabled",
          appointmentType: "consultation",
          duration: "30 min",
          notes: "Patient uses wheelchair, requires assistance",
          createdAt: new Date().toISOString(),
          queueNumber: 4,
        },
        {
          id: "APT005",
          patientName: "Prasad Jayawardena",
          patientEmail: "prasad@email.lk",
          patientPhone: "+94 77 567 8901",
          patientAge: 28,
          patientGender: "Male",
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          time: "02:00 PM",
          status: "completed",
          reason: "Annual health checkup",
          priority: "normal",
          appointmentType: "consultation",
          duration: "20 min",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          queueNumber: 5,
        },
        {
          id: "APT006",
          patientName: "Sanduni Rajapaksa",
          patientEmail: "sanduni@email.lk",
          patientPhone: "+94 77 678 9012",
          patientAge: 39,
          patientGender: "Female",
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          time: "03:00 PM",
          status: "completed",
          reason: "Skin rash and allergies",
          priority: "normal",
          appointmentType: "follow-up",
          duration: "15 min",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          queueNumber: 6,
        },
        {
          id: "APT007",
          patientName: "Rohan Gunasekara",
          patientEmail: "rohan@email.lk",
          patientPhone: "+94 77 789 0123",
          patientAge: 65,
          patientGender: "Male",
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: "09:00 AM",
          status: "pending",
          reason: "Heart palpitations and fatigue",
          priority: "elderly",
          appointmentType: "emergency",
          duration: "40 min",
          notes: "Previous cardiac history, requires immediate attention",
          createdAt: new Date().toISOString(),
          queueNumber: 7,
        },
      ];

    // Set data to state
    setAppointments(mockAppointments);
    setDoctorProfile(mockDoctorProfile);
    setLoading(false);

    console.log("✅ Doctor Dashboard loaded with mock data");
    console.log(`📊 Total appointments: ${mockAppointments.length}`);
  };

  const updateAppointmentStatus = (appointmentId: string, newStatus: string) => {
    // Update appointment status in local state
    setAppointments((prevAppointments) =>
      prevAppointments.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, status: newStatus as any }
          : apt
      )
    );

    // Show success message
    const statusMessages: Record<string, string> = {
      confirmed: "Appointment approved successfully!",
      cancelled: "Appointment rejected",
      completed: "Appointment marked as completed",
    };

    console.log(`✅ Appointment ${appointmentId} status updated to ${newStatus}`);
    alert(statusMessages[newStatus] || `Appointment status updated to ${newStatus}`);
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === "pending").length,
    confirmed: appointments.filter(a => a.status === "confirmed").length,
    completed: appointments.filter(a => a.status === "completed").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  const todayDate = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === todayDate);
  const todayPending = todayAppointments.filter(apt => apt.status === "pending").length;
  const todayConfirmed = todayAppointments.filter(apt => apt.status === "confirmed").length;
  const todayCompleted = todayAppointments.filter(apt => apt.status === "completed").length;

  // Calculate average wait time and consultation stats
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const urgentCases = appointments.filter(apt => apt.priority !== "normal" && apt.status !== "completed").length;

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('/src/imports/35abbfd8d238eeef3e087a66a32b3a8b.jpg')" }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-teal-800/85 to-cyan-900/90 backdrop-blur-sm"></div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-6 border border-teal-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                <Stethoscope className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent mb-2">
                  Doctor Dashboard
                </h1>
                <p className="text-gray-700 text-lg font-medium">Welcome back, Dr. {user?.name}!</p>
                {doctorProfile && (
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-teal-600" />
                      <p className="text-sm text-teal-600 font-medium">{doctorProfile.specialization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <p className="text-sm text-blue-600 font-medium">{doctorProfile.hospital}</p>
                    </div>
                    {doctorProfile.experience && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <p className="text-sm text-amber-600 font-medium">{doctorProfile.experience}+ years exp</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 shadow-lg border-2 border-teal-200">
                <p className="text-xs text-gray-600 font-medium mb-1">Today's Schedule</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  {todayAppointments.length}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">{todayPending} Pending</span>
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium">{todayConfirmed} Ready</span>
                </div>
              </div>
              <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 shadow-lg border-2 border-purple-200">
                <p className="text-xs text-gray-600 font-medium mb-1">Success Rate</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {completionRate}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        {urgentCases > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl shadow-2xl p-6 mb-6 border-2 border-red-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">⚠️ Urgent Attention Required</h3>
                  <p className="text-white/90 text-lg">
                    {urgentCases} priority patient{urgentCases > 1 ? 's' : ''} (Elderly/Disabled) waiting for your review
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFilter("pending")}
                className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View Now
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-teal-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Total Patients</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-yellow-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Pending Review</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">{stats.pending}</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-teal-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Confirmed</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">{stats.confirmed}</p>
                <p className="text-xs text-gray-500 mt-1">Ready to see</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <UserCheck className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-green-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Completed</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{stats.completed}</p>
                <p className="text-xs text-gray-500 mt-1">Successfully treated</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Priority Cases</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{urgentCases}</p>
                <p className="text-xs text-gray-500 mt-1">Needs attention</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-2xl shadow-xl p-6 border border-blue-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Today's Progress</h3>
              <Timer className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Completed Today</span>
                <span className="font-bold text-xl">{todayCompleted}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${todayAppointments.length > 0 ? (todayCompleted / todayAppointments.length) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="text-xs text-white/70">
                {todayAppointments.length > 0 ? Math.round((todayCompleted / todayAppointments.length) * 100) : 0}% of today's appointments completed
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl shadow-xl p-6 border border-teal-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Patient Satisfaction</h3>
              <Star className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">4.9/5.0</p>
            <p className="text-xs text-white/70">Based on {stats.completed} reviews</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-6 border border-purple-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Quick Stats</h3>
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">Avg. Consultation</span>
                <span className="font-bold">25 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Total Patients</span>
                <span className="font-bold">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">This Week</span>
                <span className="font-bold">{Math.min(stats.total, 45)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl mb-6 border border-teal-100">
          <div className="border-b border-teal-200">
            <nav className="flex -mb-px p-2 gap-2">
              {[
                { key: "all", label: "All Appointments", icon: Calendar },
                { key: "pending", label: "Pending", icon: Clock },
                { key: "confirmed", label: "Confirmed", icon: CheckCircle },
                { key: "completed", label: "Completed", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    filter === tab.key
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Appointments List */}
        {error && (
          <div className="bg-red-50/90 backdrop-blur-md border-2 border-red-300 rounded-2xl p-6 mb-6 shadow-lg">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {filteredAppointments.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-16 text-center border border-teal-100">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Calendar className="w-12 h-12 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No appointments found</h3>
            <p className="text-gray-600 text-lg">
              {filter === "all"
                ? "You don't have any appointments yet."
                : `No ${filter} appointments at the moment.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-teal-100 hover:border-teal-300 transform hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <UserCircle className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-900">{appointment.patientName}</h3>
                          {appointment.patientAge && (
                            <span className="text-sm text-gray-500 font-medium">({appointment.patientAge} years)</span>
                          )}
                          {appointment.patientGender && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">
                              {appointment.patientGender}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-md ${
                              appointment.status === "pending"
                                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                                : appointment.status === "confirmed"
                                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                                : appointment.status === "completed"
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                            }`}
                          >
                            {appointment.status.toUpperCase()}
                          </span>
                          {appointment.priority !== "normal" && (
                            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md animate-pulse">
                              {appointment.priority === "elderly" ? "⚠️ ELDERLY PRIORITY" : "♿ DISABLED PRIORITY"}
                            </span>
                          )}
                          {appointment.appointmentType && (
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                              appointment.appointmentType === "emergency"
                                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                                : appointment.appointmentType === "follow-up"
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                : "bg-gradient-to-r from-gray-600 to-slate-600 text-white"
                            }`}>
                              {appointment.appointmentType === "emergency" ? "🚨 EMERGENCY" :
                               appointment.appointmentType === "follow-up" ? "📋 FOLLOW-UP" : "💬 CONSULTATION"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-3 border border-teal-200">
                        <Calendar className="w-5 h-5 text-teal-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Date</p>
                          <span className="text-sm font-bold text-gray-800">{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Time</p>
                          <span className="text-sm font-bold text-gray-800">{appointment.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
                        <Phone className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Phone</p>
                          <span className="text-sm font-bold text-gray-800">{appointment.patientPhone}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                        <Mail className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Email</p>
                          <span className="text-sm font-bold text-gray-800 truncate">{appointment.patientEmail}</span>
                        </div>
                      </div>
                    </div>

                    {appointment.reason && (
                      <div className="mt-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-l-4 border-amber-500 shadow-md">
                        <div className="flex items-start gap-2">
                          <ClipboardList className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-amber-700 font-bold mb-1">CHIEF COMPLAINT</p>
                            <p className="text-sm text-gray-800 font-medium">{appointment.reason}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {appointment.notes && (
                      <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500 shadow-md">
                        <div className="flex items-start gap-2">
                          <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-blue-700 font-bold mb-1">ADDITIONAL NOTES</p>
                            <p className="text-sm text-gray-800">{appointment.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-3 flex-wrap">
                      {appointment.queueNumber && (
                        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-5 py-2.5 rounded-xl shadow-lg">
                          <span className="text-xs font-medium">Queue: </span>
                          <strong className="text-xl">#{appointment.queueNumber}</strong>
                        </div>
                      )}
                      {appointment.duration && (
                        <div className="flex items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-2.5 rounded-xl border border-purple-200">
                          <Timer className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-700">{appointment.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 bg-gradient-to-br from-gray-50 to-slate-50 px-4 py-2.5 rounded-xl border border-gray-200">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">
                          Booked: {new Date(appointment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {appointment.status === "pending" && (
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  )}

                  {appointment.status === "confirmed" && (
                    <div className="ml-4">
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Mark Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
