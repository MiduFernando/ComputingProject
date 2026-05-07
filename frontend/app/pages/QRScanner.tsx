import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Html5QrcodeScanner } from "html5-qrcode";
import jsQR from "jsqr";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  QrCode,
  Camera,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ScanLine,
  Shield,
  ArrowLeft,
  Smartphone,
  MonitorSmartphone,
  Upload,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";
import { PatientQRCard } from "../components/patientQrCodeGenerater";

export function QRScanner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  const handleScan = (decodedText: string) => {
    if (decodedText && !success) {
      setScanResult(decodedText);
      setSuccess(true);
      setScanning(false);
      setError("");

      // Stop the scanner
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }

      // Parse the URL and redirect
      try {
        const url = new URL(decodedText);
        const pathname = url.pathname;
        const searchParams = url.search;

        // Navigate to the scanned URL after a short delay
        setTimeout(() => {
          navigate(`${pathname}${searchParams}`);
        }, 1500);
      } catch (err) {
        // If it's not a valid URL, try to parse as patient ID
        if (decodedText.includes("patient-history")) {
          navigate(decodedText);
        } else {
          setError("Invalid QR code. Please scan a valid patient history QR code.");
          setSuccess(false);
          setScanning(true);
        }
      }
    }
  };

  const handleError = (errorMessage: string) => {
    // Only log errors, don't show them to user unless critical
    console.log("QR Scanner:", errorMessage);
  };

  const startScanning = () => {
    setScanning(true);
    setError("");
    setScanResult("");
    setSuccess(false);

    // Initialize scanner
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { 
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scanner.render(handleScan, handleError);
      scannerRef.current = scanner;
    }, 100);
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setScanning(false);
    setScanResult("");
    setError("");
    setSuccess(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setScanResult("");
    setSuccess(false);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const result = e.target?.result as string;
          const img = new Image();
          
          img.onload = async () => {
            try {
              // Create canvas and draw image
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              
              if (ctx) {
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                // Use jsQR to decode the image
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                
                if (code) {
                  console.log("✅ QR Code detected from image:", code.data);
                  handleScan(code.data);
                } else {
                  setError("Could not recognize QR code from the image. Please ensure the QR code is clear and visible.");
                  setUploading(false);
                }
              }
            } catch (err) {
              console.error("Error processing image:", err);
              setError("Failed to scan image. Please try a different image or use camera scanning.");
              setUploading(false);
            }
          };
          
          img.onerror = () => {
            setError("Failed to load image. Please upload a valid image file.");
            setUploading(false);
          };
          
          img.src = result;
        } catch (err) {
          console.error("Error processing file:", err);
          setError("Failed to process image. Please try again.");
          setUploading(false);
        }
      };
      
      reader.onerror = () => {
        setError("Failed to read file. Please try again.");
        setUploading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
      setUploading(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6 border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Hero Banner */}
          <Card className="overflow-hidden shadow-2xl border-2 border-teal-200 mb-8">
            <div className="relative h-56">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxciUyMGNvZGUlMjBzY2FubmluZyUyMG1lZGljYWx8ZW58MXx8fHwxNzcxNjc2OTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="QR Code Scanner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-cyan-900/80 to-blue-900/70"></div>
              <div className="absolute inset-0 flex items-center px-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl relative">
                    <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping"></div>
                    <QrCode className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
                      QR Code Scanner
                    </h1>
                    <p className="text-teal-100 text-lg font-medium">
                      Scan patient medical history QR codes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Scanner Card */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Scanner Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-2 border-teal-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardTitle className="flex items-center gap-3 text-2xl relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Camera className="w-6 h-6" />
                  </div>
                  Camera Scanner
                </CardTitle>
                <CardDescription className="text-teal-50">
                  Position QR code within the camera frame
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {!scanning && !success && (
                  <div className="space-y-6">
                    {/* Patient QR Code Display */}
                    {user && (
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-200">
                        <h4 className="font-bold text-teal-900 mb-4 flex items-center gap-2">
                          <QrCode className="w-5 h-5" />
                          Your Medical QR Code
                        </h4>
                        <p className="text-sm text-gray-700 mb-4">
                          Display this QR code on another device to scan and view your medical history.
                        </p>
                        <PatientQRCard userId={user.id} userName={user.name} />
                      </div>
                    )}

                    {/* Start Scanning Info */}
                    <div className="text-center py-12">
                      <div className="relative mb-6 inline-block">
                        <div className="absolute inset-0 w-24 h-24 bg-teal-500 rounded-full blur-2xl opacity-50 animate-pulse pointer-events-none"></div>
                        <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl relative">
                          <QrCode className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Ready to Scan
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Click the button below to activate your camera and scan a patient's medical history QR code
                      </p>
                      <Button
                        onClick={startScanning}
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg text-lg px-8 py-6"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Start Scanning
                      </Button>

                      {/* File Upload Section */}
                      <div className="mt-6 flex flex-col items-center gap-3">
                        <p className="text-gray-600 font-medium">Or upload a QR code image:</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          onClick={triggerFileUpload}
                          variant="outline"
                          disabled={uploading}
                          className="border-2 border-teal-400 hover:bg-teal-50 text-lg px-8 py-6"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 mr-2" />
                              Upload QR Code Image
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-200">
                      <h4 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
                        <ScanLine className="w-5 h-5" />
                        How to Scan:
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>Allow camera access when prompted by your browser</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>Hold the QR code steady within the scanning frame</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>Make sure there's good lighting for best results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>The scan will happen automatically when QR code is detected</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Scanner Container */}
                {scanning && (
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-xl border-4 border-teal-300 shadow-2xl bg-black">
                      {/* HTML5 QR Code Scanner */}
                      <div id="qr-reader" className="w-full"></div>
                    </div>

                    <div className="flex items-center justify-center gap-3 bg-teal-50 p-4 rounded-lg border-2 border-teal-200">
                      <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                      <p className="text-teal-900 font-semibold">Scanning for QR code...</p>
                    </div>

                    <Button
                      onClick={stopScanning}
                      variant="outline"
                      className="w-full border-2 border-red-300 text-red-700 hover:bg-red-50"
                    >
                      Stop Scanning
                    </Button>
                  </div>
                )}

                {/* Success State */}
                {success && (
                  <div className="text-center py-12">
                    <div className="relative mb-6 inline-block">
                      <div className="absolute inset-0 w-24 h-24 bg-emerald-500 rounded-full blur-2xl opacity-50 animate-pulse pointer-events-none"></div>
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl relative">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-3">
                      QR Code Scanned Successfully!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Redirecting to patient medical history...
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                      <span className="text-sm text-emerald-600 font-medium">Loading...</span>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <Alert className="border-2 border-red-200 bg-red-50 mt-4">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <AlertDescription className="text-red-800 ml-2">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Security Info */}
            <Card className="shadow-xl border-2 border-teal-200">
              <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50 border-b-2 border-teal-100">
                <CardTitle className="flex items-center gap-2 text-teal-800 text-lg">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      All scans are encrypted and secure
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Token-based authentication required
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      HIPAA compliant access control
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      All access is logged for audit
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Support */}
            <Card className="shadow-xl border-2 border-cyan-200">
              <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50 border-b-2 border-cyan-100">
                <CardTitle className="flex items-center gap-2 text-cyan-800 text-lg">
                  <MonitorSmartphone className="w-5 h-5" />
                  Supported Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Mobile Devices</p>
                      <p className="text-xs text-gray-600">iOS & Android</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MonitorSmartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Tablets & Laptops</p>
                      <p className="text-xs text-gray-600">With camera</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Image */}
            <Card className="overflow-hidden shadow-xl border-2 border-teal-200">
              <div className="relative h-48">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBzY2FubmluZyUyMHFyJTIwY29kZXxlbnwxfHx8fDE3NzE2NzY5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Medical QR Scanning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-cyan-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                      <QrCode className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm drop-shadow-lg">
                        Instant Access
                      </p>
                      <p className="text-teal-100 text-xs">Quick & Secure</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Alert */}
        <div className="mt-8">
          <Alert className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-900 ml-2">
              <p className="font-bold mb-1">📱 Camera Permission Required</p>
              <p className="text-sm">
                This feature requires camera access to scan QR codes. Please allow camera permission when prompted by your browser for the scanner to work properly.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}