import React from 'react';
import { Activity, Users, CheckCircle, Heart } from "lucide-react";
import styles from "@/app/[locale]/(public)/page.module.css";
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface TrustBandProps {
  locale: Locale;
}

export async function TrustBand({ locale }: TrustBandProps) {
  const dictionary = await getDictionary(locale);

  return (
    <section className={styles.trustBand}>
      <div className={`container ${styles.trustBandContainer}`}>
        <div className={styles.trustBandLeft}>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>WHY CHOOSE US</span>
          <h2 className={styles.trustBandTitle}>
            Technology.<br />
            Expertise.<br />
            A more confident you.
          </h2>
        </div>
        <div className={styles.trustBandGrid}>
          <div className={styles.trustBandItem}>
            <div className={styles.trustBandIconCircle}><Activity size={20} /></div>
            <div>
              <h3 className={styles.trustBandItemTitle}>{dictionary.home.trust.accuracy}</h3>
              <p className={styles.trustBandItemDesc}>{dictionary.home.trust.accuracyDesc}</p>
            </div>
          </div>
          <div className={styles.trustBandItem}>
            <div className={styles.trustBandIconCircle}><Users size={20} /></div>
            <div>
              <h3 className={styles.trustBandItemTitle}>{dictionary.home.trust.experience}</h3>
              <p className={styles.trustBandItemDesc}>{dictionary.home.trust.experienceDesc}</p>
            </div>
          </div>
          <div className={styles.trustBandItem}>
            <div className={styles.trustBandIconCircle}><CheckCircle size={20} /></div>
            <div>
              <h3 className={styles.trustBandItemTitle}>{dictionary.home.trust.timely}</h3>
              <p className={styles.trustBandItemDesc}>{dictionary.home.trust.timelyDesc}</p>
            </div>
          </div>
          <div className={styles.trustBandItem}>
            <div className={styles.trustBandIconCircle}><Heart size={20} /></div>
            <div>
              <h3 className={styles.trustBandItemTitle}>Patient First</h3>
              <p className={styles.trustBandItemDesc}>Compassionate care at every step.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
