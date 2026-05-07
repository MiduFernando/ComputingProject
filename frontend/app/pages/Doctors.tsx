import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Stethoscope, Calendar, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import drAnuraImage from "../../assets/drAnuraImage.png";
import drRohanImage from "../../assets/drRoshanImage.png";
import drNirmalaImage from "../../assets/drNirmalaImage.png";
import drSunilImage from "../../assets/drSunilImage.png";
import drDineshImage from "../../assets/drDineshImage.png";
import drYasminImage from "../../assets/drYasminImage.png";
import drDiliniImage from "../../assets/drDiliniImage.png";
import drArjunaImage from "../../assets/drArjunaImage.png";
import drSharmalaImage from "../../assets/drSharmalaImage.png";
import drKasunImage from "../../assets/drKasunImage.png";
import drThiliniImage from "../../assets/drThiliniImage.png";
import drBuddhikaImage from "../../assets/drBuddhikaImage.png";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  hospitalId: string;
  availableSlots: number;
  dailyLimit: number;
  schedule: string;
}

const mockDoctors: Doctor[] = [
  // Colombo General Hospital (id: 1) - Public Hospital
  {
    id: "1",
    name: "Dr. Anura Perera",
    specialty: "Cardiologist",
    image: drAnuraImage,
    hospitalId: "1",
    availableSlots: 5,
    dailyLimit: 20,
    schedule: "Mon-Fri, 9:00 AM - 3:00 PM",
  },
  {
    id: "2",
    name: "Dr. Chamila Fernando",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZW1hbGUlMjBuZXVyb2xvZ2lzdCUyMGRvY3RvciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE1Nzc0NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hospitalId: "1",
    availableSlots: 0,
    dailyLimit: 15,
    schedule: "Mon, Wed, Fri, 10:00 AM - 2:00 PM",
  },
  {
    id: "3",
    name: "Dr. Rohan Silva",
    specialty: "Pediatrician",
    image: drRohanImage,
    hospitalId: "1",
    availableSlots: 12,
    dailyLimit: 25,
    schedule: "Mon-Sat, 8:00 AM - 4:00 PM",
  },
  {
    id: "4",
    name: "Dr. Nirmala Jayasinghe",
    specialty: "Dermatologist",
    image: drNirmalaImage,
    hospitalId: "1",
    availableSlots: 8,
    dailyLimit: 18,
    schedule: "Tue, Thu, Sat, 9:00 AM - 1:00 PM",
  },
  {
    id: "5",
    name: "Dr. Sunil Wijeratne",
    specialty: "General Surgeon",
    image: drSunilImage,
    hospitalId: "1",
    availableSlots: 3,
    dailyLimit: 10,
    schedule: "Mon-Thu, 2:00 PM - 5:00 PM",
  },

  // Asiri Central Hospital (id: 2) - Private Hospital
  {
    id: "6",
    name: "Dr. Ranjith Kumarasinghe",
    specialty: "Oncologist",
    image: "https://images.unsplash.com/photo-1766763845544-a2008c5b14e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFzaWFuJTIwbWFsZSUyMG9uY29sb2dpc3QlMjBjYW5jZXIlMjBkb2N0b3J8ZW58MXx8fHwxNzcxNTc3NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hospitalId: "2",
    availableSlots: 7,
    dailyLimit: 15,
    schedule: "Mon-Fri, 9:00 AM - 2:00 PM",
  },
  {
    id: "7",
    name: "Dr. Ayesha Dissanayake",
    specialty: "Orthopedic Surgeon",
    image: "https://images.unsplash.com/photo-1741707039571-f1c3f957a2e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZW1hbGUlMjBvcnRob3BlZGljJTIwc3VyZ2VvbiUyMGhvc3BpdGFsfGVufDF8fHx8MTc3MTU3NzQ3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hospitalId: "2",
    availableSlots: 10,
    dailyLimit: 20,
    schedule: "Mon-Sat, 8:00 AM - 3:00 PM",
  },
  {
    id: "8",
    name: "Dr. Dinesh Gunawardena",
    specialty: "ENT Specialist",
    image: drDineshImage,
    hospitalId: "2",
    availableSlots: 6,
    dailyLimit: 18,
    schedule: "Mon, Wed, Fri, 10:00 AM - 4:00 PM",
  },
  {
    id: "9",
    name: "Dr. Priya Wickramasinghe",
    specialty: "Radiologist",
    image: "https://images.unsplash.com/photo-1631563020241-09beac7791b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjByYWRpb2xvZ2lzdCUyMG1lZGljYWwlMjBpbWFnaW5nfGVufDF8fHx8MTc3MTU3NzQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hospitalId: "2",
    availableSlots: 15,
    dailyLimit: 30,
    schedule: "Mon-Sat, 8:00 AM - 6:00 PM",
  },
  {
    id: "10",
    name: "Dr. Malini Samaraweera",
    specialty: "Endocrinologist",
    image: "https://images.unsplash.com/photo-1650784853783-68052c97ebfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMGVuZG9jcmlub2xvZ2lzdCUyMGRpYWJldGVzJTIwZG9jdG9yfGVufDF8fHx8MTc3MTU3NzQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hospitalId: "2",
    availableSlots: 4,
    dailyLimit: 12,
    schedule: "Tue, Thu, Sat, 9:00 AM - 1:00 PM",
  },

  // Nawaloka Hospital (id: 3) - Private Hospital
  {
    id: "11",
    name: "Dr. Samantha De Silva",
    specialty: "General Practitioner",
    image: "https://images.unsplash.com/photo-1759840278471-462cf3fcebd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFzaWFuJTIwZmVtYWxlJTIwZ2VuZXJhbCUyMHByYWN0aXRpb25lcnxlbnwxfHx8fDE3NzE1Nzc0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hospitalId: "3",
    availableSlots: 18,
    dailyLimit: 35,
    schedule: "Mon-Sat, 8:00 AM - 6:00 PM",
  },
  {
    id: "12",
    name: "Dr. Rajiv Mendis",
    specialty: "Gastroenterologist",
    image: "https://images.unsplash.com/photo-1606619523819-8792169617e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFzaWFuJTIwbWFsZSUyMGdhc3Ryb2VudGVyb2xvZ2lzdCUyMHNwZWNpYWxpc3R8ZW58MXx8fHwxNzcxNTc3NDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hospitalId: "3",
    availableSlots: 9,
    dailyLimit: 16,
    schedule: "Mon-Thu, 10:00 AM - 3:00 PM",
  },
  {
    id: "13",
    name: "Dr. Yasmin Fonseka",
    specialty: "Gynecologist",
    image: drYasminImage,
    hospitalId: "3",
    availableSlots: 5,
    dailyLimit: 14,
    schedule: "Mon-Fri, 9:00 AM - 2:00 PM",
  },
  {
    id: "14",
    name: "Dr. Nishan Abeyratne",
    specialty: "Nephrologist",
    image: "https://images.unsplash.com/photo-1659353887617-8cf154b312c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYWxlJTIwbmVwaHJvbG9naXN0JTIwa2lkbmV5JTIwc3BlY2lhbGlzdHxlbnwxfHx8fDE3NzE1Nzc0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hospitalId: "3",
    availableSlots: 2,
    dailyLimit: 10,
    schedule: "Tue, Thu, Sat, 11:00 AM - 3:00 PM",
  },
  {
    id: "15",
    name: "Dr. Dilini Ratnayake",
    specialty: "Cardiologist",
    image: drDiliniImage,
    hospitalId: "3",
    availableSlots: 11,
    dailyLimit: 22,
    schedule: "Mon-Fri, 8:00 AM - 2:00 PM",
  },

  // Lanka Hospital (id: 4) - Private Hospital
  {
    id: "16",
    name: "Dr. Arjuna Weerasinghe",
    specialty: "Psychiatrist",
    image: drArjunaImage,
    hospitalId: "4",
    availableSlots: 8,
    dailyLimit: 15,
    schedule: "Mon-Fri, 10:00 AM - 4:00 PM",
  },
  {
    id: "17",
    name: "Dr. Sharmila Jayakody",
    specialty: "Ophthalmologist",
    image: drSharmalaImage,
    hospitalId: "4",
    availableSlots: 6,
    dailyLimit: 20,
    schedule: "Mon-Sat, 9:00 AM - 4:00 PM",
  },
  {
    id: "18",
    name: "Dr. Kasun Gamage",
    specialty: "Pediatrician",
    image: drKasunImage,
    hospitalId: "4",
    availableSlots: 14,
    dailyLimit: 28,
    schedule: "Mon-Sat, 8:00 AM - 5:00 PM",
  },
  {
    id: "19",
    name: "Dr. Thilini Senanayake",
    specialty: "Dermatologist",
    image: drThiliniImage,
    hospitalId: "4",
    availableSlots: 0,
    dailyLimit: 16,
    schedule: "Tue, Thu, Sat, 9:00 AM - 1:00 PM",
  },
  {
    id: "20",
    name: "Dr. Buddhika Jayawardena",
    specialty: "Orthopedic Surgeon",
    image: drBuddhikaImage,
    hospitalId: "4",
    availableSlots: 7,
    dailyLimit: 12,
    schedule: "Mon-Fri, 2:00 PM - 6:00 PM",
  },
];

