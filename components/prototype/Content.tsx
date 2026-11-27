'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileCheck2,
  HardHat,
  Headphones,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from 'lucide-react';
import { useArmadaUnits } from '@/hooks/use-armada-units';

const stories = [
  {
    category: 'PERGUDANGAN • KENDAL',
    title: 'Mobilisasi Forklift 3 & 5 Ton untuk Sentra Industri Pangan Demak',
    date: '5 Hari Lalu',
    image:
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=900&q=80',
    summary:
      'Efisiensi perpindahan palet di warehouse suhu terkontrol. Bagaimana armada forklift GNP mendukung distribusi logistik tanpa downtime.',
  },
  {
    category: 'PROYEK • TUGU SEMARANG',
    title: 'Erection Baja Proyek Menggunakan Mobile Crane 25 Ton di Kawasan Candi',
    date: '1 Minggu Lalu',
    image:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80',
    summary:
      'Kondisi kontur tanah berlereng di kawasan Candi membutuhkan perencanaan outrigger matang. Tim rigging CV GNP menyelesaikan instalasi girder dengan aman.',
  },
  {
    category: 'EDUKASI K3 • PANDUAN',
    title: 'Panduan Memilih Tonase Forklift & Load Center Sesuai Regulasi K3',
    date: '2 Minggu Lalu',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    summary:
      'Banyak kontraktor mengabaikan pergeseran titik tumpu (load center 500mm vs 600mm). Kenali risiko tipping hazard dan cara menghitung kapasitas aman.',
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  rightText,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  rightText?: string;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#855300]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black leading-tight text-[#221a12] sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#534434]">
            {description}
          </p>
        )}
      </div>
      {rightText && (
        <span className="inline-flex shrink-0 items-center rounded-lg border border-[#e8d8c8] bg-[#fff1e5] px-3 py-1.5 text-xs font-bold text-[#855300]">
          {rightText}
        </span>
      )}
    </div>
  );
}

