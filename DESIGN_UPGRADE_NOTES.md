# PMM Premium UI Direction

## Goal
Membuat PMM terasa seperti operator perjalanan dan layanan Saudi yang matang, bukan landing page template generik.

## Prinsip
- Satu art direction: navy/slate + blue + restrained gold accent.
- Hindari card di semua tempat. Gunakan whitespace, section rhythm, photographic crops, typography, dan subtle texture untuk depth.
- Ornament Islam dipakai sebagai aksen identitas, bukan dekorasi berulang pada setiap komponen.
- Gambar harus context-first: Haramain untuk kereta, landmark/destinasi untuk tur, hotel untuk akomodasi, dan muthawif untuk layanan pembimbing.
- Motion halus dan cepat; tidak ada animasi besar yang mengalihkan fokus.
- Hierarki: judul kuat, copy lebih singkat, CTA utama jelas, CTA sekunder lebih tenang.

## Layer yang ditambahkan
- Progress rail 2px untuk rasa aplikasi yang lebih finished.
- Premium surface treatment global untuk mengurangi heavy shadow/border look.
- Subtle alternating section depth.
- Context-first image overrides untuk beberapa asset yang jelas tidak sesuai.
- Lazy loading + async decoding untuk imagery.
- Reduced-motion tetap dihormati.

## Perbaikan berikutnya yang paling bernilai
1. Pecah `App.jsx` yang sangat besar menjadi komponen per halaman agar redesign lebih aman.
2. Ganti semua remote stock photo dengan aset resmi PMM atau foto Saudi yang dikurasi.
3. Tambahkan halaman/gallery dokumentasi real PMM dan partner logos jika tersedia.
4. Tambahkan trust proof yang konkret: tahun pengalaman, jumlah grup, cakupan kota, legalitas, SLA CS.
5. Audit semua copy lama yang masih menyebut musim/tahun operasional lama.
