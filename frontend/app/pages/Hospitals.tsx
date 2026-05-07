import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MapPin, Phone, Search, Calendar, Clock, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import colomboGeneralHospitalImg from "../../assets/ColomboGeneralHospital.png";
import asiriCentralHospitalImg from "../../assets/AsiriCentralHospital.png";


interface Hospital {
  id: string;
  name: string;
  location: string;
  phone: string;
  image: string;
  departments: string[];
  dailyLimit?: number;
  appointmentsToday?: number;
}

const mockHospitals: Hospital[] = [
  {
    id: "1",
    name: "Colombo General Hospital",
    location: "Colombo 08, Sri Lanka",
    phone: "+94 11 269 1111",
    image: colomboGeneralHospitalImg,
    departments: ["Cardiology", "Neurology", "Pediatrics"],
    dailyLimit: 50,
    appointmentsToday: 32,
  },
  {
    id: "2",
    name: "Asiri Central Hospital",
    location: "Colombo 10, Sri Lanka",
    phone: "+94 11 466 5500",
    image: asiriCentralHospitalImg,
    departments: ["Oncology", "Orthopedics", "ENT"],
    dailyLimit: 40,
    appointmentsToday: 28,
  },
  {
    id: "3",
    name: "Nawaloka Hospital",
    location: "Colombo 02, Sri Lanka",
    phone: "+94 11 554 4444",
    image: "https://images.unsplash.com/photo-1764885415760-d3d8fff41fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VudGVyJTIwYnVpbGRpbmclMjBmYWNhZGV8ZW58MXx8fHwxNzcxNDk1MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    departments: ["General Surgery", "Dermatology", "Gynecology"],
    dailyLimit: 35,
    appointmentsToday: 35,
  },
  {
    id: "4",
    name: "Lanka Hospital",
    location: "Colombo 05, Sri Lanka",
    phone: "+94 11 553 0000",
    image: "https://images.unsplash.com/photo-1584451049700-ec9b394f3805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGNvcnJpZG9yJTIwY2xlYW4lMjBtb2Rlcm58ZW58MXx8fHwxNzcxNTc1NzMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    departments: ["Radiology", "Psychiatry", "Ophthalmology"],
    dailyLimit: 45,
    appointmentsToday: 18,
  },
];

export function Hospitals() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHospitals(mockHospitals);
      setLoading(false);
    }, 500);
  }, []);

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {t("selectHospital")}
        </h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => {
            const slotsLeft = (hospital.dailyLimit || 0) - (hospital.appointmentsToday || 0);
            const isFull = slotsLeft <= 0;
            const isLowSlots = slotsLeft > 0 && slotsLeft <= 5;
            
            return (
              <Card key={hospital.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden relative">
                  <ImageWithFallback
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Daily Limit Badge */}
                  {hospital.dailyLimit && (
                    <div className="absolute top-3 right-3">
                      {isFull ? (
                        <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                          <AlertCircle className="w-3 h-3" />
                          FULL
                        </div>
                      ) : isLowSlots ? (
                        <div className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                          <Clock className="w-3 h-3" />
                          {slotsLeft} Left
                        </div>
                      ) : (
                        <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                          <Calendar className="w-3 h-3" />
                          {slotsLeft} Slots
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {hospital.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-teal-600 flex-shrink-0" />
                      <span>{hospital.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{hospital.phone}</span>
                    </div>
                  </div>
                  
                  {/* Daily Limit Progress Bar */}
                  {hospital.dailyLimit && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-teal-700">Today's Appointments</span>
                        <span className="font-bold text-teal-800">
                          {hospital.appointmentsToday}/{hospital.dailyLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            isFull
                              ? "bg-red-500"
                              : isLowSlots
                              ? "bg-orange-500"
                              : "bg-gradient-to-r from-teal-500 to-cyan-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              ((hospital.appointmentsToday || 0) / hospital.dailyLimit) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {hospital.departments.slice(0, 3).map((dept, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className={`w-full ${
                      isFull
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                    }`}
                    onClick={() => !isFull && navigate(`/doctors/${hospital.id}`)}
                    disabled={isFull}
                  >
                    {isFull ? "Fully Booked" : t("viewDoctors")}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && filteredHospitals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No hospitals found matching your search.</p>
        </div>
      )}
    </div>
  );
}