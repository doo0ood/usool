import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE ────────────────────────────────────────────────────────────────
const supabase = createClient(
  "https://tkwlrbenttxosgolitjf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrd2xyYmVudHR4b3Nnb2xpdGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDgxNzksImV4cCI6MjA5MjQyNDE3OX0.kS8c7hbVIdwWU7Uppppcz2FHfTqZ1NkAdhj6_CZoDAI"
);

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const UAE = { code: "AE", name: "UAE", flag: "🇦🇪" };

const categories = [
  { id: "healthcare", name: "Healthcare", desc: "Medical supplies & equipment" },
  { id: "packaging", name: "Packaging", desc: "Boxes, labels & materials" },
  { id: "textiles", name: "Textiles & Apparel", desc: "Fabric, garments & accessories" },
  { id: "machinery", name: "Machinery", desc: "Industrial & manufacturing equipment" },
  { id: "agriculture", name: "Agriculture", desc: "Produce, seeds & equipment" },
  { id: "electronics", name: "Electronics", desc: "Components & devices" },
];

const products = [
  { id: "1", title: "Industrial Steel Pipes - Grade A", category: "machinery", price: "$12 - $45", moq: "500 pieces", supplier: "Gulf Steel Industries", supplierId: "s1", country: UAE, rating: 4.8, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400", verified: true },
  { id: "2", title: "Medical Surgical Masks - N95", category: "healthcare", price: "$0.30 - $1.50", moq: "10,000 pieces", supplier: "MedGulf Supplies", supplierId: "s4", country: UAE, rating: 4.7, image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400", verified: true },
  { id: "3", title: "LED Panel Lights - Commercial Grade", category: "electronics", price: "$15 - $60", moq: "200 units", supplier: "Noor Electronics LLC", supplierId: "s3", country: UAE, rating: 4.6, image: "https://images.unsplash.com/photo-1565814329452-e1432bc237d1?w=400", verified: false },
  { id: "4", title: "Cotton Fabric Rolls - Premium", category: "textiles", price: "$3 - $12/m", moq: "1,000 meters", supplier: "Khaleeji Textiles", supplierId: "s4", country: UAE, rating: 4.7, image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400", verified: true },
  { id: "5", title: "CNC Milling Machine - 5 Axis", category: "machinery", price: "$25,000 - $80,000", moq: "1 unit", supplier: "Precision Gulf Machinery", supplierId: "s5", country: UAE, rating: 4.5, image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400", verified: true },
  { id: "6", title: "Corrugated Packaging Boxes", category: "packaging", price: "$0.50 - $3", moq: "5,000 pieces", supplier: "Pack Gulf Industries", supplierId: "s2", country: UAE, rating: 4.2, image: "https://images.unsplash.com/photo-1607166452427-7e4477c3a9ed?w=400", verified: false },
  { id: "7", title: "Organic Fertilizers", category: "agriculture", price: "$20 - $80/ton", moq: "5 tons", supplier: "Green Gulf Agri", supplierId: "s3", country: UAE, rating: 4.6, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400", verified: true },
  { id: "8", title: "Industrial Chemical Solvents", category: "healthcare", price: "$50 - $200/barrel", moq: "10 barrels", supplier: "Gulf Chem Solutions", supplierId: "s7", country: UAE, rating: 4.3, image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400", verified: true },
];

const suppliers = [
  { id: "s1", name: "Gulf Steel Industries", initials: "GS", country: UAE, verified: true, description: "Premium steel products and industrial solutions for UAE businesses since 1995.", stats: { products: 245, responseRate: "98%", yearsActive: 28, employees: "500+" }, certifications: ["ISO 9001", "ISO 14001"], category: "Machinery", emirate: "Dubai", moq: "500 units", lead_time: "2 weeks" },
  { id: "s3", name: "Noor Electronics LLC", initials: "NE", country: UAE, verified: false, description: "Commercial LED lighting and smart building solutions across the UAE.", stats: { products: 890, responseRate: "92%", yearsActive: 10, employees: "150+" }, certifications: ["CE", "RoHS"], category: "Electronics", emirate: "Abu Dhabi", moq: "200 units", lead_time: "1 week" },
  { id: "s4", name: "Khaleeji Textiles", initials: "KT", country: UAE, verified: true, description: "UAE's premier textile supplier with a wide range of premium fabric and apparel.", stats: { products: 180, responseRate: "96%", yearsActive: 12, employees: "300+" }, certifications: ["ISO 9001", "OEKO-TEX"], category: "Textiles", emirate: "Sharjah", moq: "1000 meters", lead_time: "3 weeks" },
];

const testimonials = [
  { name: "Ahmed Al-Rashid", role: "CEO, Gulf Trading Co.", country: "UAE", text: "Usool transformed how we source materials. Direct access to verified suppliers saved us months of searching." },
  { name: "Fatima Al-Saud", role: "Procurement Manager", country: "UAE", text: "We reduced sourcing time by 60%. The supplier quality on Usool is outstanding." },
  { name: "Khalid Al-Thani", role: "Operations Director", country: "UAE", text: "Finding reliable B2B partners used to be challenging. Usool made it effortless." },
];

const dashboardStats = { activeInquiries: 12, pendingQuotes: 8, newMessages: 5, savedProducts: 24 };
const inquiries = [
  { id: "INQ-001", product: "Industrial Steel Pipes", supplier: "Gulf Steel Industries", date: "2026-03-01", status: "pending", quantity: "500 units" },
  { id: "INQ-002", product: "Medical Masks N95", supplier: "MedGulf Supplies", date: "2026-02-28", status: "replied", quantity: "10,000 units" },
  { id: "INQ-003", product: "LED Panel Lights", supplier: "Noor Electronics LLC", date: "2026-02-25", status: "accepted", quantity: "1,000 units" },
  { id: "INQ-004", product: "Cotton Fabric Rolls", supplier: "Khaleeji Textiles", date: "2026-02-20", status: "expired", quantity: "2,000 meters" },
];
const mockMessages = [
  { id: "m1", from: "Gulf Steel Industries", preview: "Thank you for your inquiry. We can offer a 10% discount on bulk orders over 1,000 units.", time: "2 hours ago", unread: true },
  { id: "m2", from: "MedGulf Supplies", preview: "Your order has been confirmed and will be dispatched within 3 business days.", time: "5 hours ago", unread: true },
  { id: "m3", from: "Noor Electronics LLC", preview: "We have updated pricing for bulk orders. Please review the attached catalog.", time: "1 day ago", unread: false },
];

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg: "#FAFAFA",
  bgWhite: "#FFFFFF",
  text: "#18181B",
  muted: "#71717A",
  placeholder: "#A1A1AA",
  border: "#E4E4E7",
  purple: "#4C3A8F",
  purpleLight: "#F0EDF9",
  purpleBorder: "#DDD6FE",
  gold: "#B89B5E",
  goldLight: "#FBF5E9",
  goldBorder: "#E9D5A0",
  success: "#16A34A",
  successLight: "#F0FDF4",
  warning: "#D97706",
  warningLight: "#FFFBEB",
  danger: "#DC2626",
  dangerLight: "#FEF2F2",
};

// ─── CONTEXTS ────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);
const NavContext = createContext(null);
const LangContext = createContext(null);
function useAuth() { return useContext(AuthContext); }
function useNav() { return useContext(NavContext); }
function useLang() { return useContext(LangContext); }

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const translations = {
  en: {
    dir: "ltr",
    home: "Home", browse: "Browse", suppliers: "Suppliers", dashboard: "Dashboard",
    admin: "Admin", login: "Log in", getStarted: "Get started", signOut: "Sign out",
    heroTitle1: "The smarter way to find", heroTitle2: "UAE suppliers",
    heroSub: "Connect with verified suppliers across healthcare, packaging, textiles, machinery, agriculture and electronics.",
    findSuppliers: "Find suppliers", joinSupplier: "Join as supplier",
    browseByIndustry: "Browse by industry", industriesSub: "Six industries. Hundreds of verified UAE suppliers ready to trade.",
    trustedSuppliers: "Trusted UAE businesses", trustedSub: "Every supplier is reviewed before appearing on Usool.",
    howItWorks: "How it works", simpleStart: "Simple from start to deal",
    step1: "Browse suppliers", step1desc: "Search verified UAE suppliers by industry, emirate, or keyword.",
    step2: "Send an inquiry", step2desc: "Contact suppliers directly. Request quotes and catalog details.",
    step3: "Close the deal", step3desc: "Negotiate terms and build long-term trade relationships.",
    readyToGrow: "Ready to grow your business?", ctaSub: "Join Usool today. Free to browse, free to contact.",
    signIn: "Sign in", createAccount: "Create account",
    welcomeBack: "Welcome back", signInSub: "Sign in to your Usool account",
    joinFree: "Create your account", joinSub: "Start connecting with UAE suppliers today",
    email: "Email address", password: "Password", fullName: "Full name",
    iAma: "I am a", buyer: "Buyer", supplier: "Supplier",
    noAccount: "Don't have an account?", alreadyHave: "Already have an account?",
    overview: "Overview", myInquiries: "Inquiries", messages: "Messages",
    myProducts: "Products", myProfile: "Profile", settings: "Settings",
    adminPanel: "Admin", manageUsool: "Manage your Usool platform",
    allUsers: "Users", allMessages: "Messages", suppliers_tab: "Suppliers",
    approve: "Approve", reject: "Reject", markVerified: "Mark verified", removeVerified: "Remove verified",
    saveProfile: "Save changes", uploadLogo: "Upload logo", changeLogo: "Change logo",
    companyInfo: "Company details", pendingApproval: "Pending review",
    active: "Active", verified: "Verified",
    contactSupplier: "Contact supplier", requestCatalog: "Request catalog",
    sendMessage: "Send message", cancel: "Cancel", subject: "Subject", message: "Message",
    messageSent: "Message sent", messageSentSub: "The supplier will get back to you shortly.",
    about: "About", productsTab: "Products", noProducts: "No products listed yet.",
    backToSuppliers: "Back to suppliers", backToProducts: "Back to products",
    registerAsSupplier: "Register as supplier", submitApplication: "Submit application",
    applicationSubmitted: "Application submitted", applicationSub: "Your profile is under review. You'll be notified once approved.",
    backToHome: "Back to home",
  },
  ar: {
    dir: "rtl",
    home: "الرئيسية", browse: "تصفح", suppliers: "الموردون", dashboard: "لوحتي",
    admin: "الإدارة", login: "تسجيل الدخول", getStarted: "ابدأ الآن", signOut: "تسجيل الخروج",
    heroTitle1: "الطريقة الأذكى للعثور على", heroTitle2: "موردين في الإمارات",
    heroSub: "تواصل مع موردين موثوقين في الرعاية الصحية والتغليف والمنسوجات والآلات والزراعة والإلكترونيات.",
    findSuppliers: "ابحث عن موردين", joinSupplier: "انضم كمورد",
    browseByIndustry: "تصفح حسب الصناعة", industriesSub: "ست صناعات. مئات الموردين الإماراتيين الموثوقين.",
    trustedSuppliers: "شركات إماراتية موثوقة", trustedSub: "كل مورد يخضع للمراجعة قبل الظهور على أصول.",
    howItWorks: "كيف يعمل", simpleStart: "بسيط من البداية حتى الصفقة",
    step1: "تصفح الموردين", step1desc: "ابحث عن موردين إماراتيين موثوقين حسب الصناعة أو الإمارة أو الكلمة المفتاحية.",
    step2: "أرسل استفساراً", step2desc: "تواصل مع الموردين مباشرة. اطلب عروض الأسعار وتفاصيل الكتالوج.",
    step3: "أغلق الصفقة", step3desc: "تفاوض على الشروط وابنِ علاقات تجارية طويلة الأمد.",
    readyToGrow: "هل أنت مستعد لتنمية أعمالك؟", ctaSub: "انضم إلى أصول اليوم. مجاني للتصفح والتواصل.",
    signIn: "تسجيل الدخول", createAccount: "إنشاء حساب",
    welcomeBack: "مرحباً بعودتك", signInSub: "سجل دخولك إلى حسابك في أصول",
    joinFree: "أنشئ حسابك", joinSub: "ابدأ التواصل مع الموردين الإماراتيين اليوم",
    email: "البريد الإلكتروني", password: "كلمة المرور", fullName: "الاسم الكامل",
    iAma: "أنا", buyer: "مشترٍ", supplier: "مورد",
    noAccount: "ليس لديك حساب؟", alreadyHave: "لديك حساب بالفعل؟",
    overview: "نظرة عامة", myInquiries: "الاستفسارات", messages: "الرسائل",
    myProducts: "المنتجات", myProfile: "ملفي", settings: "الإعدادات",
    adminPanel: "الإدارة", manageUsool: "إدارة منصة أصول",
    allUsers: "المستخدمون", allMessages: "الرسائل", suppliers_tab: "الموردون",
    approve: "موافقة", reject: "رفض", markVerified: "تحقق", removeVerified: "إزالة التحقق",
    saveProfile: "حفظ التغييرات", uploadLogo: "رفع الشعار", changeLogo: "تغيير الشعار",
    companyInfo: "تفاصيل الشركة", pendingApproval: "قيد المراجعة",
    active: "نشط", verified: "موثوق",
    contactSupplier: "تواصل مع المورد", requestCatalog: "طلب الكتالوج",
    sendMessage: "إرسال رسالة", cancel: "إلغاء", subject: "الموضوع", message: "الرسالة",
    messageSent: "تم إرسال الرسالة", messageSentSub: "سيتواصل معك المورد قريباً.",
    about: "عن الشركة", productsTab: "المنتجات", noProducts: "لا توجد منتجات حتى الآن.",
    backToSuppliers: "العودة للموردين", backToProducts: "العودة للمنتجات",
    registerAsSupplier: "التسجيل كمورد", submitApplication: "تقديم الطلب",
    applicationSubmitted: "تم تقديم الطلب", applicationSub: "ملفك قيد المراجعة. ستتلقى إشعاراً عند الموافقة.",
    backToHome: "العودة للرئيسية",
  }
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #FAFAFA; color: #18181B; -webkit-font-smoothing: antialiased; }
  a { text-decoration: none; color: inherit; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .marquee-track { animation: marquee 35s linear infinite; display: flex; white-space: nowrap; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 99px; }
  input:focus, textarea:focus, select:focus { outline: 1.5px solid #4C3A8F; outline-offset: 0; }
  * { transition: border-color 0.15s, background-color 0.15s, color 0.15s; }

  @media (max-width: 768px) {
    .nav-links-desktop { display: none !important; }
    .nav-search-desktop { display: none !important; }
    .hero-section { padding: 56px 20px 48px !important; }
    .hero-h1 { font-size: 28px !important; letter-spacing: -0.5px !important; }
    .hero-actions { flex-direction: column !important; }
    .hero-actions button { width: 100% !important; }
    .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
    .two-col { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr 1fr !important; }
    .hide-mobile { display: none !important; }
    .page-pad { padding: 48px 20px !important; }
    .products-layout { flex-direction: column !important; }
    .products-sidebar { width: 100% !important; }
    .products-grid { grid-template-columns: repeat(2,1fr) !important; }
    .dashboard-layout { flex-direction: column !important; }
    .dashboard-sidebar { width: 100% !important; flex-direction: row !important; overflow-x: auto !important; border-right: none !important; border-bottom: 0.5px solid #E4E4E7 !important; padding: 8px !important; }
    .dashboard-sidebar button { white-space: nowrap !important; flex-shrink: 0 !important; }
    .dash-stats { grid-template-columns: repeat(2,1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
    .mobile-nav-bottom { display: flex !important; }
    .supplier-profile-grid { grid-template-columns: 1fr !important; }
    .profile-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (max-width: 480px) {
    .products-grid { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
  }
`;

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Spinner({ size = 18 }) {
  return <div style={{ width: size, height: size, border: `1.5px solid ${T.purpleBorder}`, borderTopColor: T.purple, borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", flexShrink: 0 }} />;
}

function Badge({ children, variant = "default" }) {
  const styles = {
    default: { bg: T.purpleLight, color: T.purple, border: T.purpleBorder },
    gold: { bg: T.goldLight, color: T.gold, border: T.goldBorder },
    success: { bg: T.successLight, color: T.success, border: "#BBF7D0" },
    warning: { bg: T.warningLight, color: T.warning, border: "#FDE68A" },
    danger: { bg: T.dangerLight, color: T.danger, border: "#FECACA" },
    gray: { bg: "#F4F4F5", color: "#71717A", border: T.border },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6, background: s.bg, color: s.color, border: `0.5px solid ${s.border}`, letterSpacing: 0.1 }}>
      {children}
    </span>
  );
}

function Button({ children, onClick, variant = "primary", size = "md", disabled = false, style = {}, type = "button" }) {
  const sizes = { sm: { padding: "6px 14px", fontSize: 12 }, md: { padding: "8px 18px", fontSize: 13 }, lg: { padding: "10px 24px", fontSize: 14 } };
  const variants = {
    primary: { background: T.purple, color: "#fff", border: "none" },
    secondary: { background: T.bgWhite, color: T.text, border: `0.5px solid ${T.border}` },
    ghost: { background: "transparent", color: T.muted, border: "none" },
    danger: { background: T.dangerLight, color: T.danger, border: `0.5px solid #FECACA` },
    outline: { background: "transparent", color: T.purple, border: `0.5px solid ${T.purpleBorder}` },
  };
  const s = sizes[size];
  const v = variants[variant];
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...s, ...v, borderRadius: 9, fontFamily: "Inter, sans-serif", fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, display: "inline-flex", alignItems: "center", gap: 6, letterSpacing: -0.1, ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = "0.85"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "", required = false, style = {} }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6 }}>{label}{required && <span style={{ color: T.danger }}> *</span>}</label>}
      {type === "textarea"
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4}
            style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", resize: "vertical", background: T.bgWhite, color: T.text, lineHeight: 1.6, ...style }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", background: T.bgWhite, color: T.text, ...style }} />}
    </div>
  );
}

function Card({ children, style = {}, onClick, hover = false }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{ background: T.bgWhite, border: `0.5px solid ${hov ? "#C4B5FD" : T.border}`, borderRadius: 16, padding: 20, cursor: onClick ? "pointer" : "default", ...style }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "0.5px", background: T.border }} />;
}

function Alert({ msg, type = "error" }) {
  if (!msg) return null;
  const v = type === "error" ? { bg: T.dangerLight, border: "#FECACA", color: T.danger } : { bg: T.successLight, border: "#BBF7D0", color: T.success };
  return <div style={{ background: v.bg, border: `0.5px solid ${v.border}`, color: v.color, padding: "10px 14px", borderRadius: 9, fontSize: 13, marginBottom: 14 }}>{msg}</div>;
}

function InitialsAvatar({ name, size = 40 }) {
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: T.purpleLight, border: `0.5px solid ${T.purpleBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.3, fontWeight: 600, color: T.purple, flexShrink: 0, fontFamily: "Inter, sans-serif" }}>
      {initials}
    </div>
  );
}

// ─── LANGUAGE PROVIDER ───────────────────────────────────────────────────────
function LangProvider({ children }) {
  const [lang, setLang] = useState(() => { try { return localStorage.getItem("usool-lang") || "en"; } catch { return "en"; } });
  const t = translations[lang];
  function toggleLang() {
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    try { localStorage.setItem("usool-lang", next); } catch {}
    document.documentElement.dir = translations[next].dir;
    document.documentElement.lang = next;
  }
  useEffect(() => { document.documentElement.dir = t.dir; document.documentElement.lang = lang; }, [lang]);
  return <LangContext.Provider value={{ lang, t, toggleLang }}>{children}</LangContext.Provider>;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { user, profile, signOut } = useAuth();
  const { go } = useNav();
  const { lang, t, toggleLang } = useLang();
  const [search, setSearch] = useState("");

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,250,0.9)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `0.5px solid ${T.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 52, gap: 20 }}>

        {/* Logo */}
        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 26, height: 26, background: T.purple, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>U</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: T.text, letterSpacing: -0.3, fontFamily: "Inter, sans-serif" }}>Usool</span>
        </button>

        {/* Search */}
        <div className="nav-search-desktop" style={{ flex: 1, maxWidth: 320, position: "relative" }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: T.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && search.trim()) go("products", { search }); }}
            placeholder="Search suppliers, products..."
            style={{ width: "100%", padding: "7px 12px 7px 30px", borderRadius: 8, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", background: T.bgWhite, color: T.text }} />
        </div>

        {/* Nav links */}
        <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
          {[[t.home, "home"], [t.browse, "products"], [t.suppliers, "suppliers"], [t.dashboard, "dashboard"], ...(profile?.role === "admin" ? [[t.admin, "admin"]] : [])].map(([label, page]) => (
            <button key={page} onClick={() => go(page)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 7, fontSize: 13, color: T.muted, fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              onMouseEnter={e => e.currentTarget.style.color = T.text}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}>
              {label}
            </button>
          ))}
          <div style={{ width: "0.5px", height: 16, background: T.border, margin: "0 6px" }} />
          <button onClick={toggleLang} style={{ background: "none", border: `0.5px solid ${T.border}`, cursor: "pointer", padding: "4px 10px", borderRadius: 6, fontSize: 12, color: T.muted, fontFamily: "Inter, sans-serif" }}>
            {lang === "en" ? "عربي" : "EN"}
          </button>
          <div style={{ width: "0.5px", height: 16, background: T.border, margin: "0 6px" }} />
          {user ? (
            <button onClick={signOut} style={{ background: "none", border: `0.5px solid ${T.border}`, cursor: "pointer", padding: "5px 12px", borderRadius: 7, fontSize: 13, color: T.muted, fontFamily: "Inter, sans-serif" }}>{t.signOut}</button>
          ) : (
            <>
              <button onClick={() => go("auth")} style={{ background: "none", border: "none", cursor: "pointer", padding: "5px 10px", fontSize: 13, color: T.muted, fontFamily: "Inter, sans-serif" }}>{t.login}</button>
              <button onClick={() => go("auth")} style={{ background: T.purple, border: "none", cursor: "pointer", padding: "6px 16px", borderRadius: 8, fontSize: 13, color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{t.getStarted}</button>
            </>
          )}
        </div>

        {/* Mobile right */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }} className="nav-mobile-right">
          <button onClick={toggleLang} style={{ background: "none", border: `0.5px solid ${T.border}`, cursor: "pointer", padding: "4px 10px", borderRadius: 6, fontSize: 12, color: T.muted }}>
            {lang === "en" ? "عربي" : "EN"}
          </button>
          <button onClick={() => go(user ? "dashboard" : "auth")} style={{ background: T.purple, border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: 7, fontSize: 12, color: "#fff", fontWeight: 500 }}>
            {user ? t.dashboard : t.getStarted}
          </button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="mobile-nav-bottom" style={{ display: "none", borderTop: `0.5px solid ${T.border}`, padding: "6px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-around", maxWidth: 480, margin: "0 auto" }}>
          {[[t.home, "home"], [t.browse, "products"], [t.suppliers, "suppliers"], [t.dashboard, "dashboard"]].map(([label, page]) => (
            <button key={page} onClick={() => go(page)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 8px", color: T.muted, fontSize: 10, fontFamily: "Inter, sans-serif" }}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const { go } = useNav();
  return (
    <footer style={{ background: T.text, color: "#fff", marginTop: 0 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 32px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 24, height: 24, background: T.purple, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>U</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.3 }}>Usool</span>
            </div>
            <p style={{ fontSize: 13, color: "#71717A", lineHeight: 1.7, maxWidth: 240 }}>UAE's B2B supplier marketplace. Connecting verified businesses across six industries.</p>
          </div>
          {[
            { title: "Platform", links: ["Browse suppliers", "All products", "Categories", "Trending"] },
            { title: "Business", links: ["Register as supplier", "Supplier hub", "Verified program", "Trade assurance"] },
            { title: "Company", links: ["About Usool", "Contact us", "Privacy policy", "Terms of service"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 500, color: "#52525B", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 14 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {col.links.map(l => <span key={l} style={{ fontSize: 13, color: "#71717A", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#71717A"}>{l}</span>)}
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24 }}>
          <span style={{ fontSize: 12, color: "#52525B" }}>© 2026 Usool. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "#52525B" }}>English | العربية</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: T.bgWhite, border: `0.5px solid ${hov ? "#C4B5FD" : T.border}`, borderRadius: 16, overflow: "hidden", cursor: "pointer" }}>
      <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#F4F4F5" }}>
        <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.03)" : "scale(1)", transition: "transform 0.4s ease" }} loading="lazy" />
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{product.title}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.purple, marginBottom: 8, letterSpacing: -0.2 }}>{product.price}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: T.muted, marginBottom: 10 }}>
          <span>MOQ: {product.moq}</span>
          <span style={{ color: T.gold }}>★ {product.rating}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.placeholder, paddingTop: 10, borderTop: `0.5px solid ${T.border}` }}>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.supplier}</span>
          {product.verified && <Badge variant="success">Verified</Badge>}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT MODAL ────────────────────────────────────────────────────────────
function ContactModal({ supplier, onClose }) {
  const { user, profile } = useAuth();
  const { go } = useNav();
  const { t } = useLang();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!supplier) return null;

  async function handleSend() {
    if (!user) { onClose(); go("auth"); return; }
    if (!message.trim()) { setError("Please write a message."); return; }
    setSending(true); setError("");
    const { error: err } = await supabase.from("messages").insert({
      sender_id: user.id, supplier_id: supplier.id,
      sender_name: profile?.full_name || user.email,
      sender_company: profile?.company_name || "",
      sender_email: user.email,
      content: subject ? `[${subject}]\n\n${message}` : message,
      from_role: "buyer", read: false,
    });
    setSending(false);
    if (err) setError("Failed to send. Please try again.");
    else setSent(true);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn .2s ease" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: T.bgWhite, borderRadius: 18, padding: 28, width: "100%", maxWidth: 460, border: `0.5px solid ${T.border}`, animation: "fadeUp .2s ease" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ width: 48, height: 48, background: T.successLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.success} strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 6 }}>{t.messageSent}</div>
            <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>{t.messageSentSub}</div>
            <Button onClick={onClose}>{t.cancel}</Button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 2 }}>{t.contactSupplier}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{supplier.company_name || supplier.name}</div>
              </div>
              <button onClick={onClose} style={{ background: "#F4F4F5", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: 8, fontSize: 16, color: T.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
            {!user && <Alert msg="You need to sign in to send messages." type="error" />}
            {error && <Alert msg={error} type="error" />}
            <Input label={t.subject} value={subject} onChange={setSubject} placeholder="e.g. Quote request for bulk order" />
            <Input label={t.message} value={message} onChange={setMessage} type="textarea" placeholder="Hi, I'm interested in your products..." required />
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary" onClick={onClose}>{t.cancel}</Button>
              <Button onClick={handleSend} disabled={sending || !user} style={{ flex: 1, justifyContent: "center" }}>
                {sending ? <Spinner size={14} /> : t.sendMessage}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  const { go } = useNav();
  const { t, lang } = useLang();
  const [search, setSearch] = useState("");

  return (
    <div style={{ background: T.bg }}>

      {/* Hero */}
      <section className="hero-section" style={{ padding: "88px 24px 80px", textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: T.muted, background: "#F4F4F5", border: `0.5px solid ${T.border}`, padding: "4px 12px", borderRadius: 99, marginBottom: 28, letterSpacing: 0.3 }}>
          UAE's B2B Supplier Platform
        </div>
        <h1 className="hero-h1" style={{ fontSize: 44, fontWeight: 600, lineHeight: 1.12, letterSpacing: -1.2, color: T.text, marginBottom: 18 }}>
          {t.heroTitle1}<br />
          <span style={{ color: T.purple }}>{t.heroTitle2}</span>
        </h1>
        <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 36px", fontWeight: 400 }}>
          {t.heroSub}
        </p>
        <div className="hero-actions" style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          <Button size="lg" onClick={() => go("suppliers")}>{t.findSuppliers}</Button>
          <Button size="lg" variant="secondary" onClick={() => go("supplierRegister")}>{t.joinSupplier}</Button>
        </div>
        <div style={{ position: "relative", maxWidth: 460, margin: "0 auto" }}>
          <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: T.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && search.trim() && go("products", { search })}
            placeholder="Search suppliers or products..."
            style={{ width: "100%", padding: "11px 14px 11px 38px", borderRadius: 11, border: `0.5px solid ${T.border}`, fontSize: 14, fontFamily: "Inter, sans-serif", background: T.bgWhite, color: T.text, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }} />
        </div>
      </section>

      <Divider />

      {/* Stats */}
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1100, margin: "0 auto" }}>
        {[["UAE", "Local suppliers only"], ["6", "Industries covered"], ["Free", "To browse & contact"], ["Verified", "Trusted businesses"]].map(([val, label], i) => (
          <div key={label} style={{ textAlign: "center", padding: "28px 20px", borderRight: i < 3 ? `0.5px solid ${T.border}` : "none" }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: T.text, letterSpacing: -0.4, marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 12, color: T.muted }}>{label}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* Categories */}
      <section style={{ padding: "72px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>Categories</div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.6, color: T.text, marginBottom: 8 }}>{t.browseByIndustry}</div>
            <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>{t.industriesSub}</div>
          </div>
        </div>
        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {categories.map(cat => (
            <Card key={cat.id} hover onClick={() => go("products", { category: cat.id })} style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 4 }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: T.muted }}>{cat.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      <Divider />

      {/* Featured Suppliers */}
      <section style={{ padding: "72px 24px", background: T.bgWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>Suppliers</div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.6, color: T.text, marginBottom: 8 }}>{t.trustedSuppliers}</div>
            <div style={{ fontSize: 14, color: T.muted }}>{t.trustedSub}</div>
          </div>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {suppliers.map(s => (
              <Card key={s.id} hover onClick={() => go("supplierProfile", { supplierId: s.id })}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <InitialsAvatar name={s.name} size={40} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 2 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: T.muted }}>{s.emirate} · {s.category}</div>
                  </div>
                  {s.verified && <Badge variant="success">Verified</Badge>}
                </div>
                <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, marginBottom: 12 }}>{s.description}</div>
                <div style={{ fontSize: 12, color: T.placeholder }}>MOQ: {s.moq} · Lead time: {s.lead_time}</div>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Button variant="secondary" onClick={() => go("suppliers")}>View all suppliers →</Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* How it works */}
      <section style={{ padding: "72px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, color: T.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>{t.howItWorks}</div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.6, color: T.text }}>{t.simpleStart}</div>
        </div>
        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[[t.step1, t.step1desc, "01"], [t.step2, t.step2desc, "02"], [t.step3, t.step3desc, "03"]].map(([title, desc, num]) => (
            <Card key={num} style={{ padding: "24px" }}>
              <div style={{ fontSize: 11, color: num === "03" ? T.gold : T.muted, marginBottom: 16, fontWeight: 500, letterSpacing: 0.5 }}>{num}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{desc}</div>
            </Card>
          ))}
        </div>
      </section>

      <Divider />

      {/* Testimonials */}
      <section style={{ padding: "72px 24px", background: T.bgWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>Testimonials</div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.6, color: T.text }}>What our users say</div>
          </div>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {testimonials.map((t, i) => (
              <Card key={i} style={{ padding: "24px" }}>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ borderTop: `0.5px solid ${T.border}`, paddingTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: T.muted }}>{t.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section style={{ padding: "32px 24px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: T.purple, borderRadius: 20, padding: "56px 48px", textAlign: "center" }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: "#fff", letterSpacing: -0.5, marginBottom: 10 }}>{t.readyToGrow}</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 28, lineHeight: 1.6 }}>{t.ctaSub}</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("suppliers")} style={{ background: "#fff", border: "none", color: T.purple, padding: "9px 22px", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>{t.findSuppliers}</button>
            <button onClick={() => go("supplierRegister")} style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)", padding: "9px 22px", borderRadius: 9, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>{t.joinSupplier}</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
function ProductsPage({ initCategory = "", initSearch = "" }) {
  const { go } = useNav();
  const { t } = useLang();
  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [search, setSearch] = useState(initSearch);
  const [realProducts, setRealProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("products").select("*, suppliers(company_name, emirate)").eq("status", "Active").then(({ data }) => {
      setRealProducts(data || []);
      setLoading(false);
    });
  }, []);

  const allProducts = [
    ...realProducts.map(p => ({ id: p.id, title: p.name, category: p.tag?.toLowerCase() || "other", price: p.price || "Contact for price", moq: p.moq || "—", supplier: p.suppliers?.company_name || "UAE Supplier", supplierId: p.supplier_id, country: UAE, rating: 4.5, image: p.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", verified: true })),
    ...products,
  ];

  const filtered = allProducts.filter(p => {
    const matchCat = !selectedCategory || p.category === selectedCategory;
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.supplier?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, color: T.text, marginBottom: 4 }}>Products</div>
            <div style={{ fontSize: 13, color: T.muted }}>{filtered.length} results</div>
          </div>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            style={{ padding: "7px 12px", borderRadius: 8, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", background: T.bgWhite, color: T.text }}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="products-layout" style={{ display: "flex", gap: 24 }}>
          {/* Sidebar */}
          <aside className="products-sidebar" style={{ width: 200, flexShrink: 0 }}>
            <div style={{ background: T.bgWhite, border: `0.5px solid ${T.border}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: T.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Search</div>
              <div style={{ position: "relative", marginBottom: 20 }}>
                <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: T.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                  style={{ width: "100%", padding: "7px 10px 7px 28px", borderRadius: 8, border: `0.5px solid ${T.border}`, fontSize: 12, fontFamily: "Inter, sans-serif", background: T.bgWhite }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: T.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Category</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <button onClick={() => setSelectedCategory("")} style={{ textAlign: "left", padding: "6px 8px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Inter, sans-serif", background: !selectedCategory ? T.purpleLight : "transparent", color: !selectedCategory ? T.purple : T.muted, fontWeight: !selectedCategory ? 500 : 400 }}>All categories</button>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ textAlign: "left", padding: "6px 8px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Inter, sans-serif", background: selectedCategory === cat.id ? T.purpleLight : "transparent", color: selectedCategory === cat.id ? T.purple : T.muted, fontWeight: selectedCategory === cat.id ? 500 : 400 }}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="products-grid" style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14, alignContent: "start" }}>
            {loading ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60 }}><Spinner size={24} /></div> :
              filtered.length === 0 ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60, color: T.muted }}><div style={{ fontSize: 15, fontWeight: 500 }}>No products found</div></div> :
              filtered.map(p => <ProductCard key={p.id} product={p} onClick={() => go("productDetail", { productId: p.id })} />)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────
function ProductDetailPage({ productId }) {
  const { go } = useNav();
  const { t } = useLang();
  const product = products.find(p => p.id === productId) || products[0];
  const supplier = suppliers.find(s => s.id === product.supplierId) || suppliers[0];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const [showContact, setShowContact] = useState(false);

  const specs = [["Category", product.category], ["MOQ", product.moq], ["Origin", `UAE`], ["Supply Ability", "10,000 units/month"], ["Lead Time", "7-15 business days"], ["Payment", "T/T, L/C"]];

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      {showContact && <ContactModal supplier={supplier} onClose={() => setShowContact(false)} />}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <button onClick={() => go("products")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.muted, display: "flex", alignItems: "center", gap: 4, marginBottom: 24, fontFamily: "Inter, sans-serif" }}>← {t.backToProducts}</button>

        <div className="supplier-profile-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28 }}>
          <div>
            <div style={{ aspectRatio: "16/10", borderRadius: 16, overflow: "hidden", marginBottom: 24, background: "#F4F4F5" }}>
              <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4, color: T.text, marginBottom: 8 }}>{product.title}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: T.gold }}>★ {product.rating}</span>
                  {product.verified && <Badge variant="success">Verified supplier</Badge>}
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: T.purple, letterSpacing: -0.5 }}>{product.price}</div>
            </div>

            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 14 }}>Bulk pricing</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {[["1–99 units", product.price], ["100–499 units", "10% off"], ["500+ units", "20% off"]].map(([range, price]) => (
                  <div key={range} style={{ background: T.bg, borderRadius: 9, padding: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}>{range}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.purple }}>{price}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 14 }}>Specifications</div>
              {specs.map(([label, value]) => (
                <div key={label} style={{ display: "flex", padding: "9px 0", borderBottom: `0.5px solid ${T.border}`, fontSize: 13 }}>
                  <span style={{ color: T.muted, width: 140, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontWeight: 500, color: T.text }}>{value}</span>
                </div>
              ))}
            </Card>
          </div>

          <div>
            <Card style={{ position: "sticky", top: 72 }}>
              <button onClick={() => go("supplierProfile", { supplierId: supplier.id })} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginBottom: 18, width: "100%", textAlign: "left" }}>
                <InitialsAvatar name={supplier.name} size={40} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>{supplier.name}</div>
                  <div style={{ fontSize: 12, color: T.muted }}>UAE{supplier.verified ? " · Verified" : ""}</div>
                </div>
              </button>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
                {[["Response", supplier.stats.responseRate], ["Years", supplier.stats.yearsActive]].map(([l, v]) => (
                  <div key={l} style={{ background: T.bg, borderRadius: 9, padding: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: T.muted, marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{v}</div>
                  </div>
                ))}
              </div>
              <Button onClick={() => setShowContact(true)} style={{ width: "100%", justifyContent: "center", marginBottom: 8 }}>Request quote</Button>
              <Button variant="secondary" onClick={() => setShowContact(true)} style={{ width: "100%", justifyContent: "center" }}>Contact supplier</Button>
            </Card>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3, color: T.text, marginBottom: 20 }}>Related products</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
              {related.map(p => <ProductCard key={p.id} product={p} onClick={() => go("productDetail", { productId: p.id })} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ─── SUPPLIER PROFILE ─────────────────────────────────────────────────────────
function SupplierProfilePage({ supplierId }) {
  const { go } = useNav();
  const { t } = useLang();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!supplierId) return;
    supabase.from("suppliers").select("*").eq("id", supplierId).single().then(({ data }) => {
      setSupplier(data); setLoading(false);
    });
  }, [supplierId]);

  const mockSupplier = suppliers.find(s => s.id === supplierId) || suppliers[0];
  const displaySupplier = supplier || mockSupplier;

  if (loading && !mockSupplier) return <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Spinner size={24} /></div>;

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      {showContact && <ContactModal supplier={displaySupplier} onClose={() => setShowContact(false)} />}

      {/* Header */}
      <div style={{ background: T.bgWhite, borderBottom: `0.5px solid ${T.border}`, padding: "32px 24px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button onClick={() => go("suppliers")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: T.muted, marginBottom: 24, fontFamily: "Inter, sans-serif" }}>← {t.backToSuppliers}</button>
          <div className="supplier-profile-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "flex-end", paddingBottom: 28 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: T.purpleLight, border: `0.5px solid ${T.purpleBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 600, color: T.purple, overflow: "hidden" }}>
                {displaySupplier.logo_url ? <img src={displaySupplier.logo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (displaySupplier.initials || displaySupplier.company_name?.slice(0, 2).toUpperCase() || "??") }
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4, color: T.text }}>{displaySupplier.company_name || displaySupplier.name}</div>
                  {displaySupplier.verified && <Badge variant="success">Verified</Badge>}
                </div>
                <div style={{ fontSize: 13, color: T.muted }}>{displaySupplier.emirate || "UAE"} · {displaySupplier.category}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary" onClick={() => setShowContact(true)}>{t.requestCatalog}</Button>
              <Button onClick={() => setShowContact(true)}>{t.contactSupplier}</Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        <div className="supplier-profile-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24 }}>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 12 }}>{t.about}</div>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>{displaySupplier.description || "No description provided."}</p>
            </Card>

            <div className="profile-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
              {[["MOQ", displaySupplier.moq || displaySupplier.stats?.products], ["Lead Time", displaySupplier.lead_time || displaySupplier.stats?.responseRate], ["Employees", displaySupplier.employees || displaySupplier.stats?.employees], ["Founded", displaySupplier.founded || displaySupplier.stats?.yearsActive]].map(([label, val]) => (
                val ? <Card key={label} style={{ padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 3 }}>{val}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{label}</div>
                </Card> : null
              ))}
            </div>

            <Card>
              <div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 14 }}>{t.productsTab}</div>
              <div style={{ textAlign: "center", padding: "24px 0", color: T.muted }}>
                <div style={{ fontSize: 13 }}>{t.noProducts}</div>
              </div>
            </Card>
          </div>

          <div>
            <Card style={{ position: "sticky", top: 72 }}>
              {(displaySupplier.phone || displaySupplier.email || displaySupplier.website) && (
                <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: `0.5px solid ${T.border}` }}>
                  {displaySupplier.phone && <div style={{ fontSize: 13, color: T.muted, marginBottom: 8 }}>Phone: <span style={{ color: T.text }}>{displaySupplier.phone}</span></div>}
                  {displaySupplier.email && <div style={{ fontSize: 13, color: T.muted, marginBottom: 8 }}>Email: <span style={{ color: T.purple }}>{displaySupplier.email}</span></div>}
                  {displaySupplier.website && <div style={{ fontSize: 13, color: T.muted }}>Web: <a href={displaySupplier.website} target="_blank" rel="noreferrer" style={{ color: T.purple }}>{displaySupplier.website}</a></div>}
                </div>
              )}
              {(displaySupplier.certifications?.length > 0) && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: T.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Certifications</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {displaySupplier.certifications.map(cert => <Badge key={cert}>{cert}</Badge>)}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ─── SUPPLIERS PAGE ───────────────────────────────────────────────────────────
function SuppliersPage() {
  const { go } = useNav();
  const { t } = useLang();
  const [realSuppliers, setRealSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    supabase.from("suppliers").select("*").eq("status", "Active").order("featured", { ascending: false }).then(({ data }) => {
      setRealSuppliers(data || []);
      setLoading(false);
    });
  }, []);

  const allSuppliers = realSuppliers.length > 0 ? realSuppliers : suppliers;
  const filtered = allSuppliers.filter(s => {
    const matchSearch = !search || (s.company_name || s.name)?.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, color: T.text, marginBottom: 4 }}>UAE Suppliers</div>
            <div style={{ fontSize: 13, color: T.muted }}>Verified businesses ready to trade</div>
          </div>
          <Button onClick={() => go("supplierRegister")}>{t.registerAsSupplier}</Button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 13, height: 13, color: T.placeholder }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppliers..."
              style={{ width: "100%", padding: "8px 12px 8px 30px", borderRadius: 9, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", background: T.bgWhite }} />
          </div>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", background: T.bgWhite }}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        {loading ? <div style={{ textAlign: "center", padding: 60 }}><Spinner size={24} /></div> :
          filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: T.text, marginBottom: 8 }}>No suppliers yet</div>
              <p style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>Be the first supplier to join Usool.</p>
              <Button onClick={() => go("supplierRegister")}>{t.registerAsSupplier}</Button>
            </div>
          ) : (
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
              {filtered.map(s => (
                <Card key={s.id} hover onClick={() => go("supplierProfile", { supplierId: s.id })}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <InitialsAvatar name={s.company_name || s.name} size={40} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 2 }}>{s.company_name || s.name}</div>
                      <div style={{ fontSize: 12, color: T.muted }}>{s.emirate} · {s.category}</div>
                    </div>
                    {s.verified && <Badge variant="success">Verified</Badge>}
                  </div>
                  <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, marginBottom: 12 }}>{(s.description || s.tagline || "").slice(0, 100)}{(s.description || "").length > 100 ? "..." : ""}</p>
                  <div style={{ fontSize: 12, color: T.placeholder }}>{s.moq && `MOQ: ${s.moq}`}{s.lead_time && ` · Lead time: ${s.lead_time}`}</div>
                </Card>
              ))}
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
}

// ─── SUPPLIER REGISTRATION ────────────────────────────────────────────────────
function SupplierRegistrationPage() {
  const { user } = useAuth();
  const { go } = useNav();
  const { t } = useLang();
  const [form, setForm] = useState({ company_name: "", tagline: "", category: "", emirate: "", description: "", phone: "", email: "", website: "", moq: "", lead_time: "", employees: "", founded: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const emirateOptions = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

  async function handleSubmit() {
    if (!user) { go("auth"); return; }
    if (!form.company_name || !form.category || !form.emirate) { setError("Please fill in Company Name, Category and Emirate."); return; }
    setSaving(true); setError("");
    const { error: err } = await supabase.from("suppliers").insert({ ...form, profile_id: user.id, email: form.email || user.email, status: "Pending", verified: false, featured: false });
    setSaving(false);
    if (err) setError("Failed to submit. " + err.message);
    else { setSuccess(true); await supabase.from("profiles").update({ role: "supplier" }).eq("id", user.id); }
  }

  if (success) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{ width: 48, height: 48, background: T.successLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.success} strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 10 }}>{t.applicationSubmitted}</div>
        <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7, marginBottom: 28 }}>{t.applicationSub}</p>
        <Button variant="secondary" onClick={() => go("home")}>{t.backToHome}</Button>
      </div>
    </div>
  );

  return (
    <div style={{ background: T.bg, minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, color: T.text, marginBottom: 6 }}>{t.registerAsSupplier}</div>
          <div style={{ fontSize: 14, color: T.muted }}>Join Usool and connect with buyers across the UAE.</div>
        </div>
        <Alert msg={error} type="error" />
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, color: T.muted, marginBottom: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>{t.companyInfo}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            {[["Company Name *", "company_name", "text", "e.g. Gulf Steel Industries"], ["Tagline", "tagline", "text", "Short description"], ["Phone", "phone", "text", "+971 50 000 0000"], ["Email", "email", "email", "company@example.com"], ["Website", "website", "text", "https://..."], ["MOQ", "moq", "text", "e.g. 100 units"], ["Lead Time", "lead_time", "text", "e.g. 2–3 weeks"], ["Employees", "employees", "text", "e.g. 50–100"], ["Founded", "founded", "text", "e.g. 2010"]].map(([label, key, type, ph]) => (
              <div key={key}>
                <Input label={label} value={form[key]} onChange={v => setForm(f => ({ ...f, [key]: v }))} type={type} placeholder={ph} />
              </div>
            ))}
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6 }}>Category *</div>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", marginBottom: 16, background: T.bgWhite }}>
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6 }}>Emirate *</div>
              <select value={form.emirate} onChange={e => setForm(f => ({ ...f, emirate: e.target.value }))} style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", marginBottom: 16, background: T.bgWhite }}>
                <option value="">Select emirate</option>
                {emirateOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} type="textarea" placeholder="Tell buyers about your company..." />
          <Button onClick={handleSubmit} disabled={saving} style={{ width: "100%", justifyContent: "center" }}>
            {saving ? <Spinner size={14} /> : t.submitApplication}
          </Button>
          <div style={{ textAlign: "center", fontSize: 12, color: T.muted, marginTop: 12 }}>Your profile will be reviewed within 24 hours</div>
        </Card>
      </div>
      <div style={{ marginTop: 48 }}><Footer /></div>
    </div>
  );
}

