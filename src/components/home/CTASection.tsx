import React from 'react';
import { ArrowRight, Phone, Clock } from "lucide-react";
import styles from "@/app/[locale]/(public)/page.module.css";
import { Button } from "@/components/ui/Button";
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface CTASectionProps {
  locale: Locale;
  phoneVal: string;
  phoneClean: string;
}

export async function CTASection({ locale, phoneVal, phoneClean }: CTASectionProps) {
  const dictionary = await getDictionary(locale);

  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaBox}>
          <div className={styles.ctaLeft}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>TAKE THE NEXT STEP</span>
            <h2 className="h2-section" style={{ color: 'var(--color-white)', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Your health deserves clarity.</h2>
            <p className={styles.ctaDesc}>Book an appointment or speak with our team today.</p>
          </div>
          
          <div className={styles.ctaMiddle}>
            <Button href={`/${locale}/appointment`} variant="secondary" size="lg" fullWidth>
              <Clock size={16} style={{marginRight: '0.5rem'}}/> {dictionary.nav.appointment} <ArrowRight size={16} style={{marginLeft: '0.5rem'}}/>
            </Button>
            <Button href={`tel:+91${phoneClean}`} variant="outline" size="lg" fullWidth style={{borderColor: 'rgba(255,255,255,0.3)', color: 'white'}}>
              <Phone size={16} style={{marginRight: '0.5rem'}}/> {dictionary.centres.labels.call} {phoneVal}
            </Button>
          </div>

          <div className={styles.ctaRight}>
            <span className={styles.ctaRightText}>SAME CARE<br/>MORE TOMORROWS</span>
            <div className={styles.cardLine} style={{borderColor: 'rgba(255,255,255,0.3)', marginTop: '1rem'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
