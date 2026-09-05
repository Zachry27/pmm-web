import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  PhoneCall,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Sparkles,
  HeartHandshake,
  FileText,
  ArrowRight,
  Star,
  Check,
  ExternalLink,
  HelpCircle,
  MessageSquare,
  Menu,
  X,
  Send,
  Copy,
  AlertCircle,
  Bus,
  Train,
  Plane,
  FileSpreadsheet,
  Briefcase,
  Layers,
  Clock,
  MessageCircle,
  Search,
  Languages,
  BadgeCheck,
  GraduationCap,
  BookOpenCheck,
  Share2,
  SlidersHorizontal,
  Crown,
} from "lucide-react";

import { LOGO } from "./logo.js";
import { SAUDI_CS_AVATAR } from "./saudiAvatar.js";
import {
  WA,
  WA_PHONE,
  WA2_PHONE,
  IG,
  TK,
  FB,
  IMAGES,
  VEH,
  RT,
  HHR_TIERS,
  HDL_ITEMS,
  MUTHAWIF_DUTIES,
  SERVICES_LIST,
  CT_DATA,
  EX_DATA,
  IB_DATA,
  FAQ_DATA,
} from "./data.js";
import { generateQuotationPDF } from "./pdfExport.js";

const fIDR = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n || 0);

