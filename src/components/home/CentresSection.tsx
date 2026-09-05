import React from 'react';
import Image from "next/image";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import styles from "@/app/[locale]/(public)/page.module.css";
import { Button } from "@/components/ui/Button";
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface CentresSectionProps {
  locale: Locale;
  phoneVal: string;
}

export async function CentresSection({ locale, phoneVal }: CentresSectionProps) {
  const dictionary = await getDictionary(locale);

  return (
    <section className={`section-padding bg-primary`}>
      <div className={`container ${styles.centresContainer}`}>
        <div className={styles.centresLeft}>
          <span className="eyebrow">{dictionary.nav.centres.toUpperCase()}</span>
          <h2 className="h2-section" style={{marginBottom: '2rem'}}>
            {dictionary.centres.title.split(',')[0]},<br />
            {dictionary.centres.title.split(',')[1]}
          </h2>
          <div className={styles.centreNavArrows}>
            <button className={styles.arrowBtn}><ArrowRight size={20} style={{transform: 'rotate(180deg)'}} /></button>
            <button className={`${styles.arrowBtn} ${styles.arrowBtnDark}`}><ArrowRight size={20} /></button>
            <span className={styles.arrowDesc}>{dictionary.centres.subtitle.split('.')[0]}.<br/>{dictionary.centres.subtitle.split('.')[1]}.</span>
          </div>
        </div>
        
        <div className={styles.centresRight}>
          <div className={styles.centreCard}>
            <div className={styles.centreCardTop}>
              <div>
                <span className={styles.trustNumber}>01</span>
                <h3 className="h3-card" style={{fontSize: '1.25rem'}}>{dictionary.centres.maqsudan.name}</h3>
              </div>
              <div className={styles.centrePhoto}>
                <Image src="/images/maqsudan.png" alt="Maqsudan Centre" fill style={{objectFit: 'cover'}} />
              </div>
            </div>
            <div className={styles.centreInfoList}>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><MapPin size={16} /></div>
                <p className={styles.infoText}>{dictionary.centres.maqsudan.address}</p>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><Phone size={16} /></div>
                <p className={styles.infoText}><strong>70099-30231</strong><br/>{phoneVal}</p>
              </div>
            </div>
            <Button href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Maqsudan+Jalandhar" external variant="outline" size="sm" style={{alignSelf: 'flex-start', marginTop: '1rem'}}>
              {dictionary.centres.labels.getDirections} <ArrowRight size={14} style={{marginLeft: '0.25rem'}} />
            </Button>
          </div>

          <div className={styles.centreCard}>
            <div className={styles.centreCardTop}>
              <div>
                <span className={styles.trustNumber}>02</span>
                <h3 className="h3-card" style={{fontSize: '1.25rem'}}>{dictionary.centres.ramamandi.name}</h3>
              </div>
              <div className={styles.centrePhoto}>
                <Image src="/images/ramamandi.png" alt="Rama Mandi Centre" fill style={{objectFit: 'cover'}} />
              </div>
            </div>
            <div className={styles.centreInfoList}>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><MapPin size={16} /></div>
                <p className={styles.infoText}>{dictionary.centres.ramamandi.address}</p>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><Phone size={16} /></div>
                <p className={styles.infoText}><strong>62839-30231</strong><br/>{phoneVal}</p>
              </div>
            </div>
            <Button href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Rama+Mandi+Jalandhar" external variant="outline" size="sm" style={{alignSelf: 'flex-start', marginTop: '1rem'}}>
              {dictionary.centres.labels.getDirections} <ArrowRight size={14} style={{marginLeft: '0.25rem'}} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
