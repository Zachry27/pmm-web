export const WA = "https://wa.me/message/3ZVWV62OLOR6L1";
export const WA_PHONE = "+62 821 5544 4787";
export const WA2_PHONE = "+62 822 1432 6480";
export const IG = "https://www.instagram.com/muthawif.muda";
export const TK = "https://www.tiktok.com/@muthawif.muda";
export const FB = "https://www.facebook.com/profile.php?id=100090863117392";

// Gambar Premium HD Unsplash
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80",
  kaaba: "/muthawif_tawaf.jpg",
  nabawi: "/nabawi_rawdah.jpg",
  thaif: "/alula_tour.jpg",
  alula: "/alula_tour.jpg",
  badar: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
  jeddah: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  tahajud: "/muthawif_tawaf.jpg",
  bus: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
  train: "/hhr_train_opt.jpg",
  airport: "/jeddah_airport_handling.jpg",
  csAvatar: "/saudi_cs_pro.jpg",
  muthawifAvatar: "/muthawif_tawaf.jpg"
};

// Transportasi 7 armada x 10 rute resmi dari dokumen PDF PMM 1446H
export const VEH = [
  { n: "Sedan VIP", s: "2-3", tag: "Private / Couple", p: [300, 250, 150, 650, 550, 200, 350, 150, 200, 500] },
  { n: "GMC Yukon 2019", s: "3-5", tag: "Kenyamanan VIP", p: [400, 350, 250, 850, 900, 250, 450, 250, 250, 1000] },
  { n: "GMC Yukon 2023", s: "3-5", tag: "Premium Eksekutif", p: [530, 430, 300, 750, 1100, 350, 500, 300, 300, 1200] },
  { n: "Hyundai H1 / Staria", s: "7-9", tag: "Pilihan Keluarga", p: [300, 300, 200, 900, 700, 270, 400, 200, 200, 700] },
  { n: "Toyota Hiace", s: "9-12", tag: "Rombongan Kecil", p: [430, 350, 250, 700, 800, 350, 450, 250, 300, 900] },
  { n: "Toyota Coaster", s: "20-26", tag: "Rombongan Sedang", p: [550, 500, 300, 1000, 1100, 450, 600, 300, 400, 1200] },
  { n: "Mercedes Big Bus", s: "40-45", tag: "Grup Besar", p: [1000, 600, 600, 1200, 1500, 500, 700, 600, 600, 1600] },
];

export const RT = [
  "Jeddah - Mekah / Sebaliknya",
  "Ziarah Kota Mekah (City Tour)",
  "Stasiun Mekah - Hotel Mekah / Sebaliknya",
  "Mekah - Thaif PP (City Tour Thaif)",
  "Mekah - Madinah / Sebaliknya",
  "Ziarah Kota Madinah (City Tour)",
  "Madinah - Jabal Magnet PP",
  "Stasiun Madinah - Hotel Madinah / Sebaliknya",
  "Airport Madinah - Hotel Madinah / Sebaliknya",
  "Madinah - Jeddah / Sebaliknya",
];

// Tabel Tiket Kereta Cepat Haramain (HHR) sesuai dokumen resmi PMM
export const HHR_TIERS = {
  mme: {
    label: "Madinah - Mekah (Ekonomi)",
    tiers: [
      { name: "Harga Dasar", sar: 172.5 },
      { name: "Kenaikan 1", sar: 224.25 },
      { name: "Kenaikan 2", sar: 276.0 },
      { name: "Kenaikan 3", sar: 306.77 },
    ],
  },
  mmb: {
    label: "Madinah - Mekah (Bisnis)",
    tiers: [
      { name: "Harga Dasar", sar: 380.65 },
      { name: "Kenaikan 1", sar: 616.4 },
      { name: "Kenaikan 2", sar: 852.15 },
    ],
  },
  jme: {
    label: "Jeddah Airport - Madinah (Ekonomi)",
    tiers: [
      { name: "Harga Dasar", sar: 138.0 },
      { name: "Kenaikan 1", sar: 172.5 },
      { name: "Kenaikan 2", sar: 218.5 },
    ],
  },
  jmb: {
    label: "Jeddah Airport - Madinah (Bisnis)",
    tiers: [
      { name: "Harga Dasar", sar: 323.15 },
      { name: "Kenaikan 1", sar: 708.4 },
    ],
  },
};

