import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { CreditCard, Wallet, CheckCircle, Smartphone, DollarSign, ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";

export function Payment() {
  const { appointmentId } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const appointmentFee = 2500; // LKR

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Payment successful! Appointment confirmed.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1710922962986-a9e8de6dbb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBwYXltZW50JTIwbWVkaWNhbCUyMHRyYW5zYWN0aW9uJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzE2NzM2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')" }}>
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 via-cyan-900/85 to-emerald-900/90 backdrop-blur-sm"></div>
      
      <div className="relative container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/95 rounded-full shadow-lg">
              <ShieldCheck className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
                Complete Payment
                <Lock className="w-6 h-6 text-teal-300" />
              </h1>
              <p className="text-teal-100 flex items-center gap-2">
                <span className="text-xs bg-teal-500 px-2 py-1 rounded">ID:</span>
                {appointmentId}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Payment Summary */}
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-teal-100">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Consultation Fee
                  </span>
                  <span className="font-semibold text-gray-800">LKR {appointmentFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    Service Charge
                  </span>
                  <span className="font-semibold text-gray-800">LKR 100</span>
                </div>
                <div className="border-t-2 border-teal-200 pt-3 flex justify-between items-center text-lg">
                  <span className="font-bold text-gray-800">Total Amount</span>
                  <span className="font-bold text-teal-600 bg-teal-50 px-4 py-2 rounded-lg">
                    LKR {(appointmentFee + 100).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-teal-100">
            <CardHeader className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                {t("paymentMethod")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 mb-3 p-4 border-2 border-teal-200 rounded-lg cursor-pointer hover:bg-teal-50 hover:border-teal-400 transition-all">
                  <RadioGroupItem value="card" id="card" className="border-teal-500" />
                  <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="p-2 bg-teal-100 rounded-full">
                      <CreditCard className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="font-medium text-gray-700">Credit/Debit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-3 p-4 border-2 border-green-200 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-400 transition-all">
                  <RadioGroupItem value="payhere" id="payhere" className="border-green-500" />
                  <Label htmlFor="payhere" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Wallet className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-700">PayHere</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-3 p-4 border-2 border-purple-200 rounded-lg cursor-pointer hover:bg-purple-50 hover:border-purple-400 transition-all">
                  <RadioGroupItem value="stripe" id="stripe" className="border-purple-500" />
                  <Label htmlFor="stripe" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-700">Stripe</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 border-orange-200 rounded-lg cursor-pointer hover:bg-orange-50 hover:border-orange-400 transition-all">
                  <RadioGroupItem value="ezcash" id="ezcash" className="border-orange-500" />
                  <Label htmlFor="ezcash" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Smartphone className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-700">eZCash</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Card Payment Form */}
          {paymentMethod === "card" && (
            <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-teal-100">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  Card Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-gray-700 font-medium">Card Number</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                      }
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-gray-700 font-medium">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="John Doe"
                      value={cardDetails.cardName}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cardName: e.target.value })
                      }
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-gray-700 font-medium">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={(e) =>
                          setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                        }
                        className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-gray-700 font-medium">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({ ...cardDetails, cvv: e.target.value })
                        }
                        className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={processing}
                    >
                      {processing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Pay LKR {(appointmentFee + 100).toLocaleString()}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Other Payment Methods */}
          {paymentMethod !== "card" && (
            <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-teal-100">
              <CardContent className="py-12 text-center">
                <div className="p-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  {paymentMethod === "payhere" && <Wallet className="w-12 h-12 text-green-600" />}
                  {paymentMethod === "stripe" && <CreditCard className="w-12 h-12 text-purple-600" />}
                  {paymentMethod === "ezcash" && <Smartphone className="w-12 h-12 text-orange-600" />}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {paymentMethod === "payhere" && "PayHere Payment"}
                  {paymentMethod === "stripe" && "Stripe Payment"}
                  {paymentMethod === "ezcash" && "eZCash Payment"}
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  You will be redirected to complete your payment securely.
                </p>
                <Button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={processing}
                >
                  {processing ? "Redirecting..." : "Continue to Payment"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}