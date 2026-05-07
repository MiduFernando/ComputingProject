import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart
} from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-teal-400" />
              e-Health Connect
            </h3>
            <p className="text-teal-100 text-sm mb-4">
              {t("footerAbout") || "Your trusted platform for booking hospital appointments online. Eliminating long queues and making healthcare accessible to everyone in Sri Lanka."}
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors shadow-lg"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors shadow-lg"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gradient-to-br from-teal-500 to-pink-500 rounded-full flex items-center justify-center hover:from-teal-400 hover:to-pink-400 transition-colors shadow-lg"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors shadow-lg"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-200">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-teal-100 hover:text-white transition-colors">
                  {t("home") || "Home"}
                </Link>
              </li>
              <li>
                <Link to="/hospitals" className="text-teal-100 hover:text-white transition-colors">
                  {t("hospitals") || "Hospitals"}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-teal-100 hover:text-white transition-colors">
                  {t("myAppointments") || "My Appointments"}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-teal-100 hover:text-white transition-colors">
                  {t("adminAccess") || "Admin Access"}
                </Link>
              </li>
              <li>
                <a href="#about" className="text-teal-100 hover:text-white transition-colors">
                  {t("aboutUs") || "About Us"}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-teal-100 hover:text-white transition-colors">
                  {t("faq") || "FAQ"}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-200">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-teal-100">Online Appointment Booking</li>
              <li className="text-teal-100">Queue Tracking</li>
              <li className="text-teal-100">Payment Integration</li>
              <li className="text-teal-100">Doctor Recommendations</li>
              <li className="text-teal-100">Multi-Language Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-200">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-teal-100">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-teal-300" />
                <span>123 Hospital Road, Colombo 07, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2 text-teal-100">
                <Phone className="w-4 h-4 flex-shrink-0 text-teal-300" />
                <a href="tel:+94112345678" className="hover:text-white transition-colors">
                  +94 11 234 5678
                </a>
              </li>
              <li className="flex items-center gap-2 text-teal-100">
                <Mail className="w-4 h-4 flex-shrink-0 text-teal-300" />
                <a href="mailto:info@ehealthconnect.lk" className="hover:text-white transition-colors">
                  info@ehealthconnect.lk
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-teal-700">
              <p className="text-xs text-teal-200">
                24/7 Customer Support Available
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-teal-700 text-center text-sm text-teal-200">
          <p>
            © {currentYear} e-Health Connect. All rights reserved. | 
            <a href="#privacy" className="hover:text-white ml-2 transition-colors">Privacy Policy</a> | 
            <a href="#terms" className="hover:text-white ml-2 transition-colors">Terms of Service</a>
          </p>
          <p className="mt-2 text-xs">
            Made with <Heart className="w-3 h-3 inline text-teal-400" /> for better healthcare in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}