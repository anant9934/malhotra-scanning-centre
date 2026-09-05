import React from 'react';
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "@/app/page.module.css";
import { Button } from "@/components/ui/Button";

export function RadiologistSection() {
  return (
    <section className={`section-padding bg-secondary`}>
      <div className={`container ${styles.radiologistContainer}`}>
        <div className={styles.radiologistImageWrapper}>
          <Image 
            src="/images/dr-malhotra.png" 
            alt="Dr. Rajat Malhotra" 
            fill 
            className={styles.docImage}
          />
          <div className={styles.signature}>Dr. Rajat Malhotra</div>
        </div>
        <div className={styles.radiologistContent}>
          <span className="eyebrow">OUR RADIOLOGIST</span>
          <h2 className="h2-section" style={{ marginBottom: '0.25rem' }}>Dr. Rajat Malhotra</h2>
          <p className={styles.credentials}>MBBS, MD RADIODIAGNOSIS</p>
          <div className={styles.cardLine} style={{margin: '1.5rem 0'}}></div>
          <p className={`text-body ${styles.bio}`}>
            Experienced consultant radiologist committed to providing precise diagnosis and compassionate care using the latest imaging technology.
          </p>
          <Button href="/radiologist" variant="outline" size="md" style={{marginTop: '2rem'}}>
            Know More <ArrowRight size={14} style={{marginLeft: '0.25rem'}} />
          </Button>
        </div>
        <div className={styles.quoteBlock}>
          <h3 className={styles.quoteText}>"Accurate imaging<br/>leads to better decisions<br/>and healthier lives."</h3>
          <div className={styles.cardLine} style={{margin: '1.5rem 0', borderColor: 'var(--color-gold-accent)'}}></div>
          <span className={styles.quoteAuthor}>DR. RAJAT MALHOTRA</span>
        </div>
      </div>
    </section>
  );
}
