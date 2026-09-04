import React, { useState, useEffect } from "react";
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
  Building2,
  Bus,
  Train,
  Plane,
  FileSpreadsheet,
  Briefcase,
  Layers,
  Clock,
} from "lucide-react";

import { LOGO } from "./logo.js";
import {
  WA,
  WA_PHONE,
  WA2_PHONE,
  IG,
  TK,
  FB,
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

export default function App() {
  const [page, setPage] = useState("home");
  const [payModal, setPayModal] = useState(null);
  const [transportModal, setTransportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Kurs Realtime
  const [liveKurs, setLiveKurs] = useState({
    sar: 4350,
    usd: 16100,
    label: "Update 1446H",
  });

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/SAR")
      .then((res) => res.json())
      .then((d) => {
        if (d && d.rates && d.rates.IDR) {
          setLiveKurs({
            sar: Math.round(d.rates.IDR),
            usd: Math.round(d.rates.IDR * 3.75),
            label: "Kurs Real-time",
          });
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
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Bar Informasi Legalitas & Kurs */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              PT. Katiara Muda Jelajah
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">NIB: 3107230137724</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">
              Musim Umroh 1446 H / 2024 - 2025 M
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-300">
              1 SAR ≈ Rp {liveKurs.sar.toLocaleString("id-ID")}
            </span>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <PhoneCall className="w-3 h-3 text-blue-400" /> Kontak Lapangan
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar
        page={page}
        setPage={setPage}
        onOpenTransport={() => setTransportModal(true)}
      />

      {/* Konten Halaman */}
      <main className="flex-1">
        {page === "home" && (
          <HomePage
            setPage={setPage}
            setPayModal={setPayModal}
            onOpenTransport={() => setTransportModal(true)}
          />
        )}
        {page === "jasa" && (
          <JasaPage
            setPayModal={setPayModal}
            onOpenTransport={() => setTransportModal(true)}
          />
        )}
        {page === "muthawif" && <MuthawifPage setPage={setPage} />}
        {page === "simulator" && (
          <SimulatorPage
            defaultKurs={liveKurs.sar}
            defaultUsd={liveKurs.usd}
            onPay={(data) => setPayModal(data)}
            onOpenTransport={() => setTransportModal(true)}
          />
        )}
        {page === "tentang" && <TentangPage setPage={setPage} />}
      </main>

      {/* Footer */}
      <Footer setPage={setPage} />

      {/* Modal Tarif Transportasi Lengkap PDF */}
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
// NAVBAR
// ----------------------------------------------------
function Navbar({ page, setPage, onOpenTransport }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Beranda" },
    { id: "muthawif", label: "Layanan Muthawif" },
    { id: "jasa", label: "Katalog & Paket" },
    { id: "simulator", label: "Simulator Biaya" },
    { id: "tentang", label: "Tentang PMM" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          className="cursor-pointer flex items-center gap-3"
          onClick={() => {
            setPage("home");
            setMobileOpen(false);
          }}
        >
          <img
            src={LOGO}
            alt="Persatuan Muthawif Muda"
            className="h-11 w-auto object-contain"
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
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                page === link.id
                  ? "bg-blue-800 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenTransport}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Bus className="w-3.5 h-3.5 text-blue-800" />
            Tabel Transportasi
          </button>
          <button
            onClick={() => setPage("simulator")}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-800 hover:bg-blue-900 text-white shadow-sm transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Hitung Estimasi
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
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
                  ? "bg-blue-50 text-blue-800 font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenTransport();
                setMobileOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 flex items-center justify-center gap-1"
            >
              <Bus className="w-3.5 h-3.5 text-blue-800" /> Tabel Mobil
            </button>
            <button
              onClick={() => {
                setPage("simulator");
                setMobileOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Simulator Biaya
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ----------------------------------------------------
// BERANDA (HOME PAGE)
// ----------------------------------------------------
function HomePage({ setPage, setPayModal, onOpenTransport }) {
  return (
    <div>
      {/* Hero Section: Nuansa Biru Navy & Abu-abu Elegan */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-16 pb-24 md:pt-24 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tag resmi */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Layanan Resmi Land Arrangement & Muthawif Saudi
            </div>

            {/* Motto Arab Sesuai Adab */}
            <div className="font-arabic text-2xl md:text-3xl text-slate-200 tracking-wide">
              خِدْمَةُ ضُيُوفِ الرَّحْمَنِ شَرَفٌ لَنَا
            </div>

            {/* Judul Utama */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Muthawif Muda, <br />
              <span className="text-blue-300">Melayani Perjalanan Umroh Anda</span>
            </h1>

            {/* Deskripsi Dari Dokumen Asli */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Tim kolaboratif alumni Timur Tengah (Arab Saudi, Mesir, Sudan, Tunis, dan Maroko). Berpegang teguh pada adab dan norma islami, siap menjadi mitra terpercaya bagi biro perjalanan maupun jamaah mandiri.
            </p>

            {/* Tombol Aksi */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setPage("simulator")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Buka Simulator Biaya (HPP)
              </button>
              <button
                onClick={() => setPage("muthawif")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
              >
                <Users className="w-4 h-4 text-blue-300" />
                Rincian Tugas Muthawif
              </button>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800/80 font-bold text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-slate-300" />
                Hubungi Kami
              </a>
            </div>

            {/* Poin Kepercayaan */}
            <div className="pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Legalitas PT & NIB Lengkap
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Fasih Bahasa Arab & Inggris
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" /> Bimbingan Dewan Pengawas Senior
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ringkasan Parameter Layanan */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
          <div className="pt-2 md:pt-0">
            <div className="text-2xl lg:text-3xl font-extrabold text-blue-900">280 - 300 SAR</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Tarif Muthawif / Hari / Grup</div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-2xl lg:text-3xl font-extrabold text-blue-900">140 USD</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Visa Umroh + Tasreh Raudhah</div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-2xl lg:text-3xl font-extrabold text-blue-900">7 Armada</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Sedan hingga Big Bus 45 Seat</div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-2xl lg:text-3xl font-extrabold text-blue-900">Agen Resmi</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Kereta Cepat Haramain (HHR)</div>
          </div>
        </div>
      </section>

      {/* Profil Muthawif & Keunggulan PMM */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              Peran Sentral Muthawif
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Representasi dan Wajah Amanah Dari Perjalanan Umroh Anda
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Muthawif secara harfiah berarti <em>"pemandu orang yang thawaf"</em>. Mereka tidak hanya memandu thawaf dan doa, melainkan bertanggung jawab sejak kedatangan di bandara hingga kepulangan ke tanah air.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Kami hadir sebagai perpanjangan tangan yang berkomitmen menjaga reputasi dan kepercayaan, bertugas sesuai visi-misi Anda dan menjadikan ibadah jamaah bermakna serta nyaman.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setPage("muthawif")}
                className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                Lihat 14 Cakupan Tugas Muthawif <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenTransport}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Bus className="w-3.5 h-3.5 text-blue-700" /> Cek Tarif Transportasi
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-800" /> Standar Kualifikasi Tim PMM
            </h3>
            <div className="space-y-3">
              {[
                { title: "Latar Belakang Akademis Timur Tengah", desc: "Alumni universitas ternama Mesir (Al-Azhar), Arab Saudi, Sudan, Tunisia, dan Maroko." },
                { title: "Kemampuan Bahasa Arab & Inggris", desc: "Komunikasi aktif untuk koordinasi lancar dengan muassasah, supir, dan pihak hotel." },
                { title: "Bimbingan Manasik Sesuai Syariat", desc: "Pemahaman fiqih manasik yang mendalam untuk memandu ibadah secara tepat dan tenang." },
                { title: "Pengawasan Dewan Pembimbing Senior", desc: "Didukung dan diarahkan oleh pembimbing yang telah berpengalaman lama di Haramain." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 Layanan Utama */}
      <section className="py-16 bg-slate-200/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider block mb-1">
                Portofolio Jasa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Layanan Terpadu di Tanah Suci
              </h2>
            </div>
            <button
              onClick={() => setPage("jasa")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950"
            >
              Buka Katalog Semua Layanan <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_LIST.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">0{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{item.n}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-800">
                  <span onClick={() => setPage("jasa")} className="cursor-pointer hover:underline">
                    Rincian
                  </span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Tiket Kereta Cepat Haramain (HHR) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase">
                <Train className="w-3.5 h-3.5 text-blue-800" />
                Agen Resmi HHR
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Pemesanan Tiket Kereta Cepat Haramain
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                PMM adalah agen resmi Haramain High Speed Railway (HHR). Harga tiket mengikuti sistem dinamis waktu pembelian di Arab Saudi. Dapatkan kepastian reservasi tiket grup dan fasilitas free 1 tiket pada kuota tertentu.
              </p>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Ketentuan Harga:</div>
                <p>• Harga dasar ekonomi Madinah–Mekah mulai 172.50 SAR.</p>
                <p>• Tarif mengalami kenaikan berkala saat mendekati tanggal keberangkatan.</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="bg-slate-900 text-white font-bold p-3">
                  Tabel Tarif Rute & Kenaikan Tiket HHR (Reyal Saudi - SAR)
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Rute & Kelas</th>
                        <th className="p-2.5 text-center">Harga Dasar</th>
                        <th className="p-2.5 text-center">Kenaikan 1</th>
                        <th className="p-2.5 text-center">Kenaikan 2</th>
                        <th className="p-2.5 text-center">Kenaikan 3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2.5 font-medium">Madinah - Mekah (Ekonomi)</td>
                        <td className="p-2.5 text-center font-bold text-blue-800">172.50</td>
                        <td className="p-2.5 text-center">224.25</td>
                        <td className="p-2.5 text-center">276.00</td>
                        <td className="p-2.5 text-center">306.77</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-2.5 font-medium">Madinah - Mekah (Bisnis)</td>
                        <td className="p-2.5 text-center font-bold text-blue-800">380.65</td>
                        <td className="p-2.5 text-center">616.40</td>
                        <td className="p-2.5 text-center">852.15</td>
                        <td className="p-2.5 text-center text-slate-400">-</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium">Jeddah Airport - Madinah (Ekonomi)</td>
                        <td className="p-2.5 text-center font-bold text-blue-800">138.00</td>
                        <td className="p-2.5 text-center">172.50</td>
                        <td className="p-2.5 text-center">218.50</td>
                        <td className="p-2.5 text-center text-slate-400">-</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-2.5 font-medium">Jeddah Airport - Madinah (Bisnis)</td>
                        <td className="p-2.5 text-center font-bold text-blue-800">323.15</td>
                        <td className="p-2.5 text-center">708.40</td>
                        <td className="p-2.5 text-center text-slate-400">-</td>
                        <td className="p-2.5 text-center text-slate-400">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-200/50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider">
              Informasi Umum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pertanyaan Seputar Layanan PMM
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-xl border border-slate-200 p-4 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-bold text-slate-900 text-xs sm:text-sm select-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
                </summary>
                <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-slate-900 text-white py-14 px-4 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Rencanakan Kebutuhan Umroh Anda Bersama PMM
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Diskusikan detail jadwal, kebutuhan muthawif, armada transportasi, atau paket lengkap dengan tim PMM langsung di Saudi.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setPage("simulator")}
              className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" /> Buka Simulator Biaya
            </button>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2"
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
// HALAMAN KHUSUS: LAYANAN MUTHAWIF (DARI PDF)
// ----------------------------------------------------
function MuthawifPage({ setPage }) {
  return (
    <div className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Layanan Utama PMM
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Cakupan Tugas & Tanggung Jawab Muthawif
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Mendampingi jamaah sejak menginjakkan kaki di bandara hingga kembali pulang ke tanah air. Membantu segala kebutuhan ibadah dan menjaga ketenangan jamaah selama di Haramain.
          </p>
          <div className="inline-block bg-white px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 shadow-xs">
            Ratib / Fee Resmi: <span className="text-blue-800">280 s/d 300 SAR</span> per hari per grup
          </div>
        </div>

        {/* 14 Poin Cakupan Tugas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MUTHAWIF_DUTIES.map((d, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Tugas {i + 1}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{d.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-1">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Komitmen Kerjasama */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
          <h2 className="text-base font-extrabold text-slate-900">
            Komitmen Perpanjangan Tangan
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
              className="px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs transition-colors inline-flex items-center gap-2"
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
  const [tab, setTab] = useState("paket");

  return (
    <div className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider">
            Katalog Layanan PMM 1446 H
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Layanan Umroh & Ziarah Terpadu
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Tersedia paket lengkap, city tour ziarah bersejarah, dan program amal jariyah.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-slate-200 rounded-xl gap-1">
            {[
              { id: "paket", label: "Cakupan Paket Lengkap" },
              { id: "ziarah", label: "Paket Ziarah & City Tour" },
              { id: "exp", label: "Eksplorasi Tambahan" },
              { id: "jariyah", label: "Badal Umroh & Amal" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  tab === t.id
                    ? "bg-white text-blue-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Cakupan Paket Lengkap Dokumen PMM */}
        {tab === "paket" && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="max-w-3xl">
              <h2 className="text-lg font-extrabold text-slate-900">
                Cakupan Standar Paket Lengkap (Airport to Airport)
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Paket terpadu yang mencakup 17 komponen penting perjalanan ibadah di Tanah Suci:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <Check className="w-4 h-4 text-blue-800 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                * Rincian dapat disesuaikan pada kalkulator simulator sesuai kebutuhan rombongan.
              </div>
              <button
                onClick={onOpenTransport}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Bus className="w-3.5 h-3.5 text-blue-800" /> Lihat Tabel Tarif Transportasi
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Ziarah */}
        {tab === "ziarah" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CT_DATA.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Mulai {item.sar} SAR
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{item.min}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{item.name}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-3">{item.desc}</p>
                  <div className="text-[11px] font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
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
            ))}
          </div>
        )}

        {/* Tab 3: Experience */}
        {tab === "exp" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EX_DATA.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Start {item.sar} SAR
                    </span>
                    <span className="text-[11px] text-slate-400">{item.min}</span>
                  </div>
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
            ))}
          </div>
        )}

        {/* Tab 4: Ibadah Jariyah */}
        {tab === "jariyah" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IB_DATA.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="inline-block text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-2">
                    {item.sar} SAR / Paket
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{item.name}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-3">{item.desc}</p>
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
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SIMULATOR BIAYA & HPP RESMI 1446 H
// ----------------------------------------------------
function SimulatorPage({ defaultKurs, defaultUsd, onPay, onOpenTransport }) {
  // Mode Cepat: Paket Lengkap Standar LA vs Kustom Bebas
  const [isStandardLA, setIsStandardLA] = useState(true);

  // Input Parameter Rombongan
  const [pax, setPax] = useState(4);
  const [hProg, setHProg] = useState(4);
  const [kurs, setKurs] = useState(defaultKurs || 4350);
  const [usdR, setUsdR] = useState(defaultUsd || 16100);

  // Accordion Sections
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

  // Kereta Cepat HHR dengan Pilihan Tier Kenaikan Tarif
  const [hhrActive, setHhrActive] = useState({
    mme: false, // Madinah-Mekah Ekonomi
    mmb: false,
    jme: false,
    jmb: false,
  });
  const [hhrSelectedTier, setHhrSelectedTier] = useState({
    mme: 0, // Harga Dasar (172.5)
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

  // Mode Preset Standard LA Toggle
  const applyStandardLA = (enabled) => {
    setIsStandardLA(enabled);
    if (enabled) {
      setHdl((h) => h.map((x) => ({ ...x, on: x.standardLA })));
      setVisa(140);
      setHhrActive((prev) => ({ ...prev, mme: true }));
    }
  };

  // Transportasi (Rute PDF)
  const [vIdx, setVIdx] = useState(3); // Default H1 Staria
  const [selR, setSelR] = useState([0, 1, 4, 5, 9]); // 5 Rute standar
  const togR = (i) =>
    setSelR((p) => (p.includes(i) ? p.filter((r) => r !== i) : [...p, i]));

  // Target Margin
  const [mgn, setMgn] = useState({ quad: 5, triple: 5, double: 7 });

  // Hasil Kalkulasi
  const [res, setRes] = useState(null);

  const calculateHPP = () => {
    const tIDR = Number(tiket) || 0;
    const vIDR = (Number(visa) || 0) * usdR;

    // Hitung total Kereta Cepat HHR sesuai tier yang dipilih
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

    const p = Math.max(1, pax);

    // Rincian Handling
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

    // Rincian Transportasi
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

    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.85 } });
    } catch (e) {}
  };

  useEffect(() => {
    calculateHPP();
  }, []);

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold text-blue-800 uppercase tracking-wider">
              Kalkulator Biaya Resmi 1446 H
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              Simulator HPP & Penawaran Land Arrangement
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Data tarif resmi PT. Katiara Muda Jelajah (PMM). Unduh proposal penawaran PDF seketika.
            </p>
          </div>

          {/* Toggle Cepat: Paket Lengkap Standar vs Kustom */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
            <span className="text-slate-600 px-2">Mode Paket:</span>
            <button
              onClick={() => applyStandardLA(true)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isStandardLA
                  ? "bg-blue-800 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Paket Lengkap
            </button>
            <button
              onClick={() => applyStandardLA(false)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                !isStandardLA
                  ? "bg-blue-800 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Kustom Bebas
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Form Konfigurasi (7 Kolom) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Pengaturan Dasar */}
            <SectionCard
              title="1. Pengaturan Jumlah Jamaah & Kurs Acuan"
              open={op.set}
              onToggle={() => tog("set")}
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
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

              <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kurs 1 SAR ke IDR
                  </label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kurs 1 USD ke IDR
                  </label>
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
              title="2. Tiket, Visa Umroh & Kereta Cepat (HHR)"
              open={op.paxs}
              onToggle={() => tog("paxs")}
            >
              <div className="grid sm:grid-cols-2 gap-4">
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
                    Visa Umroh + Tasreh Raudhah (USD/pax)
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
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">
                    Tiket Kereta Cepat Haramain (Pilih Rute & Tier Harga)
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
                        <div className="flex items-center justify-between">
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
                              className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-blue-900 outline-none"
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    SISKOPATUH (IDR)
                  </label>
                  <input
                    type="number"
                    value={sskp}
                    onChange={(e) => setSskp(Number(e.target.value))}
                    className="w-full p-1.5 text-xs border border-slate-200 rounded outline-none"
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
                    className="w-full p-1.5 text-xs border border-slate-200 rounded outline-none"
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
                    className="w-full p-1.5 text-xs border border-slate-200 rounded outline-none"
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
                    className="w-full p-1.5 text-xs border border-slate-200 rounded outline-none"
                  />
                </div>
              </div>
            </SectionCard>

            {/* 3. Akomodasi Hotel Mekah & Madinah */}
            <SectionCard
              title="3. Akomodasi Hotel Mekah & Madinah"
              open={op.htl}
              onToggle={() => tog("htl")}
            >
              <div className="space-y-4">
                {/* Mekah */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-900">Hotel Mekah</span>
                    <input
                      type="text"
                      placeholder="Nama Hotel (opsional)"
                      value={hmek.name}
                      onChange={(e) => setHmek({ ...hmek, name: e.target.value })}
                      className="text-xs px-2 py-1 border border-slate-200 rounded bg-white w-44 text-right"
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
                      <label className="block text-[11px] text-slate-500 mb-1">SAR / Kamar</label>
                      <input
                        type="number"
                        min="0"
                        value={hmek.sar}
                        onChange={(e) => setHmek({ ...hmek, sar: Number(e.target.value) })}
                        className="w-full p-2 text-xs border rounded bg-white font-bold text-blue-800 text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Madinah */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-900">Hotel Madinah</span>
                    <input
                      type="text"
                      placeholder="Nama Hotel (opsional)"
                      value={hmad.name}
                      onChange={(e) => setHmad({ ...hmad, name: e.target.value })}
                      className="text-xs px-2 py-1 border border-slate-200 rounded bg-white w-44 text-right"
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
                      <label className="block text-[11px] text-slate-500 mb-1">SAR / Kamar</label>
                      <input
                        type="number"
                        min="0"
                        value={hmad.sar}
                        onChange={(e) => setHmad({ ...hmad, sar: Number(e.target.value) })}
                        className="w-full p-2 text-xs border rounded bg-white font-bold text-blue-800 text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 4. Handling & Muthawif (17 Poin Dokumen) */}
            <SectionCard
              title={`4. Layanan Handling & Muthawif (${hdl.filter((h) => h.on).length} Aktif)`}
              open={op.hdl}
              onToggle={() => tog("hdl")}
            >
              <div className="text-[11px] text-slate-500 mb-3">
                Komponen handling resmi di bawah ini dapat diaktifkan sesuai kebutuhan:
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {hdl.map((h, i) => (
                  <div
                    key={h.id}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                      h.on
                        ? "bg-blue-50/50 border-blue-200 text-slate-900"
                        : "bg-white border-slate-200 text-slate-400 opacity-75"
                    }`}
                  >
                    <div
                      className="flex items-center gap-2 flex-1 cursor-pointer"
                      onClick={() => togH(i)}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 ${
                          h.on ? "bg-blue-800" : "bg-slate-300"
                        }`}
                      >
                        {h.on ? "✓" : ""}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{h.label}</div>
                        <div className="text-[10px] text-slate-500">{h.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        value={h.sar}
                        onChange={(e) => updH(i, e.target.value)}
                        disabled={h.mode === "dyn"}
                        className="w-16 p-1 text-right text-xs font-bold text-blue-900 border border-slate-200 rounded bg-white"
                      />
                      <span className="text-[10px] text-slate-400 w-16 text-right">
                        {h.info}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 5. Kendaraan & Rute (Data Tabel PDF) */}
            <SectionCard
              title={`5. Kendaraan & Rute Transportasi (${selR.length} Rute)`}
              open={op.trn}
              onToggle={() => tog("trn")}
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-800">
                    Pilih Jenis Armada:
                  </label>
                  <button
                    onClick={onOpenTransport}
                    className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1"
                  >
                    <Bus className="w-3.5 h-3.5" /> Buka Tabel Tarif Lengkap
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {VEH.map((v, i) => (
                    <button
                      key={v.n}
                      onClick={() => setVIdx(i)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        vIdx === i
                          ? "bg-blue-50 border-blue-800 text-blue-950 ring-1 ring-blue-800"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs font-bold">{v.n}</div>
                      <div className="text-[10px] text-slate-500">{v.s} Seats</div>
                      <div className="text-[9px] text-blue-700 font-semibold">{v.tag}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Rute Operasional ({VEH[vIdx].n}):
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
                            ? "bg-blue-50/70 border-blue-300 text-blue-950 font-medium"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 ${
                              isSelected ? "bg-blue-800" : "bg-slate-300"
                            }`}
                          >
                            {isSelected ? "✓" : ""}
                          </div>
                          <span>{r}</span>
                        </div>
                        <span className="font-bold text-blue-900">{cost} SAR</span>
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
              <div className="text-[11px] text-slate-500 mb-3">
                Margin profit (persen) di atas HPP untuk menghasilkan rekomendasi harga jual per kamar:
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
                      className="w-full p-2 text-xs text-center font-bold text-blue-900 outline-none"
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
                      className="w-full p-2 text-xs text-center font-bold text-blue-900 outline-none"
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
                      className="w-full p-2 text-xs text-center font-bold text-blue-900 outline-none"
                    />
                    <span className="bg-slate-100 px-2.5 py-2 text-xs font-bold text-slate-500">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Tombol Re-kalkulasi */}
            <button
              onClick={calculateHPP}
              className="w-full py-3.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" /> RE-KALKULASI ESTIMASI HPP
            </button>
          </div>

          {/* Kolom Kanan: Ringkasan Sticky (5 Kolom) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            {res && (
              <>
                {/* Kartu HPP Utama */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Total Estimasi HPP / Pax
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-blue-300 tracking-tight mb-2">
                    {fIDR(res.hpp)}
                    <span className="text-xs font-normal text-slate-400"> / pax</span>
                  </div>
                  <div className="text-xs text-slate-300 flex flex-wrap gap-2 pt-1 border-t border-slate-800">
                    <span className="bg-slate-800 px-2 py-0.5 rounded">
                      {pax} Jamaah
                    </span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded">
                      {res.vehName}
                    </span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded">
                      {hProg} Hari Program
                    </span>
                  </div>
                </div>

                {/* Rincian Komponen Biaya */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
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

                  <div className="pt-2 border-t-2 border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                    <span>HPP PER PAX</span>
                    <span className="text-blue-900">{fIDR(res.hpp)}</span>
                  </div>
                </div>

                {/* Rekomendasi Harga Jual Konsumen */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                    Rekomendasi Harga Jual dengan Margin
                  </span>
                  <PriceTierCard tier="QUAD (Kamar Ber-4)" margin={mgn.quad} price={res.quad} />
                  <PriceTierCard tier="TRIPLE (Kamar Ber-3)" margin={mgn.triple} price={res.triple} />
                  <PriceTierCard tier="DOUBLE (Kamar Ber-2)" margin={mgn.double} price={res.double} />
                </div>

                {/* Aksi Download PDF & Hubungi */}
                <div className="space-y-2">
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
                      className="py-2.5 px-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold text-center transition-colors shadow-xs"
                    >
                      Booking / Konfirmasi
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
    <div className="py-16 bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-8">
            <img src={LOGO} alt="PMM" className="h-14 w-auto object-contain" />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Persatuan Muthawif Muda
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-blue-800">
                PT. Katiara Muda Jelajah | NIB: 3107230137724
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
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
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 grid sm:grid-cols-2 gap-4 text-xs">
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
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Kanal Komunikasi Resmi
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <SocialCard label="WhatsApp 1" val={WA_PHONE} href={`https://wa.me/6282155444787`} />
            <SocialCard label="WhatsApp 2" val={WA2_PHONE} href={`https://wa.me/6282214326480`} />
            <SocialCard label="Instagram" val="@muthawif.muda" href={IG} />
            <SocialCard label="TikTok" val="@muthawif.muda" href={TK} />
            <SocialCard label="Facebook" val="Muthawif Muda" href={FB} />
            <SocialCard label="Domain" val="pmm.yahya.web.id" href="https://pmm.yahya.web.id" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MODAL MATRIKS TRANSPORTASI RESMI (10 RUTE x 7 ARMADA)
// ----------------------------------------------------
function TransportMatrixModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white rounded-t-2xl">
          <div>
            <h2 className="font-bold text-sm sm:text-base">
              Tabel Tarif Resmi Transportasi Darat (Reyal Saudi - SAR)
            </h2>
            <div className="text-[11px] text-slate-400">
              Dokumen Resmi PMM Musim 1446 H / 2024 - 2025 M
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="overflow-x-auto border border-slate-200 rounded-xl text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Rute Perjalanan</th>
                  {VEH.map((v) => (
                    <th key={v.n} className="p-3 text-center border-l border-slate-200">
                      <div>{v.n}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{v.s} Seat</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RT.map((r, ri) => (
                  <tr key={ri} className={ri % 2 === 1 ? "bg-slate-50/60" : ""}>
                    <td className="p-2.5 font-medium text-slate-900">{r}</td>
                    {VEH.map((v, vi) => (
                      <td
                        key={vi}
                        className="p-2.5 text-center font-bold text-blue-900 border-l border-slate-100"
                      >
                        {v.p[ri]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800">Catatan Penting Sesuai Dokumen PMM:</div>
            <p>• Tarif di atas menggunakan mata uang Reyal Saudi (SAR) dan dapat berubah sewaktu-waktu.</p>
            <p>• Harga sudah termasuk bensin dan supir (belum termasuk tips supir).</p>
            <p>• Jumlah kapasitas seat dapat disesuaikan dengan banyaknya koper/bagasi rombongan.</p>
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
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        <div className="bg-slate-900 p-5 text-white rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="font-bold text-sm">Konfirmasi & Booking Layanan</h2>
            <div className="text-xs text-slate-400">
              Estimasi HPP: <strong>{fIDR(data.hpp)} / pax</strong> ({data.jamaah} Jamaah)
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
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
// KOMPONEN PEMBANTU (UI ATOMIK)
// ----------------------------------------------------
function CounterInput({ label, sub, val, min, max, unit, onDec, onInc }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-slate-800">{label}</label>
      {sub && <span className="block text-[10px] text-slate-400">{sub}</span>}
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white w-36">
        <button
          onClick={onDec}
          disabled={val <= min}
          className="w-9 h-8 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 font-bold border-r border-slate-200"
        >
          -
        </button>
        <div className="flex-1 text-center font-bold text-xs text-slate-900">
          {val} <span className="text-[10px] font-normal text-slate-400">{unit}</span>
        </div>
        <button
          onClick={onInc}
          disabled={val >= max}
          className="w-9 h-8 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 font-bold border-l border-slate-200"
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
        className="px-5 py-3.5 flex items-center justify-between cursor-pointer select-none bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
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
    <div className="flex justify-between items-center py-0.5 border-b border-slate-50">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{fIDR(val)}</span>
    </div>
  );
}

function PriceTierCard({ tier, margin, price }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
      <div>
        <div className="font-bold text-slate-900 text-xs">{tier}</div>
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
      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all block"
    >
      <div className="text-[10px] text-slate-400 font-medium">{label}</div>
      <div className="text-xs font-bold text-slate-800 mt-0.5">{val}</div>
    </a>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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

        <div className="pt-4 border-t border-slate-900 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 1441 - 1446 H PMM Indonesia. Hak Cipta Dilindungi.</span>
          <div className="space-x-4">
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