// ─── SUPPLIER PRODUCT MANAGER ─────────────────────────────────────────────────
function SupplierProductManager({ supplierId }) {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", moq: "", lead_time: "", tag: "" });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { if (supplierId) loadProds(); }, [supplierId]);

  async function loadProds() {
    const { data } = await supabase.from("products").select("*").eq("supplier_id", supplierId).order("created_at", { ascending: false });
    setProds(data || []); setLoading(false);
  }

  async function handleAdd() {
    if (!form.name.trim()) { setError("Product name is required."); return; }
    setSaving(true); setError("");
    let image_url = "";
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `products/${supplierId}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("usool-images").upload(path, imageFile);
      if (!upErr) { const { data: u } = supabase.storage.from("usool-images").getPublicUrl(path); image_url = u.publicUrl; }
    }
    await supabase.from("products").insert({ supplier_id: supplierId, ...form, image_url, status: "Active" });
    setForm({ name: "", description: "", price: "", moq: "", lead_time: "", tag: "" });
    setImageFile(null); setShowForm(false); setSaving(false);
    loadProds();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: T.text }}>My Products ({prods.length})</div>
        <Button variant={showForm ? "secondary" : "primary"} size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add product"}
        </Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 20, background: T.bg }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: T.muted, marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>New Product</div>
          <Alert msg={error} type="error" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            {[["Product name *", "name", "e.g. Cotton Fabric Rolls"], ["Price", "price", "e.g. AED 50–200"], ["MOQ", "moq", "e.g. 100 meters"], ["Lead time", "lead_time", "e.g. 1–2 weeks"], ["Category tag", "tag", "e.g. Textiles"]].map(([label, key, ph]) => (
              <Input key={key} label={label} value={form[key]} onChange={v => setForm(f => ({ ...f, [key]: v }))} placeholder={ph} />
            ))}
          </div>
          <Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} type="textarea" placeholder="Describe your product..." />
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6 }}>Product image</div>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
              style={{ fontSize: 13, fontFamily: "Inter, sans-serif", color: T.muted }} />
          </div>
          <Button onClick={handleAdd} disabled={saving}>
            {saving ? <Spinner size={14} /> : "Save product"}
          </Button>
        </Card>
      )}

      {loading ? <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div> :
        prods.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: T.muted, background: T.bg, borderRadius: 12, border: `0.5px solid ${T.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 4 }}>No products yet</div>
            <div style={{ fontSize: 13 }}>Click "Add product" to list your first product</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
            {prods.map(p => (
              <Card key={p.id} style={{ padding: 14 }}>
                {p.image_url && <img src={p.image_url} alt={p.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 9, marginBottom: 10 }} />}
                <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 4 }}>{p.name}</div>
                {p.price && <div style={{ fontSize: 13, color: T.purple, fontWeight: 600, marginBottom: 4 }}>{p.price}</div>}
                {p.moq && <div style={{ fontSize: 12, color: T.muted }}>MOQ: {p.moq}</div>}
              </Card>
            ))}
          </div>
        )}
    </div>
  );
}

