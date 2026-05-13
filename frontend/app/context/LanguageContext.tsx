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
  getStarted: {
    en: "Get Started",
    si: "ආරම්භ කරන්න",
    ta: "தொடங்கு",
  },
  getAIRecommendations: {
    en: "Get AI Recommendations",
    si: "AI නිර්දේශ ලබා ගන්න",
    ta: "AI பரிந்துரைகளைப் பெறவும்",
  },
  expertConsultations: {
    en: "Expert Consultations",
    si: "වෘත්තීය සම්බන්ධතා",
    ta: "திறமையான ஆலோசனைகள்",
  },
  professionalMedicalAdvice: {
    en: "Professional medical advice",
    si: "වෘත්තීය වෛද්‍ය උපදෙස්",
    ta: "தொழில்முறை மருத்துவ ஆலோசனை",
  },
  professionalMedicalTeam: {
    en: "Professional Medical Team",
    si: "වෘත්තීය වෛද්‍ය කණ්ඩායම",
    ta: "தொழில்முறை மருத்துவ குழு",
  },
  experiencedHealthcareExperts: {
    en: "Experienced healthcare experts",
    si: "පළපුරුදු සෞඛ්‍ය විශේෂඥයින්",
    ta: "அனுபவமிக்க சுகாதார நிபுணர்கள்",
  },
  modernFacilities: {
    en: "Modern Facilities",
    si: "ආධುನික පහසුකම්",
    ta: "நவீன வசதிகள்",
  },
  stateOfTheArtEquipment: {
    en: "State-of-the-art equipment",
    si: "අවසාන තත්ත්වයේ උපකරණ",
    ta: "முன்னணி تجهيزات",
  },
  whyChooseTitle: {
    en: "Why Choose e-Health Connect?",
    si: "e-Health Connect තෝරා ගන්නේ ඇයි?",
    ta: "e-Health Connect ஐ ஏன் தேர்வு செய்ய வேண்டும்?",
  },
  ourImpactTitle: {
    en: "Our Impact in Numbers",
    si: "අපගේ සංඛ්‍යාවලින් බලපෑම",
    ta: "எண்ணிக்கைகளில் எங்கள் தாக்கம்",
  },
  patientsServed: {
    en: "Patients Served",
    si: "සේවය ලබාදුන් රෝගීන්",
    ta: "சேவை பெற்ற நோயாளிகள்",
  },
  expertDoctors: {
    en: "Expert Doctors",
    si: "පළපුරුදු වෛද්‍යවරු",
    ta: "திறமையான மருத்துவர்கள்",
  },
  hospitalsStat: {
    en: "Hospitals",
    si: "රෝහල්",
    ta: "மருத்துவமனைகள்",
  },
  secureAndSafe: {
    en: "Secure & Safe",
    si: "ආරක්ෂිත සහ සුරක්ෂිත",
    ta: "பாதுகாப்பான மற்றும் பாதுகாப்பான",
  },
  smartSolutions: {
    en: "Smart Solutions",
    si: "දක්ෂ විසඳුම්",
    ta: "உள்ளுணர்வு தீர்வுகள்",
  },
  aiPoweredHealthcare: {
    en: "AI-Powered Healthcare",
    si: "AI සාධක වූ සෞඛ්‍ය සේවා",
    ta: "AI இயக்கும் சுகாதார சேவை",
  },
  aiDescription: {
    en: "Not sure which doctor to see? Our AI analyzes your symptoms and recommends the best specialists.",
    si: "කතාකරන වෛද්‍යවරයා තෝරා ගැනීමට නොදැන සිටීද? අපගේ AI ඔබේ රෝග ලක්ෂණ විශ්ලේෂණය කර හොඳම විශේෂඥයින් නිර්දේශ කරයි.",
    ta: "எந்த மருத்துவரைக் காண வேண்டும் என்று உறுதியாக இல்லையென்றால்? எங்கள் AI உங்கள் அறிகுறிகளை பகுப்பாய்வு செய்து சிறந்த நிபுணர்களை பரிந்துரைக்கிறது.",
  },
  intelligentSymptomAnalysis: {
    en: "Intelligent symptom analysis",
    si: "බුද්ධිමත් රෝග ලක්ෂණ විශ්ලේෂණය",
    ta: "ஆய்வான அறிகுறி பகுப்பாய்வு",
  },
  personalizedDoctorMatching: {
    en: "Personalized doctor matching",
    si: "පෞද්ගලිකව වෛද්‍ය තෝරා ගැනීම",
    ta: "தனிப்பட்ட மருத்துவர் பொருத்தம்",
  },
  instantRecommendations: {
    en: "Instant recommendations",
    si: "තත්ක්ෂණික නිර්දේශ",
    ta: "உடனடி பரிந்துரைகள்",
  },
  qrCodeScanner: {
    en: "QR Code Scanner",
    si: "QR කේත ස්කෑනර්",
    ta: "QR குறியீட்டு ஸ்கேனர்",
  },
  qrDescription: {
    en: "Healthcare providers can instantly access patient medical records by scanning QR codes.",
    si: "සෞඛ්‍ය සපයන්නන්ට QR කේත ස්කෑන් කිරීමෙන් රෝගියාගේ වෛද්‍ය වාර්තා ඉක්මනින් ලබා ගත හැක.",
    ta: "மருத்துவ சேவை வழங்குநர்கள் QR குறியீடுகளை ஸ்கேன் செய்வதன் மூலம் உடனடியாக நோயாளி மருத்துவ பதிவுகளை அணுக முடியும்.",
  },
  quickCameraBasedScanning: {
    en: "Quick camera-based scanning",
    si: "ඉක්මන් කැමරා මත පදනම් වූ ස්කෑන කිරීම",
    ta: "விளைவான கேமரா அடிப்படையிலான ஸ்கேனிங்",
  },
  secureEncryptedAccess: {
    en: "Secure & encrypted access",
    si: "ආරක්ෂිත සහ එනක්‍රිප්ට් කරන ලද ප්‍රවේශය",
    ta: "பாதுகாப்பான மற்றும் குறியாக்கப்பட்ட அணுகல்",
  },
  instantMedicalRecordRetrieval: {
    en: "Instant medical record retrieval",
    si: "තත්ක්ෂණික වෛද්‍ය වාර්තා ලබා ගැනීම",
    ta: "உடனடி மருத்துவ பதிவுகளைக் கிடைக்கும்",
  },
  openQRScanner: {
    en: "Open QR Scanner",
    si: "QR ස්කෑනර් විවෘත කරන්න",
    ta: "QR ஸ்கேனரை திறக்கவும்",
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
