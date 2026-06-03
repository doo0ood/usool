import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tkwlrbenttxosgolitjf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrd2xyYmVudHR4b3Nnb2xpdGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDgxNzksImV4cCI6MjA5MjQyNDE3OX0.kS8c7hbVIdwWU7Uppppcz2FHfTqZ1NkAdhj6_CZoDAI"
);

const UAE = { code: "AE", name: "UAE" };

const categories = [
  { id: "healthcare", name: "Healthcare" },
  { id: "packaging", name: "Packaging" },
  { id: "textiles", name: "Textiles & Apparel" },
  { id: "machinery", name: "Machinery" },
  { id: "agriculture", name: "Agriculture" },
  { id: "electronics", name: "Electronics" },
];

const products = [
  { id: "1", title: "Industrial Steel Pipes — Grade A", category: "construction", price: "$12 – $45", moq: "500 pieces", supplier: "Gulf Steel Industries", supplierId: "s1", country: UAE, rating: 4.8, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400", verified: true },
  { id: "2", title: "Organic Dates — Premium Medjool", category: "food", price: "$8 – $25", moq: "100 kg", supplier: "Al Madinah Dates Co.", supplierId: "s2", country: UAE, rating: 4.9, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400", verified: true },
  { id: "3", title: "LED Panel Lights — Commercial Grade", category: "electronics", price: "$15 – $60", moq: "200 units", supplier: "Noor Electronics LLC", supplierId: "s3", country: UAE, rating: 4.6, image: "https://images.unsplash.com/photo-1565814329452-e1432bc237d1?w=400", verified: false },
  { id: "4", title: "Cotton Fabric Rolls — Premium", category: "textiles", price: "$3 – $12/m", moq: "1000 meters", supplier: "Khaleeji Textiles", supplierId: "s4", country: UAE, rating: 4.7, image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400", verified: true },
  { id: "5", title: "CNC Milling Machine — 5 Axis", category: "machinery", price: "$25,000 – $80,000", moq: "1 unit", supplier: "Precision Gulf Machinery", supplierId: "s5", country: UAE, rating: 4.5, image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400", verified: true },
  { id: "6", title: "Automotive Brake Pads — OEM Quality", category: "auto", price: "$5 – $20", moq: "500 sets", supplier: "Emirates Auto Parts", supplierId: "s6", country: UAE, rating: 4.4, image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400", verified: false },
  { id: "7", title: "Industrial Chemical Solvents", category: "chemicals", price: "$50 – $200/barrel", moq: "10 barrels", supplier: "Gulf Chem Solutions", supplierId: "s7", country: UAE, rating: 4.3, image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400", verified: true },
  { id: "8", title: "Designer Leather Handbags", category: "fashion", price: "$30 – $150", moq: "50 pieces", supplier: "Souq Fashion House", supplierId: "s8", country: UAE, rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", verified: true },
  { id: "9", title: "Crude Oil Processing Equipment", category: "oil-gas", price: "$100,000+", moq: "1 unit", supplier: "Petro Gulf Equipment", supplierId: "s1", country: UAE, rating: 4.9, image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400", verified: true },
  { id: "10", title: "Corrugated Packaging Boxes", category: "packaging", price: "$0.50 – $3", moq: "5000 pieces", supplier: "Pack Gulf Industries", supplierId: "s2", country: UAE, rating: 4.2, image: "https://images.unsplash.com/photo-1607166452427-7e4477c3a9ed?w=400", verified: false },
  { id: "11", title: "Organic Fertilizers — Agricultural", category: "agriculture", price: "$20 – $80/ton", moq: "5 tons", supplier: "Green Gulf Agri", supplierId: "s3", country: UAE, rating: 4.6, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400", verified: true },
  { id: "12", title: "Medical Surgical Masks — N95", category: "healthcare", price: "$0.30 – $1.50", moq: "10000 pieces", supplier: "MedGulf Supplies", supplierId: "s4", country: UAE, rating: 4.7, image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400", verified: true },
];

const suppliers = [
  { id: "s1", name: "Gulf Steel Industries", country: UAE, verified: true, description: "Leading manufacturer and supplier of premium quality steel products across the GCC region. Established in 1995 with state-of-the-art production facilities.", stats: { products: 245, responseRate: "98%", yearsActive: 28, employees: "500+" }, certifications: ["ISO 9001", "ISO 14001", "OHSAS 18001"] },
  { id: "s2", name: "Al Madinah Dates Co.", country: UAE, verified: true, description: "Premium date supplier from the heart of Saudi Arabia. Our dates are organically grown and hand-picked for the finest quality.", stats: { products: 45, responseRate: "95%", yearsActive: 15, employees: "200+" }, certifications: ["Organic Certified", "HACCP", "ISO 22000"] },
  { id: "s3", name: "Noor Electronics LLC", country: UAE, verified: false, description: "Wholesale electronics distributor specializing in LED lighting, commercial AV equipment, and smart building solutions.", stats: { products: 890, responseRate: "92%", yearsActive: 10, employees: "150+" }, certifications: ["CE", "RoHS", "UL Listed"] },
];

const testimonials = [
  { name: "Ahmed Al-Rashid", role: "CEO, Gulf Trading Co.", country: "UAE", text: "Usool has transformed how we source materials. The platform connects us directly with verified suppliers across the Gulf region." },
  { name: "Fatima Al-Saud", role: "Procurement Manager, KSA Industries", country: "Saudi Arabia", text: "The quality of suppliers on Usool is outstanding. We've reduced our sourcing time by 60% since we started using the platform." },
  { name: "Khalid Al-Thani", role: "Operations Director, Qatar Build", country: "Qatar", text: "Finding reliable B2B partners in the Gulf used to be challenging. Usool made it effortless with their verified supplier network." },
];

const trustedLogos = ["ADNOC", "SABIC", "Emirates NBD", "Aramco", "QatarEnergy", "KNPC", "Batelco", "Omantel", "STC", "Etisalat", "du", "Zain", "Al Futtaim", "Emaar", "DAMAC"];
const dashboardStats = { activeInquiries: 12, pendingQuotes: 8, newMessages: 5, savedProducts: 24 };
const inquiries = [
  { id: "INQ-001", product: "Industrial Steel Pipes", supplier: "Gulf Steel Industries", date: "2026-03-01", status: "pending", quantity: "500 units" },
  { id: "INQ-002", product: "Organic Dates — Medjool", supplier: "Al Madinah Dates Co.", date: "2026-02-28", status: "replied", quantity: "200 kg" },
  { id: "INQ-003", product: "LED Panel Lights", supplier: "Noor Electronics LLC", date: "2026-02-25", status: "accepted", quantity: "1000 units" },
  { id: "INQ-004", product: "Cotton Fabric Rolls", supplier: "Khaleeji Textiles", date: "2026-02-20", status: "expired", quantity: "2000 meters" },
  { id: "INQ-005", product: "CNC Milling Machine", supplier: "Precision Gulf Machinery", date: "2026-03-03", status: "pending", quantity: "2 units" },
];
const messages = [
  { id: "m1", from: "Gulf Steel Industries", preview: "Thank you for your inquiry. We can offer...", time: "2h ago", unread: true },
  { id: "m2", from: "Al Madinah Dates Co.", preview: "Your order has been confirmed and will be...", time: "5h ago", unread: true },
  { id: "m3", from: "Noor Electronics LLC", preview: "We have updated the pricing for bulk orders...", time: "1d ago", unread: false },
  { id: "m4", from: "Khaleeji Textiles", preview: "Please find attached our latest catalog...", time: "2d ago", unread: false },
];

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#18181B",
  muted: "#71717A",
  border: "#E4E4E7",
  primary: "#4C3A8F",
  primaryLight: "#EDE9F8",
  primaryMuted: "#7C6BBF",
  success: "#166534",
  successBg: "#DCFCE7",
  warning: "#92400E",
  warningBg: "#FEF3C7",
  danger: "#991B1B",
  dangerBg: "#FEE2E2",
};
const F = "Inter, -apple-system, BlinkMacSystemFont, sans-serif";
const border = `0.5px solid ${C.border}`;
const borderBottom = border;
const borderTop = border;
const borderRight = border;

// ─── CONTEXTS ─────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);
const NavContext = createContext(null);
function useAuth() { return useContext(AuthContext); }
function useNav() { return useContext(NavContext); }

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: ${F}; background: ${C.bg}; color: ${C.text}; -webkit-font-smoothing: antialiased; }
  a { text-decoration: none; color: inherit; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .marquee-track { animation: marquee 35s linear infinite; display: flex; white-space: nowrap; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }
  input:focus, textarea:focus, select:focus { outline: 1.5px solid ${C.primary}; outline-offset: 0; }
  button { font-family: ${F}; }
`;

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Spinner() {
  return <div style={{ width: 16, height: 16, border: `2px solid ${C.border}`, borderTopColor: C.primary, borderRadius: "50%", animation: "spin .65s linear infinite", display: "inline-block" }} />;
}

function Badge({ children, variant = "default" }) {
  const styles = {
    default: { bg: C.bg, color: C.muted, border },
    primary: { bg: C.primaryLight, color: C.primary, border: `0.5px solid ${C.primaryMuted}` },
    success: { bg: C.successBg, color: C.success, border: `0.5px solid #BBF7D0` },
    warning: { bg: C.warningBg, color: C.warning, border: `0.5px solid #FDE68A` },
    danger: { bg: C.dangerBg, color: C.danger, border: `0.5px solid #FECACA` },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.01em", background: s.bg, color: s.color, border: s.border }}>
      {children}
    </span>
  );
}

function Btn({ children, onClick, disabled, variant = "primary", size = "md", style: extra = {} }) {
  const sizes = { sm: { padding: "6px 12px", fontSize: 13 }, md: { padding: "8px 16px", fontSize: 14 }, lg: { padding: "11px 22px", fontSize: 15 } };
  const variants = {
    primary: { background: C.primary, color: "#fff", border: "none" },
    outline: { background: "transparent", color: C.text, border },
    ghost: { background: "transparent", color: C.muted, border: "none" },
    danger: { background: C.dangerBg, color: C.danger, border: `0.5px solid #FECACA` },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 6, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "opacity .15s", letterSpacing: "-0.01em", ...sizes[size], ...variants[variant], ...extra }}>
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder, type = "text", style: extra = {} }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border, fontSize: 14, fontFamily: F, background: C.surface, color: C.text, ...extra }} />
  );
}

function Label({ children }) {
  return <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display: "block", marginBottom: 6 }}>{children}</label>;
}

