import { ContactDetails, ContactForm } from '@/components/prototype/Content';
import { PageHero, SiteFooter, SiteHeader } from '@/components/prototype/SiteShell';

export default function ContactPage() {
  return (
    <div className="bg-[#fff8f4]">
      <SiteHeader />
      <main>
        <PageHero
          title="Hubungi Tim Dispatcher & Operasional GNP"
          breadcrumb="Kontak Kami"
          subtitle="Konsultasikan kebutuhan alat berat, survey lokasi gratis, atau permintaan Surat Penawaran Harga (SPH) resmi."
        />
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-16">
          <div className="lg:col-span-5">
            <ContactDetails />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
