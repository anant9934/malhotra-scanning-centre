import React from 'react';
import Link from "next/link";
import { ArrowRight, Activity, Heart, Bone, Brain } from "lucide-react";
import styles from "@/app/[locale]/(public)/page.module.css";
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface ServicesGridProps {
  locale: Locale;
}

export async function ServicesGrid({ locale }: ServicesGridProps) {
  const dictionary = await getDictionary(locale);

  return (
    <section className={`section-padding`}>
      <div className={`container`}>
        <div className={styles.servicesHeaderRow}>
          <div className={styles.servicesHeaderLeft}>
            <span className="eyebrow">{dictionary.nav.services.toUpperCase()}</span>
            <h2 className="h2-section">{dictionary.services.title.split(' ')[0]} {dictionary.services.title.split(' ')[1]}<br />{dictionary.services.title.split(' ').slice(2).join(' ')}</h2>
          </div>
          <div className={styles.servicesHeaderRight}>
            <p className="text-body-large">{dictionary.services.subtitle}</p>
            <Link href={`/${locale}/services`} className={styles.headerLink}>
              {dictionary.common.viewDetails} <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>
        </div>
        
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <Activity strokeWidth={1} size={48} className={styles.serviceIcon} />
            </div>
            <h3 className="h3-card" style={{textAlign: 'center'}}>{dictionary.services.categories.ultrasound.split('(')[0]}</h3>
            <p className={styles.serviceDesc}>Abdomen, Pelvis, Thyroid, OBG, TVS, TRUS and more.</p>
            <Link href={`/${locale}/services/ultrasound`} className={styles.exploreLink}>
              {dictionary.common.readMore} <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <Heart strokeWidth={1} size={48} className={styles.serviceIcon} />
            </div>
            <h3 className="h3-card" style={{textAlign: 'center'}}>{dictionary.services.categories.doppler.split('(')[0]}</h3>
            <p className={styles.serviceDesc}>Vascular, Arterial & Venous, Kidney, Liver, Obstetrics and more.</p>
            <Link href={`/${locale}/services/colour-doppler`} className={styles.exploreLink}>
              {dictionary.common.readMore} <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <Bone strokeWidth={1} size={48} className={styles.serviceIcon} />
            </div>
            <h3 className="h3-card" style={{textAlign: 'center'}}>{dictionary.services.categories.xray.split('(')[0]}</h3>
            <p className={styles.serviceDesc}>Chest, Spine, Limbs, Joints, KUB and more.</p>
            <Link href={`/${locale}/services/digital-xray`} className={styles.exploreLink}>
              {dictionary.common.readMore} <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <Brain strokeWidth={1} size={48} className={styles.serviceIcon} />
            </div>
            <h3 className="h3-card" style={{textAlign: 'center'}}>{dictionary.services.categories.ctscan.split('(')[0]}</h3>
            <p className={styles.serviceDesc}>High resolution imaging for accurate diagnosis.</p>
            <Link href={`/${locale}/services/ct-scan`} className={styles.exploreLink}>
              {dictionary.common.readMore} <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
