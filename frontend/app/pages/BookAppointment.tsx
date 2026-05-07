import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { Calendar, AlertCircle, Info } from "lucide-react";

export function BookAppointment() {
  const { doctorId } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: user?.name || "",
    age: "",
    phone: "",
    symptoms: "",
    preferredDate: "",
    preferredTime: "",
    paymentMethod: "",
  });

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
  ];

  const paymentMethods = [
    "Credit/Debit Card",
    "PayHere",
    "Stripe",
    "eZCash",
    "Cash on Arrival",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock appointment ID
      const appointmentId = `APT${Date.now()}`;

      toast.success("Appointment details saved!");

      // Navigate to payment page
      if (formData.paymentMethod !== "Cash on Arrival") {
        navigate(`/payment/${appointmentId}`);
      } else {
        navigate("/dashboard");
        toast.success("Appointment booked successfully!");
      }
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1739185069005-8cb46fef2702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYXBwb2ludG1lbnQlMjBob3NwaXRhbCUyMGNvbnN1bHRhdGlvbiUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxNjczMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')" }}>
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/85 via-cyan-900/80 to-teal-800/85 backdrop-blur-sm"></div>
      
      <div className="relative container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 bg-white/95 hover:bg-white border-teal-300 text-teal-700 hover:text-teal-800 backdrop-blur-sm"
        >
          ← Back
        </Button>

        <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-teal-100">
          <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="w-7 h-7" />
              {t("appointmentDetails")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-teal-800 border-b-2 border-teal-200 pb-2">
                  Patient Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName" className="text-gray-700 font-medium">
                      {t("fullName")}
                    </Label>
                    <Input
                      id="patientName"
                      type="text"
                      value={formData.patientName}
                      onChange={(e) =>
                        setFormData({ ...formData, patientName: e.target.value })
                      }
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-gray-700 font-medium">
                      {t("age")}
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    {t("phoneNumber")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symptoms" className="text-gray-700 font-medium">
                    {t("symptoms")}
                  </Label>
                  <Textarea
                    id="symptoms"
                    rows={4}
                    value={formData.symptoms}
                    onChange={(e) =>
                      setFormData({ ...formData, symptoms: e.target.value })
                    }
                    placeholder="Please describe your symptoms or reason for visit"
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Appointment Schedule */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-teal-800 border-b-2 border-teal-200 pb-2">
                  Appointment Schedule
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate" className="text-gray-700 font-medium">
                      {t("preferredDate")}
                    </Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredDate: e.target.value })
                      }
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime" className="text-gray-700 font-medium">
                      {t("preferredTime")}
                    </Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) =>
                        setFormData({ ...formData, preferredTime: value })
                      }
                      required
                    >
                      <SelectTrigger className="border-teal-200 focus:border-teal-500 focus:ring-teal-500">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-teal-800 border-b-2 border-teal-200 pb-2">
                  {t("paymentMethod")}
                </h3>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMethod: value })
                  }
                  required
                >
                  <SelectTrigger className="border-teal-200 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? t("loading") : t("continueToPayment")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}