function Card({ children, style: extra = {}, onClick }) {
  return (
    <div onClick={onClick} style={{ background: C.surface, border, borderRadius: 8, ...extra }}>
      {children}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { pending: "warning", replied: "primary", accepted: "success", expired: "default", Active: "success", Pending: "warning", Rejected: "danger" };
  return <Badge variant={map[status] || "default"}>{status}</Badge>;
}

// ─── CONTACT MODAL ────────────────────────────────────────────────────────────
function ContactModal({ supplier, onClose }) {
  const { user, profile } = useAuth();
  const { go } = useNav();
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
      sender_name: profile?.full_name || user?.email || "Anonymous",
      sender_company: profile?.company_name || "",
      sender_email: user?.email || "",
      content: subject ? `[${subject}]\n\n${message}` : message,
      from_role: "buyer", read: false,
    });
    setSending(false);
    if (err) setError("Failed to send. Please try again.");
    else setSent(true);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <Card style={{ width: "100%", maxWidth: 460, padding: 28, animation: "fadeUp .2s ease" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.successBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 18 }}>✓</div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Message sent</h3>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>The supplier will reply to <strong>{user?.email}</strong></p>
            <Btn onClick={onClose}>Done</Btn>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>Contact supplier</h3>
                <p style={{ color: C.muted, fontSize: 13 }}>{supplier.company_name || supplier.name}</p>
              </div>
              <button onClick={onClose} style={{ background: "none", border, borderRadius: 6, cursor: "pointer", width: 28, height: 28, fontSize: 14, color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
            {!user && <div style={{ background: C.warningBg, border: `0.5px solid #FDE68A`, color: C.warning, padding: "10px 12px", borderRadius: 6, fontSize: 13, marginBottom: 14 }}>Sign in to send messages. <button onClick={() => { onClose(); go("auth"); }} style={{ color: C.primary, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Sign in</button></div>}
            {error && <div style={{ background: C.dangerBg, border: `0.5px solid #FECACA`, color: C.danger, padding: "10px 12px", borderRadius: 6, fontSize: 13, marginBottom: 14 }}>{error}</div>}
            <div style={{ marginBottom: 14 }}>
              <Label>Subject</Label>
              <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Quote request for steel pipes" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <Label>Message *</Label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5}
                placeholder="Hi, I'm interested in your products and would like to request a quote..."
                style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border, fontSize: 14, fontFamily: F, resize: "vertical", color: C.text, background: C.surface }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn onClick={onClose} variant="outline" style={{ flex: 1 }}>Cancel</Btn>
              <Btn onClick={handleSend} disabled={sending || !user} style={{ flex: 2 }}>
                {sending ? <Spinner /> : "Send message"}
              </Btn>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { user, profile, signOut } = useAuth();
  const { go } = useNav();
  const [search, setSearch] = useState("");

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,250,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 56, gap: 20 }}>
        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "-0.03em" }}>U</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, color: C.text, letterSpacing: "-0.02em" }}>Usool</span>
        </button>

        <div style={{ flex: 1, maxWidth: 340, position: "relative" }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.muted }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && go("products", { search })}
            placeholder="Search products, suppliers..."
            style={{ width: "100%", padding: "7px 12px 7px 32px", borderRadius: 6, border, fontSize: 13, fontFamily: F, background: C.surface, color: C.text }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 1, marginLeft: "auto" }}>
          {[["Products", "products"], ["Suppliers", "suppliers"], ["Dashboard", "dashboard"], ...(profile?.role === "admin" ? [["Admin", "admin"]] : [])].map(([label, page]) => (
            <button key={page} onClick={() => go(page)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 5, fontSize: 13, fontWeight: 400, color: C.muted, letterSpacing: "-0.01em" }}
              onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.background = C.bg; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.background = "none"; }}>
              {label}
            </button>
          ))}
          <div style={{ width: 1, height: 16, background: C.border, margin: "0 8px" }} />
          {user ? (
            <Btn onClick={signOut} variant="outline" size="sm">Sign out</Btn>
          ) : (
            <>
              <Btn onClick={() => go("auth")} variant="ghost" size="sm">Log in</Btn>
              <Btn onClick={() => go("auth")} size="sm" style={{ marginLeft: 4 }}>Get started</Btn>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop, background: C.surface }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>U</span>
              </div>
              <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.02em" }}>Usool</span>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, maxWidth: 220 }}>The Gulf's premier B2B marketplace connecting vendors, suppliers, and investors across the GCC.</p>
          </div>
          {[
            { title: "Marketplace", links: ["All Products", "Categories", "Top Suppliers", "Trending"] },
            { title: "For Business", links: ["Become a Vendor", "Supplier Hub", "Investor Relations", "Trade Assurance"] },
            { title: "Support", links: ["Help Center", "Contact Us", "Terms of Service", "Privacy Policy"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, fontWeight: 600, color: C.text, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {col.links.map(l => <span key={l} style={{ fontSize: 13, color: C.muted, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.muted}>{l}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: C.muted }}>© 2026 Usool. All rights reserved.</p>
          <p style={{ fontSize: 12, color: C.muted }}>English | العربية</p>
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
      style={{ background: C.surface, border: hov ? `0.5px solid ${C.primaryMuted}` : border, borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "border-color .15s" }}>
      <div style={{ aspectRatio: "4/3", overflow: "hidden", background: C.bg }}>
        <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s", transform: hov ? "scale(1.03)" : "scale(1)" }} loading="lazy" />
      </div>
      <div style={{ padding: "14px 16px" }}>
        <p style={{ fontWeight: 500, fontSize: 13, lineHeight: 1.4, color: C.text, marginBottom: 8, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{product.title}</p>
        <p style={{ fontWeight: 600, fontSize: 15, color: C.primary, marginBottom: 8, letterSpacing: "-0.02em" }}>{product.price}</p>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 10 }}>
          <span>MOQ {product.moq}</span>
          <span style={{ color: "#A16207" }}>★ {product.rating}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted, paddingTop: 10, borderTop }}>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.supplier}</span>
          {product.verified && <Badge variant="success">Verified</Badge>}
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  const { go } = useNav();
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "80px 24px 72px", textAlign: "center", borderBottom, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${C.primaryLight} 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", animation: "fadeUp .4s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.surface, border, borderRadius: 99, padding: "4px 14px 4px 8px", fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: C.primary, flexShrink: 0 }} />
            UAE's leading B2B supplier marketplace
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, color: C.text, marginBottom: 20, letterSpacing: "-0.04em" }}>
            Your gateway to<br />
            <span style={{ color: C.primary }}>Gulf trade</span>
          </h1>
          <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 32px", fontWeight: 400 }}>
            Connect with verified UAE suppliers across healthcare, packaging, textiles, machinery, agriculture and electronics.
          </p>
          <div style={{ display: "flex", gap: 8, maxWidth: 460, margin: "0 auto 16px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: C.muted }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && go("products")}
                placeholder="What are you looking for?"
                style={{ width: "100%", padding: "10px 12px 10px 32px", borderRadius: 6, border, fontSize: 14, fontFamily: F, background: C.surface, color: C.text }} />
            </div>
            <Btn onClick={() => go("products")} size="md" style={{ flexShrink: 0, padding: "10px 20px" }}>Search</Btn>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", fontSize: 13, color: C.muted, flexWrap: "wrap" }}>
            <span>Popular:</span>
            {["Healthcare", "Packaging", "Textiles", "Machinery"].map(t => (
              <button key={t} onClick={() => go("products")} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, fontSize: 13, fontFamily: F }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ borderBottom, background: C.surface }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", textAlign: "center" }}>
          {[["UAE Only", "100% local suppliers"], ["6", "Industries covered"], ["Free", "To browse & contact"], ["Verified", "Trusted suppliers"]].map(([val, label]) => (
            <div key={label} style={{ padding: "8px 0" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text, letterSpacing: "-0.03em", marginBottom: 2 }}>{val}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 6, letterSpacing: "-0.03em" }}>Explore categories</h2>
            <p style={{ color: C.muted, fontSize: 14 }}>Browse thousands of products across every industry</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 8 }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => go("products", { category: cat.id })}
                style={{ background: C.surface, border, borderRadius: 8, padding: "16px 14px", cursor: "pointer", textAlign: "left", fontFamily: F, transition: "border-color .15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.primaryMuted}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 4, fontWeight: 500 }}>{cat.id.toUpperCase()}</div>
                <div style={{ fontWeight: 500, fontSize: 14, color: C.text }}>{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section style={{ padding: "0 24px 64px", borderTop }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 4, letterSpacing: "-0.03em" }}>Trending products</h2>
              <p style={{ color: C.muted, fontSize: 14 }}>Top picks from Gulf suppliers</p>
            </div>
            <Btn onClick={() => go("products")} variant="outline" size="sm">View all</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
            {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} onClick={() => go("productDetail", { productId: p.id })} />)}
          </div>
        </div>
      </section>

      {/* For Vendors */}
      <section style={{ padding: "64px 24px", borderTop }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <Badge variant="success" style={{ marginBottom: 16 }}>For Vendors</Badge>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: "14px 0", lineHeight: 1.15, letterSpacing: "-0.03em" }}>Expand your reach across the Gulf</h2>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.65, marginBottom: 24 }}>List your products, connect with thousands of buyers, and manage orders seamlessly.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
              {["Unlimited listings", "Sales analytics", "GCC-wide reach", "Verified badge"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 6, background: C.surface, border, fontSize: 13, color: C.text }}>
                  <span style={{ color: C.primary, fontWeight: 700 }}>+</span> {f}
                </div>
              ))}
            </div>
            <Btn size="md">Start selling</Btn>
          </div>
          <Card style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, aspectRatio: "1", background: C.bg }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: C.text, letterSpacing: "-0.04em" }}>12K+</div>
            <div style={{ color: C.muted, fontSize: 14 }}>Active vendors</div>
          </Card>
        </div>
      </section>

      {/* For Suppliers */}
      <section style={{ padding: "64px 24px", borderTop, background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <Card style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, aspectRatio: "1", background: C.primaryLight }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: C.primary, letterSpacing: "-0.04em" }}>50K+</div>
            <div style={{ color: C.primaryMuted, fontSize: 14 }}>Verified suppliers</div>
          </Card>
          <div>
            <Badge variant="primary">For Suppliers</Badge>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: "14px 0", lineHeight: 1.15, letterSpacing: "-0.03em" }}>Become a trusted UAE supplier</h2>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.65, marginBottom: 24 }}>Get verified, showcase your products, and receive direct inquiries from UAE buyers.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
              {["Direct buyer access", "Trust certification", "Instant RFQs", "Buyer network"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 6, background: C.bg, border, fontSize: 13, color: C.text }}>
                  <span style={{ color: C.primary, fontWeight: 700 }}>+</span> {f}
                </div>
              ))}
            </div>
            <Btn size="md">Register as supplier</Btn>
          </div>
        </div>
      </section>

      {/* Investors */}
      <section style={{ padding: "64px 24px", borderTop }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Badge variant="warning">For Investors</Badge>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: "16px 0 12px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>Invest in the Gulf's fastest-growing trade ecosystem</h2>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.65, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>The GCC B2B market is projected to reach $35B by 2030. Usool connects you with high-growth suppliers.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {[["180%", "YoY Growth", "Platform trade volume growth"], ["$2B+", "Trade Volume", "Annual GMV processed"], ["6", "GCC Markets", "Full regional coverage"]].map(([val, label, desc]) => (
              <Card key={label} style={{ padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.text, letterSpacing: "-0.04em", marginBottom: 4 }}>{val}</div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, color: C.text }}>{label}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "64px 24px", borderTop, background: C.surface }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 6, letterSpacing: "-0.03em" }}>How it works</h2>
          <p style={{ color: C.muted, fontSize: 14, marginBottom: 48 }}>Start trading in three simple steps</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {[["Browse", "01", "Search thousands of products and verified suppliers across the Gulf"], ["Connect", "02", "Send inquiries, request quotes, and message suppliers directly"], ["Trade", "03", "Negotiate deals, place orders, and grow your Gulf trade network"]].map(([title, step, desc]) => (
              <div key={title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.primaryMuted, letterSpacing: "0.1em", marginBottom: 12 }}>{step}</div>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.primaryLight, border: `0.5px solid ${C.primaryMuted}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: C.primary }}>{step}</span>
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 8, letterSpacing: "-0.02em" }}>{title}</h3>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Logos */}
      <section style={{ padding: "24px 0", borderTop, borderBottom, overflow: "hidden" }}>
        <p style={{ textAlign: "center", fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Trusted by leading Gulf businesses</p>
        <div style={{ overflow: "hidden" }}>
          <div className="marquee-track">
            {[...trustedLogos, ...trustedLogos].map((logo, i) => (
              <span key={i} style={{ margin: "0 36px", fontSize: 13, fontWeight: 500, color: C.border }}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 6, letterSpacing: "-0.03em" }}>What our traders say</h2>
            <p style={{ color: C.muted, fontSize: 14 }}>Trusted by businesses across the Gulf</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {testimonials.map((t, i) => (
              <Card key={i} style={{ padding: 24 }}>
                <div style={{ color: "#A16207", fontSize: 13, marginBottom: 14, letterSpacing: "0.05em" }}>★ ★ ★ ★ ★</div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 18 }}>"{t.text}"</p>
                <div style={{ borderTop, paddingTop: 14 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{t.role} · {t.country}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.primary, padding: "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.03em" }}>Ready to grow your Gulf trade?</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 28 }}>Join thousands of businesses already trading on Usool. Sign up free today.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button style={{ background: "#fff", color: C.primary, border: "none", padding: "10px 22px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Join as buyer</button>
            <button style={{ background: "transparent", color: "#fff", border: "0.5px solid rgba(255,255,255,0.4)", padding: "10px 22px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Join as supplier</button>
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
  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [search, setSearch] = useState(initSearch);

  const filtered = products.filter(p => {
    const matchCat = !selectedCategory || p.category === selectedCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.supplier.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, marginBottom: 3, letterSpacing: "-0.03em" }}>All products</h1>
            <p style={{ color: C.muted, fontSize: 13 }}>{filtered.length} results</p>
          </div>
          <select style={{ padding: "7px 12px", borderRadius: 6, border, fontSize: 13, fontFamily: F, background: C.surface, color: C.text }}>
            <option>Relevance</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <aside style={{ width: 200, flexShrink: 0 }}>
            <Card style={{ padding: 16 }}>
              <div style={{ marginBottom: 18 }}>
                <p style={{ fontWeight: 600, fontSize: 12, color: C.text, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Search</p>
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
              </div>
              <div style={{ marginBottom: 18 }}>
                <p style={{ fontWeight: 600, fontSize: 12, color: C.text, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Category</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <button onClick={() => setSelectedCategory("")} style={{ textAlign: "left", padding: "6px 8px", borderRadius: 5, border: "none", cursor: "pointer", fontSize: 13, fontFamily: F, background: !selectedCategory ? C.primaryLight : "transparent", color: !selectedCategory ? C.primary : C.muted, fontWeight: !selectedCategory ? 500 : 400 }}>All categories</button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ textAlign: "left", padding: "6px 8px", borderRadius: 5, border: "none", cursor: "pointer", fontSize: 13, fontFamily: F, background: selectedCategory === cat.id ? C.primaryLight : "transparent", color: selectedCategory === cat.id ? C.primary : C.muted, fontWeight: selectedCategory === cat.id ? 500 : 400 }}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 12, color: C.text, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Emirate</p>
                {["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah"].map(e => (
                  <label key={e} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: C.muted, marginBottom: 7, cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: C.primary }} /> {e}
                  </label>
                ))}
              </div>
            </Card>
          </aside>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10, alignContent: "start" }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onClick={() => go("productDetail", { productId: p.id })} />)}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60, color: C.muted }}>
                <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>No products found</p>
                <p style={{ fontSize: 13 }}>Try adjusting your filters</p>
              </div>
            )}
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
  const product = products.find(p => p.id === productId) || products[0];
  const supplier = suppliers.find(s => s.id === product.supplierId) || suppliers[0];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const [showContact, setShowContact] = useState(false);
  const specs = [["Category", product.category], ["MOQ", product.moq], ["Origin", product.country.name], ["Supply ability", "10,000 units/month"], ["Lead time", "7–15 business days"], ["Payment", "T/T, L/C, Western Union"]];
  const tiers = [{ range: "1–99 units", price: product.price }, { range: "100–499 units", price: "10% off" }, { range: "500+ units", price: "20% off" }];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      {showContact && <ContactModal supplier={supplier} onClose={() => setShowContact(false)} />}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>
        <button onClick={() => go("products")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.muted, display: "flex", alignItems: "center", gap: 5, marginBottom: 24, fontFamily: F }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to products
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28 }}>
          <div>
            <div style={{ aspectRatio: "16/10", borderRadius: 8, overflow: "hidden", marginBottom: 24, border }}>
              <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8, letterSpacing: "-0.02em" }}>{product.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#A16207" }}>★ {product.rating}</span>
                  {product.verified && <Badge variant="success">Verified</Badge>}
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.primary, letterSpacing: "-0.03em" }}>{product.price}</div>
            </div>
            <Card style={{ padding: 18, marginBottom: 12 }}>
              <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 12, color: C.text }}>Bulk pricing</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {tiers.map((t, i) => (
                  <div key={i} style={{ background: C.bg, borderRadius: 6, padding: "10px 12px", border }}>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>{t.range}</div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: C.primary }}>{t.price}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card style={{ padding: 18 }}>
              <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 14, color: C.text }}>Specifications</p>
              {specs.map(([label, value]) => (
                <div key={label} style={{ display: "flex", padding: "9px 0", borderBottom, fontSize: 13 }}>
                  <span style={{ color: C.muted, width: 140, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontWeight: 500, color: C.text }}>{value}</span>
                </div>
              ))}
            </Card>
          </div>
          <div>
            <Card style={{ padding: 20, position: "sticky", top: 72 }}>
              <button onClick={() => go("supplierProfile", { supplierId: supplier.id })} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginBottom: 18, width: "100%", textAlign: "left" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", border, flexShrink: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: C.primary }}>{supplier.name[0]}</span>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{supplier.name}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{product.country.name}{supplier.verified ? " · Verified" : ""}</div>
                </div>
              </button>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[["Response", supplier.stats.responseRate], ["Years", supplier.stats.yearsActive]].map(([l, v]) => (
                  <div key={l} style={{ background: C.bg, borderRadius: 6, padding: "9px 10px", border, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{l}</div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{v}</div>
                  </div>
                ))}
              </div>
              <Btn onClick={() => setShowContact(true)} style={{ width: "100%", marginBottom: 8 }}>Request quote</Btn>
              <Btn onClick={() => setShowContact(true)} variant="outline" style={{ width: "100%" }}>Contact supplier</Btn>
            </Card>
          </div>
        </div>
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.02em" }}>Related products</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {related.map(p => <ProductCard key={p.id} product={p} onClick={() => go("productDetail", { productId: p.id })} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ─── SUPPLIER PROFILE PAGE ────────────────────────────────────────────────────
function SupplierProfilePage({ supplierId }) {
  const { go } = useNav();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!supplierId) return;
    supabase.from("suppliers").select("*").eq("id", supplierId).single().then(({ data }) => {
      setSupplier(data); setLoading(false);
    });
  }, [supplierId]);

  if (loading) return <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner /></div>;
  if (!supplier) return <div style={{ textAlign: "center", padding: 80, color: C.muted }}>Supplier not found.</div>;

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      {showContact && <ContactModal supplier={supplier} onClose={() => setShowContact(false)} />}
      <div style={{ background: C.primary, height: 160 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 18, transform: "translateY(-40px)" }}>
          <div style={{ width: 80, height: 80, borderRadius: 10, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", border, overflow: "hidden", flexShrink: 0 }}>
            {supplier.logo_url ? <img src={supplier.logo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontWeight: 700, fontSize: 24, color: C.primary }}>{(supplier.company_name || "S")[0]}</span>}
          </div>
          <div style={{ paddingBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: C.surface, letterSpacing: "-0.02em" }}>{supplier.company_name}</h1>
              {supplier.verified && <Badge variant="success">Verified</Badge>}
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{supplier.emirate} · {supplier.category}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 24, marginTop: -24, paddingBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: C.text }}>About</h2>
              <p style={{ color: C.muted, lineHeight: 1.7, fontSize: 14 }}>{supplier.description || supplier.tagline || "No description provided."}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }}>
              {[["MOQ", supplier.moq], ["Lead Time", supplier.lead_time], ["Employees", supplier.employees], ["Founded", supplier.founded]].filter(([, v]) => v).map(([label, val]) => (
                <Card key={label} style={{ padding: "14px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 3, letterSpacing: "-0.02em" }}>{val}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{label}</div>
                </Card>
              ))}
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: C.text }}>Product catalog</h2>
            <Card style={{ padding: "32px 0", textAlign: "center", background: C.bg }}>
              <p style={{ color: C.muted, fontSize: 13 }}>No products listed yet.</p>
            </Card>
          </div>
          <div>
            <Card style={{ padding: 18, position: "sticky", top: 72 }}>
              <Btn onClick={() => setShowContact(true)} style={{ width: "100%", marginBottom: 8 }}>Contact supplier</Btn>
              <Btn onClick={() => setShowContact(true)} variant="outline" style={{ width: "100%", marginBottom: 16 }}>Request catalog</Btn>
              {(supplier.phone || supplier.email || supplier.website) && (
                <div style={{ borderTop, paddingTop: 14 }}>
                  <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 10, color: C.text, letterSpacing: "0.04em", textTransform: "uppercase" }}>Contact info</p>
                  {supplier.phone && <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>Tel: {supplier.phone}</div>}
                  {supplier.email && <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>Email: {supplier.email}</div>}
                  {supplier.website && <div style={{ fontSize: 13 }}><a href={supplier.website} target="_blank" rel="noreferrer" style={{ color: C.primary }}>{supplier.website}</a></div>}
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

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage() {
  const { user, profile } = useAuth();
  const { go } = useNav();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [pendingSuppliers, setPendingSuppliers] = useState([]);
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
    setPendingSuppliers(suppliersData || []);
    setStats({ users: profilesData?.length || 0, suppliers: suppliersData?.filter(s => s.status === "Active").length || 0, buyers: profilesData?.filter(p => p.role === "buyer").length || 0, messages: msgsData?.length || 0 });
    setLoading(false);
  }

  async function approveSupplier(id) {
    await supabase.from("suppliers").update({ status: "Active" }).eq("id", id);
    setPendingSuppliers(prev => prev.map(s => s.id === id ? { ...s, status: "Active" } : s));
  }
  async function rejectSupplier(id) {
    await supabase.from("suppliers").update({ status: "Rejected" }).eq("id", id);
    setPendingSuppliers(prev => prev.map(s => s.id === id ? { ...s, status: "Rejected" } : s));
  }
  async function updateRole(userId, role) {
    await supabase.from("profiles").update({ role }).eq("id", userId);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
  }
  async function deleteUser(userId) {
    if (!confirm("Delete this user?")) return;
    await supabase.from("profiles").delete().eq("id", userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
  }

  const tabs = [{ id: "overview", label: "Overview" }, { id: "suppliers", label: `Suppliers (${pendingSuppliers.length})` }, { id: "users", label: "Users" }, { id: "messages", label: "Messages" }];

  if (loading) return <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner /></div>;

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 3, letterSpacing: "-0.03em" }}>Admin panel</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>Manage your Usool platform</p>
        </div>
        <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", fontFamily: F, fontWeight: 500, fontSize: 13, color: activeTab === t.id ? C.primary : C.muted, borderBottom: `1.5px solid ${activeTab === t.id ? C.primary : "transparent"}`, marginBottom: -0.5 }}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }}>
              {[["Total users", stats.users], ["Suppliers", stats.suppliers], ["Buyers", stats.buyers], ["Messages", stats.messages]].map(([label, value]) => (
                <Card key={label} style={{ padding: 18 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: "-0.03em", marginBottom: 2 }}>{value}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{label}</div>
                </Card>
              ))}
            </div>
            <Card style={{ overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom }}><p style={{ fontWeight: 600, fontSize: 13, color: C.text }}>Recent signups</p></div>
              {users.slice(0, 5).map(u => (
                <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                    {(u.full_name || u.email || "?")[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, color: C.text }}>{u.full_name || "No name"}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{u.email}</div>
                  </div>
                  <Badge variant={u.role === "admin" ? "warning" : u.role === "supplier" ? "primary" : "default"}>{u.role || "buyer"}</Badge>
                  <div style={{ fontSize: 12, color: C.muted }}>{new Date(u.created_at).toLocaleDateString()}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {activeTab === "suppliers" && (
          <Card style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom }}>
              <p style={{ fontWeight: 600, fontSize: 13, color: C.text }}>Supplier applications ({pendingSuppliers.length})</p>
            </div>
            {pendingSuppliers.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: C.muted }}><p style={{ fontSize: 13 }}>No supplier applications yet</p></div>
            ) : pendingSuppliers.map(s => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom, flexWrap: "wrap" }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", border, flexShrink: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: C.primary }}>{(s.company_name || "S")[0]}</span>
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: C.text, marginBottom: 2 }}>{s.company_name}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{s.emirate} · {s.category} · {s.email}</div>
                </div>
                <StatusBadge status={s.status} />
                {s.status === "Pending" && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn onClick={() => approveSupplier(s.id)} variant="outline" size="sm" style={{ color: C.success, borderColor: "#BBF7D0" }}>Approve</Btn>
                    <Btn onClick={() => rejectSupplier(s.id)} variant="danger" size="sm">Reject</Btn>
                  </div>
                )}
              </div>
            ))}
          </Card>
        )}

        {activeTab === "users" && (
          <Card style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom }}>
              <p style={{ fontWeight: 600, fontSize: 13, color: C.text }}>All users ({users.length})</p>
            </div>
            {users.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: C.muted }}><p style={{ fontSize: 13 }}>No users yet</p></div>
            ) : users.map(u => (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom, flexWrap: "wrap" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                  {(u.full_name || u.email || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 500, fontSize: 13, color: C.text }}>{u.full_name || "No name"}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{u.email}</div>
                </div>
                <Badge variant={u.role === "admin" ? "warning" : u.role === "supplier" ? "primary" : "default"}>{u.role || "buyer"}</Badge>
                <div style={{ display: "flex", gap: 6 }}>
                  {u.role !== "admin" && (
                    <select value={u.role || "buyer"} onChange={e => updateRole(u.id, e.target.value)}
                      style={{ padding: "5px 8px", borderRadius: 5, border, fontSize: 12, fontFamily: F, cursor: "pointer", background: C.surface, color: C.text }}>
                      <option value="buyer">Buyer</option>
                      <option value="supplier">Supplier</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                  {u.id !== user.id && (
                    <Btn onClick={() => deleteUser(u.id)} variant="danger" size="sm">Delete</Btn>
                  )}
                </div>
              </div>
            ))}
          </Card>
        )}

        {activeTab === "messages" && (
          <Card style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom }}>
              <p style={{ fontWeight: 600, fontSize: 13, color: C.text }}>All messages ({allMessages.length})</p>
            </div>
            {allMessages.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: C.muted }}><p style={{ fontSize: 13 }}>No messages yet</p></div>
            ) : allMessages.map(msg => (
              <div key={msg.id} style={{ padding: "14px 18px", borderBottom, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                  {(msg.sender_name || msg.sender_email || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{msg.sender_name || "Unknown"}</span>
                      <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{msg.sender_email}</span>
                    </div>
                    <span style={{ fontSize: 12, color: C.muted }}>{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{msg.content}</p>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── SUPPLIER REGISTRATION ────────────────────────────────────────────────────
function SupplierRegistrationPage() {
  const { user } = useAuth();
  const { go } = useNav();
  const [form, setForm] = useState({ company_name: "", tagline: "", category: "", emirate: "", description: "", phone: "", email: "", website: "", moq: "", lead_time: "", employees: "", founded: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const categoryOptions = ["Healthcare", "Packaging", "Textiles & Apparel", "Machinery", "Agriculture", "Electronics"];
  const emirateOptions = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

  async function handleSubmit() {
    if (!user) { go("auth"); return; }
    if (!form.company_name || !form.category || !form.emirate) { setError("Please fill in Company Name, Category and Emirate."); return; }
    setSaving(true); setError("");
    const { error: err } = await supabase.from("suppliers").insert({
      profile_id: user.id, company_name: form.company_name, tagline: form.tagline, category: form.category,
      emirate: form.emirate, description: form.description, phone: form.phone, email: form.email || user.email,
      website: form.website, moq: form.moq, lead_time: form.lead_time, employees: form.employees,
      founded: form.founded, status: "Pending", verified: false, featured: false,
    });
    setSaving(false);
    if (err) setError("Failed to submit. " + err.message);
    else { setSuccess(true); await supabase.from("profiles").update({ role: "supplier" }).eq("id", user.id); }
  }

  if (success) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.successBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 20, color: C.success }}>✓</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>Application submitted</h2>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>Your supplier profile is under review. Once approved, your business will appear on Usool for buyers to find.</p>
        <Btn onClick={() => go("home")}>Back to home</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "48px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, marginBottom: 6, letterSpacing: "-0.03em" }}>Register as a supplier</h1>
          <p style={{ color: C.muted, fontSize: 14 }}>Join Usool and connect with buyers across the GCC.</p>
        </div>
        {error && <div style={{ background: C.dangerBg, border: `0.5px solid #FECACA`, color: C.danger, padding: "10px 14px", borderRadius: 6, fontSize: 13, marginBottom: 16 }}>{error}</div>}
        <Card style={{ padding: 28 }}>
          <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 20, color: C.text, letterSpacing: "-0.01em" }}>Company information</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            {[["Company Name *", "company_name", "text", "Gulf Steel Industries"], ["Tagline", "tagline", "text", "Short description"], ["Phone", "phone", "text", "+971 50 000 0000"], ["Email", "email", "email", user?.email || "company@example.com"], ["Website", "website", "text", "https://yourwebsite.com"], ["MOQ", "moq", "text", "e.g. 100 units"], ["Lead Time", "lead_time", "text", "e.g. 2–3 weeks"], ["Employees", "employees", "text", "e.g. 50–100"], ["Founded", "founded", "text", "e.g. 2010"]].map(([label, key, type, ph]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <Label>{label}</Label>
                <Input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <Label>Category *</Label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border, fontSize: 14, fontFamily: F, background: C.surface, color: C.text }}>
                <option value="">Select category</option>
                {categoryOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <Label>Emirate *</Label>
              <select value={form.emirate} onChange={e => setForm(f => ({ ...f, emirate: e.target.value }))}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border, fontSize: 14, fontFamily: F, background: C.surface, color: C.text }}>
                <option value="">Select emirate</option>
                {emirateOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <Label>Company description</Label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
              placeholder="Tell buyers about your company, products, and what makes you unique..."
              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border, fontSize: 14, fontFamily: F, resize: "vertical", color: C.text, background: C.surface }} />
          </div>
          <Btn onClick={handleSubmit} disabled={saving} style={{ width: "100%" }}>
            {saving ? <Spinner /> : "Submit application"}
          </Btn>
          <p style={{ textAlign: "center", fontSize: 12, color: C.muted, marginTop: 10 }}>Reviewed and approved within 24 hours</p>
        </Card>
      </div>
      <div style={{ marginTop: 40 }}><Footer /></div>
    </div>
  );
}

