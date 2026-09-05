import styles from "./page.module.css";
import { getSettings } from "@/app/actions/settings";

import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrustBand } from "@/components/home/TrustBand";
import { CentresSection } from "@/components/home/CentresSection";
import { RadiologistSection } from "@/components/home/RadiologistSection";
import { PatientStoriesSection } from "@/components/home/PatientStoriesSection";
import { ShowcaseGallery } from "@/components/home/ShowcaseGallery";
import { CTASection } from "@/components/home/CTASection";

/**
 * The main homepage of Malhotra Scanning Centre.
 * Composed of modular sections for high cohesion.
 */
export default async function Home() {
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.data : {};
  const phoneVal = settings?.site?.phone || '99990-62109';
  const phoneClean = phoneVal.replace(/[^0-9]/g, '');
  const tagline = settings?.site?.tagline || 'Advanced diagnostics. Trusted care.';

  return (
    <div className={styles.home}>
      {/* 02 HERO */}
      <HeroSection tagline={tagline} phoneVal={phoneVal} phoneClean={phoneClean} />

      {/* 04 ESSENTIAL SERVICES */}
      <ServicesGrid />

      {/* 03 TRUST BAND (Why Choose Us) */}
      <TrustBand />

      {/* 06 TWO CENTRES */}
      <CentresSection phoneVal={phoneVal} />

      {/* 07 RADIOLOGIST */}
      <RadiologistSection />

      {/* 07B TESTIMONIALS */}
      <PatientStoriesSection />

      {/* 08 SHOWCASE GALLERY */}
      <ShowcaseGallery />

      {/* 09 APPOINTMENT CTA */}
      <CTASection phoneVal={phoneVal} phoneClean={phoneClean} />
    </div>
  );
}
