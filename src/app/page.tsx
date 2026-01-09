import Navbar from "@/components/Navbar"; // Navbar is in layout? No, it's used here in page.tsx currently.
import Hero from "@/components/Hero";
// import About from "@/components/About";
import Facilities from "@/components/Facilities";
import RoomGallery from "@/components/RoomGallery";
import Pricing from "@/components/Pricing";
import Rules from "@/components/Rules";
import MapSection from "@/components/MapSection";
// import FAQ from "@/components/FAQ";
import FAQ from "@/components/FAQ";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import { getPublicContent } from "@/lib/cms-helper";

export const revalidate = 3600; // Revalidate every hour or rely on on-demand validation

export default async function Home() {
  const content = await getPublicContent();

  return (
    <main className="min-h-screen bg-white">
      <Navbar navLinks={content.nav} />
      <Hero content={content.hero} />
      <Facilities categories={content.facilities} specs={content.specs} />
      <RoomGallery images={content.gallery} />
      <Rules rules={content.rules} />
      <Pricing tiers={content.pricing} ctaLink={content.hero.ctaLink} />
      <MapSection contact={content.contact} />
      <FAQ faqs={content.faqs} />
      <Footer contact={content.contact} navLinks={content.nav} />
      <FloatingCTA link={content.hero.ctaLink} />
    </main>
  );
}
