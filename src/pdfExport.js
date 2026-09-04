import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateQuotationPDF = (data) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const navy = [30, 64, 175]; // #1E40AF
  const slateDark = [30, 41, 59]; // #1E293B

  // Header Banner
  doc.setFillColor(...navy);
  doc.rect(0, 0, 210, 34, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PERSATUAN MUTHAWIF MUDA', 14, 14);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('PT. KATIARA MUDA JELAJAH | NIB: 3107230137724', 14, 20);
  doc.text('Estimasi Rincian Land Arrangement & Muthawif Umroh 1446 H / 2024-2025 M', 14, 25);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('ESTIMASI RESMI', 155, 16);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 155, 22);

  // Box Info Rombongan
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 40, 182, 26, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setTextColor(...slateDark);
  doc.setFont('helvetica', 'bold');
  doc.text('PARAMETER ESTIMASI PERJALANAN', 18, 46);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`• Jumlah Jamaah: ${data.pax} Orang`, 18, 53);
  doc.text(`• Durasi Program: ${data.hProg} Hari`, 18, 59);
  doc.text(`• Jenis Kendaraan: ${data.vehName}`, 105, 53);
  doc.text(`• Kurs Acuan: 1 SAR = Rp ${Number(data.kurs).toLocaleString('id-ID')}`, 105, 59);

  // Tabel Rincian Biaya
  const tableRows = [];

  if (data.tIDR > 0) tableRows.push(['Tiket Pesawat PP', 'Per Pax', `Rp ${Math.round(data.tIDR).toLocaleString('id-ID')}`]);
  if (data.vIDR > 0) tableRows.push(['Visa Umroh & Tasreh Raudhah Resmi KSA', 'Per Pax', `Rp ${Math.round(data.vIDR).toLocaleString('id-ID')}`]);
  if (data.hhrIDR > 0) tableRows.push(['Kereta Cepat Haramain (HHR)', 'Per Pax', `Rp ${Math.round(data.hhrIDR).toLocaleString('id-ID')}`]);
  if (data.sIDR > 0) tableRows.push(['SISKOPATUH & Registrasi Muassasah', 'Per Pax', `Rp ${Math.round(data.sIDR).toLocaleString('id-ID')}`]);
  if (data.mIDR > 0) tableRows.push(['Konsumsi / Catering', 'Per Pax', `Rp ${Math.round(data.mIDR).toLocaleString('id-ID')}`]);
  if (data.pIDR > 0) tableRows.push(['Perlengkapan Ibadah', 'Per Pax', `Rp ${Math.round(data.pIDR).toLocaleString('id-ID')}`]);
  if (data.aIDR > 0) tableRows.push(['Asuransi Perjalanan', 'Per Pax', `Rp ${Math.round(data.aIDR).toLocaleString('id-ID')}`]);

  if (data.hmekIDR > 0) {
    tableRows.push([`Hotel Mekah (${data.hmek.nights} mlm - ${data.hmek.type}) ${data.hmek.name ? '- ' + data.hmek.name : ''}`, 'Per Pax', `Rp ${Math.round(data.hmekIDR).toLocaleString('id-ID')}`]);
  }
  if (data.hmadIDR > 0) {
    tableRows.push([`Hotel Madinah (${data.hmad.nights} mlm - ${data.hmad.type}) ${data.hmad.name ? '- ' + data.hmad.name : ''}`, 'Per Pax', `Rp ${Math.round(data.hmadIDR).toLocaleString('id-ID')}`]);
  }
  if (data.hdlIDR > 0) {
    tableRows.push([`Ground Handling & Muthawif (${data.hdlD.length} Layanan)`, 'Per Pax', `Rp ${Math.round(data.hdlIDR).toLocaleString('id-ID')}`]);
  }
  if (data.trnIDR > 0) {
    tableRows.push([`Transportasi Darat (${data.trnD.length} Rute Terpilih)`, 'Per Pax', `Rp ${Math.round(data.trnIDR).toLocaleString('id-ID')}`]);
  }

  tableRows.push([
    { content: 'TOTAL ESTIMASI HPP / PAX', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [241, 245, 249], textColor: [15, 23, 42] } },
    { content: `Rp ${Math.round(data.hpp).toLocaleString('id-ID')}`, styles: { fontStyle: 'bold', fillColor: [241, 245, 249], textColor: navy } }
  ]);

  autoTable(doc, {
    startY: 72,
    head: [['Komponen Biaya', 'Kategori', 'Estimasi per Pax (IDR)']],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: navy, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8.5 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 }
  });

  const finalY = doc.lastAutoTable.finalY + 6;

  // Rekomendasi Harga Jual
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...navy);
  doc.text('ESTIMASI HARGA JUAL DENGAN MARGIN', 14, finalY);

  const priceData = [
    ['Quad (Kamar Ber-4)', `Margin ${data.mgn.quad}%`, `Rp ${Math.round(data.quad).toLocaleString('id-ID')}`],
    ['Triple (Kamar Ber-3)', `Margin ${data.mgn.triple}%`, `Rp ${Math.round(data.triple).toLocaleString('id-ID')}`],
    ['Double (Kamar Ber-2)', `Margin ${data.mgn.double}%`, `Rp ${Math.round(data.double).toLocaleString('id-ID')}`],
  ];

  autoTable(doc, {
    startY: finalY + 3,
    head: [['Tipe Kamar', 'Margin Profit', 'Harga Jual per Pax']],
    body: priceData,
    theme: 'striped',
    headStyles: { fillColor: slateDark, textColor: [255, 255, 255], fontSize: 8 },
    bodyStyles: { fontSize: 8, textColor: [30, 41, 59] },
    margin: { left: 14, right: 14 }
  });

  const footerY = doc.lastAutoTable.finalY + 8;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text('* Estimasi biaya di atas mengacu pada data resmi PMM 1446 H dan dapat disesuaikan dengan kebutuhan lapangan.', 14, footerY);
  doc.text('* Tarif hotel dan tiket kereta cepat mengikuti sistem dinamis musim umroh KSA.', 14, footerY + 4);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Kontak & Konsultasi Resmi PMM:', 14, footerY + 11);
  doc.setFont('helvetica', 'normal');
  doc.text('WhatsApp: +62 821 5544 4787 / +62 822 1432 6480 | Website: pmm.yahya.web.id', 14, footerY + 15);

  doc.save(`Proposal_PMM_${data.pax}pax.pdf`);
};