export function Doctors() {
  const { hospitalId } = useParams();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredDoctors = mockDoctors.filter(
        (doctor) => doctor.hospitalId === hospitalId
      );
      setDoctors(filteredDoctors);
      setLoading(false);
    }, 500);
  }, [hospitalId]);

  const handleBookAppointment = (doctorId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }
    navigate(`/book/${doctorId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={() => navigate("/hospitals")}
          className="mb-4 border-teal-300 text-teal-700 hover:bg-teal-50"
        >
          ← Back to Hospitals
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">
          {t("selectDoctor")}
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => {
            const isFullyBooked = doctor.availableSlots === 0;
            return (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-teal-100"
              >
                <div className="h-64 overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 flex items-center justify-center p-4">
                  <div className="relative w-48 h-48 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <ImageWithFallback
                      src={doctor.image}
                      alt={doctor.name}
                      className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {doctor.name}
                    </h3>
                    <Stethoscope className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className="text-teal-600 font-medium mb-4">
                    {doctor.specialty}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-500" />
                      <span>{doctor.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-500" />
                      <span>
                        {t("availableSlots")}: {doctor.availableSlots}/{doctor.dailyLimit}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    {isFullyBooked ? (
                      <Badge variant="destructive" className="bg-red-500">
                        {t("fullyBooked")}
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                        {doctor.availableSlots} slots available
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => handleBookAppointment(doctor.id)}
                    disabled={isFullyBooked}
                  >
                    {t("bookAppointment")}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && doctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No doctors available at this hospital.</p>
        </div>
      )}
    </div>
  );
}