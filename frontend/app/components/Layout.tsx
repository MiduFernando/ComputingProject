import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "./ui/sonner";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
