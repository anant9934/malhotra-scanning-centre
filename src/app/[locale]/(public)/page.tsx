import { Suspense } from 'react';
import styles from "./page.module.css";
import { getSettings } from "@/app/actions/settings";
import { Locale } from "@/i18n/config";

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
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.data : {};
  const phoneVal = settings?.site?.phone || '99990-62109';
  const phoneClean = phoneVal.replace(/[^0-9]/g, '');
  const tagline = settings?.site?.tagline || 'Advanced diagnostics. Trusted care.';
  
  return (
    <div className={styles.home}>
      <HeroSection locale={currentLocale} tagline={tagline} phoneVal={phoneVal} phoneClean={phoneClean} />
      
      <Suspense fallback={<div className="section-padding text-center">Loading services...</div>}>
        <ServicesGrid locale={currentLocale} />
      </Suspense>
      
      <TrustBand locale={currentLocale} />
      
      <CentresSection locale={currentLocale} phoneVal={phoneVal} />
      
      <RadiologistSection locale={currentLocale} />
      
      <ShowcaseGallery />
      
      <PatientStoriesSection locale={currentLocale} />
      
      <CTASection locale={currentLocale} phoneVal={phoneVal} phoneClean={phoneClean} />
    </div>
  );
}
