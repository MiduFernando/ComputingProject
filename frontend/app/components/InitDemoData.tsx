import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Loader2, CheckCircle, AlertCircle, Copy, Check, Database } from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { toast } from "sonner";

export function InitDemoData() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [copiedAdmin, setCopiedAdmin] = useState(false);
  const [copiedPatient, setCopiedPatient] = useState(false);

  const initializeData = () => {
    setLoading(true);
    setError("");
    setResult(null);

    // Use mock response - demo accounts are already in localStorage
    setTimeout(() => {
      const mockResult = {
        message: "Demo accounts already available in localStorage",
        accounts: {
          admin: {
            email: "admin@test.lk",
            password: "admin123",
          },
          patient: {
            email: "patient@test.lk",
            password: "patient123",
          },
        },
      };

      setResult(mockResult);
      setLoading(false);
      toast.success("Demo data initialized successfully!");
      console.log("✅ Demo data info loaded");
    }, 500);
  };

  const copyToClipboard = async (text: string, type: 'admin' | 'patient') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'admin') {
        setCopiedAdmin(true);
        setTimeout(() => setCopiedAdmin(false), 2000);
      } else {
        setCopiedPatient(true);
        setTimeout(() => setCopiedPatient(false), 2000);
      }
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Card className="border-2 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Initialize Demo Data</CardTitle>
            <CardDescription>Create test accounts for login/testing</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-900">
            <strong>⚠️ First Time Setup:</strong> Click below to create demo admin and patient accounts.
            This is required for the login system to work.
          </p>
        </div>

        <Button
          onClick={initializeData}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-6"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Initializing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Initialize Demo Data
            </span>
          )}
        </Button>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Success!</p>
                <p className="text-sm text-green-700">{result.message}</p>
              </div>
            </div>

            {/* Admin Account */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-orange-900 flex items-center gap-2">
                  🛡️ Admin Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-orange-700">Email</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 bg-orange-100 text-orange-900 px-3 py-2 rounded font-mono text-sm">
                      {result.accounts?.admin?.email}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(result.accounts?.admin?.email, 'admin')}
                      className="border-orange-300 hover:bg-orange-100"
                    >
                      {copiedAdmin ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-orange-700">Password</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 bg-orange-100 text-orange-900 px-3 py-2 rounded font-mono text-sm">
                      {result.accounts?.admin?.password}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(result.accounts?.admin?.password, 'admin')}
                      className="border-orange-300 hover:bg-orange-100"
                    >
                      {copiedAdmin ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Account */}
            <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-teal-900 flex items-center gap-2">
                  👤 Patient Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-teal-700">Email</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 bg-teal-100 text-teal-900 px-3 py-2 rounded font-mono text-sm">
                      {result.accounts?.patient?.email}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(result.accounts?.patient?.email, 'patient')}
                      className="border-teal-300 hover:bg-teal-100"
                    >
                      {copiedPatient ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-teal-700">Password</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 bg-teal-100 text-teal-900 px-3 py-2 rounded font-mono text-sm">
                      {result.accounts?.patient?.password}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(result.accounts?.patient?.password, 'patient')}
                      className="border-teal-300 hover:bg-teal-100"
                    >
                      {copiedPatient ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                ✅ You can now login with these credentials at <strong>/login</strong>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
