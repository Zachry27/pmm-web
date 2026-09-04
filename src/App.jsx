import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  ShieldCheck, Award, Users, Compass, PhoneCall, Calendar, 
  MapPin, CheckCircle2, ChevronDown, ChevronUp, Download, 
  Sparkles, HeartHandshake, FileText, ArrowRight, Star,
  Calculator, Check, ExternalLink, HelpCircle, MessageSquare, 
  Menu, X, Send, Copy, AlertCircle, BookmarkCheck
} from "lucide-react";

import { LOGO } from "./logo.js";
import { 
  WA, WA_PHONE, WA2_PHONE, IG, TK, FB, 
  VEH, RT, HDL, LAYANAN_DATA, CT_DATA, EX_DATA, IB_DATA, 
  TESTIMONIALS, FAQ_DATA 
} from "./data.js";
import { generateQuotationPDF } from "./pdfExport.js";

const fIDR = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n || 0);

export default function App() {
  const [page, setPage] = useState("home");
  const [payModal, setPayModal] = useState(null);
  const [copied, setCopied] = useState(false);

  // Live Exchange Rate State
  const [liveKurs, setLiveKurs] = useState({ sar: 4350, usd: 16100, updated: "Live KSA" });

  useEffect(() => {
    // Attempt background fetch real-time rate
    fetch("https://open.er-api.com/v6/latest/SAR")
      .then((res) => res.json())
      .then((d) => {
        if (d && d.rates && d.rates.IDR) {
          setLiveKurs((prev) => ({
            ...prev,
            sar: Math.round(d.rates.IDR),
            usd: Math.round(d.rates.IDR * 3.75),
            updated: "Update Hari Ini",
          }));
        }
      })
      .catch(() => {});
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Resmi PT. Katiara Muda Jelajah
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline">NIB: 3107230137724</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-amber-300 font-medium">
              🕋 Musim Umroh 1446H / 2024 - 2025M
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              Kurs: 1 SAR ≈ Rp {liveKurs.sar.toLocaleString("id-ID")}
            </span>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" /> CS 24 Jam
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar page={page} setPage={setPage} />

      {/* Main Pages */}
      <main className="flex-1">
        {page === "home" && <HomePage setPage={setPage} setPayModal={setPayModal} />}
        {page === "jasa" && <JasaPage setPayModal={setPayModal} />}
        {page === "simulator" && (
          <SimulatorPage 
            defaultKurs={liveKurs.sar} 
            defaultUsd={liveKurs.usd} 
            onPay={(data) => setPayModal(data)} 
          />
        )}
        {page === "tentang" && <TentangPage setPage={setPage} />}
      </main>

      {/* Footer */}
      <Footer setPage={setPage} />

      {/* Payment & Booking Modal */}
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
// NAVBAR COMPONENT
// ----------------------------------------------------
function Navbar({ page, setPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Beranda" },
    { id: "jasa", label: "Katalog Layanan" },
    { id: "simulator", label: "Simulator Biaya & HPP" },
    { id: "tentang", label: "Tentang PMM" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="cursor-pointer flex items-center gap-3"
          onClick={() => { setPage("home"); setMobileOpen(false); }}
        >
          <img 
            src={LOGO} 
            alt="Persatuan Muthawif Muda" 
            className="h-12 w-auto object-contain drop-shadow-xs" 
          />
          <div className="hidden lg:block border-l border-slate-200 pl-3">
            <div className="text-xs font-bold tracking-wider text-blue-900 uppercase">
              Persatuan Muthawif Muda
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Land Arrangement & Manasik Haramain
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                page === link.id
                  ? "bg-blue-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setPage("simulator")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-700/20 hover:shadow-lg transition-all"
          >
            <Calculator className="w-4 h-4 text-blue-200" />
            Hitung HPP Umroh
          </button>
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            title="Chat WhatsApp"
          >
            <Send className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setPage(link.id);
                setMobileOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                page === link.id
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setPage("simulator");
                setMobileOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white text-sm font-bold py-3 rounded-xl shadow-md"
            >
              <Calculator className="w-4 h-4" />
              Simulator Biaya Umroh
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ----------------------------------------------------
// HOME PAGE COMPONENT
// ----------------------------------------------------
function HomePage({ setPage, setPayModal }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/30 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Official Partner Land Arrangement & Muthawif KSA
            </div>

            {/* Arabic Motto */}
            <div className="font-arabic text-2xl md:text-3xl text-amber-300/90 tracking-wide">
              خِدْمَةُ ضُيُوفِ الرَّحْمَنِ شَرَفٌ لَنَا
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Bimbingan Umroh Berilmu, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-amber-200 bg-clip-text text-transparent">
                Amanah Sesuai Syariat
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Didukung kolaborasi <strong>alumni universitas terkemuka Timur Tengah</strong> (Al-Azhar Kairo, Madinah, Ummul Qura). Menyediakan Muthawif, Land Arrangement (LA), Handling Airport, dan Transportasi VIP di Mekah & Madinah.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setPage("simulator")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Calculator className="w-5 h-5 text-blue-200" />
                Buka Simulator Biaya (HPP)
              </button>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Send className="w-5 h-5" />
                Konsultasi WhatsApp Bebas Biaya
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Legalitas PT & NIB Resmi
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Muthawif Alumni Timur Tengah
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparan Tanpa Biaya Tersembunyi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-slate-200 py-8 relative -mt-6 rounded-t-3xl max-w-6xl mx-auto shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pt-2 md:pt-0">
            <div className="text-3xl lg:text-4xl font-extrabold text-blue-800">1441 H</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Melayani Sejak 2020
            </div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-3xl lg:text-4xl font-extrabold text-blue-800">Al-Azhar</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              & Kampus Timur Tengah
            </div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-3xl lg:text-4xl font-extrabold text-blue-800">10,000+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Jamaah Terlayani
            </div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-3xl lg:text-4xl font-extrabold text-emerald-600">100%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Komitmen Amanah Syar'i
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Utama */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">
            Mengapa Memilih PMM?
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Standar Baru Layanan Ibadah di Tanah Suci
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            Kami memahami betapa berharganya setiap detik ibadah Anda di Haramain. Nikmati layanan profesional dengan adab islami yang luhur.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              🎓
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Muthawif Berilmu & Terverifikasi</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Muthawif kami bukan sekadar pemandu jalan, melainkan penuntut ilmu syariah alumni Al-Azhar, UIM Madinah, dan Ma'had Haram yang menguasai fiqih manasik serta sirah nabawiyah.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Transparansi HPP & Simulator Real-time</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Satu-satunya penyedia LA dengan simulator mandiri berbasis data resmi musim 1446H. Anda dapat mengkalkulasi komponen tiket, hotel, bus, dan handling secara instan.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              🎬
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Dokumentasi Video Sinematik 4K</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Setiap city tour dan ziarah kami lengkapi dengan dokumentasi cinematic video berkualitas tinggi tanpa biaya tambahan, mengabadikan momen haru ibadah Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Layanan Utama 8 Grid */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-extrabold text-blue-700 uppercase tracking-widest mb-2">
                Portofolio Layanan
              </h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                8 Layanan Unggulan PMM di Arab Saudi
              </h3>
            </div>
            <button
              onClick={() => setPage("jasa")}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800"
            >
              Lihat Rincian Seluruh Jasa <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {LAYANAN_DATA.map((item) => (
              <div
                key={item.n}
                onClick={() => setPage("jasa")}
                className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{item.i}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-1.5">{item.n}</h4>
                  <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                  <span>Lihat Detail</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Paket Populer */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
            City Tour & Ziarah Eksklusif
          </span>
          <h3 className="text-3xl font-extrabold text-slate-900">
            Napak Tilas Jejak Perjuangan Rasulullah ﷺ
          </h3>
          <p className="text-slate-600 text-sm">
            Eksplorasi tempat-tempat mustajab dan bersejarah bersama pembimbing berwawasan sirah mendalam.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CT_DATA.slice(0, 3).map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col"
            >
              <div className="h-44 relative overflow-hidden bg-slate-800">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <span>{item.e}</span> {item.name}
                </div>
                <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md">
                  Mulai {item.sar} SAR/Pax
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">🚐 {item.min}</span>
                    <span className="text-emerald-600 font-bold">✓ {item.bonus}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                </div>

                <a
                  href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(item.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Pesan Paket Ini
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setPage("jasa")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-sm font-bold shadow-xs hover:bg-slate-50 transition-all"
          >
            Lihat Semua Paket Ziarah, Thaif, Badar & Al Ula →
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
              Testimoni Jamaah & Mitra
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Dipercaya Travel Haji & Ribuan Jamaah
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.star)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-blue-200">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-extrabold text-blue-700 uppercase tracking-widest mb-1">
            FAQ Seputar Layanan
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Pertanyaan Yang Sering Diajukan
          </h3>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-xl border border-slate-200 p-5 [&_summary::-webkit-details-marker]:none cursor-pointer transition-all open:ring-1 open:ring-blue-600/30"
            >
              <summary className="flex justify-between items-center font-bold text-slate-900 text-sm sm:text-base">
                <span>{faq.q}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Call To Action Bottom */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Siap Merencanakan Umroh Terbaik Anda?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
            Diskusikan kebutuhan grup, keluarga, atau rombongan travel Anda dengan tim operasional kami langsung di Saudi.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => setPage("simulator")}
              className="bg-white text-blue-800 hover:bg-slate-100 px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all"
            >
              🧮 Buka Simulator Biaya
            </button>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Hubungi Admin via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------
// JASA / KATALOG PAGE
// ----------------------------------------------------
function JasaPage({ setPayModal }) {
  const [tab, setTab] = useState("utama");

  const tabs = [
    { id: "utama", label: "Layanan Utama" },
    { id: "ziarah", label: "Paket Ziarah & City Tour" },
    { id: "exp", label: "Experience & Attraction" },
    { id: "ibadah", label: "Amal & Badal Umroh" },
  ];

  return (
    <div className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Katalog Layanan PMM
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Pilihan Lengkap Perjalanan & Ibadah
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Dari pembimbing muthawif syar'i, ziarah sejarah, hingga badal umroh amanah bergaransi video.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl max-w-full overflow-x-auto gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  tab === t.id
                    ? "bg-white text-blue-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Utama */}
        {tab === "utama" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LAYANAN_DATA.map((item) => (
              <div
                key={item.n}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-4">
                    {item.i}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{item.n}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">{item.desc}</p>
                </div>
                <a
                  href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20ingin%20konsultasi%20layanan%20${encodeURIComponent(item.n)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold text-center transition-colors block"
                >
                  Konsultasi Layanan Ini
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Ziarah */}
        {tab === "ziarah" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CT_DATA.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col"
              >
                <div className="h-48 relative overflow-hidden bg-slate-800">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{item.e}</span> {item.name}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-blue-700 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md">
                    Start {item.sar} SAR
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">🚐 {item.min}</span>
                      <span className="text-emerald-600 font-bold">✓ {item.bonus}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>

                  <a
                    href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20ingin%20booking%20paket%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Pesan Sekarang
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Experience */}
        {tab === "exp" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EX_DATA.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col"
              >
                <div className="h-48 relative overflow-hidden bg-slate-800">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{item.e}</span> {item.name}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md">
                    Start {item.sar} SAR
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">🚐 {item.min}</span>
                      {item.bonus && <span className="text-emerald-600 font-bold">✓ {item.bonus}</span>}
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>

                  <a
                    href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20ingin%20booking%20experience%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Ikuti Kegiatan
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Ibadah Jariyah */}
        {tab === "ibadah" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IB_DATA.map((item) => (
              <div
                key={item.name}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl mb-4">{item.e}</div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{item.name}</h3>
                  <div className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full mb-3">
                    {item.sar} SAR / Paket
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">{item.desc}</p>
                  <div className="text-[11px] font-semibold text-emerald-600 mb-4">
                    ✓ {item.bonus}
                  </div>
                </div>
                <a
                  href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20ingin%20beramal%20/%20daftar%20${encodeURIComponent(item.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold text-center transition-colors block"
                >
                  Salurkan Amanah
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SIMULATOR BIAYA & HPP (ADVANCED CALCULATOR)
// ----------------------------------------------------
function SimulatorPage({ defaultKurs, defaultUsd, onPay }) {
  // Input parameters
  const [pax, setPax] = useState(4);
  const [hProg, setHProg] = useState(4);
  const [kurs, setKurs] = useState(defaultKurs || 4350);
  const [usdR, setUsdR] = useState(defaultUsd || 16100);

  // Accordion sections
  const [op, setOp] = useState({
    set: true,
    paxs: true,
    htl: true,
    hdl: true,
    trn: true,
    mgn: true,
  });
  const tog = (k) => setOp((o) => ({ ...o, [k]: !o[k] }));

  // Per Pax costs
  const [tiket, setTiket] = useState(0);
  const [visa, setVisa] = useState(140);
  const [hhr, setHhr] = useState({
    mme: { on: false, sar: 172.5, l: "Madinah - Mekah (Ekonomi)" },
    mmb: { on: false, sar: 380.65, l: "Madinah - Mekah (Bisnis)" },
    jme: { on: false, sar: 138.0, l: "Jeddah Airport - Madinah (Ekonomi)" },
    jmb: { on: false, sar: 323.15, l: "Jeddah Airport - Madinah (Bisnis)" },
  });
  const [sskp, setSskp] = useState(0);
  const [meals, setMeals] = useState(0);
  const [prlg, setPrlg] = useState(0);
  const [asrn, setAsrn] = useState(0);

  // Hotel settings
  const [hmek, setHmek] = useState({ nights: 4, type: "QUAD", sar: 450, name: "Hotel Mekah Bintang 4" });
  const [hmad, setHmad] = useState({ nights: 3, type: "QUAD", sar: 350, name: "Hotel Madinah Bintang 4" });
  const rp = { DOUBLE: 2, TRIPLE: 3, QUAD: 4 };

  // Handling items
  const [hdl, setHdl] = useState(HDL.map((h) => ({ ...h })));
  const togH = (i) => setHdl((h) => h.map((x, j) => (j === i ? { ...x, on: !x.on } : x)));
  const updH = (i, v) => setHdl((h) => h.map((x, j) => (j === i ? { ...x, sar: Number(v) } : x)));

  // Vehicles and routes
  const [vIdx, setVIdx] = useState(3); // Default H1 Staria
  const [selR, setSelR] = useState([0, 2, 7, 9, 14]); // Common default routes
  const togR = (i) =>
    setSelR((p) => (p.includes(i) ? p.filter((r) => r !== i) : [...p, i]));

  // Profit Margins
  const [mgn, setMgn] = useState({ quad: 5, triple: 5, double: 7 });

  // Calculation Result
  const [res, setRes] = useState(null);

  const calculateHPP = () => {
    const tIDR = Number(tiket) || 0;
    const vIDR = (Number(visa) || 0) * usdR;
    const hhrIDR = Object.values(hhr)
      .filter((h) => h.on)
      .reduce((a, h) => a + h.sar * kurs, 0);

    const sIDR = Number(sskp) || 0;
    const mIDR = (Number(meals) || 0) * kurs;
    const pIDR = Number(prlg) || 0;
    const aIDR = Number(asrn) || 0;

    const hmekIDR =
      hmek.nights > 0 ? (hmek.sar * kurs * hmek.nights) / rp[hmek.type] : 0;
    const hmadIDR =
      hmad.nights > 0 ? (hmad.sar * kurs * hmad.nights) / rp[hmad.type] : 0;

    const p = Math.max(1, pax);

    // Handling breakdown
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
            ? (350 + 15 * pax) / p
            : h.sar / p;
        hdlD.push({ n: h.label, idr: sp * kurs, sar: sp });
      });
    const hdlIDR = hdlD.reduce((a, h) => a + h.idr, 0);

    // Transport breakdown
    const trnD = [];
    selR.forEach((ri) => {
      const s = VEH[vIdx].p[ri] || 0;
      trnD.push({ n: RT[ri], idr: (s / p) * kurs, sar: s / p });
    });
    const trnIDR = trnD.reduce((a, t) => a + t.idr, 0);

    const hpp =
      tIDR + vIDR + hhrIDR + sIDR + mIDR + pIDR + aIDR + hmekIDR + hmadIDR + hdlIDR + trnIDR;

    const resultObj = {
      pax,
      hProg,
      kurs,
      vehName: VEH[vIdx].n,
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

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {}
  };

  // Run calculation on initial load
  useEffect(() => {
    calculateHPP();
  }, []);

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
            <Calculator className="w-3.5 h-3.5" /> Engine Kalkulator HPP Resmi 1446H
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Simulator Land Arrangement Umroh
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Hitung HPP riil per pax, sesuaikan hotel, transportasi, handling, dan download proposal PDF resmi.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: 7 cols */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Pengaturan Umum */}
            <SectionCard
              title="⚙️ 1. Pengaturan Dasar & Jumlah Jamaah"
              open={op.set}
              onToggle={() => tog("set")}
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <CounterInput
                  label="Jumlah Jamaah"
                  sub="Total orang dalam grup"
                  val={pax}
                  min={1}
                  max={100}
                  unit="pax"
                  onDec={() => setPax((p) => Math.max(1, p - 1))}
                  onInc={() => setPax((p) => Math.min(100, p + 1))}
                />
                <CounterInput
                  label="Hari Program"
                  sub="Durasi pendampingan muthawif"
                  val={hProg}
                  min={1}
                  max={30}
                  unit="hari"
                  onDec={() => setHProg((h) => Math.max(1, h - 1))}
                  onInc={() => setHProg((h) => Math.min(30, h + 1))}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Kurs 1 SAR ke IDR
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-slate-400 font-bold">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={kurs}
                      onChange={(e) => setKurs(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Kurs 1 USD ke IDR
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-slate-400 font-bold">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={usdR}
                      onChange={(e) => setUsdR(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 2. Kebutuhan Per Pax */}
            <SectionCard
              title="✈️ 2. Tiket, Visa & Komponen Per Pax"
              open={op.paxs}
              onToggle={() => tog("paxs")}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Tiket Pesawat PP (IDR)
                  </label>
                  <input
                    type="number"
                    value={tiket}
                    placeholder="Contoh: 12500000"
                    onChange={(e) => setTiket(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400">Isi 0 jika tiket diurus mandiri</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Visa Umroh (USD/pax)
                  </label>
                  <input
                    type="number"
                    value={visa}
                    onChange={(e) => setVisa(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400">Standar resmi: ~140 USD</span>
                </div>
              </div>

              {/* Kereta Cepat Haramain */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="block text-xs font-bold text-slate-700 mb-2">
                  Kereta Cepat Haramain (HHR) - Tiket Per Pax
                </span>
                <div className="space-y-2">
                  {Object.entries(hhr).map(([k, h]) => (
                    <div
                      key={k}
                      onClick={() =>
                        setHhr((prev) => ({
                          ...prev,
                          [k]: { ...prev[k], on: !prev[k].on },
                        }))
                      }
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                        h.on
                          ? "bg-blue-50/80 border-blue-300 text-blue-900 font-semibold"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white ${
                            h.on ? "bg-blue-600" : "bg-slate-300"
                          }`}
                        >
                          {h.on ? "✓" : ""}
                        </div>
                        <span>{h.l}</span>
                      </div>
                      <span className="font-bold text-blue-700">{h.sar} SAR</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Komponen pendukung */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    SISKOPATUH (IDR)
                  </label>
                  <input
                    type="number"
                    value={sskp}
                    onChange={(e) => setSskp(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Meals (SAR/pax)
                  </label>
                  <input
                    type="number"
                    value={meals}
                    onChange={(e) => setMeals(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Perlengkapan (IDR)
                  </label>
                  <input
                    type="number"
                    value={prlg}
                    onChange={(e) => setPrlg(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Asuransi (IDR)
                  </label>
                  <input
                    type="number"
                    value={asrn}
                    onChange={(e) => setAsrn(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded outline-none"
                  />
                </div>
              </div>
            </SectionCard>

            {/* 3. Hotel Mekah & Madinah */}
            <SectionCard
              title="🏨 3. Akomodasi Hotel Mekah & Madinah"
              open={op.htl}
              onToggle={() => tog("htl")}
            >
              <div className="space-y-4">
                {/* Mekah */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                      🕋 Hotel Mekah
                    </span>
                    <input
                      type="text"
                      placeholder="Nama Hotel (opsional)"
                      value={hmek.name}
                      onChange={(e) => setHmek({ ...hmek, name: e.target.value })}
                      className="text-xs px-2 py-1 border border-slate-200 rounded bg-white w-48 text-right"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Malam</label>
                      <input
                        type="number"
                        min="0"
                        value={hmek.nights}
                        onChange={(e) => setHmek({ ...hmek, nights: Number(e.target.value) })}
                        className="w-full p-2 text-xs border rounded bg-white font-bold text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Tipe Kamar</label>
                      <select
                        value={hmek.type}
                        onChange={(e) => setHmek({ ...hmek, type: e.target.value })}
                        className="w-full p-2 text-xs border rounded bg-white font-semibold"
                      >
                        <option value="QUAD">Quad (4 Pax)</option>
                        <option value="TRIPLE">Triple (3 Pax)</option>
                        <option value="DOUBLE">Double (2 Pax)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Tarif SAR/Kamar</label>
                      <input
                        type="number"
                        min="0"
                        value={hmek.sar}
                        onChange={(e) => setHmek({ ...hmek, sar: Number(e.target.value) })}
                        className="w-full p-2 text-xs border rounded bg-white font-bold text-blue-700 text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Madinah */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                      🕌 Hotel Madinah
                    </span>
                    <input
                      type="text"
                      placeholder="Nama Hotel (opsional)"
                      value={hmad.name}
                      onChange={(e) => setHmad({ ...hmad, name: e.target.value })}
                      className="text-xs px-2 py-1 border border-slate-200 rounded bg-white w-48 text-right"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Malam</label>
                      <input
                        type="number"
                        min="0"
                        value={hmad.nights}
                        onChange={(e) => setHmad({ ...hmad, nights: Number(e.target.value) })}
                        className="w-full p-2 text-xs border rounded bg-white font-bold text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Tipe Kamar</label>
                      <select
                        value={hmad.type}
                        onChange={(e) => setHmad({ ...hmad, type: e.target.value })}
                        className="w-full p-2 text-xs border rounded bg-white font-semibold"
                      >
                        <option value="QUAD">Quad (4 Pax)</option>
                        <option value="TRIPLE">Triple (3 Pax)</option>
                        <option value="DOUBLE">Double (2 Pax)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Tarif SAR/Kamar</label>
                      <input
                        type="number"
                        min="0"
                        value={hmad.sar}
                        onChange={(e) => setHmad({ ...hmad, sar: Number(e.target.value) })}
                        className="w-full p-2 text-xs border rounded bg-white font-bold text-blue-700 text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 4. Handling & Layanan Lapangan */}
            <SectionCard
              title={`🤝 4. Ground Handling (${hdl.filter((h) => h.on).length} Aktif)`}
              open={op.hdl}
              onToggle={() => tog("hdl")}
            >
              <div className="text-[11px] text-slate-500 mb-3">
                Centang layanan handling yang dibutuhkan. Biaya akan dibagi rata per jamaah sesuai formula PMM.
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {hdl.map((h, i) => (
                  <div
                    key={h.id}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                      h.on
                        ? "bg-blue-50/50 border-blue-200 text-slate-900"
                        : "bg-white border-slate-200 text-slate-500 opacity-70"
                    }`}
                  >
                    <div
                      className="flex items-center gap-2 flex-1 cursor-pointer"
                      onClick={() => togH(i)}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 ${
                          h.on ? "bg-blue-600" : "bg-slate-300"
                        }`}
                      >
                        {h.on ? "✓" : ""}
                      </div>
                      <div>
                        <div className="font-semibold">{h.label}</div>
                        <div className="text-[10px] text-slate-400">{h.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        value={h.sar}
                        onChange={(e) => updH(i, e.target.value)}
                        disabled={h.mode === "dyn"}
                        className="w-16 p-1 text-right text-xs font-bold text-blue-700 border border-slate-200 rounded bg-white"
                      />
                      <span className="text-[10px] text-slate-400 w-16 text-right">
                        {h.info}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 5. Kendaraan & Rute */}
            <SectionCard
              title={`🚐 5. Kendaraan & Rute Bus (${selR.length} Rute Dipilih)`}
              open={op.trn}
              onToggle={() => tog("trn")}
            >
              {/* Choice of Vehicle */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Pilih Jenis Armada Transportasi:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {VEH.map((v, i) => (
                    <button
                      key={v.n}
                      onClick={() => setVIdx(i)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        vIdx === i
                          ? "bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600/20"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs font-bold">{v.n}</div>
                      <div className="text-[10px] text-slate-500">{v.s} Seats</div>
                      <div className="text-[9px] text-blue-600 font-semibold">{v.tag}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Choice of Routes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Pilih Rute Operasional ({VEH[vIdx].n}):
                </label>
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {RT.map((r, i) => {
                    const isSelected = selR.includes(i);
                    const cost = VEH[vIdx].p[i] || 0;
                    return (
                      <div
                        key={i}
                        onClick={() => togR(i)}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50/70 border-blue-300 text-blue-900 font-medium"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 ${
                              isSelected ? "bg-blue-600" : "bg-slate-300"
                            }`}
                          >
                            {isSelected ? "✓" : ""}
                          </div>
                          <span>{r}</span>
                        </div>
                        <span className="font-bold text-blue-700">{cost} SAR</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SectionCard>

            {/* 6. Target Margin Penjualan */}
            <SectionCard
              title="📊 6. Margin Keuntungan & Harga Jual"
              open={op.mgn}
              onToggle={() => tog("mgn")}
            >
              <div className="text-[11px] text-slate-500 mb-3">
                Tentukan target margin profit (persen) yang ingin Anda tambahkan di atas HPP untuk menghasilkan paket harga jual konsumen.
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    QUAD (Ber-4)
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      value={mgn.quad}
                      onChange={(e) => setMgn({ ...mgn, quad: Number(e.target.value) })}
                      className="w-full p-2 text-sm text-center font-bold text-blue-700 outline-none"
                    />
                    <span className="bg-slate-100 px-2.5 py-2 text-xs font-bold text-slate-500">
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    TRIPLE (Ber-3)
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      value={mgn.triple}
                      onChange={(e) => setMgn({ ...mgn, triple: Number(e.target.value) })}
                      className="w-full p-2 text-sm text-center font-bold text-blue-700 outline-none"
                    />
                    <span className="bg-slate-100 px-2.5 py-2 text-xs font-bold text-slate-500">
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    DOUBLE (Ber-2)
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      value={mgn.double}
                      onChange={(e) => setMgn({ ...mgn, double: Number(e.target.value) })}
                      className="w-full p-2 text-sm text-center font-bold text-blue-700 outline-none"
                    />
                    <span className="bg-slate-100 px-2.5 py-2 text-xs font-bold text-slate-500">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Recalculate Button */}
            <button
              onClick={calculateHPP}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-base shadow-lg shadow-blue-700/25 transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" /> RE-KALKULASI HPP SEKARANG
            </button>
          </div>

          {/* Right Summary: 5 cols sticky */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            {res && (
              <>
                {/* HPP Main Card */}
                <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full"></div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">
                    Harga Pokok Produksi (HPP)
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight mb-1">
                    {fIDR(res.hpp)}
                    <span className="text-sm font-semibold text-slate-300"> / pax</span>
                  </div>
                  <div className="text-xs text-slate-300 flex items-center gap-2 mt-2">
                    <span className="bg-blue-800/80 px-2 py-0.5 rounded">
                      👥 {pax} Jamaah
                    </span>
                    <span className="bg-blue-800/80 px-2 py-0.5 rounded">
                      🚐 {res.vehName}
                    </span>
                    <span className="bg-blue-800/80 px-2 py-0.5 rounded">
                      📅 {hProg} Hari
                    </span>
                  </div>
                </div>

                {/* Rincian Komponen HPP */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Rincian Biaya per Pax
                    </span>
                    <span className="text-[11px] text-slate-400">IDR</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {res.tIDR > 0 && (
                      <SummaryRow label="✈️ Tiket Pesawat PP" val={res.tIDR} />
                    )}
                    {res.vIDR > 0 && (
                      <SummaryRow label="📋 Visa Umroh Resmi KSA" val={res.vIDR} />
                    )}
                    {res.hhrIDR > 0 && (
                      <SummaryRow label="🚄 Tiket Kereta Cepat (HHR)" val={res.hhrIDR} />
                    )}
                    {res.sIDR > 0 && (
                      <SummaryRow label="📱 SISKOPATUH" val={res.sIDR} />
                    )}
                    {res.mIDR > 0 && (
                      <SummaryRow label="🍽️ Konsumsi / Catering" val={res.mIDR} />
                    )}
                    {res.pIDR > 0 && (
                      <SummaryRow label="🎒 Perlengkapan" val={res.pIDR} />
                    )}
                    {res.aIDR > 0 && (
                      <SummaryRow label="🛡️ Asuransi" val={res.aIDR} />
                    )}

                    {res.hmekIDR > 0 && (
                      <SummaryRow
                        label={`🏨 Hotel Mekah (${res.hmek.nights} mlm - ${res.hmek.type})`}
                        val={res.hmekIDR}
                      />
                    )}
                    {res.hmadIDR > 0 && (
                      <SummaryRow
                        label={`🏨 Hotel Madinah (${res.hmad.nights} mlm - ${res.hmad.type})`}
                        val={res.hmadIDR}
                      />
                    )}

                    {res.hdlIDR > 0 && (
                      <div className="pt-1 border-t border-slate-100">
                        <div className="flex justify-between font-semibold text-slate-800">
                          <span>🤝 Ground Handling ({res.hdlD.length} Item)</span>
                          <span className="text-blue-700 font-bold">{fIDR(res.hdlIDR)}</span>
                        </div>
                      </div>
                    )}

                    {res.trnIDR > 0 && (
                      <div className="pt-1 border-t border-slate-100">
                        <div className="flex justify-between font-semibold text-slate-800">
                          <span>🚐 Transportasi ({res.trnD.length} Rute)</span>
                          <span className="text-blue-700 font-bold">{fIDR(res.trnIDR)}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t-2 border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                      <span>TOTAL HPP / PAX</span>
                      <span className="text-blue-700">{fIDR(res.hpp)}</span>
                    </div>
                  </div>
                </div>

                {/* Rekomendasi Harga Jual */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Rekomendasi Harga Jual Konsumen
                  </span>

                  <div className="space-y-2">
                    <PriceTierCard
                      tier="QUAD (Kamar Ber-4)"
                      margin={mgn.quad}
                      price={res.quad}
                    />
                    <PriceTierCard
                      tier="TRIPLE (Kamar Ber-3)"
                      margin={mgn.triple}
                      price={res.triple}
                    />
                    <PriceTierCard
                      tier="DOUBLE (Kamar Ber-2)"
                      margin={mgn.double}
                      price={res.double}
                    />
                  </div>
                </div>

                {/* Actions: Download PDF & Konsultasi */}
                <div className="space-y-2">
                  <button
                    onClick={() => generateQuotationPDF(res)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    Download Proposal PDF Resmi (.pdf)
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`${WA}?text=Halo%20PMM,%20saya%20sudah%20hitung%20di%20simulator%20untuk%20${pax}%20jamaah,%20estimasi%20HPP%20${encodeURIComponent(fIDR(res.hpp))}.%20Mohon%20bantu%20kordinasi%20lanjut.`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5 text-emerald-600" />
                      Konsultasi WA
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
                      className="py-3 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold text-center transition-colors shadow-sm"
                    >
                      💳 Booking / DP
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
// TENTANG PMM COMPONENT
// ----------------------------------------------------
function TentangPage({ setPage }) {
  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Profile */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-8">
            <img src={LOGO} alt="PMM" className="h-16 w-auto object-contain" />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Persatuan Muthawif Muda Indonesia
              </h1>
              <p className="text-sm font-semibold text-blue-700">
                Tim Kolaboratif Alumni Timur Tengah di Tanah Suci
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
            <p>
              <strong>Persatuan Muthawif Muda (PMM)</strong> beroperasi secara resmi di bawah naungan badan hukum <strong>PT. Katiara Muda Jelajah (NIB: 3107230137724)</strong>. Kami adalah jejaring profesional yang mendedikasikan diri untuk melayani para tamu Allah di Mekah Al-Mukarramah dan Madinah Al-Munawwarah.
            </p>
            <p>
              Berakar dari komunitas mahasiswa dan alumni universitas terkemuka di kawasan Timur Tengah—termasuk <strong>Universitas Al-Azhar Mesir, Universitas Islam Madinah (UIM), Universitas Ummul Qura Mekah, serta perguruan tinggi di Maroko, Sudan, dan Tunisia</strong>. Latar belakang ini menjamin setiap pembimbing kami mahir berbahasa Arab, memahami seluk-beluk regulasi Kementerian Haji KSA, dan membimbing manasik sesuai sunnah shahihah.
            </p>
          </div>

          {/* Legalitas Box */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block">Nama Badan Usaha:</span>
              <span className="font-bold text-slate-900">PT. Katiara Muda Jelajah</span>
            </div>
            <div>
              <span className="text-slate-500 block">Nomor Induk Berusaha (NIB):</span>
              <span className="font-bold text-slate-900">3107230137724</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email Korespondensi:</span>
              <span className="font-bold text-slate-900">cokatiara@gmail.com</span>
            </div>
            <div>
              <span className="text-slate-500 block">Hotline Kantor Pusat:</span>
              <span className="font-bold text-slate-900">+62 821 5544 4787</span>
            </div>
          </div>
        </div>

        {/* Official Channels */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Kanal Resmi & Media Sosial</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SocialContactCard
              icon="💬"
              label="WhatsApp Hotline 1"
              val={WA_PHONE}
              href={`https://wa.me/6282155444787`}
            />
            <SocialContactCard
              icon="💬"
              label="WhatsApp Hotline 2"
              val={WA2_PHONE}
              href={`https://wa.me/6282214326480`}
            />
            <SocialContactCard
              icon="📷"
              label="Instagram Resmi"
              val="@muthawif.muda"
              href={IG}
            />
            <SocialContactCard
              icon="🎵"
              label="TikTok Content"
              val="@muthawif.muda"
              href={TK}
            />
            <SocialContactCard
              icon="👥"
              label="Facebook Page"
              val="Muthawif Muda"
              href={FB}
            />
            <SocialContactCard
              icon="🌐"
              label="Domain Portal"
              val="pmm.yahya.web.id"
              href="https://pmm.yahya.web.id"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PAYMENT & BOOKING MODAL
// ----------------------------------------------------
function PayModal({ data, onClose, copied, copyToClipboard }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm"
          >
            ✕
          </button>
          <h3 className="text-lg font-extrabold flex items-center gap-2">
            💳 Konfirmasi & Booking Layanan
          </h3>
          <div className="text-xs text-blue-200 mt-1">
            Estimasi HPP: <strong>{fIDR(data.hpp)} / pax</strong> ({data.jamaah} Jamaah)
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-amber-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Silakan konfirmasi rencana jadwal, tanggal penerbangan, dan ketersediaan muthawif kepada admin sebelum melakukan transfer pembayaran.
            </span>
          </div>

          {/* Rekening Transfer */}
          <div>
            <span className="font-bold text-slate-800 block mb-2">
              Rekening Resmi Badan Usaha:
            </span>
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-extrabold text-blue-900 text-sm">
                    Bank Syariah Indonesia (BSI)
                  </div>
                  <div className="text-xs text-slate-600 font-mono tracking-wider mt-0.5">
                    71XXXXXXXXX
                  </div>
                  <div className="text-[10px] text-slate-400">a/n PT. Katiara Muda Jelajah</div>
                </div>
                <button
                  onClick={() => copyToClipboard("71XXXXXXXXX")}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> {copied ? "Disalin!" : "Salin"}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-extrabold text-blue-900 text-sm">
                    Bank Central Asia (BCA)
                  </div>
                  <div className="text-xs text-slate-600 font-mono tracking-wider mt-0.5">
                    12XXXXXXXXX
                  </div>
                  <div className="text-[10px] text-slate-400">a/n PT. Katiara Muda Jelajah</div>
                </div>
                <button
                  onClick={() => copyToClipboard("12XXXXXXXXX")}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> {copied ? "Disalin!" : "Salin"}
                </button>
              </div>
            </div>
          </div>

          {/* QRIS / Note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-1">
            <span className="text-2xl">📱</span>
            <div className="font-bold text-slate-800 text-xs">Tersedia QRIS Resmi</div>
            <p className="text-[11px] text-slate-500">
              Kirim bukti mutasi/transfer melalui WhatsApp admin PMM untuk validasi instan.
            </p>
          </div>

          <a
            href={`${WA}?text=Halo%20Admin%20PMM,%20saya%20ingin%20konfirmasi%20pembayaran/booking%20untuk%20${data.jamaah}%20jamaah.`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <Send className="w-4 h-4" /> Kirim Konfirmasi ke WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// REUSABLE HELPER COMPONENTS
// ----------------------------------------------------
function CounterInput({ label, sub, val, min, max, unit, onDec, onInc }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-slate-800">{label}</label>
      {sub && <span className="block text-[10px] text-slate-400">{sub}</span>}
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white w-40">
        <button
          onClick={onDec}
          disabled={val <= min}
          className="w-10 h-9 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 font-bold border-r border-slate-200"
        >
          -
        </button>
        <div className="flex-1 text-center font-extrabold text-sm text-slate-900">
          {val} <span className="text-[10px] font-normal text-slate-400">{unit}</span>
        </div>
        <button
          onClick={onInc}
          disabled={val >= max}
          className="w-10 h-9 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 font-bold border-l border-slate-200"
        >
          +
        </button>
      </div>
    </div>
  );
}

function SectionCard({ title, open, onToggle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all">
      <div
        onClick={onToggle}
        className={`px-5 py-4 flex items-center justify-between cursor-pointer select-none transition-colors ${
          open ? "bg-blue-50/50" : "hover:bg-slate-50"
        }`}
      >
        <span className="font-bold text-slate-900 text-xs sm:text-sm">{title}</span>
        <span className="text-slate-400 text-xs">{open ? "▲" : "▼"}</span>
      </div>
      {open && <div className="p-5 border-t border-slate-100">{children}</div>}
    </div>
  );
}

function SummaryRow({ label, val }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-slate-50">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{fIDR(val)}</span>
    </div>
  );
}

function PriceTierCard({ tier, margin, price }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100">
      <div>
        <div className="font-bold text-slate-900 text-xs">{tier}</div>
        <div className="text-[10px] text-blue-700">Margin {margin}%</div>
      </div>
      <div className="font-extrabold text-sm text-blue-900">{fIDR(price)}</div>
    </div>
  );
}

function SocialContactCard({ icon, label, val, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all flex items-center gap-3 group"
    >
      <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      <div>
        <div className="text-[10px] text-slate-500 font-semibold">{label}</div>
        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
          {val}
        </div>
      </div>
    </a>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1">
            <div className="text-white font-extrabold text-base">
              PERSATUAN MUTHAWIF MUDA
            </div>
            <p className="text-slate-500">
              PT. Katiara Muda Jelajah · NIB: 3107230137724
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white transition-colors"
              title="WhatsApp"
            >
              💬
            </a>
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-pink-600 text-white transition-colors"
              title="Instagram"
            >
              📷
            </a>
            <a
              href={TK}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white transition-colors"
              title="TikTok"
            >
              🎵
            </a>
            <a
              href={FB}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white transition-colors"
              title="Facebook"
            >
              👥
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 text-center text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 1441 - 1446 H (2020 - 2025 M) PMM Indonesia. Hak Cipta Dilindungi.</span>
          <div className="space-x-4">
            <button onClick={() => setPage("home")} className="hover:text-white">
              Beranda
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