// 17 Item Handling & Komponen LA Resmi Dokumen PMM
export const HDL_ITEMS = [
  { id: "muth", on: true, label: "Muthawif Berpengalaman", sar: 280, mode: "hari", info: "SAR/hari/grup", desc: "Alumni Timur Tengah: manasik, bimbingan thawaf & sa'i, tahajud, kajian sirah", standardLA: true },
  { id: "mwfh", on: false, label: "Muthawifah (Khusus Raudhah)", sar: 250, mode: "grup", info: "SAR/grup", desc: "Pembimbing wanita khusus ziarah Raudhah & Maqbaroh", standardLA: true },
  { id: "hdlap", on: true, label: "Handling Airport Kedatangan & Pulang", sar: 150, mode: "grup", info: "SAR/grup", desc: "Sambutan di airport, tarhib, dan pengantaran kepulangan", standardLA: true },
  { id: "portr", on: false, label: "Porter Airport Resmi", sar: 0, mode: "dyn", info: "350 + 15/pax", desc: "Penanganan koper dan bagasi bandara kedatangan/kepulangan", standardLA: true },
  { id: "ckmek", on: true, label: "Check in & Check out Hotel Mekah", sar: 50, mode: "grup", info: "SAR/grup", desc: "Koordinasi resepsionis, pembagian kunci dan koper jamaah", standardLA: true },
  { id: "ckmad", on: true, label: "Check in & Check out Hotel Madinah", sar: 50, mode: "grup", info: "SAR/grup", desc: "Koordinasi resepsionis, pembagian kunci dan koper jamaah", standardLA: true },
  { id: "snmek", on: true, label: "Snack Ziarah Mekah", sar: 5, mode: "pax", info: "SAR/pax", desc: "Paket snack dan minuman dingin saat city tour", standardLA: true },
  { id: "snmad", on: true, label: "Snack Ziarah Madinah", sar: 5, mode: "pax", info: "SAR/pax", desc: "Paket snack dan minuman dingin saat city tour", standardLA: true },
  { id: "snjln", on: false, label: "Snack Perjalanan Mekah-Madinah", sar: 5, mode: "pax", info: "SAR/pax", desc: "Snack box transit antar kota", standardLA: false },
  { id: "nsdtg", on: true, label: "Nasi Box Kedatangan", sar: 30, mode: "grup", info: "SAR/grup", desc: "Menu khas Indonesia hangat saat rombongan tiba di hotel", standardLA: true },
  { id: "nsplg", on: true, label: "Nasi Box Kepulangan", sar: 30, mode: "grup", info: "SAR/grup", desc: "Bekal makan sebelum drop ke bandara kepulangan", standardLA: true },
  { id: "zamzm", on: true, label: "Air Zam-zam 5 Liter Barcode Resmi", sar: 25, mode: "grup", info: "SAR/grup", desc: "Galon resmi bandara berizin muassasah", standardLA: true },
  { id: "bboy", on: true, label: "Tips Bellboy Hotel Mekah & Madinah", sar: 150, mode: "grup", info: "SAR/grup", desc: "Antar-jemput koper langsung ke depan pintu kamar", standardLA: true },
  { id: "tips", on: true, label: "Tips Supir Semua Rute & Mazarat", sar: 400, mode: "grup", info: "SAR/grup", desc: "Uang tips supir bus/mobil selama operasional", standardLA: true },
  { id: "trnmt", on: true, label: "Transmitter / TGS Audio Wireless", sar: 100, mode: "grup", info: "SAR/grup", desc: "Free transmitter/TGS untuk kelancaran manasik & thawaf", standardLA: true },
  { id: "bakss", on: true, label: "Baksis Muassasah", sar: 200, mode: "grup", info: "SAR/grup", desc: "Administrasi perizinan muassasah di lapangan", standardLA: true },
  { id: "ongkm", on: true, label: "Operasional & Ongkos Muthawif", sar: 200, mode: "grup", info: "SAR/grup", desc: "Mobilitas harian pembimbing di Mekah & Madinah", standardLA: true },
  { id: "pngm", on: true, label: "Penginapan Muthawif di Madinah", sar: 100, mode: "grup", info: "SAR/grup", desc: "Akomodasi pendamping selama di Madinah", standardLA: true },
  { id: "opfee", on: true, label: "Operator Fee & Supervisi Lapangan", sar: 100, mode: "grup", info: "SAR/grup", desc: "Manajemen 24 jam dan koordinasi jadwal perjalanan", standardLA: true },
];

