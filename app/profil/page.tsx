import { ProfileContent } from '@/components/prototype/Content';
import { PageHero, SiteFooter, SiteHeader } from '@/components/prototype/SiteShell';

export default function ProfilePage() {
  return (
    <div className="bg-[#fff8f4]">
      <SiteHeader />
      <main>
        <PageHero
          title="Mengenal CV Giri Nusa Persada: Kunci Keberhasilan Proyek Anda"
          breadcrumb="Profil Kami"
          subtitle="Dedikasi lebih dari 28 tahun melayani kebutuhan rental forklift, mobile crane, serta penanganan kargo berat dan relokasi mesin di Semarang dan seluruh Jawa Tengah."
          badgeText="LAYANAN TERPERCAYA SEMARANG • SEJAK 1997"
        />
        <ProfileContent />
      </main>
      <SiteFooter />
    </div>
  );
}
