import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE ────────────────────────────────────────────────────────────────
const supabase = createClient(
  "https://tkwlrbenttxosgolitjf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrd2xyYmVudHR4b3Nnb2xpdGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDgxNzksImV4cCI6MjA5MjQyNDE3OX0.kS8c7hbVIdwWU7Uppppcz2FHfTqZ1NkAdhj6_CZoDAI"
);

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const countries = [
  { code: "AE", name: "UAE", flag: "🇦🇪" },
];

const categories = [
  { id: "healthcare", name: "Healthcare", icon: "🏥", count: 0 },
  { id: "packaging", name: "Packaging", icon: "📦", count: 0 },
  { id: "textiles", name: "Textiles & Apparel", icon: "👔", count: 0 },
  { id: "machinery", name: "Machinery", icon: "⚙️", count: 0 },
  { id: "agriculture", name: "Agriculture", icon: "🌾", count: 0 },
  { id: "electronics", name: "Electronics", icon: "💻", count: 0 },
];

const UAE = { code: "AE", name: "UAE", flag: "🇦🇪" };

const products = [
  { id: "1", title: "Industrial Steel Pipes - Grade A", category: "construction", price: "$12 - $45", moq: "500 pieces", supplier: "Gulf Steel Industries", supplierId: "s1", country: UAE, rating: 4.8, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400", verified: true },
  { id: "2", title: "Organic Dates - Premium Medjool", category: "food", price: "$8 - $25", moq: "100 kg", supplier: "Al Madinah Dates Co.", supplierId: "s2", country: UAE, rating: 4.9, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400", verified: true },
  { id: "3", title: "LED Panel Lights - Commercial Grade", category: "electronics", price: "$15 - $60", moq: "200 units", supplier: "Noor Electronics LLC", supplierId: "s3", country: UAE, rating: 4.6, image: "https://images.unsplash.com/photo-1565814329452-e1432bc237d1?w=400", verified: false },
  { id: "4", title: "Cotton Fabric Rolls - Premium", category: "textiles", price: "$3 - $12/m", moq: "1000 meters", supplier: "Khaleeji Textiles", supplierId: "s4", country: UAE, rating: 4.7, image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400", verified: true },
  { id: "5", title: "CNC Milling Machine - 5 Axis", category: "machinery", price: "$25,000 - $80,000", moq: "1 unit", supplier: "Precision Gulf Machinery", supplierId: "s5", country: UAE, rating: 4.5, image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400", verified: true },
  { id: "6", title: "Automotive Brake Pads - OEM Quality", category: "auto", price: "$5 - $20", moq: "500 sets", supplier: "Emirates Auto Parts", supplierId: "s6", country: UAE, rating: 4.4, image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400", verified: false },
  { id: "7", title: "Industrial Chemical Solvents", category: "chemicals", price: "$50 - $200/barrel", moq: "10 barrels", supplier: "Gulf Chem Solutions", supplierId: "s7", country: UAE, rating: 4.3, image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400", verified: true },
  { id: "8", title: "Designer Leather Handbags", category: "fashion", price: "$30 - $150", moq: "50 pieces", supplier: "Souq Fashion House", supplierId: "s8", country: UAE, rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", verified: true },
  { id: "9", title: "Crude Oil Processing Equipment", category: "oil-gas", price: "$100,000+", moq: "1 unit", supplier: "Petro Gulf Equipment", supplierId: "s1", country: UAE, rating: 4.9, image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400", verified: true },
  { id: "10", title: "Corrugated Packaging Boxes", category: "packaging", price: "$0.50 - $3", moq: "5000 pieces", supplier: "Pack Gulf Industries", supplierId: "s2", country: UAE, rating: 4.2, image: "https://images.unsplash.com/photo-1607166452427-7e4477c3a9ed?w=400", verified: false },
  { id: "11", title: "Organic Fertilizers - Agricultural", category: "agriculture", price: "$20 - $80/ton", moq: "5 tons", supplier: "Green Gulf Agri", supplierId: "s3", country: UAE, rating: 4.6, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400", verified: true },
  { id: "12", title: "Medical Surgical Masks - N95", category: "healthcare", price: "$0.30 - $1.50", moq: "10000 pieces", supplier: "MedGulf Supplies", supplierId: "s4", country: UAE, rating: 4.7, image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400", verified: true },
];

const suppliers = [
  { id: "s1", name: "Gulf Steel Industries", logo: "🏭", country: UAE, verified: true, description: "Leading manufacturer and supplier of premium quality steel products across the UAE. Established in 1995 with state-of-the-art production facilities.", stats: { products: 245, responseRate: "98%", yearsActive: 28, employees: "500+" }, certifications: ["ISO 9001", "ISO 14001", "OHSAS 18001"] },
  { id: "s2", name: "Al Madinah Dates Co.", logo: "🌴", country: UAE, verified: true, description: "Premium date supplier based in UAE. Our dates are organically grown and hand-picked for the finest quality.", stats: { products: 45, responseRate: "95%", yearsActive: 15, employees: "200+" }, certifications: ["Organic Certified", "HACCP", "ISO 22000"] },
  { id: "s3", name: "Noor Electronics LLC", logo: "💡", country: UAE, verified: false, description: "Wholesale electronics distributor specializing in LED lighting, commercial AV equipment, and smart building solutions.", stats: { products: 890, responseRate: "92%", yearsActive: 10, employees: "150+" }, certifications: ["CE", "RoHS", "UL Listed"] },
];

const testimonials = [
  { name: "Ahmed Al-Rashid", role: "CEO, Gulf Trading Co.", country: "UAE", text: "Usool has transformed how we source materials. The platform connects us directly with verified suppliers across the Gulf region." },
  { name: "Fatima Al-Saud", role: "Procurement Manager, KSA Industries", country: "Saudi Arabia", text: "The quality of suppliers on Usool is outstanding. We've reduced our sourcing time by 60% since we started using the platform." },
  { name: "Khalid Al-Thani", role: "Operations Director, Qatar Build", country: "Qatar", text: "Finding reliable B2B partners in the Gulf used to be challenging. Usool made it effortless with their verified supplier network." },
];

const trustedLogos = ["ADNOC", "SABIC", "Emirates NBD", "Aramco", "QatarEnergy", "KNPC", "Batelco", "Omantel", "STC", "Etisalat", "du", "Zain", "Al Futtaim", "Majid Al Futtaim", "Emaar", "DAMAC"];
const dashboardStats = { activeInquiries: 12, pendingQuotes: 8, newMessages: 5, savedProducts: 24 };
const inquiries = [
  { id: "INQ-001", product: "Industrial Steel Pipes", supplier: "Gulf Steel Industries", date: "2026-03-01", status: "pending", quantity: "500 units" },
  { id: "INQ-002", product: "Organic Dates - Medjool", supplier: "Al Madinah Dates Co.", date: "2026-02-28", status: "replied", quantity: "200 kg" },
  { id: "INQ-003", product: "LED Panel Lights", supplier: "Noor Electronics LLC", date: "2026-02-25", status: "accepted", quantity: "1000 units" },
  { id: "INQ-004", product: "Cotton Fabric Rolls", supplier: "Khaleeji Textiles", date: "2026-02-20", status: "expired", quantity: "2000 meters" },
  { id: "INQ-005", product: "CNC Milling Machine", supplier: "Precision Gulf Machinery", date: "2026-03-03", status: "pending", quantity: "2 units" },
];
const messages = [
  { id: "m1", from: "Gulf Steel Industries", preview: "Thank you for your inquiry. We can offer...", time: "2 hours ago", unread: true },
  { id: "m2", from: "Al Madinah Dates Co.", preview: "Your order has been confirmed and will be...", time: "5 hours ago", unread: true },
  { id: "m3", from: "Noor Electronics LLC", preview: "We have updated the pricing for bulk orders...", time: "1 day ago", unread: false },
  { id: "m4", from: "Khaleeji Textiles", preview: "Please find attached our latest catalog...", time: "2 days ago", unread: false },
];

// ─── CONTEXTS ────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);
const NavContext = createContext(null);
function useAuth() { return useContext(AuthContext); }
function useNav() { return useContext(NavContext); }

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Manrope', sans-serif; background: #fff; color: #0f172a; }
  a { text-decoration: none; color: inherit; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .marquee-track { animation: marquee 30s linear infinite; display: flex; white-space: nowrap; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
  input:focus, textarea:focus, select:focus { outline: 2px solid #7c3aed; outline-offset: 1px; }
`;

// ─── SHARED ───────────────────────────────────────────────────────────────────
function Spinner() {
  return <div style={{ width: 20, height: 20, border: "3px solid #ede9fe", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin .7s linear infinite", display: "inline-block" }} />;
}

function StarRating({ rating }) {
  return <span style={{ fontSize: 12, color: "#64748b" }}><span style={{ color: "#f59e0b" }}>★</span> {rating}</span>;
}

// ─── CONTACT MODAL ───────────────────────────────────────────────────────────
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
      sender_id: user.id,
      supplier_id: supplier.id,
      sender_name: profile?.full_name || user?.email || "Anonymous",
      sender_company: profile?.company_name || "",
      sender_email: user?.email || "",
      content: subject ? `[${subject}]\n\n${message}` : message,
      from_role: "buyer",
      read: false,
    });
    setSending(false);
    if (err) setError("Failed to send. Please try again.");
    else setSent(true);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", animation: "fadeUp .25s ease" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Message Sent!</h3>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>The supplier will get back to you at <strong>{user?.email}</strong></p>
            <button onClick={onClose} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 2 }}>Contact Supplier</h3>
                <p style={{ color: "#64748b", fontSize: 13 }}>Sending to: <strong>{supplier.company_name || supplier.name}</strong></p>
              </div>
              <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", fontSize: 16 }}>✕</button>
            </div>
            {!user && <div style={{ background: "#fef9c3", border: "1px solid #fde68a", color: "#a16207", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>⚠️ You need to <button onClick={() => { onClose(); go("auth"); }} style={{ color: "#7c3aed", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>sign in</button> to send messages.</div>}
            {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{error}</div>}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Subject</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Quote Request for Steel Pipes"
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Message <span style={{ color: "#ef4444" }}>*</span></label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5}
                placeholder="Hi, I'm interested in your products. I'd like to request a quote for..."
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{ flex: 1, background: "#f1f5f9", color: "#64748b", border: "none", padding: 12, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>Cancel</button>
              <button onClick={handleSend} disabled={sending || !user}
                style={{ flex: 2, background: "#7c3aed", color: "#fff", border: "none", padding: 12, borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: sending || !user ? "not-allowed" : "pointer", fontFamily: "Manrope,sans-serif", opacity: sending || !user ? .7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 12px rgba(124,58,237,0.3)" }}>
                {sending ? <Spinner /> : "💬 Send Message"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { user, profile, signOut } = useAuth();
  const { go } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid #f1f5f9" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: 64, gap: 24 }}>
          <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(124,58,237,0.3)" }}>
              <span style={{ color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 16 }}>U</span>
            </div>
            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f172a" }}>Usool</span>
          </button>

          <div style={{ flex: 1, maxWidth: 380, position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && search.trim()) go("products", { search }); }}
              placeholder="Search products, suppliers..."
              style={{ width: "100%", padding: "8px 12px 8px 36px", borderRadius: 12, border: "none", background: "#f1f5f9", fontSize: 14, fontFamily: "Manrope,sans-serif" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "auto" }}>
            {[["Products", "products"], ["Suppliers", "suppliers"], ["Dashboard", "dashboard"], ...(profile?.role === "admin" ? [["Admin 👑", "admin"]] : [])].map(([label, page]) => (
              <button key={page} onClick={() => go(page)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "#64748b", fontFamily: "Manrope,sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#0f172a"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#64748b"; }}>
                {label}
              </button>
            ))}
            <div style={{ width: 1, height: 24, background: "#e2e8f0", margin: "0 8px" }} />
            {user ? (
              <button onClick={signOut} style={{ background: "none", border: "1px solid #e2e8f0", cursor: "pointer", padding: "7px 16px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#64748b", fontFamily: "Manrope,sans-serif" }}>Sign Out</button>
            ) : (
              <>
                <button onClick={() => go("auth")} style={{ background: "none", border: "none", cursor: "pointer", padding: "7px 14px", fontSize: 14, fontWeight: 600, color: "#64748b", fontFamily: "Manrope,sans-serif" }}>Log In</button>
                <button onClick={() => go("auth")} style={{ background: "#7c3aed", border: "none", cursor: "pointer", padding: "8px 18px", borderRadius: 10, fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "Manrope,sans-serif", boxShadow: "0 4px 12px rgba(124,58,237,0.3)" }}>Join Free</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0f172a", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 16 }}>U</span>
              </div>
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 20 }}>Usool</span>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, maxWidth: 260 }}>The Gulf's premier B2B marketplace connecting vendors, suppliers, and investors across the GCC.</p>
          </div>
          {[
            { title: "Marketplace", links: ["All Products", "Categories", "Top Suppliers", "Trending"] },
            { title: "For Business", links: ["Become a Vendor", "Supplier Hub", "Investor Relations", "Trade Assurance"] },
            { title: "Support", links: ["Help Center", "Contact Us", "Terms of Service", "Privacy Policy"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => <span key={l} style={{ fontSize: 13, color: "#64748b", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>{l}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: 12, color: "#64748b" }}>© 2026 Usool. All rights reserved.</p>
          <div style={{ fontSize: 12, color: "#64748b" }}>🌐 English | العربية</div>
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
      style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "all .25s", boxShadow: hov ? "0 8px 30px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transform: hov ? "translateY(-2px)" : "none" }}>
      <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#f8fafc" }}>
        <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s", transform: hov ? "scale(1.05)" : "scale(1)" }} loading="lazy" />
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.4, color: "#0f172a", marginBottom: 6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{product.title}</h3>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#7c3aed", marginBottom: 8 }}>{product.price}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8", marginBottom: 10 }}>
          <span>MOQ: {product.moq}</span>
          <StarRating rating={product.rating} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#94a3b8", paddingTop: 10, borderTop: "1px solid #f8fafc" }}>
          <span>{product.country.flag}</span>
          <span style={{ flex: 1 }}>{product.supplier}</span>
          {product.verified && <span style={{ color: "#7c3aed", fontWeight: 700 }}>✓</span>}
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
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#f5f3ff 0%,#fff 55%)", padding: "96px 24px 80px", textAlign: "center" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, background: "#7c3aed", borderRadius: "50%", opacity: 0.04, transform: "translate(25%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 400, height: 400, background: "#059669", borderRadius: "50%", opacity: 0.04, transform: "translate(-25%,50%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", animation: "fadeUp .5s ease" }}>
          <div style={{ display: "inline-block", background: "#ede9fe", color: "#7c3aed", border: "1px solid #c4b5fd", padding: "6px 18px", borderRadius: 99, fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            🇦🇪 UAE's #1 B2B Supplier Marketplace
          </div>
          <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 62, fontWeight: 800, lineHeight: 1.08, color: "#0f172a", marginBottom: 24 }}>
            Your Gateway to{" "}
            <span style={{ background: "linear-gradient(135deg,#7c3aed,#059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gulf Trade</span>
          </h1>
          <p style={{ fontSize: 18, color: "#64748b", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 36px" }}>
            Connect with verified UAE suppliers across healthcare, packaging, textiles, machinery, agriculture and electronics. All in one place.
          </p>
          <div style={{ display: "flex", gap: 12, maxWidth: 520, margin: "0 auto 24px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && go("products")}
                placeholder="What are you looking for?"
                style={{ width: "100%", padding: "14px 14px 14px 42px", borderRadius: 14, border: "1px solid #e2e8f0", fontSize: 15, fontFamily: "Manrope,sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }} />
            </div>
            <button onClick={() => go("products")} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif", boxShadow: "0 4px 16px rgba(124,58,237,0.35)", whiteSpace: "nowrap" }}>Search</button>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", fontSize: 13, color: "#94a3b8", flexWrap: "wrap" }}>
            <span>Popular:</span>
            {["Healthcare", "Packaging", "Textiles", "Machinery"].map(t => (
              <button key={t} onClick={() => go("products")} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c3aed", fontSize: 13, textDecoration: "underline", fontFamily: "Manrope,sans-serif" }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
          {[["UAE Only", "100% Local Suppliers", "🇦🇪"], ["6", "Industries", "🏭"], ["Free", "To Browse & Contact", "✅"], ["Verified", "Trusted Suppliers", "🔒"]].map(([val, label, icon]) => (
            <div key={label}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontFamily: "Sora,sans-serif", fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{val}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Explore Categories</h2>
            <p style={{ color: "#94a3b8", fontSize: 16 }}>Browse thousands of products across every industry</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 14 }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => go("products", { category: cat.id })}
                style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: "20px 12px", cursor: "pointer", textAlign: "center", fontFamily: "Manrope,sans-serif", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4b5fd"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#f1f5f9"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>{cat.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 12, color: "#0f172a", marginBottom: 3 }}>{cat.name}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{cat.count.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section style={{ padding: "0 24px 80px", background: "#fafafa" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>Trending Products</h2>
              <p style={{ color: "#94a3b8" }}>Top picks from Gulf suppliers</p>
            </div>
            <button onClick={() => go("products")} style={{ background: "none", border: "1px solid #e2e8f0", cursor: "pointer", padding: "8px 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#64748b", fontFamily: "Manrope,sans-serif" }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 20 }}>
            {products.slice(0, 8).map(p => <ProductCard key={p.id} product={p} onClick={() => go("productDetail", { productId: p.id })} />)}
          </div>
        </div>
      </section>

      {/* For Vendors */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span style={{ background: "#dcfce7", color: "#15803d", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99 }}>For Vendors</span>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a", margin: "16px 0", lineHeight: 1.2 }}>Expand your reach across the Gulf</h2>
            <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>List your products, connect with thousands of buyers, and manage orders seamlessly across all 6 GCC countries.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
              {["Unlimited Listings", "Sales Analytics", "GCC-Wide Reach", "Verified Badge"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "#f0fdf4", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
                  <span style={{ color: "#15803d" }}>✓</span> {f}
                </div>
              ))}
            </div>
            <button style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>Start Selling →</button>
          </div>
          <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius: 24, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 64 }}>🚚</div>
            <div style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a" }}>12K+</div>
            <div style={{ color: "#64748b" }}>Active Vendors</div>
          </div>
        </div>
      </section>

      {/* For Suppliers */}
      <section style={{ padding: "80px 24px", background: "#faf5ff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div style={{ background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", borderRadius: 24, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 64 }}>🏭</div>
            <div style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a" }}>50K+</div>
            <div style={{ color: "#64748b" }}>Verified Suppliers</div>
          </div>
          <div>
            <span style={{ background: "#ede9fe", color: "#7c3aed", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99 }}>For Suppliers</span>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a", margin: "16px 0", lineHeight: 1.2 }}>Become a trusted UAE supplier</h2>
            <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>Get verified, showcase your products, and receive direct inquiries from UAE buyers. Build long-term partnerships with local businesses.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
              {["Direct Buyer Access", "Trust Certification", "Instant RFQs", "Buyer Network"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "#fff", border: "1px solid #ede9fe", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
                  <span style={{ color: "#7c3aed" }}>✓</span> {f}
                </div>
              ))}
            </div>
            <button style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>Register as Supplier →</button>
          </div>
        </div>
      </section>

      {/* Investors */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={{ background: "#fef9c3", color: "#a16207", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99 }}>For Investors</span>
          <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a", margin: "20px 0 16px", lineHeight: 1.2 }}>Invest in the Gulf's fastest-growing trade ecosystem</h2>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.7, marginBottom: 40, maxWidth: 620, margin: "0 auto 40px" }}>The GCC B2B market is projected to reach $35B by 2030. Usool connects you with high-growth suppliers seeking strategic partnerships.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[["📈", "180%", "YoY Growth", "Platform trade volume growth"], ["💼", "$2B+", "Trade Volume", "Annual GMV processed"], ["🌍", "6", "GCC Markets", "Full regional coverage"]].map(([icon, val, label, desc]) => (
              <div key={label} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16, padding: 28, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: "Sora,sans-serif", fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{val}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "80px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>How It Works</h2>
          <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 56 }}>Start trading in three simple steps</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {[["🔍", "Browse", "01", "Search thousands of products and verified suppliers across the Gulf"], ["💬", "Connect", "02", "Send inquiries, request quotes, and message suppliers directly"], ["📈", "Trade", "03", "Negotiate deals, place orders, and grow your Gulf trade network"]].map(([icon, title, step, desc]) => (
              <div key={title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#c4b5fd", letterSpacing: 3, marginBottom: 16 }}>{step}</div>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#7c3aed,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28, boxShadow: "0 8px 24px rgba(124,58,237,0.25)" }}>{icon}</div>
                <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Logos */}
      <section style={{ padding: "32px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", overflow: "hidden" }}>
        <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Trusted by leading Gulf businesses</p>
        <div style={{ overflow: "hidden" }}>
          <div className="marquee-track">
            {[...trustedLogos, ...trustedLogos].map((logo, i) => (
              <span key={i} style={{ margin: "0 40px", fontSize: 14, fontWeight: 700, color: "#cbd5e1" }}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>What Our Traders Say</h2>
            <p style={{ color: "#94a3b8", fontSize: 16 }}>Trusted by businesses across the Gulf</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16, padding: 32 }}>
                <div style={{ color: "#f59e0b", fontSize: 16, marginBottom: 16 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{t.role} · {t.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 320, background: "#059669", borderRadius: "50%", opacity: 0.15, transform: "translate(30%,-30%)" }} />
        <div style={{ position: "relative", maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Ready to Grow Your Gulf Trade?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, marginBottom: 32 }}>Join thousands of businesses already trading on Usool. Sign up free today.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#fff", color: "#7c3aed", border: "none", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>Join as Buyer</button>
            <button style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>Join as Supplier</button>
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
  const [realProducts, setRealProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadRealProducts(); }, []);

  async function loadRealProducts() {
    const { data } = await supabase.from("products").select("*, suppliers(company_name, emirate)").eq("status", "Active");
    setRealProducts(data || []);
    setLoading(false);
  }

  // Combine real products with mock products, real ones first
  const allProducts = [
    ...realProducts.map(p => ({
      id: p.id, title: p.name, category: p.tag?.toLowerCase() || "other",
      price: p.price || "Contact for price", moq: p.moq || "Ask supplier",
      supplier: p.suppliers?.company_name || "UAE Supplier",
      supplierId: p.supplier_id, country: UAE,
      rating: 4.5, image: p.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      verified: true, isReal: true,
    })),
    ...products,
  ];

  const filtered = allProducts.filter(p => {
    const matchCat = !selectedCategory || p.category === selectedCategory;
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.supplier?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>All Products</h1>
            <p style={{ color: "#94a3b8", fontSize: 14 }}>{filtered.length} products found</p>
          </div>
          <select style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif", background: "#fff" }}>
            <option>Relevance</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <aside style={{ width: 220, flexShrink: 0 }}>
            <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: 20 }}>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Search</h3>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, fontFamily: "Manrope,sans-serif" }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Category</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <button onClick={() => setSelectedCategory("")} style={{ textAlign: "left", padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Manrope,sans-serif", background: !selectedCategory ? "#ede9fe" : "transparent", color: !selectedCategory ? "#7c3aed" : "#64748b", fontWeight: !selectedCategory ? 700 : 400 }}>All Categories</button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ textAlign: "left", padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontFamily: "Manrope,sans-serif", background: selectedCategory === cat.id ? "#ede9fe" : "transparent", color: selectedCategory === cat.id ? "#7c3aed" : "#64748b", fontWeight: selectedCategory === cat.id ? 700 : 400 }}>
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Emirate</h3>
                {["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"].map(e => (
                  <label key={e} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b", marginBottom: 7, cursor: "pointer" }}>
                    <input type="checkbox" /> 🇦🇪 {e}
                  </label>
                ))}
              </div>
            </div>
          </aside>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18, alignContent: "start" }}>
            {loading ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60 }}><Spinner /></div> :
            filtered.map(p => <ProductCard key={p.id} product={p} onClick={() => go("productDetail", { productId: p.id })} />)}
            {!loading && filtered.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div><div style={{ fontWeight: 600 }}>No products found</div></div>}
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
  const specs = [["Category", product.category], ["MOQ", product.moq], ["Origin", `${product.country.flag} ${product.country.name}`], ["Supply Ability", "10,000 units/month"], ["Lead Time", "7-15 business days"], ["Payment", "T/T, L/C, Western Union"]];
  const tiers = [{ range: "1-99 units", price: product.price }, { range: "100-499 units", price: "10% off" }, { range: "500+ units", price: "20% off" }];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <button onClick={() => go("products")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6, marginBottom: 24, fontFamily: "Manrope,sans-serif" }}>← Back to Products</button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
          <div>
            <div style={{ aspectRatio: "16/10", borderRadius: 16, overflow: "hidden", marginBottom: 28 }}>
              <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>{product.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <StarRating rating={product.rating} />
                  {product.verified && <span style={{ background: "#ede9fe", color: "#7c3aed", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>✓ Verified</span>}
                </div>
              </div>
              <div style={{ fontFamily: "Sora,sans-serif", fontSize: 30, fontWeight: 800, color: "#7c3aed" }}>{product.price}</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: 20, marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Bulk Pricing</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {tiers.map((t, i) => <div key={i} style={{ background: "#f8fafc", borderRadius: 10, padding: 12, textAlign: "center" }}><div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>{t.range}</div><div style={{ fontWeight: 700, color: "#7c3aed" }}>{t.price}</div></div>)}
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Product Specifications</h3>
              {specs.map(([label, value]) => (
                <div key={label} style={{ display: "flex", padding: "10px 0", borderBottom: "1px solid #f8fafc", fontSize: 14 }}>
                  <span style={{ color: "#94a3b8", width: 160, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16, padding: 24, position: "sticky", top: 80 }}>
              <button onClick={() => go("supplierProfile", { supplierId: supplier.id })} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, marginBottom: 20, width: "100%" }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{supplier.logo}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{supplier.name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{product.country.flag} {product.country.name} {supplier.verified && "· ✓"}</div>
                </div>
              </button>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[["Response", supplier.stats.responseRate], ["Years", supplier.stats.yearsActive]].map(([l, v]) => (
                  <div key={l} style={{ background: "#f8fafc", borderRadius: 10, padding: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>{l}</div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{v}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowContact(true)} style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", padding: 13, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif", marginBottom: 10, boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>💬 Request Quote</button>
              <button onClick={() => setShowContact(true)} style={{ width: "100%", background: "#fff", color: "#7c3aed", border: "1.5px solid #c4b5fd", padding: 12, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>Contact Supplier</button>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Related Products</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
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
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!supplierId) return;
    supabase.from("suppliers").select("*").eq("id", supplierId).single().then(({ data }) => {
      setSupplier(data);
      setLoading(false);
    });
  }, [supplierId]);

  if (loading) return <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner /></div>;
  if (!supplier) return <div style={{ textAlign: "center", padding: 80, color: "#94a3b8" }}>Supplier not found.</div>;

  return (
    <div style={{ minHeight: "100vh" }}>
      {showContact && <ContactModal supplier={supplier} onClose={() => setShowContact(false)} />}
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#059669)", height: 192, position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20, transform: "translateY(40px)" }}>
            <div style={{ width: 88, height: 88, borderRadius: 18, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, border: "4px solid #fff", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", overflow: "hidden" }}>
              {supplier.logo_url ? <img src={supplier.logo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🏢"}
            </div>
            <div style={{ paddingBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 24, fontWeight: 800, color: "#fff" }}>{supplier.company_name}</h1>
                {supplier.verified && <span style={{ background: "#fff", color: "#7c3aed", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>✓ Verified</span>}
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>📍 {supplier.emirate} · {supplier.category}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
          <div>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>About</h2>
              <p style={{ color: "#64748b", lineHeight: 1.7 }}>{supplier.description || supplier.tagline || "No description provided."}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 32 }}>
              {[["📦", "MOQ", supplier.moq], ["⏱️", "Lead Time", supplier.lead_time], ["👥", "Employees", supplier.employees], ["📅", "Founded", supplier.founded]].filter(([,,v]) => v).map(([icon, label, val]) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: "18px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontFamily: "Sora,sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{val}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{label}</div>
                </div>
              ))}
            </div>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Product Catalog</h2>
            <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8", background: "#fafafa", borderRadius: 14 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
              <p>No products listed yet.</p>
            </div>
          </div>
          <div>
            <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16, padding: 24, position: "sticky", top: 80 }}>
              <button onClick={() => setShowContact(true)} style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", padding: 13, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif", marginBottom: 10, boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>💬 Contact Supplier</button>
              <button onClick={() => setShowContact(true)} style={{ width: "100%", background: "#fff", color: "#7c3aed", border: "1.5px solid #c4b5fd", padding: 12, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif", marginBottom: 20 }}>Request Catalog</button>
              {(supplier.phone || supplier.email || supplier.website) && (
                <div style={{ borderTop: "1px solid #f8fafc", paddingTop: 16 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Contact Info</h3>
                  {supplier.phone && <div style={{ fontSize: 13, color: "#64748b", marginBottom: 6 }}>📞 {supplier.phone}</div>}
                  {supplier.email && <div style={{ fontSize: 13, color: "#64748b", marginBottom: 6 }}>✉️ {supplier.email}</div>}
                  {supplier.website && <div style={{ fontSize: 13 }}>🌐 <a href={supplier.website} target="_blank" rel="noreferrer" style={{ color: "#7c3aed" }}>{supplier.website}</a></div>}
                </div>
              )}
            </div>
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
    setStats({
      users: profilesData?.length || 0,
      suppliers: suppliersData?.filter(s => s.status === "Active").length || 0,
      buyers: profilesData?.filter(p => p.role === "buyer").length || 0,
      messages: msgsData?.length || 0,
    });
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
    setStats(s => ({ ...s, suppliers: users.filter(u => u.role === "supplier").length, buyers: users.filter(u => u.role === "buyer").length }));
  }

  async function deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await supabase.from("profiles").delete().eq("id", userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
  }

  const tabs = [{ id: "overview", label: "Overview", icon: "📊" }, { id: "suppliers", label: `Suppliers (${pendingSuppliers.length})`, icon: "🏭" }, { id: "users", label: "Users", icon: "👥" }, { id: "messages", label: "Messages", icon: "💬" }];
  const roleColors = { admin: { bg: "#fef9c3", text: "#a16207" }, supplier: { bg: "#ede9fe", text: "#7c3aed" }, buyer: { bg: "#dcfce7", text: "#15803d" } };

  if (loading) return <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner /></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 28, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>👑 Admin Panel</h1>
          <p style={{ color: "#94a3b8" }}>Manage your USOOL platform</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid #e2e8f0" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ padding: "10px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: "Manrope,sans-serif", fontWeight: 600, fontSize: 14, color: activeTab === t.id ? "#7c3aed" : "#64748b", borderBottom: `2px solid ${activeTab === t.id ? "#7c3aed" : "transparent"}`, marginBottom: -1, display: "flex", alignItems: "center", gap: 6 }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total Users", value: stats.users, icon: "👥", color: "#7c3aed" },
                { label: "Suppliers", value: stats.suppliers, icon: "🏭", color: "#059669" },
                { label: "Buyers", value: stats.buyers, icon: "🛒", color: "#2563eb" },
                { label: "Messages", value: stats.messages, icon: "💬", color: "#db2777" },
              ].map(stat => (
                <div key={stat.label} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: stat.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontFamily: "Sora,sans-serif", fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent signups */}
            <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc" }}><h2 style={{ fontWeight: 700, fontSize: 16 }}>Recent Signups</h2></div>
              {users.slice(0, 5).map(u => (
                <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderBottom: "1px solid #f8fafc" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 800, flexShrink: 0 }}>
                    {(u.full_name || u.email || "?")[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{u.full_name || "No name"}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{u.email}</div>
                  </div>
                  <span style={{ background: roleColors[u.role]?.bg || "#f1f5f9", color: roleColors[u.role]?.text || "#64748b", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>{u.role || "buyer"}</span>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(u.created_at).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suppliers */}
        {activeTab === "suppliers" && (
          <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc" }}>
              <h2 style={{ fontWeight: 700, fontSize: 16 }}>All Supplier Applications ({pendingSuppliers.length})</h2>
            </div>
            {pendingSuppliers.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🏭</div>
                <p>No supplier applications yet</p>
              </div>
            ) : pendingSuppliers.map(s => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: "1px solid #f8fafc", flexWrap: "wrap" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🏢</div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{s.company_name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.emirate} · {s.category} · {s.email}</div>
                </div>
                <span style={{ background: s.status === "Active" ? "#dcfce7" : s.status === "Rejected" ? "#fef2f2" : "#fef9c3", color: s.status === "Active" ? "#16a34a" : s.status === "Rejected" ? "#dc2626" : "#a16207", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>{s.status}</span>
                {s.status === "Pending" && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => approveSupplier(s.id)} style={{ background: "#dcfce7", color: "#16a34a", border: "none", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>✓ Approve</button>
                    <button onClick={() => rejectSupplier(s.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "none", padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>✕ Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontWeight: 700, fontSize: 16 }}>All Users ({users.length})</h2>
            </div>
            {users.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>No users yet</div>
            ) : users.map(u => (
              <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: "1px solid #f8fafc", flexWrap: "wrap" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                  {(u.full_name || u.email || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{u.full_name || "No name"}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{u.email}</div>
                </div>
                <span style={{ background: roleColors[u.role]?.bg || "#f1f5f9", color: roleColors[u.role]?.text || "#64748b", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>{u.role || "buyer"}</span>
                <div style={{ display: "flex", gap: 8 }}>
                  {u.role !== "admin" && (
                    <select value={u.role || "buyer"} onChange={e => updateRole(u.id, e.target.value)}
                      style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12, fontFamily: "Manrope,sans-serif", cursor: "pointer" }}>
                      <option value="buyer">Buyer</option>
                      <option value="supplier">Supplier</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                  {u.id !== user.id && (
                    <button onClick={() => deleteUser(u.id)}
                      style={{ background: "#fef2f2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc" }}>
              <h2 style={{ fontWeight: 700, fontSize: 16 }}>All Messages ({allMessages.length})</h2>
            </div>
            {allMessages.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                <p>No messages yet</p>
              </div>
            ) : allMessages.map(msg => (
              <div key={msg.id} style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 800, flexShrink: 0 }}>
                  {(msg.sender_name || msg.sender_email || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{msg.sender_name || "Unknown"}</span>
                      <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>{msg.sender_email}</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SUPPLIER PRODUCT MANAGER ────────────────────────────────────────────────
function SupplierProductManager({ supplierId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", moq: "", lead_time: "", tag: "" });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { if (supplierId) loadProducts(); }, [supplierId]);

  async function loadProducts() {
    const { data } = await supabase.from("products").select("*").eq("supplier_id", supplierId).order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  async function handleAdd() {
    if (!form.name.trim()) { setError("Product name is required."); return; }
    setSaving(true); setError("");
    let image_url = "";
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `products/${supplierId}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("usool-images").upload(path, imageFile);
      if (!uploadErr) {
        const { data: urlData } = supabase.storage.from("usool-images").getPublicUrl(path);
        image_url = urlData.publicUrl;
      }
    }
    await supabase.from("products").insert({ supplier_id: supplierId, name: form.name, description: form.description, price: form.price, moq: form.moq, lead_time: form.lead_time, tag: form.tag, image_url, status: "Active" });
    setForm({ name: "", description: "", price: "", moq: "", lead_time: "", tag: "" });
    setImageFile(null); setShowForm(false); setSaving(false);
    loadProducts();
  }

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 20, fontWeight: 700 }}>My Products ({products.length})</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#f5f3ff", border: "1px solid #ede9fe", borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontFamily: "Sora,sans-serif", fontWeight: 700, marginBottom: 16, fontSize: 16 }}>New Product</h3>
          {error && <div style={{ background: "#fef2f2", color: "#dc2626", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 14 }}>{error}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            {[["Product Name *", "name", "e.g. Cotton Fabric Rolls"], ["Price", "price", "e.g. AED 50 - 200"], ["MOQ", "moq", "e.g. 100 meters"], ["Lead Time", "lead_time", "e.g. 1-2 weeks"], ["Tag/Category", "tag", "e.g. Textiles"]].map(([label, key, ph]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif" }} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Product Image</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, fontFamily: "Manrope,sans-serif", background: "#fff" }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Describe your product..."
              style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif", resize: "vertical" }} />
          </div>
          <button onClick={handleAdd} disabled={saving} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "Manrope,sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
            {saving ? <Spinner /> : "Save Product"}
          </button>
        </div>
      )}

      {loading ? <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div> :
        products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8", background: "#fafafa", borderRadius: 12 }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>📦</div>
            <p style={{ fontWeight: 600 }}>No products yet</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Click "+ Add Product" to add your first product</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
            {products.map(p => (
              <div key={p.id} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, overflow: "hidden" }}>
                {p.image_url && <img src={p.image_url} alt={p.name} style={{ width: "100%", height: 140, objectFit: "cover" }} />}
                {!p.image_url && <div style={{ height: 100, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>📦</div>}
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.name}</div>
                  {p.price && <div style={{ color: "#7c3aed", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.price}</div>}
                  {p.moq && <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>MOQ: {p.moq}</div>}
                  <button onClick={() => deleteProduct(p.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Manrope,sans-serif", width: "100%" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
function SupplierRegistrationPage() {
  const { user, profile } = useAuth();
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
      profile_id: user.id,
      company_name: form.company_name,
      tagline: form.tagline,
      category: form.category,
      emirate: form.emirate,
      description: form.description,
      phone: form.phone,
      email: form.email || user.email,
      website: form.website,
      moq: form.moq,
      lead_time: form.lead_time,
      employees: form.employees,
      founded: form.founded,
      status: "Pending",
      verified: false,
      featured: false,
    });
    setSaving(false);
    if (err) setError("Failed to submit. " + err.message);
    else { setSuccess(true); await supabase.from("profiles").update({ role: "supplier" }).eq("id", user.id); }
  }

  if (success) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
        <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Application Submitted!</h2>
        <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>Your supplier profile is under review. Once approved by our team, your business will appear on USOOL for buyers to find.</p>
        <button onClick={() => go("home")} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "13px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>Back to Home</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#f5f3ff 0%,#fff 40%)", padding: "48px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Register as a Supplier</h1>
          <p style={{ color: "#64748b", fontSize: 16 }}>Join USOOL and connect with buyers across the GCC. Fill in your company details below.</p>
        </div>

        {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: 10, fontSize: 14, marginBottom: 20 }}>{error}</div>}

        <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 20, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontFamily: "Sora,sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "#7c3aed" }}>Company Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            {[["Company Name *", "company_name", "text", "e.g. Gulf Steel Industries"], ["Tagline", "tagline", "text", "Short description of your business"], ["Phone", "phone", "text", "+971 50 000 0000"], ["Email", "email", "email", user?.email || "company@example.com"], ["Website", "website", "text", "https://yourwebsite.com"], ["MOQ", "moq", "text", "e.g. 100 units"], ["Lead Time", "lead_time", "text", "e.g. 2-3 weeks"], ["Employees", "employees", "text", "e.g. 50-100"], ["Founded", "founded", "text", "e.g. 2010"]].map(([label, key, type, placeholder]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6, color: "#0f172a" }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif" }} />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Category *</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif", background: "#fff" }}>
                <option value="">Select category</option>
                {categoryOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Emirate *</label>
              <select value={form.emirate} onChange={e => setForm(f => ({ ...f, emirate: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif", background: "#fff" }}>
                <option value="">Select emirate</option>
                {emirateOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Company Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4}
              placeholder="Tell buyers about your company, products, and what makes you unique..."
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif", resize: "vertical" }} />
          </div>
          <button onClick={handleSubmit} disabled={saving}
            style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "Manrope,sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(124,58,237,0.3)", opacity: saving ? .7 : 1 }}>
            {saving ? <Spinner /> : "Submit Application →"}
          </button>
          <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 12 }}>Your profile will be reviewed and approved within 24 hours</p>
        </div>
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
    setRealSuppliers(data || []);
    setLoading(false);
  }

  const filtered = realSuppliers.filter(s => {
    const matchSearch = !search || s.company_name?.toLowerCase().includes(search.toLowerCase()) || s.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const categoryOptions = ["Healthcare", "Packaging", "Textiles & Apparel", "Machinery", "Agriculture", "Electronics"];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 32, fontWeight: 800, marginBottom: 6 }}>UAE & GCC Suppliers</h1>
            <p style={{ color: "#94a3b8" }}>Verified suppliers ready to trade</p>
          </div>
          <button onClick={() => go("supplierRegister")} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif", boxShadow: "0 4px 12px rgba(124,58,237,0.3)" }}>
            + Register as Supplier
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search suppliers..."
            style={{ flex: 1, minWidth: 200, padding: "10px 16px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif" }} />
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif", background: "#fff" }}>
            <option value="">All Categories</option>
            {categoryOptions.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Spinner /></div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🏭</div>
            <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>No suppliers yet</h3>
            <p style={{ color: "#64748b", fontSize: 16, marginBottom: 28 }}>Be the first supplier to join USOOL!</p>
            <button onClick={() => go("supplierRegister")} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "13px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>Register Now →</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {filtered.map(s => (
              <div key={s.id} onClick={() => go("supplierProfile", { supplierId: s.id })}
                style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16, padding: 24, cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c4b5fd"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#f1f5f9"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, overflow: "hidden" }}>
                    {s.logo_url ? <img src={s.logo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🏢"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{s.company_name}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>📍 {s.emirate} · {s.category}</div>
                  </div>
                  {s.verified && <span style={{ marginLeft: "auto", background: "#f0fdf4", color: "#16a34a", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>✓ Verified</span>}
                </div>
                {s.tagline && <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 14 }}>{s.tagline}</p>}
                {s.description && !s.tagline && <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 14 }}>{s.description.slice(0, 100)}...</p>}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {s.moq && <span style={{ background: "#f5f3ff", color: "#7c3aed", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>MOQ: {s.moq}</span>}
                  {s.lead_time && <span style={{ background: "#f0fdf4", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>⏱ {s.lead_time}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ─── SUPPLIER PRODUCT MANAGER WRAPPER ────────────────────────────────────────
function SupplierProductManagerWrapper({ user }) {
  const [supplierId, setSupplierId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("suppliers").select("id").eq("profile_id", user.id).single().then(({ data }) => {
      if (data) setSupplierId(data.id);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div>;
  if (!supplierId) return (
    <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🏭</div>
      <p>You need an approved supplier profile to manage products.</p>
    </div>
  );
  return <SupplierProductManager supplierId={supplierId} />;
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage() {
  const { user, profile } = useAuth();
  const { go } = useNav();
  const [activeView, setActiveView] = useState("overview");
  const [realMessages, setRealMessages] = useState([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const statusColors = { pending: { bg: "#fef9c3", text: "#a16207" }, replied: { bg: "#dbeafe", text: "#1d4ed8" }, accepted: { bg: "#dcfce7", text: "#15803d" }, expired: { bg: "#f1f5f9", text: "#64748b" } };

  useEffect(() => {
    if (!user) return;
    loadMessages();
  }, [user]);

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

  async function markRead(msgId) {
    await supabase.from("messages").update({ read: true }).eq("id", msgId);
    setRealMessages(prev => prev.map(m => m.id === msgId ? { ...m, read: true } : m));
  }

  const unreadCount = realMessages.filter(m => !m.read).length;
  const navItems = [{ id: "overview", label: "Overview", icon: "📊" }, { id: "inquiries", label: "My Inquiries", icon: "📋" }, { id: "messages", label: `Messages${unreadCount > 0 ? ` (${unreadCount})` : ""}`, icon: "💬" }, { id: "products", label: "My Products", icon: "📦" }, { id: "saved", label: "Saved Suppliers", icon: "❤️" }, { id: "settings", label: "Settings", icon: "⚙️" }];

  if (!user) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 48 }}>🔒</div>
      <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 22, fontWeight: 700 }}>Sign in to access your dashboard</h2>
      <button onClick={() => go("auth")} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Manrope,sans-serif" }}>Sign In</button>
    </div>
  );

  function renderView() {
    if (activeView === "products") return <SupplierProductManagerWrapper user={user} />;
    if (activeView === "saved") return <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}><div style={{ fontSize: 48, marginBottom: 12 }}>❤️</div><p style={{ fontSize: 16 }}>No saved suppliers yet.</p></div>;
    if (activeView === "settings") return <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}><div style={{ fontSize: 48, marginBottom: 12 }}>⚙️</div><p>Account settings coming soon.</p></div>;
    if (activeView === "inquiries") return (
      <div>
        <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 24 }}>My Inquiries</h1>
        <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead><tr style={{ borderBottom: "1px solid #f1f5f9" }}>{["ID", "Product", "Supplier", "Date", "Qty", "Status"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 600, fontSize: 12 }}>{h}</th>)}</tr></thead>
            <tbody>{inquiries.map(inq => (<tr key={inq.id} style={{ borderBottom: "1px solid #f8fafc" }}><td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#94a3b8" }}>{inq.id}</td><td style={{ padding: "12px 16px", fontWeight: 600 }}>{inq.product}</td><td style={{ padding: "12px 16px", color: "#64748b" }}>{inq.supplier}</td><td style={{ padding: "12px 16px", color: "#64748b" }}>{inq.date}</td><td style={{ padding: "12px 16px" }}>{inq.quantity}</td><td style={{ padding: "12px 16px" }}><span style={{ background: statusColors[inq.status].bg, color: statusColors[inq.status].text, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>{inq.status}</span></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    );
    if (activeView === "messages") return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 24, fontWeight: 800 }}>Messages</h1>
          {unreadCount > 0 && <span style={{ background: "#7c3aed", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>{unreadCount} unread</span>}
        </div>
        {loadingMsgs ? <div style={{ textAlign: "center", padding: 40 }}><Spinner /></div> :
        realMessages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
            <p style={{ fontSize: 16, fontWeight: 600 }}>No messages yet</p>
            <p style={{ fontSize: 14, marginTop: 4 }}>Messages from buyers will appear here</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {realMessages.map(msg => (
              <div key={msg.id} onClick={() => markRead(msg.id)}
                style={{ background: "#fff", border: `1px solid ${!msg.read ? "#c4b5fd" : "#f1f5f9"}`, borderRadius: 14, padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start", cursor: "pointer", transition: "all .15s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
                  {(msg.sender_name || msg.sender_email || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{msg.sender_name || msg.sender_email}</span>
                      {!msg.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />}
                    </div>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  {msg.sender_company && <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>{msg.sender_company} · {msg.sender_email}</div>}
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
    return (
      <div>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Dashboard</h1>
          <p style={{ color: "#94a3b8" }}>Welcome back! Here's your trading overview.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
          {[{ label: "Active Inquiries", value: dashboardStats.activeInquiries, icon: "📋", color: "#7c3aed" }, { label: "Pending Quotes", value: dashboardStats.pendingQuotes, icon: "⏱️", color: "#d97706" }, { label: "New Messages", value: dashboardStats.newMessages, icon: "📩", color: "#2563eb" }, { label: "Saved Products", value: dashboardStats.savedProducts, icon: "❤️", color: "#db2777" }].map(stat => (
            <div key={stat.label} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: stat.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{stat.icon}</div>
              <div><div style={{ fontFamily: "Sora,sans-serif", fontSize: 26, fontWeight: 800 }}>{stat.value}</div><div style={{ fontSize: 12, color: "#94a3b8" }}>{stat.label}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc" }}><h2 style={{ fontWeight: 700, fontSize: 16 }}>Recent Inquiries</h2></div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead><tr style={{ borderBottom: "1px solid #f1f5f9" }}>{["ID", "Product", "Supplier", "Qty", "Status"].map(h => <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 600, fontSize: 12 }}>{h}</th>)}</tr></thead>
            <tbody>{inquiries.slice(0, 3).map(inq => (<tr key={inq.id} style={{ borderBottom: "1px solid #f8fafc" }}><td style={{ padding: "10px 16px", fontFamily: "monospace", fontSize: 12, color: "#94a3b8" }}>{inq.id}</td><td style={{ padding: "10px 16px", fontWeight: 600 }}>{inq.product}</td><td style={{ padding: "10px 16px", color: "#64748b" }}>{inq.supplier}</td><td style={{ padding: "10px 16px" }}>{inq.quantity}</td><td style={{ padding: "10px 16px" }}><span style={{ background: statusColors[inq.status].bg, color: statusColors[inq.status].text, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>{inq.status}</span></td></tr>))}</tbody>
          </table>
        </div>
        <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc" }}><h2 style={{ fontWeight: 700, fontSize: 16 }}>Recent Messages</h2></div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.slice(0, 3).map(msg => (
              <div key={msg.id} style={{ display: "flex", gap: 12, padding: "10px 12px", borderRadius: 10, background: msg.unread ? "#f5f3ff" : "#fafafa", alignItems: "center" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontWeight: 800, flexShrink: 0 }}>{msg.from[0]}</div>
                <div style={{ flex: 1 }}><div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}><span style={{ fontWeight: 700, fontSize: 13 }}>{msg.from}</span>{msg.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />}</div><p style={{ fontSize: 12, color: "#94a3b8" }}>{msg.preview}</p></div>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{msg.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: 220, background: "#fff", borderRight: "1px solid #f1f5f9", flexShrink: 0, padding: "24px 12px" }}>
        <div style={{ padding: "0 8px", marginBottom: 24, fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 16 }}>My Account</div>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveView(item.id)}
            style={{ width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontFamily: "Manrope,sans-serif", fontWeight: activeView === item.id ? 700 : 500, color: activeView === item.id ? "#7c3aed" : "#64748b", background: activeView === item.id ? "#f5f3ff" : "transparent", display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            {item.icon} {item.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, background: "#fafafa" }}>
        <div style={{ height: 56, borderBottom: "1px solid #f1f5f9", background: "#fff", display: "flex", alignItems: "center", padding: "0 24px" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8" }}>{navItems.find(n => n.id === activeView)?.label}</span>
        </div>
        <div style={{ padding: 24 }}>{renderView()}</div>
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
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "linear-gradient(160deg,#f5f3ff 0%,#fff 60%)" }}>
      <div style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 20, padding: 40, width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(124,58,237,0.08)", animation: "fadeUp .3s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 16 }}>U</span></div>
          <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 20 }}>Usool</span>
        </div>
        <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{mode === "login" ? "Welcome back" : "Create account"}</h2>
        <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 24 }}>{mode === "login" ? "Sign in to your account" : "Join Usool for free"}</p>
        {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{error}</div>}
        {success && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{success}</div>}
        {mode === "signup" && (
          <>
            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Full Name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif" }} /></div>
            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>I am a</label><div style={{ display: "flex", gap: 10 }}>{["buyer", "supplier"].map(r => (<button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: 9, borderRadius: 10, border: `1.5px solid ${role === r ? "#7c3aed" : "#e2e8f0"}`, background: role === r ? "#f5f3ff" : "#fff", color: role === r ? "#7c3aed" : "#64748b", fontFamily: "Manrope,sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", textTransform: "capitalize" }}>{r}</button>))}</div></div>
          </>
        )}
        <div style={{ marginBottom: 14 }}><label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif" }} /></div>
        <div style={{ marginBottom: 20 }}><label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, fontFamily: "Manrope,sans-serif" }} /></div>
        <button onClick={handle} disabled={loading} style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", padding: 13, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "Manrope,sans-serif", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(124,58,237,0.3)", opacity: loading ? .7 : 1 }}>
          {loading ? <Spinner /> : mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <p style={{ textAlign: "center", fontSize: 14, color: "#94a3b8" }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }} style={{ color: "#7c3aed", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}><Spinner /><div style={{ marginTop: 12, color: "#94a3b8", fontSize: 14 }}>Loading Usool…</div></div>
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
      {pages[page] || <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}><h1 style={{ fontFamily: "Sora,sans-serif", fontSize: 72, fontWeight: 800 }}>404</h1><p style={{ color: "#94a3b8" }}>Page not found</p><button onClick={() => { }} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Go Home</button></div>}
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
