import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Activity,
  FileText,
  Pill,
  Beaker,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Heart,
  Droplet,
  Shield,
  QrCode,
  Download,
  Eye,
  Stethoscope,
  UserCog,
  ClipboardList,
  FileBarChart,
  Share2,
} from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import QRCode from "qrcode";

interface PatientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: string;
  allergies: string[];
  chronicDiseases: string[];
  appointments: Array<{
    id: string;
    date: string;
    time: string;
    doctorName: string;
    specialty: string;
    hospitalName: string;
    status: string;
    symptoms: string;
  }>;
  medicalRecords: Array<{
    id: string;
    date: string;
    doctorName: string;
    diagnosis: string;
    notes: string;
    hospital: string;
  }>;
  prescriptions: Array<{
    id: string;
    date: string;
    doctorName: string;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
  }>;
  labReports: Array<{
    id: string;
    date: string;
    testName: string;
    result: string;
    normalRange: string;
    status: string;
  }>;
}

export function PatientHistory() {
  const { patientId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    if (!token || !patientId) {
      setError("Invalid access. Missing authentication token.");
      setLoading(false);
      return;
    }

    fetchPatientHistory();
  }, [patientId, token]);

  useEffect(() => {
    if (patientData && patientId && token) {
      generateQRCode();
    }
  }, [patientData, patientId, token]);

  const generateQRCode = async () => {
    try {
      const qrData = window.location.href;
      const url = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: "#0D9488",
          light: "#FFFFFF",
        },
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = `patient-${patientId}-qr-code.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const fetchPatientHistory = () => {
    setLoading(true);
    setError("");

    // Use mock data - no backend API calls
    const mockPatientData: PatientData = {
      id: patientId || "PAT001",
      name: "Kamal Perera",
      email: "kamal@email.lk",
      phone: "+94 77 123 4567",
      age: 45,
      gender: "Male",
      bloodGroup: "O+",
      address: "123, Galle Road, Colombo 03",
      allergies: ["Penicillin", "Peanuts"],
      chronicDiseases: ["Hypertension"],
      appointments: [
        {
          id: "APT001",
          date: "2026-04-22",
          time: "09:00 AM",
          doctorName: "Dr. Nimal Perera",
          specialty: "General Physician",
          hospitalName: "Colombo General Hospital",
          status: "confirmed",
          symptoms: "Chest pain",
        },
      ],
      medicalRecords: [
        {
          id: "MR001",
          date: "2026-04-15",
          doctorName: "Dr. Nimal Perera",
          diagnosis: "Hypertension",
          notes: "Blood pressure elevated. Prescribed medication.",
          hospital: "Colombo General Hospital",
        },
      ],
      prescriptions: [
        {
          id: "RX001",
          date: "2026-04-15",
          doctorName: "Dr. Nimal Perera",
          medications: [
            {
              name: "Amlodipine",
              dosage: "5mg",
              frequency: "Once daily",
              duration: "30 days",
            },
          ],
        },
      ],
      labReports: [
        {
          id: "LAB001",
          date: "2026-04-14",
          testName: "Blood Pressure",
          result: "140/90 mmHg",
          normalRange: "120/80 mmHg",
          status: "High",
        },
      ],
    };

    setPatientData(mockPatientData);
    setLoading(false);
    console.log("✅ Patient History loaded with mock data");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { className: string; icon: React.ReactNode; text: string }
    > = {
      confirmed: {
        className: "bg-emerald-100 text-emerald-800 border-emerald-200",
        icon: <CheckCircle2 className="w-3 h-3" />,
        text: "Confirmed",
      },
      pending: {
        className: "bg-amber-100 text-amber-800 border-amber-200",
        icon: <Clock className="w-3 h-3" />,
        text: "Pending",
      },
      completed: {
        className: "bg-teal-100 text-teal-800 border-teal-200",
        icon: <CheckCircle2 className="w-3 h-3" />,
        text: "Completed",
      },
      cancelled: {
        className: "bg-rose-100 text-rose-800 border-rose-200",
        icon: <XCircle className="w-3 h-3" />,
        text: "Cancelled",
      },
    };

    const variant = variants[status.toLowerCase()] || variants.pending;
    return (
      <Badge className={`${variant.className} border flex items-center gap-1 w-fit`}>
        {variant.icon}
        {variant.text}
      </Badge>
    );
  };

  const getLabStatusBadge = (status: string) => {
    const isNormal = status.toLowerCase() === "normal";
    return (
      <Badge
        className={
          isNormal
            ? "bg-emerald-100 text-emerald-800 border-emerald-200 border"
            : "bg-rose-100 text-rose-800 border-rose-200 border"
        }
      >
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 w-16 h-16 bg-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <Loader2 className="w-16 h-16 text-teal-600 animate-spin mx-auto relative" />
          </div>
          <p className="text-gray-800 text-xl font-bold">Loading patient history...</p>
          <p className="text-gray-600 mt-2">Please wait while we fetch your medical records</p>
        </div>
      </div>
    );
  }

  if (error || !patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-red-200 shadow-2xl">
          <CardContent className="p-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 ml-2">
                {error || "Unable to load patient data"}
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => navigate("/")}
              className="w-full mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
            >
              ← Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8 relative z-10">
        {/* Header with Hero Image */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mb-6 border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-400"
          >
            ← Back to Home
          </Button>

          {/* Hero Banner */}
          <Card className="overflow-hidden shadow-2xl border-2 border-teal-200 mb-6">
            <div className="relative h-48">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVjb3JkcyUyMGhvc3BpdGFsJTIwZGF0YXxlbnwxfHx8fDE3NzE2NzY5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Medical Records"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-cyan-900/80 to-blue-900/70"></div>
              <div className="absolute inset-0 flex items-center px-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <ClipboardList className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
                      Patient Medical History
                    </h1>
                    <p className="text-teal-100 text-lg font-medium">
                      Complete medical records and health information
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Patient Info + QR Code */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Info Card */}
            <Card className="shadow-2xl border-2 border-teal-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardTitle className="flex items-center gap-3 text-2xl relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <User className="w-6 h-6" />
                  </div>
                  Patient Information
                </CardTitle>
                <CardDescription className="text-teal-50">
                  Personal and medical details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="w-7 h-7 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Full Name</p>
                        <p className="font-bold text-xl text-gray-900">{patientData.name}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pl-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <div>
                          <p className="text-xs text-gray-600">Age</p>
                          <p className="font-bold text-gray-900">{patientData.age} years</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCog className="w-4 h-4 text-teal-600" />
                        <div>
                          <p className="text-xs text-gray-600">Gender</p>
                          <p className="font-bold text-gray-900">{patientData.gender}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Phone</p>
                        <p className="font-semibold text-gray-900">{patientData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Email</p>
                        <p className="font-semibold text-gray-900 text-sm break-words">{patientData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Address</p>
                        <p className="font-semibold text-gray-900 text-sm">{patientData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blood Group - Featured */}
                <div className="mt-6 pt-6 border-t-2 border-teal-100">
                  <div className="flex items-center gap-4 bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-xl border-2 border-red-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Droplet className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Blood Group</p>
                      <p className="font-black text-3xl text-red-600">{patientData.bloodGroup}</p>
                    </div>
                  </div>
                </div>

                {/* Critical Alerts */}
                {(patientData.allergies.length > 0 || patientData.chronicDiseases.length > 0) && (
                  <div className="mt-6 pt-6 border-t-2 border-teal-100 space-y-4">
                    {patientData.allergies.length > 0 && (
                      <Alert className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <AlertDescription className="ml-2">
                          <p className="font-bold text-red-900 mb-2 flex items-center gap-2">
                            <span className="text-lg">⚠️</span> Allergies Alert
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {patientData.allergies.map((allergy, index) => (
                              <Badge key={index} className="bg-red-100 text-red-800 border-red-300 font-semibold px-3 py-1">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    {patientData.chronicDiseases.length > 0 && (
                      <Alert className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                        <Heart className="h-5 w-5 text-orange-600" />
                        <AlertDescription className="ml-2">
                          <p className="font-bold text-orange-900 mb-2">Chronic Conditions</p>
                          <div className="flex flex-wrap gap-2">
                            {patientData.chronicDiseases.map((disease, index) => (
                              <Badge key={index} className="bg-orange-100 text-orange-800 border-orange-300 font-semibold px-3 py-1">
                                {disease}
                              </Badge>
                            ))}
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - QR Code */}
          <div className="space-y-6">
            {/* QR Code Card */}
            <Card className="shadow-2xl border-2 border-teal-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50 border-b-2 border-teal-100">
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <QrCode className="w-5 h-5" />
                  QR Code Access
                </CardTitle>
                <CardDescription>Scan to view medical history</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {qrCodeUrl ? (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-teal-200">
                      <img
                        src={qrCodeUrl}
                        alt="Patient QR Code"
                        className="w-full h-auto"
                      />
                    </div>
                    <Button
                      onClick={downloadQRCode}
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download QR Code
                    </Button>
                    <Alert className="border-teal-200 bg-teal-50">
                      <Share2 className="h-4 w-4 text-teal-600" />
                      <AlertDescription className="text-teal-800 ml-2 text-xs">
                        Share this QR code with healthcare providers for instant access to your medical history
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Generating QR code...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical Image Card */}
            <Card className="overflow-hidden shadow-xl border-2 border-cyan-200">
              <div className="relative h-56">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwcmVjb3Jkc3xlbnwxfHx8fDE3NzE2NzY5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Medical Professional"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-teal-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg drop-shadow-lg">
                        Secure Medical Records
                      </p>
                      <p className="text-cyan-100 text-sm">Protected by encryption</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="border-2 border-teal-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-7 h-7 text-teal-600" />
                </div>
                <div>
                  <p className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    {patientData.appointments.length}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <p className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {patientData.medicalRecords.length}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">Medical Records</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-lg">
                  <Pill className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <p className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {patientData.prescriptions.length}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">Prescriptions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-lg">
                  <Beaker className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <p className="text-3xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {patientData.labReports.length}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">Lab Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-teal-50 p-1 rounded-lg border-2 border-teal-200">
            <TabsTrigger
              value="appointments"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger
              value="records"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Records</span>
            </TabsTrigger>
            <TabsTrigger
              value="prescriptions"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              <Pill className="w-4 h-4" />
              <span className="hidden sm:inline">Prescriptions</span>
            </TabsTrigger>
            <TabsTrigger
              value="labs"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-amber-600 data-[state=active]:text-white"
            >
              <Beaker className="w-4 h-4" />
              <span className="hidden sm:inline">Lab Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="shadow-2xl border-2 border-teal-200">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b-2 border-teal-100">
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <Calendar className="w-5 h-5" />
                  Appointment History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {patientData.appointments.length === 0 ? (
                  <div className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-semibold">No appointments found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-teal-50">
                          <TableHead className="font-bold text-teal-900">Date & Time</TableHead>
                          <TableHead className="font-bold text-teal-900">Doctor</TableHead>
                          <TableHead className="font-bold text-teal-900">Hospital</TableHead>
                          <TableHead className="font-bold text-teal-900">Symptoms</TableHead>
                          <TableHead className="font-bold text-teal-900">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patientData.appointments.map((apt) => (
                          <TableRow key={apt.id} className="hover:bg-teal-50/50 transition-colors">
                            <TableCell>
                              <div>
                                <p className="font-bold text-gray-900">{apt.date}</p>
                                <p className="text-sm text-teal-600 font-medium">{apt.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-bold text-gray-900">{apt.doctorName}</p>
                                <p className="text-sm text-gray-600">{apt.specialty}</p>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{apt.hospitalName}</TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-sm truncate">{apt.symptoms}</p>
                            </TableCell>
                            <TableCell>{getStatusBadge(apt.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Records Tab */}
          <TabsContent value="records">
            <Card className="shadow-2xl border-2 border-emerald-200">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b-2 border-emerald-100">
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <FileText className="w-5 h-5" />
                  Medical Records
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {patientData.medicalRecords.length === 0 ? (
                  <div className="p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-semibold">No medical records found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patientData.medicalRecords.map((record) => (
                      <Card key={record.id} className="border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all">
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileBarChart className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-bold text-lg text-gray-900">{record.diagnosis}</p>
                                <p className="text-sm text-gray-600">Dr. {record.doctorName}</p>
                              </div>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1">
                              {record.date}
                            </Badge>
                          </div>
                          <div className="space-y-3 bg-emerald-50 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Activity className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-bold text-gray-700">Hospital:</p>
                                <p className="text-sm text-gray-600">{record.hospital}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <FileText className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-bold text-gray-700">Notes:</p>
                                <p className="text-sm text-gray-600">{record.notes}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions">
            <Card className="shadow-2xl border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Pill className="w-5 h-5" />
                  Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {patientData.prescriptions.length === 0 ? (
                  <div className="p-12 text-center">
                    <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-semibold">No prescriptions found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patientData.prescriptions.map((prescription) => (
                      <Card key={prescription.id} className="border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">Dr. {prescription.doctorName}</p>
                                <p className="text-sm text-gray-600">{prescription.date}</p>
                              </div>
                            </div>
                            <Badge className="bg-purple-100 text-purple-800 font-bold px-3 py-1">
                              {prescription.medications.length} medication(s)
                            </Badge>
                          </div>
                          <div className="space-y-3 mt-4">
                            {prescription.medications.map((med, index) => (
                              <div
                                key={index}
                                className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-100"
                              >
                                <p className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                                  <Pill className="w-4 h-4" />
                                  {med.name}
                                </p>
                                <div className="grid grid-cols-3 gap-3 text-sm">
                                  <div className="bg-white p-2 rounded-lg border border-purple-200">
                                    <span className="text-gray-600 text-xs">Dosage:</span>
                                    <p className="font-bold text-purple-900">{med.dosage}</p>
                                  </div>
                                  <div className="bg-white p-2 rounded-lg border border-purple-200">
                                    <span className="text-gray-600 text-xs">Frequency:</span>
                                    <p className="font-bold text-purple-900">{med.frequency}</p>
                                  </div>
                                  <div className="bg-white p-2 rounded-lg border border-purple-200">
                                    <span className="text-gray-600 text-xs">Duration:</span>
                                    <p className="font-bold text-purple-900">{med.duration}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lab Reports Tab */}
          <TabsContent value="labs">
            <Card className="shadow-2xl border-2 border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b-2 border-orange-100">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Beaker className="w-5 h-5" />
                  Laboratory Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {patientData.labReports.length === 0 ? (
                  <div className="p-12 text-center">
                    <Beaker className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-semibold">No lab reports found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-orange-50">
                          <TableHead className="font-bold text-orange-900">Date</TableHead>
                          <TableHead className="font-bold text-orange-900">Test Name</TableHead>
                          <TableHead className="font-bold text-orange-900">Result</TableHead>
                          <TableHead className="font-bold text-orange-900">Normal Range</TableHead>
                          <TableHead className="font-bold text-orange-900">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patientData.labReports.map((report) => (
                          <TableRow key={report.id} className="hover:bg-orange-50/50 transition-colors">
                            <TableCell className="font-bold text-gray-900">{report.date}</TableCell>
                            <TableCell className="font-semibold">{report.testName}</TableCell>
                            <TableCell className="font-bold text-orange-600">{report.result}</TableCell>
                            <TableCell className="text-gray-600 font-medium">
                              {report.normalRange}
                            </TableCell>
                            <TableCell>{getLabStatusBadge(report.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Footer */}
        <div className="mt-6">
          <Alert className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg">
            <Shield className="h-5 w-5 text-teal-600" />
            <AlertDescription className="text-teal-900 ml-2">
              <p className="font-bold mb-2 flex items-center gap-2">
                <span>🔒</span> Secure Access & Privacy
              </p>
              <p className="text-sm">
                This patient data is encrypted and accessed securely. All access is logged for
                security and compliance purposes. Your medical information is protected under healthcare privacy regulations.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}