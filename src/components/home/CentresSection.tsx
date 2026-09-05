import React from 'react';
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import styles from "@/app/page.module.css";
import { Button } from "@/components/ui/Button";

interface CentresSectionProps {
  phoneVal: string;
}

export function CentresSection({ phoneVal }: CentresSectionProps) {
  return (
    <section className={`section-padding bg-primary`}>
      <div className={`container ${styles.centresContainer}`}>
        <div className={styles.centresLeft}>
          <span className="eyebrow">OUR CENTRES</span>
          <h2 className="h2-section" style={{marginBottom: '2rem'}}>Two locations.<br />Same standard<br/>of care.</h2>
          <div className={styles.centreNavArrows}>
            <button className={styles.arrowBtn}><ArrowRight size={20} style={{transform: 'rotate(180deg)'}} /></button>
            <button className={`${styles.arrowBtn} ${styles.arrowBtnDark}`}><ArrowRight size={20} /></button>
            <span className={styles.arrowDesc}>Easily accessible.<br/>Always here for you.</span>
          </div>
        </div>
        
        <div className={styles.centresRight}>
          <div className={styles.centreCard}>
            <div className={styles.centreCardTop}>
              <div>
                <span className={styles.trustNumber}>01</span>
                <h3 className="h3-card" style={{fontSize: '1.25rem'}}>Maqsudan Centre</h3>
              </div>
              <div className={styles.centrePhoto}>
                <Image src="/images/maqsudan.png" alt="Maqsudan Centre" fill style={{objectFit: 'cover'}} />
              </div>
            </div>
            <div className={styles.centreInfoList}>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><ArrowRight size={16} /></div>
                <p className={styles.infoText}>Plot No. 2, Maqsudan, Basement HDFC Bank, Near Maqsudan Police Station, Grand Trunk Road, Jalandhar - 144008 (M)</p>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><Phone size={16} /></div>
                <p className={styles.infoText}><strong>70099-30231</strong><br/>{phoneVal}</p>
              </div>
            </div>
            <Button href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Maqsudan+Jalandhar" external variant="outline" size="sm" style={{alignSelf: 'flex-start', marginTop: '1rem'}}>
              Get Directions <ArrowRight size={14} style={{marginLeft: '0.25rem'}} />
            </Button>
          </div>

          <div className={styles.centreCard}>
            <div className={styles.centreCardTop}>
              <div>
                <span className={styles.trustNumber}>02</span>
                <h3 className="h3-card" style={{fontSize: '1.25rem'}}>Rama Mandi Centre</h3>
              </div>
              <div className={styles.centrePhoto}>
                <Image src="/images/ramamandi.png" alt="Rama Mandi Centre" fill style={{objectFit: 'cover'}} />
              </div>
            </div>
            <div className={styles.centreInfoList}>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><ArrowRight size={16} /></div>
                <p className={styles.infoText}>Rama Mandi Main Market, Hoshiarpur Road, NH-3, Opposite Dashmesh Dhaba, Jalandhar - 144 005 (Pb.)</p>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><Phone size={16} /></div>
                <p className={styles.infoText}><strong>62839-30231</strong><br/>{phoneVal}</p>
              </div>
            </div>
            <Button href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Rama+Mandi+Jalandhar" external variant="outline" size="sm" style={{alignSelf: 'flex-start', marginTop: '1rem'}}>
              Get Directions <ArrowRight size={14} style={{marginLeft: '0.25rem'}} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