// 14 Tugas Utama Muthawif Sesuai Dokumen Resmi PMM
export const MUTHAWIF_DUTIES = [
  { title: "Sambutan Airport & Tarhib", desc: "Penyambutan ramah di bandara kedatangan Jeddah/Madinah dan pengkondisian awal jamaah." },
  { title: "Bimbingan Ibadah Umroh", desc: "Membimbing tata cara ihram dari miqot, thawaf qudum, sa'i, dan tahallul sesuai sunnah." },
  { title: "Pendampingan Mencium Hajar Aswad", desc: "Membantu dan menemani jamaah berikhtiar mencium Hajar Aswad dan berdoa di Multazam secara tertib." },
  { title: "Guiding City Tour Mekah", desc: "Menjelaskan sejarah Jabal Tsur, Padang Arafah, Jabal Rahmah, Muzdalifah, Mina, dan Ji'ranah." },
  { title: "Guiding City Tour Madinah", desc: "Napak tilas Masjid Quba, Kebun Kurma, Jabal Uhud, Syuhada Uhud, Masjid Qiblatain, dan Khandaq." },
  { title: "Bimbingan Masuk Raudhah", desc: "Mempersiapkan tasreh resmi dan mendampingi jamaah saat jadwal masuk Raudhah Asy-Syarifah." },
  { title: "Pemantapan Manasik di Madinah", desc: "Sesi review dan pendalaman rukun serta wajib umroh sebelum bertolak ke Mekah." },
  { title: "Pendampingan Shalat Tahajud", desc: "Membimbing jamaah qiyamullail bersama di Masjidil Haram dan Masjid Nabawi." },
  { title: "Tausiyah & Kajian Islami", desc: "Penguatan ruhiyah melalui kajian sirah nabawiyah dan hikmah ibadah di sela program." },
  { title: "Koordinasi Supir & Transportasi", desc: "Kordinasi supir armada darat agar ketepatan waktu penjemputan selalu terjaga." },
  { title: "Bantu Proses Check in & Check out Hotel", desc: "Pengurusan administrasi kunci kamar dan pengaturan koper di lobi hotel." },
  { title: "Antar ke Bandara Kepulangan", desc: "Memastikan seluruh jamaah tiba tepat waktu di bandara dan siap proses check-in tiket." },
  { title: "Menemani Ziarah / Tour Tambahan", desc: "Siap mengawal trip tambahan seperti Thaif, Badar, Jabal Magnet, atau Al-Ula." },
  { title: "Standby Kebutuhan Jamaah", desc: "Siap siaga membantu kebutuhan jamaah setiap saat, terkhusus keperluan kelancaran ibadah." },
];

