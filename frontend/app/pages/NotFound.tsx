import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
      <div className="text-center px-4">
        <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Home className="w-4 h-4 mr-2" />
          Go to Home
        </Button>
      </div>
    </div>
  );
}
