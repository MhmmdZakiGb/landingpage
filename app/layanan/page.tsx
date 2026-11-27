import { LayananContent } from './LayananContent';
import { PageHero, SiteFooter, SiteHeader } from '@/components/prototype/SiteShell';

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero title="Layanan Rental Alat Berat" breadcrumb="Layanan" />
        <LayananContent />
      </main>
      <SiteFooter />
    </>
  );
}