// ─── SUPPLIERS PAGE ───────────────────────────────────────────────────────────
function SuppliersPage() {
  const { go } = useNav();
  const [realSuppliers, setRealSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => { loadSuppliers(); }, []);
  async function loadSuppliers() {
    setLoading(true);
    const { data } = await supabase.from("suppliers").select("*").eq("status", "Active").order("featured", { ascending: false });
    setRealSuppliers(data || []); setLoading(false);
  }

  const filtered = realSuppliers.filter(s => {
    const matchSearch = !search || s.company_name?.toLowerCase().includes(search.toLowerCase()) || s.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const categoryOptions = ["Healthcare", "Packaging", "Textiles & Apparel", "Machinery", "Agriculture", "Electronics"];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.03em", color: C.text }}>UAE suppliers</h1>
            <p style={{ color: C.muted, fontSize: 13 }}>Verified suppliers ready to trade</p>
          </div>
          <Btn onClick={() => go("supplierRegister")}>Register as supplier</Btn>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppliers..." style={{ flex: 1 }} />
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 6, border, fontSize: 13, fontFamily: F, background: C.surface, color: C.text }}>
            <option value="">All categories</option>
            {categoryOptions.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Spinner /></div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "72px 0" }}>
            <p style={{ fontWeight: 600, fontSize: 18, marginBottom: 8, color: C.text, letterSpacing: "-0.02em" }}>No suppliers yet</p>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>Be the first supplier to join Usool.</p>
            <Btn onClick={() => go("supplierRegister")}>Register now</Btn>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {filtered.map(s => (
              <Card key={s.id} onClick={() => go("supplierProfile", { supplierId: s.id })}
                style={{ padding: 20, cursor: "pointer", transition: "border-color .15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.primaryMuted}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", border, flexShrink: 0, overflow: "hidden" }}>
                    {s.logo_url ? <img src={s.logo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontWeight: 700, fontSize: 14, color: C.primary }}>{(s.company_name || "S")[0]}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 2 }}>{s.company_name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{s.emirate} · {s.category}</div>
                  </div>
                  {s.verified && <Badge variant="success">Verified</Badge>}
                </div>
                {(s.tagline || s.description) && <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 12 }}>{(s.tagline || s.description || "").slice(0, 90)}{((s.tagline || s.description || "").length > 90 ? "…" : "")}</p>}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {s.moq && <Badge>MOQ: {s.moq}</Badge>}
                  {s.lead_time && <Badge variant="success">{s.lead_time}</Badge>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage() {
  const { user, profile } = useAuth();
  const { go } = useNav();
  const [activeView, setActiveView] = useState("overview");
  const [realMessages, setRealMessages] = useState([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const statusColors = { pending: "warning", replied: "primary", accepted: "success", expired: "default" };

  useEffect(() => { if (!user) return; loadMessages(); }, [user]);

  async function loadMessages() {
    setLoadingMsgs(true);
    let query = supabase.from("messages").select("*").order("created_at", { ascending: false });
    if (profile?.role === "supplier") {
      const { data: sup } = await supabase.from("suppliers").select("id").eq("profile_id", user.id).single();
      if (sup) query = query.eq("supplier_id", sup.id);
    } else { query = query.eq("sender_id", user.id); }
    const { data } = await query;
    setRealMessages(data || []); setLoadingMsgs(false);
  }

  async function markRead(msgId) {
    await supabase.from("messages").update({ read: true }).eq("id", msgId);
    setRealMessages(prev => prev.map(m => m.id === msgId ? { ...m, read: true } : m));
  }

  const unreadCount = realMessages.filter(m => !m.read).length;
  const navItems = [{ id: "overview", label: "Overview" }, { id: "inquiries", label: "Inquiries" }, { id: "messages", label: unreadCount > 0 ? `Messages (${unreadCount})` : "Messages" }, { id: "saved", label: "Saved" }, { id: "settings", label: "Settings" }];

  if (!user) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", border }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: C.text, letterSpacing: "-0.02em" }}>Sign in to access your dashboard</h2>
      <Btn onClick={() => go("auth")}>Sign in</Btn>
    </div>
  );

  function renderView() {
    if (activeView === "inquiries") return (
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.02em", color: C.text }}>My inquiries</h1>
        <Card style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr style={{ borderBottom }}>{["ID", "Product", "Supplier", "Date", "Qty", "Status"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: C.muted, fontWeight: 500, fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
            <tbody>{inquiries.map(inq => (
              <tr key={inq.id} style={{ borderBottom }}>
                <td style={{ padding: "10px 14px", fontFamily: "monospace", fontSize: 11, color: C.muted }}>{inq.id}</td>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: C.text }}>{inq.product}</td>
                <td style={{ padding: "10px 14px", color: C.muted }}>{inq.supplier}</td>
                <td style={{ padding: "10px 14px", color: C.muted }}>{inq.date}</td>
                <td style={{ padding: "10px 14px", color: C.text }}>{inq.quantity}</td>
                <td style={{ padding: "10px 14px" }}><Badge variant={statusColors[inq.status]}>{inq.status}</Badge></td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
      </div>
    );
    if (activeView === "messages") return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: C.text }}>Messages</h1>
          {unreadCount > 0 && <Badge variant="primary">{unreadCount} unread</Badge>}
        </div>
        {loadingMsgs ? <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div> :
          realMessages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "56px 0", color: C.muted }}>
              <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: C.text }}>No messages yet</p>
              <p style={{ fontSize: 13 }}>Messages from buyers will appear here</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {realMessages.map(msg => (
                <Card key={msg.id} onClick={() => markRead(msg.id)}
                  style={{ padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer", borderColor: !msg.read ? C.primaryMuted : C.border, transition: "border-color .15s" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                    {(msg.sender_name || msg.sender_email || "?")[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{msg.sender_name || msg.sender_email}</span>
                        {!msg.read && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary, display: "inline-block" }} />}
                      </div>
                      <span style={{ fontSize: 12, color: C.muted }}>{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    {msg.sender_company && <div style={{ fontSize: 12, color: C.muted, marginBottom: 3 }}>{msg.sender_company} · {msg.sender_email}</div>}
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{msg.content}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
      </div>
    );
    if (activeView === "saved") return (
      <div style={{ textAlign: "center", padding: "56px 0", color: C.muted }}>
        <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: C.text }}>No saved products</p>
        <p style={{ fontSize: 13, marginBottom: 16 }}>Products you save will appear here</p>
        <Btn onClick={() => go("products")} variant="outline" size="sm">Browse products</Btn>
      </div>
    );
    if (activeView === "settings") return (
      <div style={{ textAlign: "center", padding: "56px 0", color: C.muted }}>
        <p style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 6 }}>Account settings</p>
        <p style={{ fontSize: 13 }}>Coming soon</p>
      </div>
    );

    return (
      <div>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 3, letterSpacing: "-0.02em", color: C.text }}>Dashboard</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>Welcome back — here's your trading overview.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }}>
          {[{ label: "Active inquiries", value: dashboardStats.activeInquiries, accent: C.primary }, { label: "Pending quotes", value: dashboardStats.pendingQuotes, accent: "#92400E" }, { label: "New messages", value: dashboardStats.newMessages, accent: "#1E40AF" }, { label: "Saved products", value: dashboardStats.savedProducts, accent: "#9D174D" }].map(stat => (
            <Card key={stat.label} style={{ padding: 16 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: stat.accent, letterSpacing: "-0.04em", marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{stat.label}</div>
            </Card>
          ))}
        </div>
        <Card style={{ marginBottom: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom }}><p style={{ fontWeight: 600, fontSize: 13, color: C.text }}>Recent inquiries</p></div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr style={{ borderBottom }}>{["ID", "Product", "Supplier", "Qty", "Status"].map(h => <th key={h} style={{ padding: "9px 14px", textAlign: "left", color: C.muted, fontWeight: 500, fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
            <tbody>{inquiries.slice(0, 3).map(inq => (
              <tr key={inq.id} style={{ borderBottom }}>
                <td style={{ padding: "9px 14px", fontFamily: "monospace", fontSize: 11, color: C.muted }}>{inq.id}</td>
                <td style={{ padding: "9px 14px", fontWeight: 500, color: C.text }}>{inq.product}</td>
                <td style={{ padding: "9px 14px", color: C.muted }}>{inq.supplier}</td>
                <td style={{ padding: "9px 14px", color: C.text }}>{inq.quantity}</td>
                <td style={{ padding: "9px 14px" }}><Badge variant={statusColors[inq.status]}>{inq.status}</Badge></td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
        <Card style={{ overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom }}><p style={{ fontWeight: 600, fontSize: 13, color: C.text }}>Recent messages</p></div>
          <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
            {messages.slice(0, 3).map(msg => (
              <div key={msg.id} style={{ display: "flex", gap: 10, padding: "9px 10px", borderRadius: 6, background: msg.unread ? C.primaryLight : "transparent", alignItems: "center" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.primaryLight, border, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{msg.from[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 1 }}>
                    <span style={{ fontWeight: 500, fontSize: 13, color: C.text }}>{msg.from}</span>
                    {msg.unread && <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.primary, display: "inline-block", flexShrink: 0 }} />}
                  </div>
                  <p style={{ fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.preview}</p>
                </div>
                <span style={{ fontSize: 11, color: C.muted, flexShrink: 0 }}>{msg.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
      <div style={{ width: 200, background: C.surface, borderRight, flexShrink: 0, padding: "20px 12px" }}>
        <p style={{ padding: "0 8px", marginBottom: 16, fontWeight: 600, fontSize: 11, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Account</p>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveView(item.id)}
            style={{ width: "100%", textAlign: "left", padding: "7px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontFamily: F, fontWeight: activeView === item.id ? 500 : 400, color: activeView === item.id ? C.primary : C.muted, background: activeView === item.id ? C.primaryLight : "transparent", display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, background: C.bg }}>
        <div style={{ height: 48, borderBottom, background: C.surface, display: "flex", alignItems: "center", padding: "0 20px" }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: C.muted }}>{navItems.find(n => n.id === activeView)?.label}</span>
        </div>
        <div style={{ padding: 20 }}>{renderView()}</div>
      </div>
    </div>
  );
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
function AuthPage() {
  const { signIn, signUp } = useAuth();
  const { go } = useNav();
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
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: C.bg }}>
      <Card style={{ width: "100%", maxWidth: 380, padding: 32, animation: "fadeUp .25s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <div style={{ width: 24, height: 24, borderRadius: 5, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>U</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}>Usool</span>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.02em" }}>{mode === "login" ? "Welcome back" : "Create account"}</h2>
        <p style={{ color: C.muted, fontSize: 13, marginBottom: 22 }}>{mode === "login" ? "Sign in to your account" : "Join Usool for free"}</p>
        {error && <div style={{ background: C.dangerBg, border: `0.5px solid #FECACA`, color: C.danger, padding: "9px 12px", borderRadius: 6, fontSize: 13, marginBottom: 14 }}>{error}</div>}
        {success && <div style={{ background: C.successBg, border: `0.5px solid #BBF7D0`, color: C.success, padding: "9px 12px", borderRadius: 6, fontSize: 13, marginBottom: 14 }}>{success}</div>}
        {mode === "signup" && (
          <>
            <div style={{ marginBottom: 12 }}>
              <Label>Full name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <Label>I am a</Label>
              <div style={{ display: "flex", gap: 8 }}>
                {["buyer", "supplier"].map(r => (
                  <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "8px", borderRadius: 6, border: `0.5px solid ${role === r ? C.primary : C.border}`, background: role === r ? C.primaryLight : C.surface, color: role === r ? C.primary : C.muted, fontFamily: F, fontWeight: 500, fontSize: 13, cursor: "pointer", textTransform: "capitalize" }}>{r}</button>
                ))}
              </div>
            </div>
          </>
        )}
        <div style={{ marginBottom: 12 }}>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div style={{ marginBottom: 18 }}>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <Btn onClick={handle} disabled={loading} style={{ width: "100%", marginBottom: 14 }}>
          {loading ? <Spinner /> : mode === "login" ? "Sign in" : "Create account"}
        </Btn>
        <p style={{ textAlign: "center", fontSize: 13, color: C.muted }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }} style={{ color: C.primary, fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: F }}>
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </Card>
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg }}>
      <div style={{ textAlign: "center" }}>
        <Spinner />
        <div style={{ marginTop: 10, color: C.muted, fontSize: 13 }}>Loading Usool…</div>
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
    <div style={{ minHeight: "100vh", animation: "fadeUp .2s ease" }}>
      <Navbar />
      {pages[page] || (
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 64, fontWeight: 700, color: C.border, letterSpacing: "-0.05em" }}>404</p>
          <p style={{ color: C.muted, fontSize: 14 }}>Page not found</p>
          <Btn onClick={() => {}} variant="outline" size="sm">Go home</Btn>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </AuthProvider>
  );
}
