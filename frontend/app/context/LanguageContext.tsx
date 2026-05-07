import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "si" | "ta";

interface Translations {
  [key: string]: {
    en: string;
    si: string;
    ta: string;
  };
}

const translations: Translations = {
  // Header
  appName: {
    en: "e-Health Connect",
    si: "ඊ-සෞඛ්‍ය සම්බන්ධතාව",
    ta: "மின்-சுகாதார இணைப்பு",
  },
  home: {
    en: "Home",
    si: "මුල් පිටුව",
    ta: "முகப்பு",
  },
  hospitals: {
    en: "Hospitals",
    si: "රෝහල්",
    ta: "மருத்துவமனைகள்",
  },
  myAppointments: {
    en: "My Appointments",
    si: "මගේ හමුවීම්",
    ta: "எனது சந்திப்புகள்",
  },
  login: {
    en: "Login",
    si: "ඇතුල් වන්න",
    ta: "உள்நுழை",
  },
  logout: {
    en: "Logout",
    si: "ඉවත් වන්න",
    ta: "வெளியேறு",
  },
  register: {
    en: "Register",
    si: "ලියාපදිංචි වන්න",
    ta: "பதிவு செய்",
  },
  adminDashboard: {
    en: "Admin Dashboard",
    si: "පරිපාලක පුවරුව",
    ta: "நிர்வாக பலகை",
  },
  // Home Page
  welcomeTitle: {
    en: "Book Your Hospital Appointment Online",
    si: "ඔබේ රෝහල් හමුවීම අන්තර්ජාලයෙන් වෙන්කරවා ගන්න",
    ta: "உங்கள் மருத்துவமனை சந்திப்பை ஆன்லைனில் பதிவு செய்யுங்கள்",
  },
  welcomeDesc: {
    en: "Skip the queues. Book appointments with your preferred doctors at top hospitals across Sri Lanka.",
    si: "පෝලිම් මග හරින්න. ශ්‍රී ලංකාවේ ප්‍රමුඛ රෝහල්වල ඔබට කැමති වෛද්‍යවරුන් සමඟ හමුවීම් වෙන්කරවා ගන්න.",
    ta: "வரிசைகளைத் தவிர்க்கவும். இலங்கை முழுவதும் உள்ள முன்னணி மருத்துவமனைகளில் உங்களுக்கு விருப்பமான மருத்துவர்களுடன் சந்திப்புகளை பதிவு செய்யுங்கள்.",
  },
  bookNow: {
    en: "Book Appointment Now",
    si: "දැන් හමුවීමක් වෙන්කරවා ගන්න",
    ta: "இப்போது சந்திப்பை பதிவு செய்யுங்கள்",
  },
  // Features
  easyBooking: {
    en: "Easy Booking",
    si: "පහසු වෙන්කිරීම",
    ta: "எளிய முன்பதிவு",
  },
  easyBookingDesc: {
    en: "Book appointments in just a few clicks",
    si: "ක්ලික් කිහිපයකින් හමුවීම් වෙන්කරවා ගන්න",
    ta: "சில கிளிக்குகளில் சந்திப்புகளை பதிவு செய்யுங்கள்",
  },
  realTimeQueue: {
    en: "Real-Time Queue",
    si: "තත්‍ය කාලීන පෝලිම",
    ta: "நேரலை வரிசை",
  },
  realTimeQueueDesc: {
    en: "Track your position in the queue live",
    si: "පෝලිමේ ඔබේ ස්ථානය සජීවීව නිරීක්ෂණය කරන්න",
    ta: "வரிசையில் உங்கள் நிலையை நேரலையில் கண்காணிக்கவும்",
  },
  securePayment: {
    en: "Secure Payment",
    si: "ආරක්ෂිත ගෙවීම",
    ta: "பாதுகாப்பான கட்டணம்",
  },
  securePaymentDesc: {
    en: "Multiple payment options available",
    si: "බහු ගෙවීම් විකල්ප තිබේ",
    ta: "பல கட்டண விருப்பங்கள் கிடைக்கின்றன",
  },
  multiLanguage: {
    en: "Multi-Language",
    si: "බහු භාෂා",
    ta: "பல மொழி",
  },
  multiLanguageDesc: {
    en: "Available in Sinhala, Tamil & English",
    si: "සිංහල, දෙමළ සහ ඉංග්‍රීසි යන භාෂාවලින්",
    ta: "சிங்களம், தமிழ் மற்றும் ஆங்கிலத்தில் கிடைக்கிறது",
  },
  // Login Page
  loginTitle: {
    en: "Login to Your Account",
    si: "ඔබේ ගිණුමට ඇතුල් වන්න",
    ta: "உங்கள் கணக்கில் உள்நுழையவும்",
  },
  email: {
    en: "Email",
    si: "විද්‍යුත් තැපෑල",
    ta: "மின்னஞ்சல்",
  },
  password: {
    en: "Password",
    si: "මුරපදය",
    ta: "கடவுச்சொல்",
  },
  dontHaveAccount: {
    en: "Don't have an account?",
    si: "ගිණුමක් නැද්ද?",
    ta: "கணக்கு இல்லையா?",
  },
  // Forgot Password
  forgotPassword: {
    en: "Forgot Password",
    si: "මුරපදය අමතා ගියා",
    ta: "கடவுச்சொல்லை மறந்துவிட்டீர்களா",
  },
  resetPassword: {
    en: "Reset Password",
    si: "මුරපදය යළි සකසන්න",
    ta: "கடவுச்சொல் மீட்டமைக்கவும்",
  },
  // Register Page
  registerTitle: {
    en: "Create Your Account",
    si: "ඔබේ ගිණුම සාදන්න",
    ta: "உங்கள் கணக்கை உருவாக்கவும்",
  },
  fullName: {
    en: "Full Name",
    si: "සම්පූර්ණ නම",
    ta: "முழு பெயர்",
  },
  phoneNumber: {
    en: "Phone Number",
    si: "දුරකථන අංකය",
    ta: "தொலைபேசி எண்",
  },
  alreadyHaveAccount: {
    en: "Already have an account?",
    si: "දැනටමත් ගිණුමක් තිබේද?",
    ta: "ஏற்கனவே கணக்கு உள்ளதா?",
  },
  // Hospital Selection
  selectHospital: {
    en: "Select a Hospital",
    si: "රෝහලක් තෝරන්න",
    ta: "மருத்துவமனையைத் தேர்ந்தெடுக்கவும்",
  },
  viewDoctors: {
    en: "View Doctors",
    si: "වෛද්‍යවරුන් බලන්න",
    ta: "மருத்துவர்களைப் பார்க்கவும்",
  },
  // Doctor Selection
  selectDoctor: {
    en: "Select a Doctor",
    si: "වෛද්‍යවරයෙකු තෝරන්න",
    ta: "மருத்துவரைத் தேர்ந்தெடுக்கவும்",
  },
  specialty: {
    en: "Specialty",
    si: "විශේෂඥ",
    ta: "சிறப்பு",
  },
  availableSlots: {
    en: "Available Slots",
    si: "ලබා ගත හැකි කාල සටහන්",
    ta: "கிடைக்கும் இடங்கள்",
  },
  fullyBooked: {
    en: "Fully Booked",
    si: "සම්පූර්ණයෙන් වෙන්කර ඇත",
    ta: "முழுவதும் முன்பதிவு செய்யப்பட்டது",
  },
  bookAppointment: {
    en: "Book Appointment",
    si: "හමුවීම වෙන්කරවා ගන්න",
    ta: "சந்திப்பை பதிவு செய்யுங்கள்",
  },
  // Appointment Form
  appointmentDetails: {
    en: "Appointment Details",
    si: "හමුවීමේ විස්තර",
    ta: "சந்திப்பு விவரங்கள்",
  },
  age: {
    en: "Age",
    si: "වයස",
    ta: "வயது",
  },
  symptoms: {
    en: "Symptoms / Reason for Visit",
    si: "රෝග ලක්ෂණ / සංචාරයට හේතුව",
    ta: "அறிகுறிகள் / வருகை காரணம்",
  },
  preferredDate: {
    en: "Preferred Date",
    si: "කැමති දිනය",
    ta: "விருப்பமான தேதி",
  },
  preferredTime: {
    en: "Preferred Time Slot",
    si: "කැමති කාල පරාසය",
    ta: "விருப்பமான நேர இடைவெளி",
  },
  paymentMethod: {
    en: "Payment Method",
    si: "ගෙවීම් ක්‍රමය",
    ta: "கட்டண முறை",
  },
  continueToPayment: {
    en: "Continue to Payment",
    si: "ගෙවීමට ඉදිරියට යන්න",
    ta: "கட்டணத்திற்கு தொடரவும்",
  },
  // Dashboard
  upcomingAppointments: {
    en: "Upcoming Appointments",
    si: "ඉදිරි හමුවීම්",
    ta: "வரவிருக்கும் சந்திப்புகள்",
  },
  appointmentHistory: {
    en: "Appointment History",
    si: "හමුවීම් ඉතිහාසය",
    ta: "சந்திப்பு வரலாறு",
  },
  date: {
    en: "Date",
    si: "දිනය",
    ta: "தேதி",
  },
  time: {
    en: "Time",
    si: "වේලාව",
    ta: "நேரம்",
  },
  doctor: {
    en: "Doctor",
    si: "වෛද්‍යවරයා",
    ta: "மருத்துவர்",
  },
  hospital: {
    en: "Hospital",
    si: "රෝහල",
    ta: "மருத்துவமனை",
  },
  status: {
    en: "Status",
    si: "තත්ත්වය",
    ta: "நிலை",
  },
  trackQueue: {
    en: "Track Queue",
    si: "පෝලිම නිරීක්ෂණය",
    ta: "வரிசையைக் கண்காணிக்கவும்",
  },
  cancel: {
    en: "Cancel",
    si: "අවලංගු කරන්න",
    ta: "ரத்து செய்",
  },
  // Queue Tracking
  queueStatus: {
    en: "Queue Status",
    si: "පෝලිම් තත්ත්වය",
    ta: "வரிசை நிலை",
  },
  currentToken: {
    en: "Currently Serving",
    si: "දැනට සේවය කරන",
    ta: "தற்போது சேவை செய்யப்படுகிறது",
  },
  yourToken: {
    en: "Your Token",
    si: "ඔබේ ටෝකනය",
    ta: "உங்கள் டோக்கன்",
  },
  estimatedWait: {
    en: "Estimated Wait Time",
    si: "ඇස්තමේන්තුගත පොරොත්තු කාලය",
    ta: "மதிப்பிடப்பட்ட காத்திருப்பு நேரம்",
  },
  minutes: {
    en: "minutes",
    si: "මිනිත්තු",
    ta: "நிமிடங்கள்",
  },
  // Admin Dashboard
  totalAppointments: {
    en: "Total Appointments",
    si: "මුළු හමුවීම්",
    ta: "மொத்த சந்திப்புகள்",
  },
  todayAppointments: {
    en: "Today's Appointments",
    si: "අද හමුවීම්",
    ta: "இன்றைய சந்திப்புகள்",
  },
  totalPatients: {
    en: "Total Patients",
    si: "මුළු රෝගීන්",
    ta: "மொத்த நோயாளிகள்",
  },
  revenue: {
    en: "Revenue",
    si: "ආදායම",
    ta: "வருவாய்",
  },
  // Common
  search: {
    en: "Search",
    si: "සොයන්න",
    ta: "தேடு",
  },
  submit: {
    en: "Submit",
    si: "ඉදිරිපත් කරන්න",
    ta: "சமர்ப்பிக்கவும்",
  },
  close: {
    en: "Close",
    si: "වසන්න",
    ta: "மூடு",
  },
  loading: {
    en: "Loading...",
    si: "පූරණය වෙමින්...",
    ta: "ஏற்றுகிறது...",
  },
  error: {
    en: "Error",
    si: "දෝෂයක්",
    ta: "பிழை",
  },
  success: {
    en: "Success",
    si: "සාර්ථකයි",
    ta: "வெற்றி",
  },
  confirmed: {
    en: "Confirmed",
    si: "තහවුරු කළා",
    ta: "உறுதிப்படுத்தப்பட்டது",
  },
  pending: {
    en: "Pending",
    si: "පොරොත්තුව",
    ta: "நிலுவையில்",
  },
  cancelled: {
    en: "Cancelled",
    si: "අවලංගු කළා",
    ta: "ரத்து செய்யப்பட்டது",
  },
  completed: {
    en: "Completed",
    si: "සම්පූර්ණ කළා",
    ta: "முடிந்தது",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