// Layanan Utama
export const SERVICES_LIST = [
  { n: "Muthawif Berpengalaman", desc: "Alumni Timur Tengah (Al-Azhar Mesir, Madinah, Ummul Qura) memandu thawaf, sa'i, tahajud, dan manasik sesuai sunnah.", tag: "Prioritas", img: "/muthawif_tawaf.jpg" },
  { n: "Visa Umroh & Tasreh Raudhah", desc: "Penerbitan visa umroh resmi Kementrian Haji KSA via muassasah terpercaya, sudah termasuk tasreh Raudhah Madinah.", tag: "Resmi KSA", img: "/nabawi_rawdah.jpg" },
  { n: "Transportasi Darat di Saudi", desc: "Armada Sedan, GMC Yukon, Hyundai H1/Staria, Hiace, Coaster hingga Big Bus Mercedes 45 seat.", tag: "Armada Lengkap", img: IMAGES.bus },
  { n: "Booking Hotel Mekah & Madinah", desc: "Bermitra dengan hotel marketing Mekah dan Madinah untuk rate kamar terbaik dan update ketersediaan musiman.", tag: "Mitra Hotel", img: "/makkah_halaq.jpg" },
  { n: "Tiket Kereta Cepat Haramain (HHR)", desc: "Agen resmi HHR untuk rute Madinah–Mekah dan Jeddah–Madinah, kemudahan booking grup dan harga khusus.", tag: "Agen HHR", img: "/hhr_train_opt.jpg" },
  { n: "Paket Land Arrangement (LA)", desc: "Paket lengkap Airport to Airport untuk rombongan travel: visa, bus, hotel, handling, porter, dan logistik.", tag: "Paket Lengkap", img: IMAGES.hero },
  { n: "Ground Handling Mandiri", desc: "Layanan penjemputan bandara Jeddah/Madinah, porter, pendampingan check-in hotel dan bimbingan umroh mandiri.", tag: "Fleksibel", img: "/jeddah_airport_handling.jpg" },
  { n: "City Tour & Ziarah Tambahan", desc: "Eksplorasi situs bersejarah Mekah, Madinah, Thaif sejuk, Badar, Al-Ula (Hegra), dan Jeddah Laut Merah.", tag: "Edukasi Sirah", img: "/alula_tour.jpg" },
];

// 6 Paket Ziarah
export const CT_DATA = [
  { name: "Ziarah Kota Mekah", sar: 250, min: "Min 4 Org", bonus: "Dokumentasi Video Rombongan", desc: "Jabal Tsur, Padang Arafah, Jabal Rahmah, Muzdalifah, Mina, dan Miqot Ji'ranah.", img: IMAGES.kaaba },
  { name: "City Tour Thaif Sejuk", sar: 650, min: "Min 4 Org", bonus: "Makan Siang Nasi Mandhi & Video", desc: "Masjid Ibnu Abbas, Pabrik Parfum Mawar, Kereta Gantung Teleferik, dan Miqot Qarnul Manazil.", img: IMAGES.thaif },
  { name: "Ziarah Kota Madinah", sar: 200, min: "Min 4 Org", bonus: "Dokumentasi Video Rombongan", desc: "Masjid Quba, Kebun Kurma, Jabal Uhud, Syuhada Uhud, Masjid Qiblatain dan Khandaq.", img: IMAGES.nabawi },
  { name: "Day Trip Al-Ula Heritage", sar: 785, min: "Min 4 Org", bonus: "Dokumentasi Foto & Video", desc: "Hegra (Madain Saleh), Elephant Rock, Maraya Concert Hall, dan kota tua Al-Ula.", img: IMAGES.alula },
  { name: "Ziarah Sejarah Badar", sar: 350, min: "Min 4 Org", bonus: "Kajian Sirah Perang Badar", desc: "Makam Syuhada Perang Badar, Masjid Al-Arisy, dan napak tilas sejarah penentu peradaban Islam.", img: IMAGES.badar },
  { name: "City Escape Jeddah", sar: 300, min: "Min 4 Org", bonus: "Free Dokumentasi", desc: "Masjid Terapung Al-Rahmah, Corniche Laut Merah, Balad Heritage Town, dan pusat oleh-oleh.", img: IMAGES.jeddah },
];