function IslamicOrnament({ className = "" }) {
  return (
    <svg
      viewBox="0 0 220 220"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M110 10 132 48 175 45 172 88 210 110 172 132 175 175 132 172 110 210 88 172 45 175 48 132 10 110 48 88 45 45 88 48Z" />
        <path d="m110 38 17 29 34-2-2 34 29 17-29 17 2 34-34-2-17 29-17-29-34 2 2-34-29-17 29-17-2-34 34 2Z" />
        <circle cx="110" cy="110" r="38" />
        <path d="M110 72 121 99 148 110 121 121 110 148 99 121 72 110 99 99Z" />
      </g>
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [payModal, setPayModal] = useState(null);
  const [transportModal, setTransportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Live Exchange Rate
  const [liveKurs, setLiveKurs] = useState({
    sar: 4713,
    usd: 17674,
    label: "Memuat...",
    lastUpdated: "",
    loading: true,
  });

  const fetchLiveKurs = () => {
    setLiveKurs((prev) => ({ ...prev, loading: true }));
    // Ambil rate SAR dan USD secara real-time
    Promise.allSettled([
      fetch("https://open.er-api.com/v6/latest/SAR").then((r) => r.json()),
      fetch("https://open.er-api.com/v6/latest/USD").then((r) => r.json()),
    ])
      .then(([sarRes, usdRes]) => {
        let newSar = null;
        let newUsd = null;

        if (sarRes.status === "fulfilled" && sarRes.value?.rates?.IDR) {
          newSar = Math.round(sarRes.value.rates.IDR);
        }
        if (usdRes.status === "fulfilled" && usdRes.value?.rates?.IDR) {
          newUsd = Math.round(usdRes.value.rates.IDR);
        } else if (newSar) {
          // Fallback peg 1 USD = 3.75 SAR
          newUsd = Math.round(newSar * 3.75);
        }

        if (newSar) {
          setLiveKurs({
            sar: newSar,
            usd: newUsd || Math.round(newSar * 3.75),
            label: "Live Real-Time",
            lastUpdated: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            loading: false,
          });
        } else {
          // Fallback backup API jika open.er-api bermasalah
          fetch("https://api.exchangerate-api.com/v4/latest/SAR")
            .then((r) => r.json())
            .then((d) => {
              if (d?.rates?.IDR) {
                const s = Math.round(d.rates.IDR);
                setLiveKurs({
                  sar: s,
                  usd: Math.round(s * 3.75),
                  label: "Live Real-Time",
                  lastUpdated: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
                  loading: false,
                });
              }
            })
            .catch(() => setLiveKurs((prev) => ({ ...prev, loading: false })));
        }
      })
      .catch(() => setLiveKurs((prev) => ({ ...prev, loading: false })));
  };

  useEffect(() => {
    fetchLiveKurs();
    // Auto-refresh rate setiap 10 menit
    const interval = setInterval(fetchLiveKurs, 600000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-800 selection:text-white w-full overflow-x-hidden">
      {/* Top Bar Informasi */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs truncate">
            <span className="flex items-center gap-1 text-blue-300 font-semibold truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              PT. Katiara Muda Jelajah
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">NIB: 3107230137724</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">
              Musim Umroh 1446 H
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs shrink-0">
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>1 SAR ≈ Rp {liveKurs.sar.toLocaleString("id-ID")}</span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline">1 USD ≈ Rp {liveKurs.usd.toLocaleString("id-ID")}</span>
            </span>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <PhoneCall className="w-3 h-3 text-blue-400 shrink-0" />
              <span className="hidden sm:inline">CS Online</span>
            </a>
          </div>
        </div>
      </div>

      {/* Marquee Ticker (Hanya tampil di Home, disembunyikan di Simulator agar tidak numpuk) */}
      {page === "home" && (
        <div className="bg-blue-950 text-blue-200 border-b border-blue-900/60 py-1.5 overflow-hidden select-none">
          <div className="animate-marquee items-center gap-8 text-[11px] font-medium tracking-wide">
            {[1, 2].map((k) => (
              <React.Fragment key={k}>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Muthawif Bersertifikat & Alumni Timur Tengah (Al-Azhar, KSA, Sudan, Maroko, Tunisia)</span>
                </span>
                <span className="text-blue-500">•</span>
                <span className="inline-flex items-center gap-2">
                  <Train className="w-3 h-3 text-blue-400" />
                  <span>Agen Resmi Haramain High Speed Railway (HHR)</span>
                </span>
                <span className="text-blue-500">•</span>
                <span className="inline-flex items-center gap-2">
                  <Bus className="w-3 h-3 text-blue-400" />
                  <span>Armada Resmi: GMC Yukon, Hyundai Staria, Toyota Hiace, Coaster & Bus Mercedes 45 Seat</span>
                </span>
                <span className="text-blue-500">•</span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Layanan Lengkap Land Arrangement 1446 H / 2024–2025 M</span>
                </span>
                <span className="text-blue-500">•</span>
                <span className="inline-flex items-center gap-2">
                  <PhoneCall className="w-3 h-3 text-blue-300" />
                  <span>Hotline 24 Jam di Mekah & Madinah: +62 821 5544 4787</span>
                </span>
                <span className="text-blue-500">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        page={page}
        setPage={setPage}
        onOpenTransport={() => setTransportModal(true)}
      />

      {/* Main Pages dengan Transisi Halus */}
      <main className="flex-1 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {page === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HomePage
                setPage={setPage}
                setPayModal={setPayModal}
                onOpenTransport={() => setTransportModal(true)}
              />
            </motion.div>
          )}

          {page === "jasa" && (
            <motion.div
              key="jasa"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <JasaPage
                setPayModal={setPayModal}
                onOpenTransport={() => setTransportModal(true)}
              />
            </motion.div>
          )}

          {page === "muthawif" && (
            <motion.div
              key="muthawif"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MuthawifPage setPage={setPage} />
            </motion.div>
          )}

          {page === "simulator" && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SimulatorPage
                defaultKurs={liveKurs.sar}
                defaultUsd={liveKurs.usd}
                onPay={(data) => setPayModal(data)}
                onOpenTransport={() => setTransportModal(true)}
              />
            </motion.div>
          )}

          {page === "tentang" && (
            <motion.div
              key="tentang"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TentangPage setPage={setPage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer setPage={setPage} />

      {/* Floating Customer Service Online WhatsApp Widget */}
      <FloatingCSWidget />

      {/* Modal Matriks Transportasi */}
      {transportModal && (
        <TransportMatrixModal onClose={() => setTransportModal(false)} />
      )}

      {/* Modal Pembayaran & Booking */}
      {payModal && (
        <PayModal
          data={payModal}
          onClose={() => setPayModal(null)}
          copied={copied}
          copyToClipboard={copyToClipboard}
        />
      )}
    </div>
  );
}

// ----------------------------------------------------
// FLOATING CS WHATSAPP WIDGET (KOMPAK DI MOBILE)
// ----------------------------------------------------
function FloatingCSWidget() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-2.5 sm:bottom-6 right-2.5 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Speech Bubble Tooltip Desktop Only */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-3 rounded-2xl shadow-xl border border-slate-200 max-w-[240px] text-xs text-slate-800 relative hidden md:block"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-[11px] text-slate-900">
                Customer Service PMM
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Konsultasi Muthawif, Hotel, atau Kereta Cepat via WhatsApp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={WA}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-2 bg-white/95 backdrop-blur-md hover:bg-white text-slate-900 p-1 sm:pl-2 sm:pr-4 sm:py-2 rounded-full shadow-lg border border-slate-300/90 transition-all cursor-pointer"
      >
        {/* Avatar CS Orang Saudi Asli (Shemagh & Agal) */}
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-300 bg-slate-100 shrink-0 shadow-xs">
          <img
            src={SAUDI_CS_AVATAR}
            alt="Customer Service Saudi PMM"
            className="w-full h-full object-cover object-top"
          />
          <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
        </div>

        {/* Text Details */}
        <div className="text-left pr-2 sm:pr-0">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-[11px] sm:text-xs text-slate-900">CS PMM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium">Online</div>
        </div>
      </motion.a>
    </div>
  );
}

// ----------------------------------------------------
// NAVBAR
// ----------------------------------------------------
function Navbar({ page, setPage, onOpenTransport }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Beranda" },
    { id: "muthawif", label: "Muthawif" },
    { id: "jasa", label: "Katalog" },
    { id: "simulator", label: "Simulator Biaya" },
    { id: "tentang", label: "Tentang PMM" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center gap-2.5 sm:gap-3"
          onClick={() => {
            setPage("home");
            setMobileOpen(false);
          }}
        >
          <img
            src={LOGO}
            alt="Persatuan Muthawif Muda"
            className="h-9 sm:h-12 w-auto object-contain"
          />
          <div className="hidden lg:block border-l border-slate-300 pl-3">
            <div className="text-xs font-bold tracking-wider text-blue-900 uppercase">
              Persatuan Muthawif Muda
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Land Arrangement & Muthawif Haramain
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`px-3.5 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all ${
                page === link.id
                  ? "bg-blue-800 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenTransport}
            className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Bus className="w-3.5 h-3.5 text-blue-800" />
            Tabel Mobil
          </button>
          <button
            onClick={() => setPage("simulator")}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-800 hover:bg-blue-900 text-white shadow-sm transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Simulator Biaya
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1.5 shadow-xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setPage(link.id);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  page === link.id
                    ? "bg-blue-50 text-blue-800 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenTransport();
                  setMobileOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 bg-slate-50"
              >
                <Bus className="w-3.5 h-3.5 text-blue-800" /> Tabel Mobil
              </button>
              <button
                onClick={() => {
                  setPage("simulator");
                  setMobileOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Simulator
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ----------------------------------------------------
// HERO SLIDER COMPONENT (AUTO-SLIDE & LEBIH JERNIH)
// ----------------------------------------------------
function HeroSlider({ onOpenTransport, setPage }) {
  const slides = [
    {
      img: "/muthawif_tawaf.jpg",
      title: "Masjidil Haram Makkah",
      sub: "Pelayanan Ibadah Thawaf & Sa'i Sesuai Sunnah",
    },
    {
      img: "/nabawi_rawdah.jpg",
      title: "Masjid Nabawi Madinah",
      sub: "Ziarah Raudhah & Pendampingan Makam Rasulullah SAW",
    },
    {
      img: "/hhr_train_opt.jpg",
      title: "Kereta Cepat Haramain (HHR)",
      sub: "Perjalanan Cepat Makkah - Madinah Hanya 2 Jam 20 Menit",
    },
    {
      img: "/jeddah_airport_handling.jpg",
      title: "Bandara King Abdulaziz Jeddah",
      sub: "Handling Airport Profesional, Penjemputan & Pengantaran",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-16 sm:pt-20 sm:pb-24 min-h-[500px] flex items-center">
      {/* Background Images with Cross-fade Animation */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current].img}
            alt={slides[current].title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="w-full h-full object-cover object-center filter brightness-100"
          />
        </AnimatePresence>
        {/* Gradient Overlay Transparan (Lebih Terang & Jernih) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-blue-950/50 to-slate-950/90"></div>
        <div className="absolute inset-0 bg-islamic-dark opacity-20 pointer-events-none"></div>
      </div>
      <IslamicOrnament className="absolute -left-20 -bottom-28 z-[1] w-80 h-80 text-blue-300/[0.08]" />
      <IslamicOrnament className="absolute -right-24 -top-24 z-[1] w-80 h-80 text-amber-300/[0.08]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5"
        >
          {/* Tag Resmi */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Layanan Land Arrangement & Muthawif Saudi</span>
          </motion.div>

          {/* Motto Arab dengan Ornamen Bintang 8 */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400/60 hidden sm:block"></span>
            <div className="font-arabic text-2xl sm:text-3xl md:text-4xl text-slate-200 tracking-wide">
              خِدْمَةُ ضُيُوفِ الرَّحْمَنِ شَرَفٌ لَنَا
            </div>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400/60 hidden sm:block"></span>
          </div>

          {/* Judul Utama */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Muthawif Muda, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200">
              Melayani Perjalanan Umroh Anda
            </span>
          </h1>

          {/* Slide Caption Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-[11px] text-blue-200 backdrop-blur-xs">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{slides[current].title}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 hidden sm:inline">{slides[current].sub}</span>
          </div>

          {/* Deskripsi */}
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto px-2">
            Tim kolaboratif alumni Timur Tengah (Arab Saudi, Mesir, Sudan, Tunis, dan Maroko). Berpegang teguh pada adab islami, berkomitmen memberikan pelayanan terbaik untuk para tamu Allah di Mekah dan Madinah.
          </p>

          {/* Tombol Aksi Hero */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPage("simulator")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Buka Simulator Biaya (HPP)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPage("muthawif")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-blue-300" />
              Rincian Tugas Muthawif
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-950/60 text-slate-200 hover:text-white hover:bg-slate-900 font-bold text-xs sm:text-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              Hubungi Kami
            </motion.a>
          </div>

          {/* Dots Navigation for Slider */}
          <div className="flex justify-center items-center gap-1.5 pt-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  current === i ? "w-6 bg-blue-400" : "w-1.5 bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Poin Kepercayaan */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/70 px-2.5 py-1 rounded-full border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Legalitas PT & NIB</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/70 px-2.5 py-1 rounded-full border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Bahasa Arab & Inggris</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/70 px-2.5 py-1 rounded-full border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Dewan Pengawas Senior</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// BERANDA (HOME PAGE)
// ----------------------------------------------------
function HomePage({ setPage, setPayModal, onOpenTransport }) {
  return (
    <div className="space-y-10 sm:space-y-16">
      {/* Hero Section dengan Auto-slide Gambar HD & Transparansi Jernih */}
      <HeroSlider onOpenTransport={onOpenTransport} setPage={setPage} />

      {/* Ringkasan Parameter Layanan (Visual Eye-Catching & Interaktif) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {/* Card 1: Muthawif */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-sky-500"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                Rate Resmi
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                280-300 <span className="text-xs font-bold text-blue-800">SAR</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Muthawif Berpengalaman
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Per hari per rombongan grup
              </div>
            </div>
          </motion.div>

          {/* Card 2: Visa Umroh */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                Kemenhaj KSA
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                140 <span className="text-xs font-bold text-emerald-700">USD</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Visa + Tasreh Raudhah
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Resmi via muassasah Saudi
              </div>
            </div>
          </motion.div>

          {/* Card 3: 7 Armada */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-400"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <Bus className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                Siap 24 Jam
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                7 Pilihan <span className="text-xs font-bold text-amber-700">Armada</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Sedan s/d Big Bus 45
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                GMC, Staria, Hiace & Bus VIP
              </div>
            </div>
          </motion.div>

          {/* Card 4: HHR Train */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-indigo-500"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
                <Train className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200">
                Resmi Saudi
              </span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Agen Resmi <span className="text-xs font-bold text-purple-700">HHR</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Tiket Kereta Cepat
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Reservasi grup & perseorangan
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Dua Pilar Layanan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
          {/* Kartu Biro Travel */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold mb-3 sm:mb-4 shadow-xs">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-900 mb-1.5 sm:mb-2">
                Untuk Biro Perjalanan Umroh & Haji
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                PMM bertindak sebagai perpanjangan tangan dan wajah travel Anda di Tanah Suci. Menyediakan paket komplit Land Arrangement (LA) Airport to Airport, muthawif berseragam travel Anda, koordinasi muassasah, hingga pengurusan hotel dan transportasi.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                  <span>Paket terpadu 17 komponen handling resmi</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                  <span>Koordinasi 24 jam dengan supir dan muassasah</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                  <span>Harga grosir transparan dengan rincian per pax</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setPage("simulator")}
              className="w-full py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4" /> Hitung Rincian Paket LA
            </button>
          </motion.div>

          {/* Kartu Rombongan Keluarga / Mandiri */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold mb-3 sm:mb-4 shadow-xs">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-900 mb-1.5 sm:mb-2">
                Untuk Umroh Mandiri & Rombongan Keluarga
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                Bagi Anda yang merencanakan ibadah umroh mandiri bersama keluarga atau rombongan kecil, PMM siap mendampingi kebutuhan ziarah, pendampingan thawaf/sai, pemesanan tiket kereta cepat, dan armada mobil VIP (GMC / Staria).
              </p>
              <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-3">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                  <span>Pendampingan muthawif harian sesuai kebutuhan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                  <span>City tour ziarah Thaif sejuk, Badar, dan Al-Ula</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                  <span>Penjemputan bandara dengan armada pribadi</span>
                </li>
              </ul>
            </div>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 text-center"
            >
              <PhoneCall className="w-4 h-4 text-blue-800" /> Konsultasi Umroh Mandiri
            </a>
          </motion.div>
        </div>
      </section>

      {/* Profil Muthawif & Visual HD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
          <div className="space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              Peran Sentral Muthawif
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
              Representasi Amanah Perjalanan Ibadah di Haramain
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Muthawif secara harfiah berarti <em>"pemandu orang yang thawaf"</em>. Mereka tidak hanya memandu thawaf dan doa, melainkan bertanggung jawab sejak kedatangan di bandara hingga kepulangan ke tanah air.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Kami hadir sebagai perpanjangan tangan yang berkomitmen menjaga reputasi dan kepercayaan, bertugas sesuai standar yang Anda harapkan.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 sm:gap-2.5">
              <button
                onClick={() => setPage("muthawif")}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                14 Tugas Muthawif <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenTransport}
                className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Bus className="w-3.5 h-3.5 text-blue-700" /> Cek Tarif Mobil
              </button>
            </div>
          </div>

          {/* Kolase Visual HD */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 h-60 sm:h-80 md:h-96">
            <img
              src={IMAGES.nabawi}
              alt="Masjid Nabawi Madinah"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-white text-xs">
              <div className="font-bold text-xs sm:text-sm text-slate-100 mb-0.5">
                Alumni Timur Tengah Berilmu
              </div>
              <p className="text-slate-400 text-[10px] sm:text-[11px]">
                Universitas Al-Azhar Kairo, Universitas Islam Madinah, Ummul Qura Mekah, Sudan, Maroko & Tunisia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Layanan Terpadu */}
      <section className="py-12 bg-slate-200/60 border-y border-slate-200 relative bg-islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider block mb-1">
                Portofolio Jasa
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
                Layanan Terpadu di Tanah Suci
              </h2>
            </div>
            <button
              onClick={() => setPage("jasa")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 self-start sm:self-auto"
            >
              Buka Katalog Semua Layanan <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES_LIST.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="h-28 sm:h-32 relative overflow-hidden bg-slate-800">
                  <img
                    src={item.img}
                    alt={item.n}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    {item.tag}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{item.n}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-800">
                    <span onClick={() => setPage("jasa")} className="cursor-pointer hover:underline">
                      Rincian Layanan
                    </span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Tiket Kereta Cepat Haramain (HHR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase">
                <Train className="w-3.5 h-3.5 text-blue-800" />
                Agen Resmi HHR
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Pemesanan Tiket Kereta Cepat Haramain
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                PMM adalah agen resmi Haramain High Speed Railway (HHR). Harga tiket mengikuti sistem dinamis waktu pembelian di Arab Saudi. Dapatkan kepastian reservasi tiket grup dan fasilitas free 1 tiket pada kuota tertentu.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Ketentuan Harga:</div>
                <p>• Harga dasar ekonomi Madinah–Mekah mulai 172.50 SAR.</p>
                <p>• Tarif mengalami kenaikan berkala saat mendekati tanggal keberangkatan.</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Tampilan Desktop: Tabel Lebar Bergaris Rapi */}
              <div className="hidden sm:block border border-slate-200 rounded-xl overflow-hidden text-xs bg-white shadow-xs">
                <div className="bg-slate-900 text-white font-bold p-3 flex justify-between items-center">
                  <span>Tabel Tarif Rute & Kenaikan Tiket HHR</span>
                  <span className="text-[11px] text-slate-400 font-normal">Mata uang: Reyal Saudi (SAR)</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Rute & Kelas</th>
                        <th className="p-3 text-right">Harga Dasar</th>
                        <th className="p-3 text-right">Kenaikan 1</th>
                        <th className="p-3 text-right">Kenaikan 2</th>
                        <th className="p-3 text-right">Kenaikan 3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-xs">
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-sans font-medium text-slate-900">Madinah - Mekah (Ekonomi)</td>
                        <td className="p-3 text-right font-bold text-blue-900">172.50</td>
                        <td className="p-3 text-right text-slate-700">224.25</td>
                        <td className="p-3 text-right text-slate-700">276.00</td>
                        <td className="p-3 text-right text-slate-700">306.77</td>
                      </tr>
                      <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-sans font-medium text-slate-900">Madinah - Mekah (Bisnis)</td>
                        <td className="p-3 text-right font-bold text-blue-900">380.65</td>
                        <td className="p-3 text-right text-slate-700">616.40</td>
                        <td className="p-3 text-right text-slate-700">852.15</td>
                        <td className="p-3 text-right text-slate-400 font-sans">-</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-sans font-medium text-slate-900">Jeddah Airport - Madinah (Ekonomi)</td>
                        <td className="p-3 text-right font-bold text-blue-900">138.00</td>
                        <td className="p-3 text-right text-slate-700">172.50</td>
                        <td className="p-3 text-right text-slate-700">218.50</td>
                        <td className="p-3 text-right text-slate-400 font-sans">-</td>
                      </tr>
                      <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-sans font-medium text-slate-900">Jeddah Airport - Madinah (Bisnis)</td>
                        <td className="p-3 text-right font-bold text-blue-900">323.15</td>
                        <td className="p-3 text-right text-slate-700">708.40</td>
                        <td className="p-3 text-right text-slate-400 font-sans">-</td>
                        <td className="p-3 text-right text-slate-400 font-sans">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tampilan Mobile: Kartu Rute Per Kelas (Sangat Rapi, Tanpa Tergencet) */}
              <div className="sm:hidden space-y-2.5">
                <div className="bg-slate-900 text-white p-3 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-bold">Tarif Tiket Kereta Cepat (HHR)</span>
                  <span className="text-[10px] text-slate-400">Dalam SAR</span>
                </div>

                {[
                  {
                    route: "Madinah - Mekah",
                    cls: "Ekonomi",
                    tiers: [
                      { l: "Dasar", v: "172.50", highlight: true },
                      { l: "Naik 1", v: "224.25" },
                      { l: "Naik 2", v: "276.00" },
                      { l: "Naik 3", v: "306.77" },
                    ],
                  },
                  {
                    route: "Madinah - Mekah",
                    cls: "Bisnis",
                    tiers: [
                      { l: "Dasar", v: "380.65", highlight: true },
                      { l: "Naik 1", v: "616.40" },
                      { l: "Naik 2", v: "852.15" },
                    ],
                  },
                  {
                    route: "Jeddah Airport - Madinah",
                    cls: "Ekonomi",
                    tiers: [
                      { l: "Dasar", v: "138.00", highlight: true },
                      { l: "Naik 1", v: "172.50" },
                      { l: "Naik 2", v: "218.50" },
                    ],
                  },
                  {
                    route: "Jeddah Airport - Madinah",
                    cls: "Bisnis",
                    tiers: [
                      { l: "Dasar", v: "323.15", highlight: true },
                      { l: "Naik 1", v: "708.40" },
                    ],
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2"
                  >
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="font-bold text-xs text-slate-900">
                        {item.route}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                        {item.cls}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                      {item.tiers.map((t, ti) => (
                        <div
                          key={ti}
                          className={`p-2 rounded-lg border text-center ${
                            t.highlight
                              ? "bg-blue-50/80 border-blue-200"
                              : "bg-slate-50 border-slate-100"
                          }`}
                        >
                          <div className="text-[10px] text-slate-500 font-medium">
                            {t.l}
                          </div>
                          <div
                            className={`font-bold font-mono text-xs ${
                              t.highlight ? "text-blue-900" : "text-slate-800"
                            }`}
                          >
                            {t.v} <span className="text-[9px] font-normal font-sans text-slate-400">SAR</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-slate-200/50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider">
              Informasi Umum
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
              Pertanyaan Seputar Layanan PMM
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQ_DATA.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-bold text-slate-900 text-xs sm:text-sm select-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
                </summary>
                <p className="mt-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-2.5">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-slate-950 text-white py-12 px-4 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
            Rencanakan Kebutuhan Umroh Anda Bersama PMM
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Diskusikan detail jadwal, kebutuhan muthawif, armada transportasi, atau paket lengkap dengan tim PMM langsung di Saudi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2.5 pt-2 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => setPage("simulator")}
              className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" /> Buka Simulator Biaya
            </button>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" /> Hubungi WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------
// HALAMAN LAYANAN MUTHAWIF
// ----------------------------------------------------
function MuthawifPage({ setPage }) {
  const profiles = [
    {
      role: "Koordinator Ibadah Makkah",
      alumni: "Alumni Arab Saudi & Al-Azhar",
      focus: "Manasik, thawaf, sa'i, dan tahallul",
      languages: ["Arab", "Indonesia", "Inggris"],
      certification: "Pembimbing Manasik & Muthawif",
      accent: "blue",
    },
    {
      role: "Pembimbing Ziarah Madinah",
      alumni: "Alumni Timur Tengah",
      focus: "Sirah Nabawiyah, Raudhah, dan city tour",
      languages: ["Arab", "Indonesia"],
      certification: "Pendamping Haramain Terverifikasi",
      accent: "emerald",
    },
    {
      role: "Muthawifah & Pendamping Jamaah",
      alumni: "Alumni Kampus Timur Tengah",
      focus: "Raudhah, maqbaroh, dan kebutuhan jamaah wanita",
      languages: ["Arab", "Indonesia", "Melayu"],
      certification: "Pendamping Raudhah & Jamaah Wanita",
      accent: "amber",
    },
  ];

  return (
    <div className="py-8 sm:py-14 bg-slate-100 min-h-screen relative overflow-hidden">
      <IslamicOrnament className="absolute -top-20 -right-20 w-72 h-72 text-blue-900/[0.05]" />
      <IslamicOrnament className="absolute top-[38rem] -left-28 w-80 h-80 text-amber-600/[0.05]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-10 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-800 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <BadgeCheck className="w-3.5 h-3.5" />
            Layanan Utama PMM
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            Pendamping Ibadah yang Terlatih, Beradab, dan Terverifikasi
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed px-2">
            Mendampingi jamaah sejak menginjakkan kaki di bandara hingga kembali pulang ke tanah air. Membantu segala kebutuhan ibadah dan menjaga ketenangan jamaah selama di Haramain.
          </p>
          <div className="inline-block bg-white px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 shadow-xs">
            Ratib / Fee Resmi: <span className="text-blue-800 font-extrabold">280 s/d 300 SAR</span> per hari per grup
          </div>
        </div>

        {/* Profil tim profesional */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <span className="text-[11px] font-black text-amber-700 uppercase tracking-[0.18em]">Standar Tim Lapangan</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">Profil Keahlian Muthawif PMM</h2>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" /> Identitas & kompetensi diverifikasi PMM
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {profiles.map((profile, index) => (
              <article
                key={profile.role}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
              >
                <IslamicOrnament className={`absolute -right-14 -top-14 w-44 h-44 ${profile.accent === "amber" ? "text-amber-600/[0.07]" : profile.accent === "emerald" ? "text-emerald-700/[0.07]" : "text-blue-800/[0.07]"}`} />
                <div className={`h-1.5 ${profile.accent === "amber" ? "bg-amber-500" : profile.accent === "emerald" ? "bg-emerald-600" : "bg-blue-800"}`} />
                <div className="p-5 sm:p-6 relative">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-md">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                      <BadgeCheck className="w-3 h-3" /> Terverifikasi
                    </span>
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 mb-1.5">Profil {String(index + 1).padStart(2, "0")}</div>
                  <h3 className="text-lg font-black text-slate-950 leading-tight">{profile.role}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{profile.focus}</p>

                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Latar Alumni</div>
                        <div className="text-xs font-bold text-slate-800">{profile.alumni}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <BookOpenCheck className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Sertifikasi</div>
                        <div className="text-xs font-bold text-slate-800">{profile.certification}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Languages className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div className="flex flex-wrap gap-1.5">
                        {profile.languages.map((language) => (
                          <span key={language} className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg">{language}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 text-center">Penugasan personel menyesuaikan jadwal, kebutuhan jamaah, dan ketersediaan tim di Haramain.</p>
        </section>

        {/* 14 Poin Cakupan Tugas */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 relative overflow-hidden">
          <IslamicOrnament className="absolute -bottom-28 -right-20 w-80 h-80 text-blue-900/[0.035]" />
          <div className="relative">
            <div className="max-w-2xl mb-5 sm:mb-7">
              <span className="text-[11px] font-black text-blue-800 uppercase tracking-[0.18em]">Cakupan Operasional</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">14 Tanggung Jawab Utama</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {MUTHAWIF_DUTIES.map((d, i) => (
                <div
                  key={i}
                  className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="w-7 h-7 rounded-lg bg-blue-900 text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{d.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed mt-1.5">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Komitmen Kerjasama */}
        <div className="bg-gradient-to-br from-slate-950 to-blue-950 p-5 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3 sm:space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300 relative overflow-hidden">
          <IslamicOrnament className="absolute -right-16 -top-16 w-64 h-64 text-amber-400/10" />
          <h2 className="text-base font-extrabold text-slate-900">
            <span className="text-white">Komitmen Perpanjangan Tangan</span>
          </h2>
          <p>
            Muthawif sebagai representasi dan wajah dari travel umrah adalah elemen penting dalam menjaga reputasi dan kepuasan jamaah. Peran ini mencerminkan dedikasi untuk memberikan pengalaman umrah yang bermakna dan berkualitas tinggi.
          </p>
          <p>
            Kami, PMM hadir sebagai perpanjangan tangan yang bekerja sesuai visi dan standar yang Anda tetapkan, memastikan setiap rukun dan wajib ibadah terlaksana dengan tenang, tertib, dan sesuai sunnah.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setPage("simulator")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors inline-flex items-center justify-center gap-2 relative"
            >
              <FileSpreadsheet className="w-4 h-4" /> Masukkan Muthawif ke Estimasi Biaya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// HALAMAN KATALOG & PAKET
// ----------------------------------------------------
function JasaPage({ setPayModal, onOpenTransport }) {
  const [tab, setTab] = useState("layanan");
  const [query, setQuery] = useState("");
  const tabs = [
    { id: "layanan", label: "Semua Jasa", count: SERVICES_LIST.length },
    { id: "paket", label: "Paket Lengkap", count: 17 },
    { id: "ziarah", label: "Ziarah & City Tour", count: CT_DATA.length },
    { id: "exp", label: "Eksplorasi", count: EX_DATA.length },
    { id: "jariyah", label: "Badal & Amal", count: IB_DATA.length },
  ];
  const filterCatalog = (items) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      [item.n, item.name, item.desc, item.tag, item.bonus, item.min]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  };
  const filteredServices = filterCatalog(SERVICES_LIST);
  const filteredTours = filterCatalog(CT_DATA);
  const filteredExperiences = filterCatalog(EX_DATA);
  const filteredCharity = filterCatalog(IB_DATA);

  return (
    <div className="py-8 sm:py-14 bg-slate-100 min-h-screen relative overflow-hidden">
      <IslamicOrnament className="absolute top-80 -left-28 w-80 h-80 text-blue-900/[0.04]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative">
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white rounded-3xl p-5 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl border border-blue-900">
          <IslamicOrnament className="absolute -right-20 -top-24 w-80 h-80 text-amber-300/10" />
          <div className="relative grid lg:grid-cols-[1fr_420px] gap-6 lg:items-end">
            <div className="max-w-2xl space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-amber-300 uppercase tracking-[0.2em]">
                <Crown className="w-3.5 h-3.5" /> Katalog Layanan PMM 1446 H
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Layanan Haramain, Dipilih Lebih Mudah
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Temukan muthawif, transportasi, paket ziarah, dan layanan ibadah dalam satu katalog terkurasi.
              </p>
            </div>
            <div>
              <label htmlFor="catalog-search" className="block text-[11px] font-bold text-blue-200 mb-2">Pencarian cepat katalog</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="catalog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari muthawif, HHR, Thaif, transportasi..."
                  className="w-full bg-white text-slate-900 placeholder:text-slate-400 rounded-xl border border-white/20 pl-10 pr-10 py-3.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 shadow-lg"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-800" aria-label="Hapus pencarian">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Filter (Horizontal Scroll on Mobile) */}
        <div className="flex justify-start lg:justify-center overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 catalog-scroll">
          <div className="inline-flex p-1.5 bg-white rounded-2xl gap-1.5 shrink-0 border border-slate-200 shadow-sm">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  tab === t.id
                    ? "bg-blue-900 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {t.label}
                <span className={`text-[9px] rounded-full px-1.5 py-0.5 ${tab === t.id ? "bg-white/15 text-blue-100" : "bg-slate-100 text-slate-500"}`}>{t.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Katalog jasa utama */}
        {tab === "layanan" && (
          filteredServices.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredServices.map((item, idx) => (
                <article key={item.n} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="h-44 relative overflow-hidden bg-slate-900">
                    <img src={item.img} alt={item.n} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/10" />
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wide bg-white/95 text-blue-900 border border-white rounded-full px-2.5 py-1 shadow-sm">{item.tag}</span>
                    {idx < 3 && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-black bg-amber-500 text-slate-950 rounded-full px-2.5 py-1 shadow-sm">
                        <Crown className="w-3 h-3" /> Rekomendasi
                      </span>
                    )}
                    <div className="absolute left-4 bottom-3 flex items-center gap-1 text-[10px] font-bold text-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Standar PMM 5/5
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 mb-2">Layanan {String(idx + 1).padStart(2, "0")}</div>
                    <h2 className="font-black text-slate-950 text-base leading-snug">{item.n}</h2>
                    <p className="text-slate-600 text-xs leading-relaxed mt-2 flex-1">{item.desc}</p>
                    <a
                      href={`https://wa.me/${WA_PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(`Assalamu'alaikum Admin PMM, saya ingin konsultasi layanan ${item.n}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-blue-900 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      Lihat Detail Layanan <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : <CatalogEmpty query={query} onReset={() => setQuery("")} />
        )}

        {/* Tab 1: Cakupan Paket Lengkap Dokumen PMM */}
        {tab === "paket" && (
          <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                Cakupan Standar Paket Lengkap (Airport to Airport)
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Paket terpadu yang mencakup 17 komponen penting perjalanan ibadah di Tanah Suci:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {[
                "Visa Umroh Resmi + Tasreh Raudhah",
                "Transportasi Selama di Arab Saudi",
                "Tiket Kereta Cepat Haramain (HHR)",
                "Handling Airport Kedatangan & Kepulangan",
                "Porter Airport Kedatangan & Kepulangan",
                "Check in & Check out Hotel Mekah & Madinah",
                "Snack Ziarah Mekah & Madinah Standar",
                "Koordinasi dengan Muassasah & Supir Bus",
                "Nasi Box Ketika Kedatangan & Kepulangan",
                "Muthawif & Muthawifah Beserta Fee",
                "Free Transmitter / TGS Audio Wireless",
                "Operasional & Mobilitas Muthawif",
                "Air Zam-zam 5 Liter Barcode Resmi",
                "Tips Bellboy Hotel Mekah & Madinah",
                "Tips Supir Semua Rute & Mazarat",
                "Baksis Pengurusan Muassasah Lapangan",
                "Supervisi & Operator Management 24 Jam",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <Check className="w-4 h-4 text-blue-800 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[11px] sm:text-xs text-slate-500">
                * Rincian dapat disesuaikan pada kalkulator simulator sesuai kebutuhan rombongan.
              </div>
              <button
                onClick={onOpenTransport}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Bus className="w-3.5 h-3.5 text-blue-800" /> Lihat Tabel Tarif Transportasi
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Ziarah dengan Gambar HD */}
        {tab === "ziarah" && (
          filteredTours.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredTours.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="h-44 sm:h-52 relative overflow-hidden bg-slate-800">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-blue-900 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs border border-blue-700">
                    Mulai {item.sar} SAR
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="bg-white/95 text-slate-900 text-[10px] px-2.5 py-1 rounded-full font-bold">{item.min}</span>
                    {idx < 2 && <span className="bg-amber-500 text-slate-950 text-[10px] px-2.5 py-1 rounded-full font-black inline-flex items-center gap-1"><Star className="w-3 h-3 fill-slate-950" /> Favorit</span>}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">{item.name}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-2.5">{item.desc}</p>
                    <div className="text-[11px] font-semibold text-slate-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/70">
                      Fasilitas: {item.bonus}
                    </div>
                  </div>
                  <a
                    href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-blue-800 text-white text-xs font-bold text-center transition-colors block"
                  >
                    Pesan Paket Ziarah Ini
                  </a>
                </div>
              </div>
            ))}
          </div> : <CatalogEmpty query={query} onReset={() => setQuery("")} />
        )}

        {/* Tab 3: Experience */}
        {tab === "exp" && (
          filteredExperiences.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredExperiences.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="h-36 relative overflow-hidden bg-slate-800">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-blue-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Start {item.sar} SAR
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] text-slate-400 mb-0.5">{item.min}</div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{item.name}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-2">{item.desc}</p>
                    <div className="text-[11px] font-medium text-slate-700">✓ {item.bonus}</div>
                  </div>
                  <a
                    href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20ingin%20tanya%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center transition-colors block"
                  >
                    Konsultasi Jadwal
                  </a>
                </div>
              </div>
            ))}
          </div> : <CatalogEmpty query={query} onReset={() => setQuery("")} />
        )}

        {/* Tab 4: Ibadah Jariyah */}
        {tab === "jariyah" && (
          filteredCharity.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredCharity.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <IslamicOrnament className="absolute -right-12 -bottom-12 w-40 h-40 text-emerald-700/[0.05]" />
                <div>
                  <div className="inline-block text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-2">
                    {item.sar} SAR / Paket
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{item.name}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-2.5">{item.desc}</p>
                  <div className="text-[11px] text-slate-700 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                    Dokumentasi: {item.bonus}
                  </div>
                </div>
                <a
                  href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20ingin%20daftar%20${encodeURIComponent(item.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold text-center transition-colors block"
                >
                  Salurkan Amanah
                </a>
              </div>
            ))}
          </div> : <CatalogEmpty query={query} onReset={() => setQuery("")} />
        )}
      </div>
    </div>
  );
}

function CatalogEmpty({ query, onReset }) {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-3xl px-5 py-14 text-center">
      <span className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 inline-flex items-center justify-center mb-3">
        <SlidersHorizontal className="w-5 h-5" />
      </span>
      <h3 className="font-black text-slate-900">Layanan belum ditemukan</h3>
      <p className="text-xs text-slate-500 mt-1">Tidak ada hasil untuk “{query}” pada kategori ini.</p>
      <button onClick={onReset} className="mt-4 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-950 transition-colors">
        Tampilkan semua layanan
      </button>
    </div>
  );
}

