import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Calendar, Clock, Hospital, User, Activity, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  hospitalName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  tokenNumber?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "APT001",
    doctorName: "Dr. Anura Perera",
    specialty: "Cardiologist",
    hospitalName: "Colombo General Hospital",
    date: "2026-02-25",
    time: "10:00 AM - 11:00 AM",
    status: "confirmed",
    tokenNumber: "A-015",
  },
  {
    id: "APT002",
    doctorName: "Dr. Chamila Fernando",
    specialty: "Neurologist",
    hospitalName: "Asiri Central Hospital",
    date: "2026-03-01",
    time: "02:00 PM - 03:00 PM",
    status: "pending",
  },
  {
    id: "APT003",
    doctorName: "Dr. Rohan Silva",
    specialty: "Pediatrician",
    hospitalName: "Nawaloka Hospital",
    date: "2026-01-15",
    time: "09:00 AM - 10:00 AM",
    status: "completed",
    tokenNumber: "C-008",
  },
];

export function UserDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 500);
  }, [user, navigate]);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "pending"
  );

  const pastAppointments = appointments.filter(
    (apt) => apt.status === "completed" || apt.status === "cancelled"
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; text: string }> = {
      confirmed: { className: "bg-green-500", text: t("confirmed") },
      pending: { className: "bg-yellow-500", text: t("pending") },
      completed: { className: "bg-blue-500", text: t("completed") },
      cancelled: { className: "bg-red-500", text: t("cancelled") },
    };

    const variant = variants[status] || variants.pending;
    return <Badge className={variant.className}>{variant.text}</Badge>;
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: "cancelled" as const } : apt
        )
      );
      toast.success("Appointment cancelled successfully");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('/src/imports/35abbfd8d238eeef3e087a66a32b3a8b.jpg')" }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/85 via-cyan-700/80 to-blue-800/85 backdrop-blur-sm"></div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-teal-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent mb-2">
                Welcome, {user?.name}!
              </h1>
              <p className="text-gray-600 text-lg">Manage your appointments and health records</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/95 backdrop-blur-md border-teal-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    {upcomingAppointments.length}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/95 backdrop-blur-md border-green-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {appointments.filter((a) => a.status === "completed").length}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/95 backdrop-blur-md border-yellow-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                    {appointments.filter((a) => a.status === "pending").length}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/95 backdrop-blur-md border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                  <Hospital className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {appointments.length}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-white/95 backdrop-blur-md border-teal-200 shadow-lg">
            <TabsTrigger 
              value="upcoming" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white font-semibold"
            >
              {t("upcomingAppointments")}
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white font-semibold"
            >
              {t("appointmentHistory")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-teal-100">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="w-6 h-6" />
                  {t("upcomingAppointments")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-10 h-10 text-teal-600" />
                    </div>
                    <p className="text-gray-600 mb-6 text-lg">No upcoming appointments</p>
                    <Button 
                      onClick={() => navigate("/hospitals")} 
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {t("bookNow")}
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-teal-200">
                        <TableHead className="text-teal-700 font-bold">{t("date")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">{t("time")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">{t("doctor")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">{t("hospital")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">{t("status")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingAppointments.map((appointment) => (
                        <TableRow key={appointment.id} className="border-teal-100 hover:bg-teal-50/50">
                          <TableCell className="font-medium">{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-gray-800">{appointment.doctorName}</p>
                              <p className="text-sm text-teal-600">{appointment.specialty}</p>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.hospitalName}</TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {appointment.status === "confirmed" && appointment.tokenNumber && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => navigate(`/queue/${appointment.id}`)}
                                  className="border-teal-300 text-teal-700 hover:bg-teal-50 hover:border-teal-500 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                                >
                                  <Activity className="w-4 h-4 mr-1" />
                                  {t("trackQueue")}
                                </Button>
                              )}
                              {appointment.status !== "cancelled" && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  {t("cancel")}
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-teal-100">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="w-6 h-6" />
                  {t("appointmentHistory")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {pastAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg">No appointment history</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-teal-200">
                        <TableHead className="text-teal-700 font-bold">{t("date")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">{t("time")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">{t("doctor")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">{t("hospital")}</TableHead>
                        <TableHead className="text-teal-700 font-bold">{t("status")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastAppointments.map((appointment) => (
                        <TableRow key={appointment.id} className="border-teal-100 hover:bg-teal-50/50">
                          <TableCell className="font-medium">{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold text-gray-800">{appointment.doctorName}</p>
                              <p className="text-sm text-teal-600">{appointment.specialty}</p>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.hospitalName}</TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}