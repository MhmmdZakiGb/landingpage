'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Berapa biaya mobdemob (mobilisasi/demobilisasi) alat berat?',
    a: 'Biaya mobdemob tergantung lokasi proyek dan jenis unit. Untuk area Jabodetabek, mobilisasi forklift mulai dari Rp 1.5 juta, sedangkan mobile crane dapat mencapai Rp 5 juta. Biaya luar kota dihitung per kilometer atau dengan rute feri. Kami selalu menyertakan rincian mobdemob secara transparan dalam penawaran.',
  },
  {
    q: 'Apa minimum shift atau durasi sewa alat berat?',
    a: 'Minimum sewa adalah 1 shift (8 jam) untuk operasi harian. Untuk kontrak bulanan, minimum durasi 1 bulan dengan diskon khusus. Sewa harian mendukung 2 shift (16 jam) atau 3 shift (24 jam) dengan tarif shift tambahan. Kami fleksibel untuk kebutuhan proyek jangka pendek maupun panjang.',
  },
  {
    q: 'Apakah alat berat yang disewa sudah diasuransikan?',
    a: 'Ya. Setiap unit kami dilindungi asuransi All Risk yang mencakup kerusakan akibat kecelakaan kerja. Operator kami juga tercakup asuransi jiwa dan K3. Namun, klien bertanggung jawab atas kerusakan akibat kelalaian operator pihak klien atau kondisi lokasi yang tidak sesuai standar keselamatan.',
  },
  {
    q: 'Apakah operator ikut disertakan dalam biaya sewa?',
    a: 'Untuk unit mobile crane dan alat berat kelas berat, operator berlisensi SILO/SIKOJA sudah termasuk dalam tarif sewa. Untuk forklift, operator tersedia opsi — bisa disertakan dengan biaya tambahan atau self-service bila klien memiliki operator tersendiri yang bersertifikasi.',
  },
  {
    q: 'Bagaimana proses ajukan sewa dan approval-nya?',
    a: 'Cukup hubungi kami via WhatsApp atau ajukan melalui tombol "Ajukan Sewa". Tim kami akan mengirimkan RFQ dalam 30 menit, penawaran lengkap kurang dari 2 jam pada jam kerja, dan SPK dapat diterbitkan dalam hari yang sama. Mobilisasi cepat 1x24 jam untuk unit tersedia.',
  },
  {
    q: 'Apakah tersedia unit cadangan jika alat mengalami kerusakan?',
    a: 'Ya. Melalui jaringan unit rekanan kami yang berjumlah 300+ unit, kami menyediakan unit cadangan untuk memastikan kelangsungan proyek Anda. Pergantian unit tidak dikenakan biaya mobdemob tambahan bila kerusakan terjadi karena faktor internal armada kami.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Left header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <HelpCircle className="h-4 w-4" />
              FAQ Operasional
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              Pertanyaan Seputar Operasional Sewa
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Hal-hal penting yang sering ditanyakan terkait biaya mobdemob,
              minimum shift, asuransi, dan proses pengajuan sewa alat berat.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
              <p className="text-sm font-semibold">
                Masih ada pertanyaan lain?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tim kami siap menjawab 24/7 via WhatsApp.
              </p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-bold text-primary hover:underline"
              >
                Chat WhatsApp &rarr;
              </a>
            </div>
          </div>

          {/* Right accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-xl border border-border bg-card px-6 shadow-sm transition-shadow data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-bold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
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