// ----------------------------------------------------
// SIMULATOR BIAYA & HPP RESMI (OPTIMAL MOBILE)
// ----------------------------------------------------
function SimulatorPage({ defaultKurs, defaultUsd, onPay, onOpenTransport }) {
  const [isStandardLA, setIsStandardLA] = useState(true);

  // Tab di Mobile: Form Input vs Hasil Estimasi
  const [mobileTab, setMobileTab] = useState("form"); // "form" | "result"

  // Parameter Rombongan
  const [pax, setPax] = useState(4);
  const [hProg, setHProg] = useState(4);
  const [kurs, setKurs] = useState(defaultKurs || 4713);
  const [usdR, setUsdR] = useState(defaultUsd || 17674);

  // Update kurs otomatis jika ada perubahan defaultKurs/defaultUsd dari API real-time
  useEffect(() => {
    if (defaultKurs) setKurs(defaultKurs);
  }, [defaultKurs]);

  useEffect(() => {
    if (defaultUsd) setUsdR(defaultUsd);
  }, [defaultUsd]);

  // Accordion Section
  const [op, setOp] = useState({
    set: true,
    paxs: true,
    htl: true,
    hdl: true,
    trn: true,
    mgn: true,
  });
  const tog = (k) => setOp((o) => ({ ...o, [k]: !o[k] }));

  // Biaya Per Pax
  const [tiket, setTiket] = useState(0);
  const [visa, setVisa] = useState(140);
  const [sskp, setSskp] = useState(0);
  const [meals, setMeals] = useState(0);
  const [prlg, setPrlg] = useState(0);
  const [asrn, setAsrn] = useState(0);

  // Kereta Cepat HHR dengan Tier Kenaikan
  const [hhrActive, setHhrActive] = useState({
    mme: false,
    mmb: false,
    jme: false,
    jmb: false,
  });
  const [hhrSelectedTier, setHhrSelectedTier] = useState({
    mme: 0,
    mmb: 0,
    jme: 0,
    jmb: 0,
  });

  // Hotel
  const [hmek, setHmek] = useState({
    nights: 4,
    type: "QUAD",
    sar: 450,
    name: "Hotel Mekah",
  });
  const [hmad, setHmad] = useState({
    nights: 3,
    type: "QUAD",
    sar: 350,
    name: "Hotel Madinah",
  });
  const rp = { DOUBLE: 2, TRIPLE: 3, QUAD: 4 };

  // Handling Items
  const [hdl, setHdl] = useState(HDL_ITEMS.map((h) => ({ ...h })));
  const togH = (i) => setHdl((h) => h.map((x, j) => (j === i ? { ...x, on: !x.on } : x)));
  const updH = (i, v) => setHdl((h) => h.map((x, j) => (j === i ? { ...x, sar: Number(v) } : x)));

  const applyStandardLA = (enabled) => {
    setIsStandardLA(enabled);
    if (enabled) {
      setHdl((h) => h.map((x) => ({ ...x, on: x.standardLA })));
      setVisa(140);
      setHhrActive((prev) => ({ ...prev, mme: true }));
    }
  };

  // Transportasi (10 Rute)
  const [vIdx, setVIdx] = useState(3);
  const [selR, setSelR] = useState([0, 1, 4, 5, 9]);
  const togR = (i) =>
    setSelR((p) => (p.includes(i) ? p.filter((r) => r !== i) : [...p, i]));

  // Margin Target
  const [mgn, setMgn] = useState({ quad: 5, triple: 5, double: 7 });

  // Hasil
  const [res, setRes] = useState(null);
  const [summaryCopied, setSummaryCopied] = useState(false);

  const calculateHPP = (overrides = {}) => {
    const calcPax = overrides.pax ?? pax;
    const calcVIdx = overrides.vIdx ?? vIdx;
    const tIDR = Number(tiket) || 0;
    const vIDR = (Number(visa) || 0) * usdR;

    let hhrIDR = 0;
    Object.entries(hhrActive).forEach(([key, active]) => {
      if (active && HHR_TIERS[key]) {
        const tierIdx = hhrSelectedTier[key] || 0;
        const tierItem = HHR_TIERS[key].tiers[tierIdx] || HHR_TIERS[key].tiers[0];
        hhrIDR += tierItem.sar * kurs;
      }
    });

    const sIDR = Number(sskp) || 0;
    const mIDR = (Number(meals) || 0) * kurs;
    const pIDR = Number(prlg) || 0;
    const aIDR = Number(asrn) || 0;

    const hmekIDR =
      hmek.nights > 0 ? (hmek.sar * kurs * hmek.nights) / rp[hmek.type] : 0;
    const hmadIDR =
      hmad.nights > 0 ? (hmad.sar * kurs * hmad.nights) / rp[hmad.type] : 0;

    const p = Math.max(1, calcPax);

    const hdlD = [];
    hdl
      .filter((h) => h.on)
      .forEach((h) => {
        let sp =
          h.mode === "pax"
            ? h.sar
            : h.mode === "hari"
            ? (h.sar * hProg) / p
            : h.mode === "dyn"
            ? (350 + 15 * calcPax) / p
            : h.sar / p;
        hdlD.push({ n: h.label, idr: sp * kurs, sar: sp });
      });
    const hdlIDR = hdlD.reduce((a, h) => a + h.idr, 0);

    const trnD = [];
    selR.forEach((ri) => {
      const s = VEH[calcVIdx].p[ri] || 0;
      trnD.push({ n: RT[ri], idr: (s / p) * kurs, sar: s / p });
    });
    const trnIDR = trnD.reduce((a, t) => a + t.idr, 0);

    const hpp =
      tIDR + vIDR + hhrIDR + sIDR + mIDR + pIDR + aIDR + hmekIDR + hmadIDR + hdlIDR + trnIDR;

    const resultObj = {
      pax: calcPax,
      hProg,
      kurs,
      vehName: VEH[calcVIdx].n,
      tIDR,
      vIDR,
      hhrIDR,
      sIDR,
      mIDR,
      pIDR,
      aIDR,
      hmek,
      hmad,
      hmekIDR,
      hmadIDR,
      hdlD,
      hdlIDR,
      trnD,
      trnIDR,
      hpp,
      mgn,
      quad: hpp * (1 + mgn.quad / 100),
      triple: hpp * (1 + mgn.triple / 100),
      double: hpp * (1 + mgn.double / 100),
    };

    setRes(resultObj);

    try {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.85 } });
    } catch (e) {}
  };

  useEffect(() => {
    calculateHPP();
  }, []);

  const applyGroupPreset = (nextPax, nextVehicle) => {
    setPax(nextPax);
    setVIdx(nextVehicle);
    calculateHPP({ pax: nextPax, vIdx: nextVehicle });
  };

  const buildWhatsAppSummary = () => {
    if (!res) return "";
    const detailRows = [
      ["Tiket pesawat PP", res.tIDR],
      ["Visa + Tasreh Raudhah", res.vIDR],
      ["Kereta Cepat HHR", res.hhrIDR],
      ["Hotel Makkah", res.hmekIDR],
      ["Hotel Madinah", res.hmadIDR],
      ["Ground handling", res.hdlIDR],
      ["Transportasi darat", res.trnIDR],
      ["Konsumsi", res.mIDR],
      ["Perlengkapan", res.pIDR],
      ["Asuransi", res.aIDR],
      ["SISKOPATUH", res.sIDR],
    ].filter(([, value]) => value > 0);

    return [
      "*RINCIAN ESTIMASI HPP UMROH — PMM*",
      "Persatuan Muthawif Muda",
      "",
      `Rombongan: ${res.pax} jamaah`,
      `Program: ${res.hProg} hari`,
      `Armada: ${res.vehName}`,
      `Kurs acuan: 1 SAR = ${fIDR(res.kurs)}`,
      "",
      "*Biaya per jamaah:*",
      ...detailRows.map(([label, value]) => `• ${label}: ${fIDR(value)}`),
      "",
      `*HPP per pax: ${fIDR(res.hpp)}*`,
      `Total estimasi rombongan: ${fIDR(res.hpp * res.pax)}`,
      "",
      "*Rekomendasi harga jual per pax:*",
      `• Quad: ${fIDR(res.quad)}`,
      `• Triple: ${fIDR(res.triple)}`,
      `• Double: ${fIDR(res.double)}`,
      "",
      "Estimasi dapat berubah mengikuti kurs dan ketersediaan layanan. Mohon konfirmasi final kepada Admin PMM.",
    ].join("\n");
  };

  const shareSummaryToWhatsApp = async () => {
    const summary = buildWhatsAppSummary();
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setSummaryCopied(true);
      setTimeout(() => setSummaryCopied(false), 2500);
    } catch (error) {
      setSummaryCopied(false);
    }
    window.open(
      `https://wa.me/${WA_PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="py-4 sm:py-8 bg-slate-100 min-h-screen pb-32 lg:pb-12 relative overflow-hidden">
      <IslamicOrnament className="absolute top-40 -right-24 w-80 h-80 text-blue-900/[0.04]" />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-3.5 sm:space-y-6 relative">
        {/* Header Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
          <IslamicOrnament className="absolute -right-20 -top-20 w-60 h-60 text-blue-900/[0.04]" />
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] sm:text-[11px] font-extrabold text-blue-800 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
              <span>Kalkulator Biaya Resmi 1446 H</span>
            </div>
            <h1 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Simulator HPP Land Arrangement Umroh
            </h1>
            <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
              Data tarif resmi PT. Katiara Muda Jelajah (PMM).
            </p>
          </div>

          {/* Preset Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold w-full sm:w-auto self-stretch md:self-auto">
            <button
              onClick={() => applyStandardLA(true)}
              className={`flex-1 sm:flex-none text-center px-3 py-2 sm:py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                isStandardLA
                  ? "bg-blue-800 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Paket Lengkap
            </button>
            <button
              onClick={() => applyStandardLA(false)}
              className={`flex-1 sm:flex-none text-center px-3 py-2 sm:py-1.5 rounded-lg transition-all text-xs cursor-pointer ${
                !isStandardLA
                  ? "bg-blue-800 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Kustom Bebas
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="bg-gradient-to-r from-slate-950 to-blue-950 rounded-2xl p-3 sm:p-4 border border-slate-800 shadow-md flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between relative overflow-hidden">
          <IslamicOrnament className="absolute -left-16 -bottom-20 w-52 h-52 text-amber-400/[0.08]" />
          <div className="relative flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0"><Users className="w-4 h-4" /></span>
            <div>
              <div className="text-xs font-black text-white">Preset cepat rombongan</div>
              <div className="text-[10px] text-slate-400">Jumlah pax dan armada langsung disesuaikan</div>
            </div>
          </div>
          <div className="relative grid grid-cols-1 min-[430px]:grid-cols-3 gap-2 w-full lg:w-auto">
            {[
              { label: "Keluarga 4 Pax", detail: "GMC Yukon · privat", pax: 4, vehicle: 1 },
              { label: "Grup Kecil 10 Pax", detail: "Toyota Hiace", pax: 10, vehicle: 4 },
              { label: "Bus 40 Pax", detail: "Mercedes Big Bus", pax: 40, vehicle: 6 },
            ].map((preset) => (
              <button
                key={preset.pax}
                onClick={() => applyGroupPreset(preset.pax, preset.vehicle)}
                className={`rounded-xl border px-3 py-2.5 text-left transition-all ${pax === preset.pax ? "bg-white border-white shadow-md" : "bg-white/[0.06] border-white/15 hover:bg-white/10"}`}
              >
                <span className={`block text-[11px] font-black ${pax === preset.pax ? "text-blue-950" : "text-white"}`}>{preset.label}</span>
                <span className={`block text-[9px] mt-0.5 ${pax === preset.pax ? "text-slate-500" : "text-slate-400"}`}>{preset.detail}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile View Toggle: Form Input vs Rincian Hasil */}
        <div className="lg:hidden flex bg-white p-1 rounded-xl border border-slate-200 shadow-xs gap-1">
          <button
            onClick={() => setMobileTab("form")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "form"
                ? "bg-blue-800 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Form Input</span>
          </button>
          <button
            onClick={() => setMobileTab("result")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "result"
                ? "bg-blue-800 text-white shadow-xs"
                : "text-blue-900 bg-blue-50/60"
            }`}
          >
            <span>Ringkasan</span>
            {res && (
              <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-950 text-[10px] font-bold">
                {fIDR(res.hpp)}
              </span>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Kolom Kiri: Form Konfigurasi (7 Kolom) */}
          <div
            className={`lg:col-span-7 space-y-3.5 sm:space-y-4 ${
              mobileTab === "form" ? "block" : "hidden lg:block"
            }`}
          >
            {/* 1. Pengaturan Dasar */}
            <SectionCard
              title="1. Jumlah Jamaah & Kurs Acuan"
              open={op.set}
              onToggle={() => tog("set")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <CounterInput
                  label="Jumlah Jamaah"
                  sub="Total orang dalam rombongan"
                  val={pax}
                  min={1}
                  max={100}
                  unit="pax"
                  onDec={() => setPax((p) => Math.max(1, p - 1))}
                  onInc={() => setPax((p) => Math.min(100, p + 1))}
                />
                <CounterInput
                  label="Hari Program"
                  sub="Hari pendampingan muthawif"
                  val={hProg}
                  min={1}
                  max={30}
                  unit="hari"
                  onDec={() => setHProg((h) => Math.max(1, h - 1))}
                  onInc={() => setHProg((h) => Math.min(30, h + 1))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Kurs 1 SAR ke IDR
                    </label>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Real-Time
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-400">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={kurs}
                      onChange={(e) => setKurs(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 text-xs font-bold text-slate-900 border border-slate-200 rounded-lg outline-none focus:border-blue-700"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Kurs 1 USD ke IDR
                    </label>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Real-Time
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-400">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={usdR}
                      onChange={(e) => setUsdR(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 text-xs font-bold text-slate-900 border border-slate-200 rounded-lg outline-none focus:border-blue-700"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 2. Tiket, Visa & Kereta Cepat HHR */}
            <SectionCard
              title="2. Tiket, Visa & Kereta Cepat (HHR)"
              open={op.paxs}
              onToggle={() => tog("paxs")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiket Pesawat PP (IDR)
                  </label>
                  <input
                    type="number"
                    value={tiket}
                    placeholder="0 jika tiket mandiri"
                    onChange={(e) => setTiket(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400">Isi 0 bila tiket beli sendiri</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Visa Umroh + Tasreh (USD/pax)
                  </label>
                  <input
                    type="number"
                    value={visa}
                    onChange={(e) => setVisa(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none text-slate-900 font-bold"
                  />
                  <span className="text-[10px] text-slate-400">Sesuai PDF: 140 USD (min 35 pax)</span>
                </div>
              </div>

              {/* Tabel Tier Dinamis HHR */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">
                    Kereta Cepat Haramain (Pilih Rute & Tier)
                  </span>
                  <span className="text-[10px] text-slate-500">Harga SAR / pax</span>
                </div>

                <div className="space-y-2">
                  {Object.entries(HHR_TIERS).map(([key, item]) => {
                    const isActive = hhrActive[key];
                    const selectedIdx = hhrSelectedTier[key] || 0;
                    return (
                      <div
                        key={key}
                        className={`p-2.5 rounded-xl border text-xs transition-colors ${
                          isActive
                            ? "bg-blue-50/60 border-blue-300"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() =>
                              setHhrActive((prev) => ({ ...prev, [key]: !prev[key] }))
                            }
                          >
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 ${
                                isActive ? "bg-blue-800" : "bg-slate-300"
                              }`}
                            >
                              {isActive ? "✓" : ""}
                            </div>
                            <span className="font-semibold text-slate-900">{item.label}</span>
                          </div>

                          {isActive && (
                            <select
                              value={selectedIdx}
                              onChange={(e) =>
                                setHhrSelectedTier((prev) => ({
                                  ...prev,
                                  [key]: Number(e.target.value),
                                }))
                              }
                              className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-blue-900 outline-none w-full sm:w-auto"
                            >
                              {item.tiers.map((t, idx) => (
                                <option key={idx} value={idx}>
                                  {t.name}: {t.sar} SAR
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Komponen Logistik Jamaah */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4 pt-3 border-t border-slate-100">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    SISKOPATUH
                  </label>
                  <div className="flex items-center bg-white border border-slate-200 rounded px-1.5 py-1">
                    <span className="text-[10px] text-slate-400 font-bold mr-1">Rp</span>
                    <input
                      type="number"
                      value={sskp}
                      onChange={(e) => setSskp(Number(e.target.value))}
                      className="w-full text-xs font-semibold outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Meals
                  </label>
                  <div className="flex items-center bg-white border border-slate-200 rounded px-1.5 py-1">
                    <input
                      type="number"
                      value={meals}
                      onChange={(e) => setMeals(Number(e.target.value))}
                      className="w-full text-xs font-semibold outline-none bg-transparent text-right pr-1"
                    />
                    <span className="text-[10px] text-slate-400 font-bold">SAR</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Perlengkapan
                  </label>
                  <div className="flex items-center bg-white border border-slate-200 rounded px-1.5 py-1">
                    <span className="text-[10px] text-slate-400 font-bold mr-1">Rp</span>
                    <input
                      type="number"
                      value={prlg}
                      onChange={(e) => setPrlg(Number(e.target.value))}
                      className="w-full text-xs font-semibold outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Asuransi
                  </label>
                  <div className="flex items-center bg-white border border-slate-200 rounded px-1.5 py-1">
                    <span className="text-[10px] text-slate-400 font-bold mr-1">Rp</span>
                    <input
                      type="number"
                      value={asrn}
                      onChange={(e) => setAsrn(Number(e.target.value))}
                      className="w-full text-xs font-semibold outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 3. Akomodasi Hotel Mekah & Madinah (Clean Mobile Layout) */}
            <SectionCard
              title="3. Hotel Mekah & Madinah"
              open={op.htl}
              onToggle={() => tog("htl")}
            >
              <div className="space-y-4">
                {/* Mekah */}
                <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                    <span className="text-xs font-bold text-blue-900">Hotel Mekah</span>
                    <input
                      type="text"
                      placeholder="Nama Hotel (opsional)"
                      value={hmek.name}
                      onChange={(e) => setHmek({ ...hmek, name: e.target.value })}
                      className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white w-full sm:w-48"
                    />
                  </div>

                  <div className="space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-3">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex sm:flex-col justify-between sm:justify-start items-center sm:items-stretch gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">Jumlah Malam</label>
                      <input
                        type="number"
                        min="0"
                        value={hmek.nights}
                        onChange={(e) => setHmek({ ...hmek, nights: Number(e.target.value) })}
                        className="w-20 sm:w-full p-1 text-xs border border-slate-200 rounded bg-slate-50 font-bold text-center"
                      />
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex sm:flex-col justify-between sm:justify-start items-center sm:items-stretch gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">Tipe Kamar</label>
                      <select
                        value={hmek.type}
                        onChange={(e) => setHmek({ ...hmek, type: e.target.value })}
                        className="w-32 sm:w-full p-1 text-xs border border-slate-200 rounded bg-slate-50 font-semibold"
                      >
                        <option value="QUAD">Quad (4 Pax)</option>
                        <option value="TRIPLE">Triple (3 Pax)</option>
                        <option value="DOUBLE">Double (2 Pax)</option>
                      </select>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex sm:flex-col justify-between sm:justify-start items-center sm:items-stretch gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">SAR / Kamar</label>
                      <input
                        type="number"
                        min="0"
                        value={hmek.sar}
                        onChange={(e) => setHmek({ ...hmek, sar: Number(e.target.value) })}
                        className="w-24 sm:w-full p-1 text-xs border border-slate-200 rounded bg-slate-50 font-bold text-blue-900 text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Madinah */}
                <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                    <span className="text-xs font-bold text-blue-900">Hotel Madinah</span>
                    <input
                      type="text"
                      placeholder="Nama Hotel (opsional)"
                      value={hmad.name}
                      onChange={(e) => setHmad({ ...hmad, name: e.target.value })}
                      className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white w-full sm:w-48"
                    />
                  </div>

                  <div className="space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-3">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex sm:flex-col justify-between sm:justify-start items-center sm:items-stretch gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">Jumlah Malam</label>
                      <input
                        type="number"
                        min="0"
                        value={hmad.nights}
                        onChange={(e) => setHmad({ ...hmad, nights: Number(e.target.value) })}
                        className="w-20 sm:w-full p-1 text-xs border border-slate-200 rounded bg-slate-50 font-bold text-center"
                      />
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex sm:flex-col justify-between sm:justify-start items-center sm:items-stretch gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">Tipe Kamar</label>
                      <select
                        value={hmad.type}
                        onChange={(e) => setHmad({ ...hmad, type: e.target.value })}
                        className="w-32 sm:w-full p-1 text-xs border border-slate-200 rounded bg-slate-50 font-semibold"
                      >
                        <option value="QUAD">Quad (4 Pax)</option>
                        <option value="TRIPLE">Triple (3 Pax)</option>
                        <option value="DOUBLE">Double (2 Pax)</option>
                      </select>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex sm:flex-col justify-between sm:justify-start items-center sm:items-stretch gap-1">
                      <label className="text-[11px] font-semibold text-slate-600">SAR / Kamar</label>
                      <input
                        type="number"
                        min="0"
                        value={hmad.sar}
                        onChange={(e) => setHmad({ ...hmad, sar: Number(e.target.value) })}
                        className="w-24 sm:w-full p-1 text-xs border border-slate-200 rounded bg-slate-50 font-bold text-blue-900 text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 4. Handling & Muthawif */}
            <SectionCard
              title={`4. Handling & Muthawif (${hdl.filter((h) => h.on).length} Aktif)`}
              open={op.hdl}
              onToggle={() => tog("hdl")}
            >
              <div className="space-y-2 max-h-80 overflow-y-auto pr-0.5">
                {hdl.map((h, i) => (
                  <div
                    key={h.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors gap-2 ${
                      h.on
                        ? "bg-blue-50/60 border-blue-200 text-slate-900 shadow-2xs"
                        : "bg-white border-slate-200 text-slate-400 opacity-80"
                    }`}
                  >
                    <div
                      className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                      onClick={() => togH(i)}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 ${
                          h.on ? "bg-blue-800" : "bg-slate-300"
                        }`}
                      >
                        {h.on ? "✓" : ""}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 text-xs truncate">{h.label}</div>
                        <div className="text-[10px] text-slate-500 truncate">{h.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <input
                        type="number"
                        value={h.sar}
                        onChange={(e) => updH(i, e.target.value)}
                        disabled={h.mode === "dyn"}
                        className="w-14 p-1.5 text-right text-xs font-bold text-blue-900 border border-slate-200 rounded-lg bg-white"
                      />
                      <span className="text-[10px] text-slate-500 w-16 text-right whitespace-nowrap">
                        {h.info}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 5. Kendaraan & Rute */}
            <SectionCard
              title={`5. Kendaraan & Rute (${selR.length} Rute)`}
              open={op.trn}
              onToggle={() => tog("trn")}
            >
              <div className="mb-3.5">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Pilih Jenis Armada:
                  </label>
                  <button
                    onClick={onOpenTransport}
                    className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Bus className="w-3.5 h-3.5" /> Tabel Mobil
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {VEH.map((v, i) => (
                    <button
                      key={v.n}
                      onClick={() => setVIdx(i)}
                      className={`p-2.5 rounded-xl border text-left transition-all min-w-0 cursor-pointer ${
                        vIdx === i
                          ? "bg-blue-50 border-blue-800 text-blue-950 ring-2 ring-blue-800 shadow-xs"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{v.n}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{v.s} Seats</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Rute Operasional ({VEH[vIdx].n}):
                </label>
                <div className="space-y-1.5">
                  {RT.map((r, i) => {
                    const isSelected = selR.includes(i);
                    const cost = VEH[vIdx].p[i] || 0;
                    return (
                      <div
                        key={i}
                        onClick={() => togR(i)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all gap-2 ${
                          isSelected
                            ? "bg-blue-50/70 border-blue-300 text-blue-950 font-semibold shadow-2xs"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 ${
                              isSelected ? "bg-blue-800" : "bg-slate-300"
                            }`}
                          >
                            {isSelected ? "✓" : ""}
                          </div>
                          <span className="truncate">{r}</span>
                        </div>
                        <span className="font-bold text-blue-900 shrink-0 bg-white px-2 py-0.5 rounded border border-slate-100">
                          {cost} SAR
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SectionCard>

            {/* 6. Margin Profit */}
            <SectionCard
              title="6. Target Margin Penjualan"
              open={op.mgn}
              onToggle={() => tog("mgn")}
            >
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 text-center">
                    QUAD (Ber-4)
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      value={mgn.quad}
                      onChange={(e) => setMgn({ ...mgn, quad: Number(e.target.value) })}
                      className="w-full p-1.5 text-xs text-center font-bold text-blue-900 outline-none"
                    />
                    <span className="bg-slate-100 px-2 py-1.5 text-xs text-slate-500 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 text-center">
                    TRIPLE (Ber-3)
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      value={mgn.triple}
                      onChange={(e) => setMgn({ ...mgn, triple: Number(e.target.value) })}
                      className="w-full p-1.5 text-xs text-center font-bold text-blue-900 outline-none"
                    />
                    <span className="bg-slate-100 px-2 py-1.5 text-xs text-slate-500 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 text-center">
                    DOUBLE (Ber-2)
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      value={mgn.double}
                      onChange={(e) => setMgn({ ...mgn, double: Number(e.target.value) })}
                      className="w-full p-1.5 text-xs text-center font-bold text-blue-900 outline-none"
                    />
                    <span className="bg-slate-100 px-2 py-1.5 text-xs text-slate-500 font-bold">%</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Tombol Re-kalkulasi & Switch ke Tab Ringkasan */}
            <button
              onClick={() => {
                calculateHPP();
                setMobileTab("result");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full py-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" /> LIHAT HASIL RINGKASAN HPP →
            </button>
          </div>

          {/* Kolom Kanan: Ringkasan Sticky (5 Kolom) */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 space-y-3.5 sm:space-y-4 ${
              mobileTab === "result" ? "block" : "hidden lg:block"
            }`}
          >
            {res && (
              <>
                {/* Kartu HPP Utama */}
                <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white p-5 sm:p-6 rounded-3xl shadow-xl border border-blue-900 relative overflow-hidden">
                  <IslamicOrnament className="absolute -right-14 -top-16 w-56 h-56 text-amber-300/10" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.16em] text-blue-200 mb-1">
                          Estimasi HPP per Jamaah
                        </div>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                          {fIDR(res.hpp)}
                          <span className="text-xs font-normal text-blue-200"> / pax</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wide bg-emerald-500/15 text-emerald-300 border border-emerald-400/25 rounded-full px-2.5 py-1">
                        <ShieldCheck className="w-3 h-3" /> Terhitung
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 mb-3">
                      <div>
                        <div className="text-[9px] uppercase tracking-wide text-blue-300">Total Rombongan</div>
                        <div className="text-sm font-black text-amber-300 mt-0.5">{fIDR(res.hpp * res.pax)}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-wide text-blue-300">Harga Jual Quad</div>
                        <div className="text-sm font-black text-white mt-0.5">{fIDR(res.quad)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 flex flex-wrap gap-1.5">
                      <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[10px] border border-white/10">{res.pax} Jamaah</span>
                      <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[10px] border border-white/10">{res.vehName}</span>
                      <span className="bg-white/10 px-2.5 py-1 rounded-lg text-[10px] border border-white/10">{res.hProg} Hari</span>
                    </div>
                  </div>
                </div>

                {/* Rincian Komponen Biaya */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                      Rincian Biaya per Jamaah
                    </span>
                    <span className="text-slate-400">IDR</span>
                  </div>

                  {res.tIDR > 0 && <SummaryRow label="Tiket Pesawat PP" val={res.tIDR} />}
                  {res.vIDR > 0 && <SummaryRow label="Visa Umroh + Tasreh Raudhah" val={res.vIDR} />}
                  {res.hhrIDR > 0 && <SummaryRow label="Kereta Cepat Haramain (HHR)" val={res.hhrIDR} />}
                  {res.sIDR > 0 && <SummaryRow label="SISKOPATUH" val={res.sIDR} />}
                  {res.mIDR > 0 && <SummaryRow label="Konsumsi / Catering" val={res.mIDR} />}
                  {res.pIDR > 0 && <SummaryRow label="Perlengkapan Umroh" val={res.pIDR} />}
                  {res.aIDR > 0 && <SummaryRow label="Asuransi" val={res.aIDR} />}

                  {res.hmekIDR > 0 && (
                    <SummaryRow
                      label={`Hotel Mekah (${res.hmek.nights} mlm - ${res.hmek.type})`}
                      val={res.hmekIDR}
                    />
                  )}
                  {res.hmadIDR > 0 && (
                    <SummaryRow
                      label={`Hotel Madinah (${res.hmad.nights} mlm - ${res.hmad.type})`}
                      val={res.hmadIDR}
                    />
                  )}

                  {res.hdlIDR > 0 && (
                    <div className="pt-1 border-t border-slate-100 flex justify-between font-semibold text-slate-800">
                      <span>Ground Handling ({res.hdlD.length} Layanan)</span>
                      <span className="font-bold text-blue-900">{fIDR(res.hdlIDR)}</span>
                    </div>
                  )}

                  {res.trnIDR > 0 && (
                    <div className="pt-1 border-t border-slate-100 flex justify-between font-semibold text-slate-800">
                      <span>Transportasi Darat ({res.trnD.length} Rute)</span>
                      <span className="font-bold text-blue-900">{fIDR(res.trnIDR)}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t-2 border-slate-200 flex justify-between font-extrabold text-xs sm:text-sm text-slate-900">
                    <span>HPP PER PAX</span>
                    <span className="text-blue-900">{fIDR(res.hpp)}</span>
                  </div>
                </div>

                {/* Rekomendasi Harga Jual Konsumen */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                    Rekomendasi Harga Jual
                  </span>
                  <PriceTierCard tier="QUAD (Kamar Ber-4)" margin={mgn.quad} price={res.quad} />
                  <PriceTierCard tier="TRIPLE (Kamar Ber-3)" margin={mgn.triple} price={res.triple} />
                  <PriceTierCard tier="DOUBLE (Kamar Ber-2)" margin={mgn.double} price={res.double} />
                </div>

                {/* Aksi Download PDF & Hubungi */}
                <div className="space-y-2">
                  <button
                    onClick={shareSummaryToWhatsApp}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {summaryCopied ? <CheckCircle2 className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {summaryCopied ? "Rincian Disalin & WhatsApp Dibuka" : "Salin Rincian ke WhatsApp"}
                  </button>
                  <button
                    onClick={() => generateQuotationPDF(res)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-blue-300" />
                    Unduh Proposal PDF Resmi
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20sudah%20hitung%20estimasi%20di%20simulator%20untuk%20${pax}%20jamaah,%20estimasi%20HPP%20${encodeURIComponent(fIDR(res.hpp))}.%20Mohon%20info%20ketersediaan.`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-blue-800" />
                      Konsultasi
                    </a>
                    <button
                      onClick={() =>
                        onPay({
                          amount: res.quad,
                          hpp: res.hpp,
                          jamaah: pax,
                          veh: res.vehName,
                        })
                      }
                      className="py-2.5 px-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold text-center transition-colors shadow-xs"
                    >
                      Booking
                    </button>
                  </div>

                  {/* Tombol Kembali ke Form Input di Mobile */}
                  <div className="lg:hidden pt-1">
                    <button
                      onClick={() => setMobileTab("form")}
                      className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                    >
                      ← Kembali edit parameter rombongan
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// HALAMAN TENTANG PMM & LEGALITAS
// ----------------------------------------------------
function TentangPage({ setPage }) {
  return (
    <div className="py-8 sm:py-16 bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="bg-white p-5 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-slate-100 pb-6">
            <img src={LOGO} alt="PMM" className="h-12 sm:h-14 w-auto object-contain" />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Persatuan Muthawif Muda
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-blue-800 mt-0.5">
                PT. Katiara Muda Jelajah | NIB: 3107230137724
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              <strong>Persatuan Muthawif Muda (PMM)</strong> adalah tim kolaboratif yang fokus pada penyediaan Muthawif (pembimbing ibadah umroh & haji), layanan land arrangement (LA) umrah, handling, konsultasi umrah mandiri, dan jasa lain yang diperlukan oleh biro perjalanan maupun jamaah perseorangan.
            </p>
            <p>
              PMM berpegang teguh pada adab dan norma islami, berkomitmen memberikan pelayanan terbaik untuk para tamu Allah selama berada di Haramain dengan layanan maksimal, prima, dan sesuai dengan syariat. Mayoritas tim PMM merupakan alumni Timur Tengah: <strong>Arab Saudi, Mesir, Sudan, Tunis, dan Maroko</strong> sehingga mahir berkomunikasi dalam bahasa Arab dan Inggris.
            </p>
            <p>
              PMM diawasi dan dibimbing oleh dewan pengawas dan pembimbing senior yang telah lama terjun di bidang pelayanan jamaah haji dan umroh.
            </p>
          </div>

          {/* Legalitas Box */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Badan Usaha:</span>
              <span className="font-bold text-slate-900">PT. Katiara Muda Jelajah</span>
            </div>
            <div>
              <span className="text-slate-500 block">Nomor Induk Berusaha (NIB):</span>
              <span className="font-bold text-slate-900">3107230137724</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email Resmi:</span>
              <span className="font-bold text-slate-900">cokatiara@gmail.com</span>
            </div>
            <div>
              <span className="text-slate-500 block">Kontak Hotline:</span>
              <span className="font-bold text-slate-900">+62 821 5544 4787</span>
            </div>
          </div>
        </div>

        {/* Media Sosial & Kanal Komunikasi */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Kanal Komunikasi Resmi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            <SocialCard label="WhatsApp 1" val={WA_PHONE} href={`https://wa.me/6282155444787`} />
            <SocialCard label="WhatsApp 2" val={WA2_PHONE} href={`https://wa.me/6282214326480`} />
            <SocialCard label="Instagram" val="@muthawif.muda" href={IG} />
            <SocialCard label="TikTok" val="@muthawif.muda" href={TK} />
            <SocialCard label="Facebook" val="Muthawif Muda" href={FB} />
            <SocialCard label="Domain Portal" val="pmm.yahya.web.id" href="https://pmm.yahya.web.id" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MODAL MATRIKS TRANSPORTASI (RESPONSIF MOBILE SCROLL)
// ----------------------------------------------------
function TransportMatrixModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white rounded-t-2xl">
          <div>
            <h2 className="font-bold text-sm sm:text-base">
              Tabel Tarif Resmi Transportasi Darat (SAR)
            </h2>
            <div className="text-[10px] sm:text-[11px] text-slate-400">
              Dokumen Resmi PMM Musim 1446 H / 2024 - 2025 M
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white text-xs"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="overflow-x-auto border border-slate-200 rounded-xl text-xs">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-xs">
                <tr>
                  <th className="p-2.5 sm:p-3">Rute Perjalanan</th>
                  {VEH.map((v) => (
                    <th key={v.n} className="p-2.5 sm:p-3 text-center border-l border-slate-200">
                      <div>{v.n}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{v.s} Seat</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] sm:text-xs">
                {RT.map((r, ri) => (
                  <tr key={ri} className={ri % 2 === 1 ? "bg-slate-50/60" : ""}>
                    <td className="p-2 sm:p-2.5 font-medium text-slate-900">{r}</td>
                    {VEH.map((v, vi) => (
                      <td
                        key={vi}
                        className="p-2 sm:p-2.5 text-center font-bold text-blue-900 border-l border-slate-100"
                      >
                        {v.p[ri]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800">Catatan Penting Dokumen PMM:</div>
            <p>• Tarif di atas menggunakan mata uang Reyal Saudi (SAR) dan dapat berubah sewaktu-waktu.</p>
            <p>• Harga sudah termasuk bensin dan supir (belum termasuk tips supir).</p>
            <p>• Kapasitas seat dapat disesuaikan dengan banyaknya koper/bagasi jamaah.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MODAL PEMBAYARAN & KONFIRMASI
// ----------------------------------------------------
function PayModal({ data, onClose, copied, copyToClipboard }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        <div className="bg-slate-900 p-4 sm:p-5 text-white rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="font-bold text-sm">Konfirmasi & Booking Layanan</h2>
            <div className="text-xs text-slate-400">
              Estimasi HPP: <strong>{fIDR(data.hpp)} / pax</strong> ({data.jamaah} Jamaah)
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white text-xs"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4 text-xs">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-blue-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              Harap lakukan konfirmasi tanggal penerbangan dan ketersediaan kuota muthawif kepada admin sebelum transfer.
            </span>
          </div>

          <div>
            <span className="font-bold text-slate-800 block mb-2">
              Rekening Resmi Perusahaan:
            </span>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900">Bank Syariah Indonesia (BSI)</div>
                  <div className="font-mono text-slate-700 mt-0.5">71XXXXXXXXX</div>
                  <div className="text-[10px] text-slate-400">a/n PT. Katiara Muda Jelajah</div>
                </div>
                <button
                  onClick={() => copyToClipboard("71XXXXXXXXX")}
                  className="px-2.5 py-1.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 hover:bg-slate-100"
                >
                  <Copy className="w-3 h-3" /> {copied ? "Disalin" : "Salin"}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900">Bank Central Asia (BCA)</div>
                  <div className="font-mono text-slate-700 mt-0.5">12XXXXXXXXX</div>
                  <div className="text-[10px] text-slate-400">a/n PT. Katiara Muda Jelajah</div>
                </div>
                <button
                  onClick={() => copyToClipboard("12XXXXXXXXX")}
                  className="px-2.5 py-1.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 hover:bg-slate-100"
                >
                  <Copy className="w-3 h-3" /> {copied ? "Disalin" : "Salin"}
                </button>
              </div>
            </div>
          </div>

          <a
            href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20ingin%20konfirmasi%20jadwal%20booking%20untuk%20${data.jamaah}%20jamaah.`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-center transition-colors flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" /> Hubungi WhatsApp Admin
          </a>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ATOMIK UI HELPER
// ----------------------------------------------------
function CounterInput({ label, sub, val, min, max, unit, onDec, onInc }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-slate-800">{label}</label>
      {sub && <span className="block text-[10px] text-slate-400">{sub}</span>}
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white w-full max-w-[200px]">
        <button
          onClick={onDec}
          disabled={val <= min}
          className="w-10 h-9 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 font-bold border-r border-slate-200 flex items-center justify-center cursor-pointer text-sm"
        >
          -
        </button>
        <div className="flex-1 text-center font-bold text-xs sm:text-sm text-slate-900">
          {val} <span className="text-[10px] font-normal text-slate-400">{unit}</span>
        </div>
        <button
          onClick={onInc}
          disabled={val >= max}
          className="w-10 h-9 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 font-bold border-l border-slate-200 flex items-center justify-center cursor-pointer text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}

function SectionCard({ title, open, onToggle, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div
        onClick={onToggle}
        className="px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer select-none bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
      >
        <span className="font-bold text-slate-900 text-xs sm:text-sm">{title}</span>
        <span className="text-slate-400 text-xs">{open ? "▲" : "▼"}</span>
      </div>
      {open && <div className="p-3.5 sm:p-5 border-t border-slate-100">{children}</div>}
    </div>
  );
}

function SummaryRow({ label, val }) {
  return (
    <div className="flex justify-between items-center py-0.5 border-b border-slate-50">
      <span className="text-slate-600 truncate mr-2">{label}</span>
      <span className="font-semibold text-slate-900 shrink-0">{fIDR(val)}</span>
    </div>
  );
}

function PriceTierCard({ tier, margin, price }) {
  return (
    <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200">
      <div>
        <div className="font-bold text-slate-900 text-[11px] sm:text-xs">{tier}</div>
        <div className="text-[10px] text-blue-800 font-medium">Margin {margin}%</div>
      </div>
      <div className="font-extrabold text-xs sm:text-sm text-slate-900">{fIDR(price)}</div>
    </div>
  );
}

function SocialCard({ label, val, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all block"
    >
      <div className="text-[10px] text-slate-400 font-medium">{label}</div>
      <div className="text-xs font-bold text-slate-800 mt-0.5 truncate">{val}</div>
    </a>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 sm:py-10 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <div>
            <div className="text-white font-extrabold text-sm">
              PERSATUAN MUTHAWIF MUDA
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5">
              PT. Katiara Muda Jelajah · NIB: 3107230137724
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href={WA} target="_blank" rel="noreferrer" className="hover:text-white">
              WhatsApp
            </a>
            <a href={IG} target="_blank" rel="noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href={TK} target="_blank" rel="noreferrer" className="hover:text-white">
              TikTok
            </a>
            <a href={FB} target="_blank" rel="noreferrer" className="hover:text-white">
              Facebook
            </a>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 1441 - 1446 H PMM Indonesia. Hak Cipta Dilindungi.</span>
          <div className="space-x-3 sm:space-x-4">
            <button onClick={() => setPage("home")} className="hover:text-white">
              Beranda
            </button>
            <button onClick={() => setPage("muthawif")} className="hover:text-white">
              Muthawif
            </button>
            <button onClick={() => setPage("simulator")} className="hover:text-white">
              Simulator
            </button>
            <button onClick={() => setPage("tentang")} className="hover:text-white">
              Legalitas
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
