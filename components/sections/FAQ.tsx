'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    q: 'Bagaimana penentuan biaya Mob-Demob (Mobilisasi & Demobilisasi)?',
    a: 'Biaya Mob-Demob dihitung terpisah berdasarkan jarak dari Pool kami di Semarang ke lokasi proyek Anda (misal Kendal, Solo, Batang, DIY, dll) serta jenis towing/lowbed yang digunakan. Biaya final akan ditinjau dan ditetapkan secara transparan oleh Tim Manajemen GNP saat proses konfirmasi pengajuan.',
  },
  {
    q: 'Apakah harga sewa forklift sudah termasuk operator dan solar (BBM)?',
    a: 'Ya. Seluruh unit forklift milik GNP menerapkan sistem sewa paket lengkap: sudah mencakup unit, operator berlisensi SIO aktif, bahan bakar (solar), serta suku cadang dan pemeliharaan rutin selama jam operasional shift.',
  },
  {
    q: 'Apa itu 1 Shift dalam ketentuan sewa GNP?',
    a: 'Satu shift dihitung setara dengan 8 jam kerja operasional (termasuk 1 jam istirahat operator). Untuk kebutuhan lembur atau pengerjaan 2 shift (16 jam) / 3 shift (24 jam), dapat diajukan pada kolom Keterangan Tambahan untuk diatur jadwal pergantian operatornya.',
  },
  {
    q: 'Bagaimana alur dari pengajuan online hingga unit dikirim ke lokasi?',
    a: 'Alurnya sangat mudah: (1) Anda mengisi Form Pengajuan Mandiri di website ini dan mendapatkan Kode Pengajuan. (2) Tim kami memeriksa ketersediaan jadwal armada di kalender. (3) Tim Manajemen GNP menetapkan tarif Mob-Demob dan menyetujui pengajuan. (4) SPK diterbitkan, pembayaran DP/PO disepakati, dan unit langsung dimobilisasi ke lokasi proyek Anda.',
  },
  {
    q: 'Apakah CV. Giri Nusa Persada melayani sewa di luar Semarang?',
    a: 'Ya, wilayah operasional utama kami mencakup seluruh Provinsi Jawa Tengah (Kendal, Batang, Solo, Demak, Kudus, Cilacap, Pekalongan, Magelang, dll) serta Daerah Istimewa Yogyakarta (Sleman, Bantul, Kota Jogja).',
  },
  {
    q: 'Bagaimana dengan ketersediaan unit Crane dan Excavator?',
    a: 'Untuk Mobile Crane dan Excavator, kami berkolaborasi dengan jaringan unit rekanan terpercaya di Jawa Tengah. Setiap pengajuan unit rekanan akan dikonfirmasi ketersediaan fisiknya secara langsung oleh Tim Operasional kami sebelum diterbitkan persetujuan.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative bg-[#fff8f4] py-16 lg:py-24 border-t border-[#e8d8c8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Left info box */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d8c8] bg-[#fff1e5] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#855300]">
              <HelpCircle className="h-4 w-4 text-[#d97706]" />
              FAQ Operasional
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#221a12] sm:text-4xl text-balance">
              Pertanyaan Seputar Sewa Alat Berat GNP
            </h2>
            <p className="mt-4 text-sm text-[#534434] sm:text-base leading-relaxed">
              Hal-hal penting seputar kebijakan sewa, sistem include BBM/operator, perhitungan mob-demob, dan cakupan wilayah proyek.
            </p>

            <div className="mt-8 rounded-3xl border border-[#e8d8c8] bg-white p-6 shadow-sm">
              <h4 className="text-sm font-black text-[#221a12]">
                Punya Kebutuhan Spesifik Proyek?
              </h4>
              <p className="mt-1.5 text-xs text-[#534434] leading-relaxed">
                Konsultasikan langsung dengan Tim Operasional pool Semarang kami.
              </p>
              <a
                href="https://wa.me/6287839788721?text=Halo%20GNP%20Heavy%20Equipment,%20saya%20ingin%20tanya%20detail%20sewa%20alat%20berat."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#221a12] bg-[#f59e0b] hover:bg-[#d97706] hover:text-white px-4 py-2.5 rounded-xl transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                Chat WhatsApp Admin &rarr;
              </a>
            </div>
          </div>

          {/* Right Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-3.5">
              {faqs.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-[#e8d8c8] bg-white px-6 shadow-sm transition-shadow data-[state=open]:shadow-md data-[state=open]:border-[#f59e0b]"
                >
                  <AccordionTrigger className="py-5 text-left text-sm sm:text-base font-bold text-[#221a12] hover:no-underline hover:text-[#d97706]">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-xs sm:text-sm leading-relaxed text-[#534434]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
