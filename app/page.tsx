import { HomePrototype } from '@/components/prototype/Content';
import { SiteFooter, SiteHeader } from '@/components/prototype/SiteShell';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomePrototype />
      </main>
      <SiteFooter />
    </>
  );
}