export function HomePrototype() {
  const { units } = useArmadaUnits();
  const [quickLoadTon, setQuickLoadTon] = useState<number>(3.5);
  const featuredUnits = units.slice(0, 6);

  const recommendedQuickUnit =
    units
      .filter((u) => u.capacityTon >= quickLoadTon)
      .sort((a, b) => a.capacityTon - b.capacityTon)[0] || units[0];

  return (
    <div className="bg-[#fff8f4] text-[#221a12]">
      {/* 2. Hero Section */}
      <section className="border-b border-[#f5e6d7] bg-[#fff8f4] py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d8c8] bg-[#fff1e5] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#855300] shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#d97706]" />
              No. 1 Heavy Lifting Solution Semarang &bull; Jawa Tengah
            </div>

            <h1 className="mt-5 text-3xl font-black leading-[1.12] tracking-tight text-[#221a12] sm:text-5xl">
              Rental Forklift &amp;{' '}
              <span className="text-[#d97706] underline decoration-[#f59e0b]/40 decoration-4 underline-offset-4">
                Mobile Crane Terpercaya
              </span>{' '}
              di Semarang
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#534434] sm:text-base">
              Solusi alat berat cepat, praktis, dan berstandar K3 Depnaker RI dengan
              operator bersertifikat SIO aktif. Siap mobilisasi 24 jam ke seluruh
              kawasan industri Jawa Tengah, Pelabuhan Tanjung Emas, hingga proyek
              infrastruktur nasional.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/layanan#pengajuan-sewa"
                className="inline-flex items-center gap-2 rounded-xl bg-[#f59e0b] px-6 py-3.5 text-sm font-black text-[#221a12] shadow-md shadow-amber-500/20 transition hover:bg-[#d97706] hover:text-white"
              >
                Cek &amp; Sewa Unit Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/layanan#kalkulator"
                className="inline-flex items-center gap-2 rounded-xl border border-[#d8c3ad] bg-white px-5 py-3.5 text-sm font-bold text-[#221a12] transition hover:border-[#f59e0b] hover:bg-[#fff1e5]"
              >
                Simulasi Kebutuhan Beban
              </Link>
            </div>

            {/* 4 Mini Trust Pills */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['100% SILO', 'Uji Kelayakan Resmi'],
                ['Operator SIO', 'Lisensi Depnaker Aktif'],
                ['15 Menit', 'Respon Cepat Dispatch'],
                ['All-In Tarif', 'Tanpa Biaya Siluman'],
              ].map(([title, sub]) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#e8d8c8] bg-white p-3 shadow-sm"
                >
                  <p className="text-xs font-black text-[#221a12]">{title}</p>
                  <p className="mt-0.5 text-[11px] text-[#534434]">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Showcase */}
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-[#e8d8c8] bg-[#0f172a] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85"
                alt="Armada Forklift CV Giri Nusa Persada di Semarang"
                className="aspect-[4/3] w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#f59e0b]">
                    Depo Kalibanteng • Semarang
                  </p>
                  <p className="text-sm font-black text-white">
                    Armada Terawat &amp; Siap Kirim
                  </p>
                </div>
                <span className="rounded-lg bg-[#f59e0b] px-2.5 py-1 text-[11px] font-black text-[#221a12]">
                  24/7 Unit Ready
                </span>
              </div>
            </div>

            {/* Overlapping Quick Stat Card */}
            <div className="mt-4 flex items-center gap-3.5 rounded-2xl border border-[#e8d8c8] bg-white p-4 shadow-lg sm:-mt-6 sm:ml-4 sm:mr-8 relative z-10">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#d97706]">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-black leading-none text-[#221a12]">
                  2,850+
                </p>
                <p className="mt-1 text-xs font-medium text-[#534434]">
                  Proyek Selesai Dikerjakan Se-Jawa Tengah &amp; DIY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tiga Komitmen Utama */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="3 Pilar Utama Kami"
          title="Tiga Komitmen Utama CV Giri Nusa Persada"
          description="Keamanan, efisiensi operasional pabrik, dan kepastian penyelesaian target proyek adalah prioritas mutlak yang kami jaga sejak 1997."
          rightText="Standar Mutu ISO & K3 RI"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              num: 'PILAR 01',
              icon: <Wrench className="h-5 w-5 text-[#d97706]" />,
              title: 'Armada Terbaik & Terawat',
              desc: 'Armada forklift diesel, elektrik, dan crane siap kerja 24 jam. Rutin preventive maintenance tiap 250 jam kerja dengan mekanik stand-by.',
              bullets: [
                'Mast triplex dan dupleks standar kontainer',
                'Unit tahun muda performa mesin 98%+',
              ],
            },
            {
              num: 'PILAR 02',
              icon: <ShieldCheck className="h-5 w-5 text-[#d97706]" />,
              title: 'Paling Terpercaya & Legal',
              desc: 'Legalitas operasional lengkap dengan uji kelayakan SILO Depnaker serta operator bersertifikat SIO resmi dan pengalaman tinggi di area pabrik.',
              bullets: [
                'Asuransi unit & liabilitas pekerjaan umum',
                'Dokumen resmi K3, Perizinan & Faktur Pajak',
              ],
            },
            {
              num: 'PILAR 03',
              icon: <BadgeCheck className="h-5 w-5 text-[#d97706]" />,
              title: 'Termurah & Transparan',
              desc: 'Skema sewa fleksibel per shift (harian), mingguan, hingga bulanan. Garansi unit pengganti tanpa biaya ekstra jika terjadi kendala teknis.',
              bullets: [
                'Surat Penawaran Resmi (SPH) hitungan menit',
                'Garansi teknisi tiba di lokasi maks. 2 jam',
              ],
            },
          ].map((item) => (
            <div
              key={item.num}
              className="flex flex-col justify-between rounded-2xl border border-[#e8d8c8] bg-white p-6 shadow-sm transition hover:border-[#f59e0b]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1e5]">
                    {item.icon}
                  </div>
                  <span className="rounded-md bg-[#fbebdd] px-2.5 py-1 text-[10px] font-black tracking-wider text-[#855300]">
                    {item.num}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-black text-[#221a12]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#534434]">
                  {item.desc}
                </p>
              </div>
              <ul className="mt-4 space-y-1.5 border-t border-[#f5e6d7] pt-3">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[11px] font-medium text-[#534434]"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d97706]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Dark Contrast Simulasi Cepat */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#0f172a] p-6 text-white shadow-2xl sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f59e0b]/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#f59e0b]">
                <Sparkles className="h-3.5 w-3.5" />
                Fitur Cerdas Rekomendasi Alat
              </span>
              <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
                Simulasi Cepat Tonase Beban Kerja Anda
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Pastikan proyek Anda tidak salah memilih unit atau kapasitas. Pilih
                perkiraan bobot beban muatan di samping untuk melihat rekomendasi unit
                paling aman dan efisien.
              </p>
              <Link
                href="/layanan#kalkulator"
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#f59e0b] hover:underline"
              >
                Buka Kalkulator Lengkap <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-white p-5 text-[#221a12] lg:col-span-7">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#534434]">
                  Pilih Perkiraan Beban Angkat:
                </span>
                <span className="rounded-lg bg-[#fff1e5] px-3 py-1 font-mono text-sm font-black text-[#d97706]">
                  {quickLoadTon.toFixed(1)} Ton
                </span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {[3.0, 5.0, 10.0, 25.0].map((ton) => (
                  <button
                    key={ton}
                    type="button"
                    onClick={() => setQuickLoadTon(ton)}
                    className={`rounded-xl border py-2 text-xs font-bold transition ${quickLoadTon === ton
                        ? 'border-[#f59e0b] bg-[#f59e0b] text-[#221a12]'
                        : 'border-[#e8d8c8] bg-[#fff8f4] text-[#534434] hover:border-[#f59e0b]'
                      }`}
                  >
                    {ton} Ton
                  </button>
                ))}
              </div>

              {recommendedQuickUnit && (
                <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-[#f59e0b]/40 bg-[#fff1e5] p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#855300]">
                      Unit Direkomendasikan
                    </p>
                    <p className="text-sm font-black text-[#221a12]">
                      {recommendedQuickUnit.name} ({recommendedQuickUnit.capacityTon} Ton)
                    </p>
                    <p className="text-[11px] text-[#534434]">
                      Tarif mulai Rp{' '}
                      {recommendedQuickUnit.basePricePerShift.toLocaleString('id-ID')}
                      /shift
                    </p>
                  </div>
                  <Link
                    href="/layanan#pengajuan-sewa"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#f59e0b] px-4 py-2.5 text-xs font-black text-[#221a12] shadow-sm hover:bg-[#d97706] hover:text-white"
                  >
                    Booking Unit Ini <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}

              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="rounded-lg bg-[#fff8f4] p-2">
                  <p className="font-bold text-[#221a12]">BBM + Operator</p>
                  <p className="text-[#534434]">Termasuk SIO</p>
                </div>
                <div className="rounded-lg bg-[#fff8f4] p-2">
                  <p className="font-bold text-[#221a12]">Mobilisasi Cepat</p>
                  <p className="text-[#534434]">Towing Depo GNP</p>
                </div>
                <div className="rounded-lg bg-[#fff8f4] p-2">
                  <p className="font-bold text-[#221a12]">Shift Fleksibel</p>
                  <p className="text-[#534434]">8 / 12 Jam Kerja</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Armada Pilihan */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#855300]">
              Katalog Spesifikasi Alat Berat
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#221a12] sm:text-3xl">
              Armada Forklift &amp; Crane Pilihan Semarang
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#534434]">
              Daftar armada terlaris dengan tarif kompetitif, siap dikirim ke kawasan
              industri Wijayakusuma, Terboyo, Candi, Demak, hingga Kendal.
            </p>
          </div>
          <Link
            href="/layanan"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#d8c3ad] bg-white px-4 py-2.5 text-xs font-bold text-[#221a12] hover:border-[#f59e0b] hover:bg-[#fff1e5]"
          >
            Lihat Semua Katalog <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredUnits.map((unit) => (
            <article
              key={unit.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e8d8c8] bg-white shadow-sm transition hover:border-[#f59e0b] hover:shadow-md"
            >
              <div>
                <div className="relative">
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${unit.source === 'Milik GNP'
                        ? 'bg-[#f59e0b] text-[#221a12]'
                        : 'bg-[#0f172a] text-white'
                      }`}
                  >
                    {unit.source}
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-black text-[#221a12] shadow-sm">
                    {unit.capacityTon} Ton
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#855300]">
                    {unit.category}
                  </p>
                  <h3 className="mt-1 text-base font-black text-[#221a12]">
                    {unit.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#534434]">
                    {unit.specs[0]}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-[#fff8f4] p-2.5 text-[11px]">
                    <div>
                      <span className="text-[#534434]">Kapasitas:</span>
                      <p className="font-bold text-[#221a12]">
                        {unit.capacityTon} Ton
                      </p>
                    </div>
                    <div>
                      <span className="text-[#534434]">Status:</span>
                      <p className="font-bold text-emerald-700">SILO Aktif</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#f5e6d7] px-5 py-3.5">
                <div>
                  <span className="block text-[10px] text-[#534434]">Tarif Mulai</span>
                  <span className="font-mono text-sm font-black text-[#221a12]">
                    Rp {unit.basePricePerShift.toLocaleString('id-ID')}
                  </span>
                </div>
                <Link
                  href="/layanan#pengajuan-sewa"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#f59e0b] px-4 py-2 text-xs font-black text-[#221a12] transition hover:bg-[#d97706] hover:text-white"
                >
                  Detail &amp; Booking
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Aktivitas Terkini */}
      <section className="border-t border-[#f5e6d7] bg-[#fff1e5]/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Dokumentasi & Edukasi Teknis"
            title="Aktivitas Terkini Proyek CV GNP di Jawa Tengah"
            rightText="Update Mingguan dari Depo Kalibanteng"
          />
          <BlogCards compact />
        </div>
      </section>

      {/* 7. Konsultasi & Form SPH */}
      <section className="border-t border-[#e8d8c8] bg-[#fff8f4] py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-5 lg:col-span-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#855300]">
                Fast Response 24 Jam
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#221a12] sm:text-3xl">
                Konsultasi Kebutuhan Unit &amp; Jadwal Mobilisasi
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#534434] sm:text-sm">
                Tim mekanik dan operator kami siaga 24 jam untuk melayani kebutuhan
                mendadak, pekerjaan lembur pabrik, maupun proyek jangka panjang.
              </p>
            </div>

            <a
              href="https://wa.me/6287839788721"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[#0f172a] p-5 text-white shadow-lg transition hover:bg-slate-800"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f59e0b] text-[#221a12]">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#f59e0b]">
                  Hotline &amp; WhatsApp Center
                </p>
                <p className="font-mono text-lg font-black">0878-3978-8721</p>
              </div>
            </a>

            <div className="rounded-2xl border border-[#e8d8c8] bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d97706]" />
                <div>
                  <p className="text-xs font-black text-[#221a12]">
                    Depo Utama Kalibanteng
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#534434]">
                    Jl. WR Supratman Kavling 39, Kalibanteng Kulon, Kec. Semarang
                    Barat, Kota Semarang, Jawa Tengah 50145
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3 text-[11px] font-semibold text-[#855300]">
                    <span>Akses Towing Truk Lebar</span>
                    <span>&bull;</span>
                    <span>Siaga 24 Jam Nonstop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProfileContent() {
  return (
    <div className="bg-[#fff8f4] text-[#221a12]">
      {/* KPI Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <CalendarClock className="h-6 w-6 text-[#d97706]" />,
              num: '1997',
              label: 'Tahun Berdiri',
              desc: '28+ tahun melayani kebutuhan alat berat industri, manufaktur, dan proyek konstruksi.',
            },
            {
              icon: <Building2 className="h-6 w-6 text-[#d97706]" />,
              num: '100+',
              label: 'Proyek Berjalan',
              desc: 'Dipercaya pabrik, gudang logistik, pelabuhan, dan kontraktor BUMN maupun swasta.',
            },
            {
              icon: <ShieldCheck className="h-6 w-6 text-[#d97706]" />,
              num: '0 Fatal',
              label: 'K3 Priority Track',
              desc: 'Standar SILO aktif, operator bersertifikat SIO resmi, dan inspeksi harian rutin.',
            },
          ].map((kpi) => (
            <div
              key={kpi.num}
              className="flex items-start gap-4 rounded-2xl border border-[#e8d8c8] bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5]">
                {kpi.icon}
              </div>
              <div>
                <p className="text-3xl font-black text-[#221a12]">{kpi.num}</p>
                <p className="text-xs font-black uppercase tracking-wider text-[#855300]">
                  {kpi.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#534434]">
                  {kpi.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sejarah & Jangkauan */}
      <section className="border-y border-[#f5e6d7] bg-white py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#855300]">
              Rekam Jejak &amp; Jangkauan Industri
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#221a12] sm:text-3xl">
              Dari Layanan Alat Berat Lokal Menuju Mitra Utama Kawasan Industri Jawa
              Tengah
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#534434]">
              Didirikan pada tahun 1997, CV Giri Nusa Persada (GNP Heavy Equipment)
              mengawali kiprah sebagai penyedia jasa sewa forklift di kawasan pesisir
              Semarang. Seiring pesatnya pertumbuhan pabrik dan pelabuhan di Jawa
              Tengah, GNP berkembang menjadi mitra strategis bagi perusahaan
              manufaktur, logistik, dan proyek konstruksi.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#534434]">
              Saat ini unit kami beroperasi rutin di Kawasan Industri Candi (KIC),
              Wijayakusuma (KIW), Terboyo, Kendal (KIK), Ungaran, Demak, hingga
              Yogyakarta &amp; Solo dengan dukungan unit sendiri dan jaringan rekanan
              terverifikasi.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'KIC Candi',
                'KIW Semarang',
                'Kawasan Wijayakusuma',
                'Terboyo Industrial',
                'Pelabuhan Tj. Emas',
                'Kendal & Batang',
              ].map((area) => (
                <span
                  key={area}
                  className="rounded-lg border border-[#e8d8c8] bg-[#fff1e5] px-3 py-1.5 text-xs font-bold text-[#855300]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#e8d8c8] shadow-md">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85"
                alt="Operasional Armada CV Giri Nusa Persada"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visi, Misi & 4 Nilai Inti */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#855300]">
            Fondasi &amp; Komitmen
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#221a12] sm:text-3xl">
            Visi, Misi &amp; 4 Nilai Inti GNP
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              num: '01',
              title: 'Safety First',
              desc: 'Keselamatan kerja adalah prioritas. Prosedur JSA & inspeksi harian selalu dijalankan sebelum operasi.',
            },
            {
              num: '02',
              title: 'Fast Response',
              desc: 'Respon penawaran dan mobilisasi cepat ke lokasi proyek dengan armada towing milik sendiri.',
            },
            {
              num: '03',
              title: 'Transparency',
              desc: 'Penawaran harga transparan, legalitas jelas, dan tanpa biaya tambahan tersembunyi.',
            },
            {
              num: '04',
              title: 'High Reliability',
              desc: 'Unit terawat dengan kesiapan suku cadang dan dukungan teknisi lapangan 24 jam.',
            },
          ].map((val) => (
            <div
              key={val.num}
              className="rounded-2xl border border-[#e8d8c8] bg-white p-5 shadow-sm"
            >
              <span className="font-mono text-2xl font-black text-[#f59e0b]">
                {val.num}
              </span>
              <h3 className="mt-2 text-base font-black text-[#221a12]">
                {val.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#534434]">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Legalitas & Tim */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <FileCheck2 className="h-5 w-5 text-[#d97706]" />,
              title: 'Badan Usaha Resmi',
              desc: 'NIB, PKP, & Faktur Pajak PPN resmi untuk kebutuhan administrasi perusahaan.',
            },
            {
              icon: <ShieldCheck className="h-5 w-5 text-[#d97706]" />,
              title: 'Sertifikat SILO Aktif',
              desc: 'Surat Izin Layak Operasi Depnaker diperbarui berkala untuk seluruh armada.',
            },
            {
              icon: <HardHat className="h-5 w-5 text-[#d97706]" />,
              title: 'Operator Berlisensi SIO',
              desc: 'Operator berpengalaman mengantongi SIO resmi dan APD lengkap standar proyek.',
            },
            {
              icon: <Headphones className="h-5 w-5 text-[#d97706]" />,
              title: 'Dispatcher Siaga 24/7',
              desc: 'Tim logistik dan mekanik lapangan siap membantu koordinasi kapan saja.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#f5e6d7] bg-[#fff1e5]/70 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                {item.icon}
              </div>
              <h3 className="mt-3 text-sm font-black text-[#221a12]">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#534434]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dark CTA Banner */}
      <section className="bg-[#0f172a] py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-[#f59e0b]/20 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#f59e0b]">
            Siap Mengawal Proyek Anda Sejak 1997
          </span>
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">
            Siap Berkolaborasi untuk Kelancaran Proyek Industri Anda?
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
            Konsultasikan kebutuhan alat berat, kapasitas beban, dan jadwal proyek
            Anda bersama tim ahli CV Giri Nusa Persada.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/6287839788721"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#f59e0b] px-6 py-3 text-xs font-black text-[#221a12] hover:bg-[#d97706] hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami: 0878-3978-8721
            </a>
            <Link
              href="/layanan"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-bold text-white hover:border-[#f59e0b]"
            >
              Lihat Katalog &amp; Ajukan Sewa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function BlogCards({ compact = false }: { compact?: boolean }) {
  const articles = compact ? stories.slice(0, 3) : stories;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article
          key={article.title}
          className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e8d8c8] bg-white shadow-sm transition hover:border-[#f59e0b]"
        >
          <div>
            <img
              src={article.image}
              alt={article.title}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="p-5">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#d97706]">
                {article.category}
              </p>
              <h3 className="mt-1.5 text-base font-black leading-snug text-[#221a12]">
                {article.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#534434]">
                {article.summary}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[#f5e6d7] px-5 py-3 text-xs">
            <span className="text-[#534434]">{article.date}</span>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-1 font-bold text-[#221a12] hover:text-[#d97706]"
            >
              Tanya Tim Kami <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ContactDetails() {
  return (
    <div className="space-y-6 rounded-2xl border border-[#e8d8c8] bg-white p-6 shadow-sm sm:p-8">
      <div>
        <span className="inline-block rounded-lg bg-[#fff1e5] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#855300]">
          Kantor &amp; Depo Pusat
        </span>
        <h2 className="mt-3 text-2xl font-black text-[#221a12]">
          CV. Giri Nusa Persada
        </h2>
        <p className="mt-1 text-xs text-[#534434]">
          Rental Forklift &amp; Mobile Crane Terpercaya Semarang &amp; Jawa Tengah
        </p>
      </div>

      <div className="space-y-4 border-t border-[#f5e6d7] pt-5 text-sm text-[#534434]">
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]" />
          <div>
            <p className="text-xs font-bold text-[#221a12]">Telepon &amp; WhatsApp 24 Jam</p>
            <a
              href="https://wa.me/6287839788721"
              target="_blank"
              rel="noreferrer"
              className="font-mono font-bold text-[#d97706] hover:underline"
            >
              0878-3978-8721
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]" />
          <div>
            <p className="text-xs font-bold text-[#221a12]">Alamat Depo Kalibanteng</p>
            <p className="text-xs leading-relaxed">
              Jl. WR Supratman Kavling 39, Kalibanteng Kulon, Kec. Semarang Barat,
              Kota Semarang, Jawa Tengah 50145
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]" />
          <div>
            <p className="text-xs font-bold text-[#221a12]">Jam Operasional</p>
            <p className="text-xs">Senin - Minggu • Siaga Dispatch 24 Jam</p>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/6287839788721"
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f59e0b] px-5 py-3 text-xs font-black text-[#221a12] shadow-sm transition hover:bg-[#d97706] hover:text-white"
      >
        <Phone className="h-4 w-4" />
        Chat WhatsApp Sekarang
      </a>
    </div>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const location = String(formData.get('location') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const text = `Halo GNP Heavy Equipment, saya ${name} (${phone}). Lokasi proyek: ${location}.\n\n${message}`;
    window.open(
      `https://wa.me/6287839788721?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#e8d8c8] bg-white p-6 shadow-sm sm:p-8"
    >
      <h3 className="text-lg font-black text-[#221a12]">
        Kirim Permintaan Penawaran Cepat (SPH)
      </h3>
      <p className="mt-1 text-xs text-[#534434]">
        Isi rincian beban dan lokasi, tim kami akan mengirim estimasi tarif &amp;
        ketersediaan unit via WhatsApp.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-[#221a12]">
          Nama Lengkap / Perusahaan
          <input
            name="name"
            required
            placeholder="Contoh: PT Industri Jaya Semarang"
            className="mt-1.5 w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] px-3.5 py-2.5 text-xs text-[#221a12] outline-none focus:border-[#f59e0b] focus:bg-white"
          />
        </label>
        <label className="text-xs font-bold text-[#221a12]">
          Nomor WhatsApp / Telp
          <input
            name="phone"
            required
            placeholder="08xx-xxxx-xxxx"
            className="mt-1.5 w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] px-3.5 py-2.5 text-xs text-[#221a12] outline-none focus:border-[#f59e0b] focus:bg-white"
          />
        </label>
        <label className="text-xs font-bold text-[#221a12] sm:col-span-2">
          Lokasi Proyek / Pabrik
          <input
            name="location"
            required
            placeholder="Contoh: Kawasan Industri Wijayakusuma"
            className="mt-1.5 w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] px-3.5 py-2.5 text-xs text-[#221a12] outline-none focus:border-[#f59e0b] focus:bg-white"
          />
        </label>
        <label className="text-xs font-bold text-[#221a12] sm:col-span-2">
          Keterangan Tambahan / Detail Beban
          <textarea
            name="message"
            required
            rows={3}
            placeholder="Tuliskan perkiraan berat beban, kebutuhan unit, dan tanggal rencana..."
            className="mt-1.5 w-full resize-y rounded-xl border border-[#e8d8c8] bg-[#fff8f4] px-3.5 py-2.5 text-xs text-[#221a12] outline-none focus:border-[#f59e0b] focus:bg-white"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f59e0b] px-5 py-3 text-xs font-black text-[#221a12] shadow-sm transition hover:bg-[#d97706] hover:text-white sm:w-auto"
      >
        <Send className="h-4 w-4" />
        Kirim Pesan via WhatsApp Sekarang
      </button>

      {submitted && (
        <p role="status" className="mt-3 text-xs font-semibold text-emerald-700">
          WhatsApp terbuka dengan draft pesan Anda. Silakan klik kirim.
        </p>
      )}
    </form>
  );
}