// Experience
export const EX_DATA = [
  { name: "Khandamah Sunset Peak", sar: 115, min: "Min 4 Org", bonus: "Dokumentasi Video", desc: "Menikmati pemandangan Masjidil Haram dan Menara Jam dari ketinggian bukit saat senja.", img: IMAGES.hero },
  { name: "Madinah Horse Riding", sar: 975, min: "Min 4 Org", bonus: "Instruktur & Perlengkapan", desc: "Pengalaman berkuda sunnah di padang terbuka Madinah Al-Munawwarah.", img: IMAGES.badar },
  { name: "Jabal Nur & Gua Hira Trekking", sar: 165, min: "Min 4 Org", bonus: "Pendampingan Khusus", desc: "Napak tilas pendakian ke Gua Hira tempat pertama kali wahyu Al-Qur'an diturunkan.", img: IMAGES.kaaba },
  { name: "Uhud Archers Hill Hiking", sar: 145, min: "Min 4 Org", bonus: "Kajian Interaktif", desc: "Hiking bukit pemanah Jabal Rumat sambil mendengarkan ulasan strategi perang Uhud.", img: IMAGES.nabawi },
];

// Ibadah Jariyah & Badal
export const IB_DATA = [
  { name: "Badal Umroh Amanah", sar: 350, bonus: "Video Manasik & Sertifikat Resmi", desc: "Dilaksanakan 1 orang untuk 1 nama oleh alumni/mahasiswa Timur Tengah di Saudi secara tertib dan amanah." },
  { name: "Sedekah Nasi Box Haramain", sar: 8, bonus: "Laporan Video Penyaluran", desc: "Penyaluran makanan hangat untuk jamaah dan dhuafa di pelataran Masjidil Haram atau Nabawi." },
  { name: "Sedekah Air Minum Dingin", sar: 1, bonus: "Laporan Penyaluran", desc: "Pembagian air minum bersih untuk para peziarah di Tanah Suci." },
  { name: "Waqaf Al-Qur'an Madinah", sar: 45, bonus: "Stempel Cap Waqaf Resmi", desc: "Mushaf cetakan resmi Mujamma' Malik Fahd diletakkan di rak Masjidil Haram atau Nabawi." },
];

export const FAQ_DATA = [
  { q: "Siapa itu Persatuan Muthawif Muda (PMM)?", a: "PMM adalah tim kolaboratif alumni universitas Timur Tengah (Arab Saudi, Mesir, Sudan, Tunis, dan Maroko) di bawah PT. Katiara Muda Jelajah (NIB: 3107230137724). Berpengalaman menyediakan muthawif beradab islami, layanan Land Arrangement (LA) lengkap, dan pendampingan umroh mandiri." },
  { q: "Apakah melayani biro travel umroh dan jamaah mandiri?", a: "Ya. Kami melayani biro travel umroh yang membutuhkan paket Land Arrangement (LA) menyeluruh maupun pendampingan khusus bagi keluarga dan perseorangan yang berangkat umroh secara mandiri." },
  { q: "Berapa tarif jasa Muthawif PMM?", a: "Sesuai dokumen resmi PMM musim 1446H, tarif muthawif adalah 280 s/d 300 SAR per hari per grup. Sudah mencakup bimbingan ibadah, city tour, pendampingan Hajar Aswad, Raudhah, hingga handling bandara." },
  { q: "Bagaimana cara kerja simulator biaya di website ini?", a: "Simulator ini menggunakan formula dan tarif resmi PMM 1446H. Anda dapat memilih paket lengkap, menyesuaikan tipe kamar hotel, rute armada, dan item handling, lalu langsung mengunduh surat penawaran format PDF resmi." },
  { q: "Bagaimana sistem pemesanan tiket Kereta Cepat Haramain (HHR)?", a: "PMM adalah agen Haramain High Speed Railway. Harga tiket HHR mengikuti sistem dinamis (harga dasar dan tingkat kenaikan). Kami menyediakan rincian tier tarif agar estimasi anggaran Anda akurat." },
];
