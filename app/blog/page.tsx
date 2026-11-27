import { BlogCards } from '@/components/prototype/Content';
import { PageHero, SiteFooter, SiteHeader } from '@/components/prototype/SiteShell';

export default function BlogPage() {
  return (
    <div className="bg-[#fff8f4]">
      <SiteHeader />
      <main>
        <PageHero
          title="Dokumentasi Proyek & Edukasi Teknis Alat Berat"
          breadcrumb="Blog & Artikel"
          subtitle="Laporan mobilisasi armada terbaru di kawasan industri Jawa Tengah serta panduan K3 dan pemilihan kapasitas alat."
        />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#855300]">
              Wawasan Proyek
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#221a12] sm:text-3xl">
              Artikel &amp; Aktivitas Terbaru
            </h2>
          </div>
          <BlogCards />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