function SupplierProductManagerWrapper({ user }) {
  const [supplierId, setSupplierId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("suppliers").select("id").eq("profile_id", user.id).single().then(({ data }) => { if (data) setSupplierId(data.id); setLoading(false); });
  }, [user]);
  if (loading) return <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div>;
  if (!supplierId) return <div style={{ textAlign: "center", padding: 40, color: T.muted }}><div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 4 }}>No supplier profile</div><div style={{ fontSize: 13 }}>You need an approved supplier profile to manage products.</div></div>;
  return <SupplierProductManager supplierId={supplierId} />;
}

// ─── SUPPLIER PROFILE EDITOR ──────────────────────────────────────────────────
function SupplierProfileEditor({ user }) {
  const { t } = useLang();
  const [supplier, setSupplier] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState("");

  const emirateOptions = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

  useEffect(() => {
    supabase.from("suppliers").select("*").eq("profile_id", user.id).single().then(({ data }) => {
      if (data) { setSupplier(data); setForm(data); setLogoPreview(data.logo_url); }
      setLoading(false);
    });
  }, [user]);

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!supplier) return;
    setSaving(true); setError(""); setSaved(false);
    let logo_url = supplier.logo_url;
    if (logoFile) {
      const ext = logoFile.name.split(".").pop();
      const path = `logos/${supplier.id}.${ext}`;
      const { error: upErr } = await supabase.storage.from("usool-images").upload(path, logoFile, { upsert: true });
      if (!upErr) { const { data: u } = supabase.storage.from("usool-images").getPublicUrl(path); logo_url = u.publicUrl; }
    }
    const { error: err } = await supabase.from("suppliers").update({ ...form, logo_url }).eq("id", supplier.id);
    setSaving(false);
    if (err) setError("Failed to save. " + err.message);
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  }

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div>;
  if (!supplier) return <div style={{ textAlign: "center", padding: 40, color: T.muted }}><div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 4 }}>No supplier profile</div></div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: T.text }}>My Profile</div>
        <div style={{ display: "flex", gap: 8 }}>
          {supplier.status === "Pending" && <Badge variant="warning">{t.pendingApproval}</Badge>}
          {supplier.status === "Active" && <Badge variant="success">{t.active}</Badge>}
          {supplier.verified && <Badge>{t.verified}</Badge>}
        </div>
      </div>

      <Alert msg={error} type="error" />
      {saved && <Alert msg="Profile saved successfully!" type="success" />}

      {/* Logo */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: T.purpleLight, border: `0.5px solid ${T.purpleBorder}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 600, color: T.purple, flexShrink: 0 }}>
            {logoPreview ? <img src={logoPreview} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (supplier.company_name?.slice(0, 2).toUpperCase() || "??")}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 4 }}>Company logo</div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>Recommended: 200×200px PNG or JPG</div>
            <label style={{ background: T.purpleLight, color: T.purple, border: `0.5px solid ${T.purpleBorder}`, padding: "6px 14px", borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
              {logoPreview ? t.changeLogo : t.uploadLogo}
              <input type="file" accept="image/*" onChange={handleLogoChange} style={{ display: "none" }} />
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ fontSize: 12, fontWeight: 500, color: T.muted, marginBottom: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>{t.companyInfo}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          {[["Company Name", "company_name", "text"], ["Tagline", "tagline", "text"], ["Phone", "phone", "text"], ["Email", "email", "email"], ["Website", "website", "text"], ["MOQ", "moq", "text"], ["Lead Time", "lead_time", "text"], ["Employees", "employees", "text"], ["Founded", "founded", "text"]].map(([label, key, type]) => (
            <Input key={key} label={label} value={form[key] || ""} onChange={v => setForm(f => ({ ...f, [key]: v }))} type={type} />
          ))}
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6 }}>Category</div>
            <select value={form.category || ""} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", marginBottom: 16, background: T.bgWhite }}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6 }}>Emirate</div>
            <select value={form.emirate || ""} onChange={e => setForm(f => ({ ...f, emirate: e.target.value }))} style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: `0.5px solid ${T.border}`, fontSize: 13, fontFamily: "Inter, sans-serif", marginBottom: 16, background: T.bgWhite }}>
              <option value="">Select emirate</option>
              {emirateOptions.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <Input label="Description" value={form.description || ""} onChange={v => setForm(f => ({ ...f, description: v }))} type="textarea" placeholder="Tell buyers about your company..." />
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Spinner size={14} /> : t.saveProfile}
        </Button>
      </Card>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage() {
  const { user, profile } = useAuth();
  const { go } = useNav();
  const { t } = useLang();
  const [activeView, setActiveView] = useState("overview");
  const [realMessages, setRealMessages] = useState([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);

  const statusColors = { pending: "warning", replied: "default", accepted: "success", expired: "gray" };

  useEffect(() => { if (user) loadMessages(); }, [user]);

  async function loadMessages() {
    setLoadingMsgs(true);
    let query = supabase.from("messages").select("*").order("created_at", { ascending: false });
    if (profile?.role === "supplier") {
      const { data: sup } = await supabase.from("suppliers").select("id").eq("profile_id", user.id).single();
      if (sup) query = query.eq("supplier_id", sup.id);
    } else {
      query = query.eq("sender_id", user.id);
    }
    const { data } = await query;
    setRealMessages(data || []);
    setLoadingMsgs(false);
  }

  async function markRead(id) {
    await supabase.from("messages").update({ read: true }).eq("id", id);
    setRealMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  }

  const unreadCount = realMessages.filter(m => !m.read).length;
  const allMessages = realMessages.length > 0 ? realMessages : mockMessages.map(m => ({ ...m, id: m.id, sender_name: m.from, content: m.preview, created_at: new Date().toISOString() }));

  const navItems = [
    { id: "overview", label: t.overview },
    { id: "inquiries", label: t.myInquiries },
    { id: "messages", label: `${t.messages}${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
    { id: "products", label: t.myProducts },
    { id: "profile", label: t.myProfile },
    { id: "settings", label: t.settings },
  ];

  if (!user) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 18, fontWeight: 600, color: T.text }}>Sign in to access your dashboard</div>
      <Button onClick={() => go("auth")}>{t.signIn}</Button>
    </div>
  );

  function renderView() {
    if (activeView === "products") return <SupplierProductManagerWrapper user={user} />;
    if (activeView === "profile") return <SupplierProfileEditor user={user} />;
    if (activeView === "settings") return <div style={{ textAlign: "center", padding: "60px 0", color: T.muted }}><div style={{ fontSize: 14, fontWeight: 500, color: T.text, marginBottom: 4 }}>Settings</div><div style={{ fontSize: 13 }}>Coming soon.</div></div>;

    if (activeView === "inquiries") return (
      <div>
        <div style={{ fontSize: 16, fontWeight: 500, color: T.text, marginBottom: 20 }}>{t.myInquiries}</div>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `0.5px solid ${T.border}` }}>
                {["ID", "Product", "Supplier", "Date", "Qty", "Status"].map(h => <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: T.muted, fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {inquiries.map(inq => (
                <tr key={inq.id} style={{ borderBottom: `0.5px solid ${T.border}` }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 11, color: T.muted }}>{inq.id}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>{inq.product}</td>
                  <td style={{ padding: "12px 16px", color: T.muted }}>{inq.supplier}</td>
                  <td style={{ padding: "12px 16px", color: T.muted }}>{inq.date}</td>
                  <td style={{ padding: "12px 16px" }}>{inq.quantity}</td>
                  <td style={{ padding: "12px 16px" }}><Badge variant={statusColors[inq.status]}>{inq.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );

    if (activeView === "messages") return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: T.text }}>{t.messages}</div>
          {unreadCount > 0 && <Badge>{unreadCount} unread</Badge>}
        </div>
        {loadingMsgs ? <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div> :
          allMessages.length === 0 ? <div style={{ textAlign: "center", padding: "40px 0", color: T.muted, fontSize: 13 }}>No messages yet.</div> :
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {allMessages.map(msg => (
              <Card key={msg.id} onClick={() => markRead(msg.id)} style={{ cursor: "pointer", border: `0.5px solid ${!msg.read ? T.purpleBorder : T.border}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <InitialsAvatar name={msg.sender_name || msg.from || "?"} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{msg.sender_name || msg.from}</span>
                        {!msg.read && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.purple }} />}
                      </div>
                      <span style={{ fontSize: 11, color: T.muted }}>{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : msg.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{msg.content || msg.preview}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        }
      </div>
    );

    // Overview
    return (
      <div>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3, color: T.text, marginBottom: 2 }}>Dashboard</div>
          <div style={{ fontSize: 13, color: T.muted }}>Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}.</div>
        </div>
        <div className="dash-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }}>
          {[{ label: "Active inquiries", value: dashboardStats.activeInquiries }, { label: "Pending quotes", value: dashboardStats.pendingQuotes }, { label: "New messages", value: realMessages.filter(m => !m.read).length || dashboardStats.newMessages }, { label: "Saved suppliers", value: dashboardStats.savedProducts }].map(stat => (
            <Card key={stat.label} style={{ padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5, color: T.text, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: T.muted }}>{stat.label}</div>
            </Card>
          ))}
        </div>

        <Card style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `0.5px solid ${T.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>Recent inquiries</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr style={{ borderBottom: `0.5px solid ${T.border}` }}>{["ID", "Product", "Supplier", "Qty", "Status"].map(h => <th key={h} style={{ padding: "9px 16px", textAlign: "left", color: T.muted, fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>)}</tr></thead>
            <tbody>{inquiries.slice(0, 3).map(inq => (<tr key={inq.id} style={{ borderBottom: `0.5px solid ${T.border}` }}><td style={{ padding: "10px 16px", fontFamily: "monospace", fontSize: 11, color: T.muted }}>{inq.id}</td><td style={{ padding: "10px 16px", fontWeight: 500 }}>{inq.product}</td><td style={{ padding: "10px 16px", color: T.muted }}>{inq.supplier}</td><td style={{ padding: "10px 16px" }}>{inq.quantity}</td><td style={{ padding: "10px 16px" }}><Badge variant={statusColors[inq.status]}>{inq.status}</Badge></td></tr>))}</tbody>
          </table>
        </Card>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `0.5px solid ${T.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>Recent messages</div>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {allMessages.slice(0, 3).map(msg => (
              <div key={msg.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 10px", borderRadius: 9, background: !msg.read ? T.purpleLight : T.bg }}>
                <InitialsAvatar name={msg.sender_name || msg.from || "?"} size={32} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: T.text, marginBottom: 2 }}>{msg.sender_name || msg.from}</div>
                  <div style={{ fontSize: 12, color: T.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.content || msg.preview}</div>
                </div>
                <span style={{ fontSize: 11, color: T.muted }}>{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : msg.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="dashboard-layout" style={{ display: "flex", minHeight: "100vh", background: T.bg }}>
      <div className="dashboard-sidebar" style={{ width: 200, background: T.bgWhite, borderRight: `0.5px solid ${T.border}`, flexShrink: 0, padding: "24px 12px" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: T.muted, textTransform: "uppercase", letterSpacing: 0.5, padding: "0 8px", marginBottom: 12 }}>Menu</div>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveView(item.id)}
            style={{ width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Inter, sans-serif", fontWeight: activeView === item.id ? 500 : 400, color: activeView === item.id ? T.purple : T.muted, background: activeView === item.id ? T.purpleLight : "transparent", marginBottom: 2 }}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, background: T.bg }}>
        <div style={{ height: 52, borderBottom: `0.5px solid ${T.border}`, background: T.bgWhite, display: "flex", alignItems: "center", padding: "0 24px" }}>
          <span style={{ fontSize: 13, color: T.muted }}>{navItems.find(n => n.id === activeView)?.label}</span>
        </div>
        <div style={{ padding: 24 }}>{renderView()}</div>
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage() {
  const { user, profile } = useAuth();
  const { go } = useNav();
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [stats, setStats] = useState({ users: 0, suppliers: 0, messages: 0, buyers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || profile?.role !== "admin") { go("home"); return; }
    loadData();
  }, [user, profile]);

  async function loadData() {
    setLoading(true);
    const [{ data: profilesData }, { data: msgsData }, { data: suppliersData }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("messages").select("*").order("created_at", { ascending: false }),
      supabase.from("suppliers").select("*").order("created_at", { ascending: false }),
    ]);
    setUsers(profilesData || []);
    setAllMessages(msgsData || []);
    setAllSuppliers(suppliersData || []);
    setStats({ users: profilesData?.length || 0, suppliers: suppliersData?.filter(s => s.status === "Active").length || 0, buyers: profilesData?.filter(p => p.role === "buyer").length || 0, messages: msgsData?.length || 0 });
    setLoading(false);
  }

  async function approveSupplier(id) { await supabase.from("suppliers").update({ status: "Active" }).eq("id", id); setAllSuppliers(prev => prev.map(s => s.id === id ? { ...s, status: "Active" } : s)); }
  async function rejectSupplier(id) { await supabase.from("suppliers").update({ status: "Rejected" }).eq("id", id); setAllSuppliers(prev => prev.map(s => s.id === id ? { ...s, status: "Rejected" } : s)); }
  async function toggleVerified(id, current) { await supabase.from("suppliers").update({ verified: !current }).eq("id", id); setAllSuppliers(prev => prev.map(s => s.id === id ? { ...s, verified: !current } : s)); }
  async function updateRole(userId, role) { await supabase.from("profiles").update({ role }).eq("id", userId); setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u)); }

  const tabs = [{ id: "overview", label: t.overview }, { id: "suppliers", label: `${t.suppliers_tab} (${allSuppliers.length})` }, { id: "users", label: t.allUsers }, { id: "messages", label: t.allMessages }];
  const statusV = { Active: "success", Pending: "warning", Rejected: "danger" };
  const roleV = { admin: "warning", supplier: "default", buyer: "success" };

  if (loading) return <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner size={24} /></div>;

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, color: T.text, marginBottom: 4 }}>{t.adminPanel}</div>
          <div style={{ fontSize: 13, color: T.muted }}>{t.manageUsool}</div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `0.5px solid ${T.border}`, marginBottom: 24 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Inter, sans-serif", fontWeight: activeTab === tab.id ? 500 : 400, color: activeTab === tab.id ? T.text : T.muted, borderBottom: `1.5px solid ${activeTab === tab.id ? T.purple : "transparent"}`, marginBottom: -1 }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <div className="dash-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }}>
              {[{ label: "Total users", value: stats.users }, { label: "Active suppliers", value: stats.suppliers }, { label: "Buyers", value: stats.buyers }, { label: "Messages", value: stats.messages }].map(s => (
                <Card key={s.label} style={{ textAlign: "center", padding: "20px" }}>
                  <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5, color: T.text, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: T.muted }}>{s.label}</div>
                </Card>
              ))}
            </div>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: `0.5px solid ${T.border}` }}><div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>Recent signups</div></div>
              {users.slice(0, 5).map(u => (
                <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: `0.5px solid ${T.border}` }}>
                  <InitialsAvatar name={u.full_name || u.email} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{u.full_name || "No name"}</div>
                    <div style={{ fontSize: 12, color: T.muted }}>{u.email}</div>
                  </div>
                  <Badge variant={roleV[u.role] || "gray"}>{u.role || "buyer"}</Badge>
                  <span style={{ fontSize: 12, color: T.muted }}>{new Date(u.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* Suppliers */}
        {activeTab === "suppliers" && (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: `0.5px solid ${T.border}` }}><div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>All suppliers ({allSuppliers.length})</div></div>
            {allSuppliers.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: T.muted, fontSize: 13 }}>No supplier applications yet.</div> :
              allSuppliers.map(s => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderBottom: `0.5px solid ${T.border}`, flexWrap: "wrap" }}>
                  <InitialsAvatar name={s.company_name} size={36} />
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 2 }}>{s.company_name}</div>
                    <div style={{ fontSize: 12, color: T.muted }}>{s.emirate} · {s.category} · {s.email}</div>
                  </div>
                  <Badge variant={statusV[s.status] || "gray"}>{s.status}</Badge>
                  {s.verified && <Badge variant="success">Verified</Badge>}
                  <div style={{ display: "flex", gap: 6 }}>
                    {s.status === "Pending" && (
                      <>
                        <Button size="sm" variant="secondary" onClick={() => approveSupplier(s.id)} style={{ background: "#F0FDF4", color: T.success, border: "0.5px solid #BBF7D0" }}>{t.approve}</Button>
                        <Button size="sm" variant="secondary" onClick={() => rejectSupplier(s.id)} style={{ background: T.dangerLight, color: T.danger, border: "0.5px solid #FECACA" }}>{t.reject}</Button>
                      </>
                    )}
                    {s.status === "Active" && (
                      <Button size="sm" variant="secondary" onClick={() => toggleVerified(s.id, s.verified)}>
                        {s.verified ? t.removeVerified : t.markVerified}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </Card>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: `0.5px solid ${T.border}` }}><div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>All users ({users.length})</div></div>
            {users.map(u => (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: `0.5px solid ${T.border}`, flexWrap: "wrap" }}>
                <InitialsAvatar name={u.full_name || u.email} size={32} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{u.full_name || "No name"}</div>
                  <div style={{ fontSize: 12, color: T.muted }}>{u.email}</div>
                </div>
                <Badge variant={roleV[u.role] || "gray"}>{u.role || "buyer"}</Badge>
                {u.role !== "admin" && (
                  <select value={u.role || "buyer"} onChange={e => updateRole(u.id, e.target.value)}
                    style={{ padding: "5px 8px", borderRadius: 7, border: `0.5px solid ${T.border}`, fontSize: 12, fontFamily: "Inter, sans-serif" }}>
                    <option value="buyer">Buyer</option>
                    <option value="supplier">Supplier</option>
                    <option value="admin">Admin</option>
                  </select>
                )}
              </div>
            ))}
          </Card>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: `0.5px solid ${T.border}` }}><div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>All messages ({allMessages.length})</div></div>
            {allMessages.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: T.muted, fontSize: 13 }}>No messages yet.</div> :
              allMessages.map(msg => (
                <div key={msg.id} style={{ display: "flex", gap: 12, padding: "14px 20px", borderBottom: `0.5px solid ${T.border}`, alignItems: "flex-start" }}>
                  <InitialsAvatar name={msg.sender_name || msg.sender_email} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{msg.sender_name || "Unknown"}</span>
                      <span style={{ fontSize: 11, color: T.muted }}>{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>{msg.sender_email}</div>
                    <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{msg.content}</p>
                  </div>
                </div>
              ))}
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
function AuthPage() {
  const { signIn, signUp } = useAuth();
  const { go } = useNav();
  const { t } = useLang();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handle() {
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (mode === "login") { const err = await signIn(email, password); if (err) setError(err); else go("home"); }
      else { const err = await signUp(email, password, { full_name: name, role }); if (err) setError(err); else setSuccess("Account created! Check your email to confirm, then sign in."); }
    } finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: T.bg }}>
      {/* Left panel */}
      <div className="hide-mobile" style={{ flex: 1, background: T.purple, display: "flex", alignItems: "center", justifyContent: "center", padding: 48, flexDirection: "column" }}>
        <div style={{ maxWidth: 360 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
            <div style={{ width: 28, height: 28, background: "rgba(255,255,255,0.15)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>U</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: -0.3 }}>Usool</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#fff", letterSpacing: -0.6, lineHeight: 1.2, marginBottom: 16 }}>Connect with UAE's best suppliers</div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>Verified businesses. Direct contact. Real trade.</p>
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
            {["Free to browse and contact", "Verified UAE suppliers only", "6 industries covered"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <div style={{ width: "100%", maxWidth: 380, animation: "fadeUp .3s ease" }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4, color: T.text, marginBottom: 4 }}>
              {mode === "login" ? t.welcomeBack : t.joinFree}
            </div>
            <div style={{ fontSize: 13, color: T.muted }}>{mode === "login" ? t.signInSub : t.joinSub}</div>
          </div>

          <Alert msg={error} type="error" />
          <Alert msg={success} type="success" />

          {mode === "signup" && (
            <>
              <Input label={t.fullName} value={name} onChange={setName} placeholder="Your name" />
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 8 }}>{t.iAma}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["buyer", "supplier"].map(r => (
                    <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "9px", borderRadius: 9, border: `0.5px solid ${role === r ? T.purple : T.border}`, background: role === r ? T.purpleLight : T.bgWhite, color: role === r ? T.purple : T.muted, fontFamily: "Inter, sans-serif", fontWeight: role === r ? 500 : 400, fontSize: 13, cursor: "pointer", textTransform: "capitalize" }}>
                      {t[r]}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <Input label={t.email} value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
          <Input label={t.password} value={password} onChange={setPassword} type="password" placeholder="••••••••" />

          <Button onClick={handle} disabled={loading} style={{ width: "100%", justifyContent: "center", marginBottom: 16, padding: "10px" }}>
            {loading ? <Spinner size={14} /> : mode === "login" ? t.signIn : t.createAccount}
          </Button>

          <div style={{ textAlign: "center", fontSize: 13, color: T.muted }}>
            {mode === "login" ? t.noAccount + " " : t.alreadyHave + " "}
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
              style={{ color: T.purple, fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Inter, sans-serif" }}>
              {mode === "login" ? t.createAccount : t.signIn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AUTH PROVIDER ────────────────────────────────────────────────────────────
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(uid) {
    const { data } = await supabase.from("profiles").select("*").eq("id", uid).single();
    setProfile(data); setLoading(false);
  }
  async function signIn(email, password) { const { error } = await supabase.auth.signInWithPassword({ email, password }); return error ? error.message : null; }
  async function signUp(email, password, meta) { const { data, error } = await supabase.auth.signUp({ email, password, options: { data: meta } }); if (error) return error.message; if (data.user) await supabase.from("profiles").upsert({ id: data.user.id, email, full_name: meta.full_name, role: meta.role }); return null; }
  async function signOut() { await supabase.auth.signOut(); }

  return <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
function RouterProvider({ children }) {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState({});
  function go(p, ps = {}) { setPage(p); setParams(ps); window.scrollTo(0, 0); }
  return <NavContext.Provider value={{ page, params, go }}>{children}</NavContext.Provider>;
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function AppContent() {
  const { page, params } = useNav();
  const { loading } = useAuth();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 28, height: 28, background: T.purple, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>U</span>
        </div>
        <Spinner size={20} />
      </div>
    </div>
  );

  const pages = {
    home: <HomePage />,
    products: <ProductsPage initCategory={params.category || ""} initSearch={params.search || ""} />,
    productDetail: <ProductDetailPage productId={params.productId} />,
    supplierProfile: <SupplierProfilePage supplierId={params.supplierId} />,
    supplierRegister: <SupplierRegistrationPage />,
    suppliers: <SuppliersPage />,
    dashboard: <DashboardPage />,
    auth: <AuthPage />,
    admin: <AdminPage />,
  };

  return (
    <div style={{ minHeight: "100vh", animation: "fadeIn .2s ease" }}>
      <Navbar />
      {pages[page] || <HomePage />}
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </AuthProvider>
    </LangProvider>
  );
}
