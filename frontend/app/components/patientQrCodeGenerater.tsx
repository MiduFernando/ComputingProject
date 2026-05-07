import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import {
  QrCode,
  Download,
  Loader2,
  AlertCircle,
  Info,
  Shield,
  CheckCircle2,
  Smartphone,
  Printer,
  Lock,
  Heart,
  Zap,
  FileText,
  UserCheck,
} from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import QRCode from "qrcode";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

interface PatientQRCardProps {
  userId: string;
  userName: string;
}

export function PatientQRCard({ userId, userName }: PatientQRCardProps) {
  const [qrUrl, setQrUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    generateQRCode();
  }, [userId]);

  const generateQRCode = () => {
    setLoading(true);
    setError("");

    // Generate mock QR code URL - no backend API calls
    const mockQrUrl = `${window.location.origin}/patient-history/${userId}?token=${btoa(userId + Date.now())}`;
    setQrUrl(mockQrUrl);

    // Create styled QR code using the mock URL
    setTimeout(() => {
      if (qrCodeRef.current) {
        qrCodeInstance.current = new QRCodeStyling({
          width: 300,
          height: 300,
          data: mockQrUrl,
          margin: 10,
          qrOptions: {
            typeNumber: 0,
            mode: "Byte",
            errorCorrectionLevel: "H",
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 5,
          },
          dotsOptions: {
            color: "#14B8A6", // Teal-500
            type: "rounded",
          },
          backgroundOptions: {
            color: "#ffffff",
          },
          cornersSquareOptions: {
            color: "#0D9488", // Teal-600
            type: "extra-rounded",
          },
          cornersDotOptions: {
            color: "#14B8A6", // Teal-500
            type: "dot",
          },
        });

        qrCodeRef.current.innerHTML = "";
        qrCodeInstance.current.append(qrCodeRef.current);
      }
      setLoading(false);
      console.log("✅ Patient QR Code generated with mock data");
    }, 1000);
  };

  const downloadQRCode = async () => {
    try {
      // Use qrcode library to generate and download
      const dataUrl = await QRCode.toDataURL(qrUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#0D9488",
          light: "#FFFFFF",
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${userName.replace(/\s+/g, "_")}_Medical_QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("✅ QR Code downloaded successfully");
    } catch (err) {
      console.error("❌ Download error:", err);
      setError("Failed to download QR code. Please try again.");
    }
  };

  return (
    <Card className="relative overflow-hidden shadow-2xl border-2 border-teal-200 bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1656428964836-78d54bf76231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGhjYXJlJTIwUVJ8ZW58MXx8fHwxNzcxNjc0NDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      <CardHeader className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-500 text-white">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <QrCode className="w-7 h-7" />
          </div>
          <span className="flex items-center gap-2">
            Your Medical QR Code
            <Heart className="w-5 h-5 animate-pulse" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative p-8">
        <div className="text-center">
          {/* QR Code Display */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-teal-200 rounded-full"></div>
                <Loader2 className="w-20 h-20 text-teal-600 animate-spin absolute inset-0" />
              </div>
              <p className="text-gray-600 mt-6 font-medium">Generating your secure QR code...</p>
            </div>
          ) : error ? (
            <Alert className="border-2 border-red-300 bg-gradient-to-br from-red-50 to-pink-50 mb-4 shadow-lg">
              <div className="p-2 bg-red-100 rounded-full w-fit">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDescription className="text-red-800 ml-2 font-medium">{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              {/* QR Code Container */}
              <div className="inline-block p-8 bg-gradient-to-br from-teal-50 via-white to-cyan-50 rounded-2xl shadow-2xl border-4 border-teal-200 mb-8 transform transition-transform hover:scale-105">
                <div className="p-4 bg-white rounded-xl shadow-inner">
                  <div ref={qrCodeRef} className="mx-auto" />
                </div>
                <div className="mt-6 pt-4 border-t-2 border-teal-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <UserCheck className="w-5 h-5 text-teal-600" />
                    <p className="font-bold text-gray-800 text-xl">{userName}</p>
                  </div>
                  <p className="text-sm text-teal-700 font-semibold bg-teal-100 px-4 py-1 rounded-full inline-block">
                    Patient ID: {userId.slice(0, 8)}
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <Button
                onClick={downloadQRCode}
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 mb-8 w-full sm:w-auto text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-6 h-6 mr-2" />
                Download QR Code
              </Button>

              {/* Success Message */}
              <Alert className="border-2 border-teal-300 bg-gradient-to-br from-teal-50 to-emerald-50 mb-6 text-left shadow-lg">
                <div className="p-2 bg-teal-100 rounded-full w-fit">
                  <CheckCircle2 className="h-6 w-6 text-teal-600" />
                </div>
                <AlertDescription className="text-teal-800 ml-2">
                  <p className="font-bold mb-2 text-base flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    QR Code Generated Successfully!
                  </p>
                  <p className="text-sm">
                    Download and save this QR code. Show it at any hospital for instant access
                    to your complete medical history.
                  </p>
                </AlertDescription>
              </Alert>

              {/* Usage Instructions */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Alert className="border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50 text-left shadow-lg hover:shadow-xl transition-shadow">
                  <div className="p-2 bg-cyan-100 rounded-full w-fit">
                    <Smartphone className="h-6 w-6 text-cyan-600" />
                  </div>
                  <AlertDescription className="text-cyan-900 ml-2">
                    <p className="font-bold mb-3 text-base">How to Use</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">1</div>
                        <span>Download and save to your phone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">2</div>
                        <span>Print and keep in your wallet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">3</div>
                        <span>Show at hospital reception</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">4</div>
                        <span>Doctor scans for instant history</span>
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Alert className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 text-left shadow-lg hover:shadow-xl transition-shadow">
                  <div className="p-2 bg-purple-100 rounded-full w-fit">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <AlertDescription className="text-purple-900 ml-2">
                    <p className="font-bold mb-3 text-base flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Security Features
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span>Encrypted secure access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span>Token-based authentication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span>Only for medical staff</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span>All access is logged</span>
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-300 shadow-lg mb-6">
                <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2 text-lg">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  Benefits of Your Medical QR Code
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-emerald-800">
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">✓</div>
                    <span className="font-medium">Instant access to medical history</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">✓</div>
                    <span className="font-medium">No need to remember details</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">✓</div>
                    <span className="font-medium">Emergency ready</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">✓</div>
                    <span className="font-medium">Better treatment decisions</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">✓</div>
                    <span className="font-medium">Faster check-in process</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">✓</div>
                    <span className="font-medium">Complete medication history</span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <Alert className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 text-left shadow-lg">
                <div className="p-2 bg-amber-100 rounded-full w-fit">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <AlertDescription className="text-amber-900 ml-2">
                  <p className="font-bold mb-2 text-base flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Important Privacy Notice
                  </p>
                  <p className="text-sm">
                    Keep your QR code private. Only share with authorized medical professionals.
                    Do not post on social media or public platforms.
                  </p>
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}