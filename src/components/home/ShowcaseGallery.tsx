import React from 'react';
import Image from "next/image";
import styles from "@/app/[locale]/(public)/page.module.css";

export function ShowcaseGallery() {
  return (
    <section className={`section-padding ${styles.showcaseSection}`}>
      <div className="container">
        <div className={styles.servicesHeaderRow}>
          <div className={styles.servicesHeaderLeft}>
            <span className="eyebrow">FACILITY TOUR</span>
            <h2 className="h2-section">State-of-the-art facility.</h2>
          </div>
        </div>
        
        <div className={styles.showcaseGrid}>
          <div className={styles.showcaseItemLarge}>
            <Image 
              src="/images/gallery/1.png" 
              alt="Main Diagnostic Room" 
              fill 
              className={styles.showcaseImage} 
            />
          </div>
          <div className={styles.showcaseItem}>
            <Image 
              src="/images/gallery/2.png" 
              alt="Laboratory Equipment" 
              fill 
              className={styles.showcaseImage} 
            />
          </div>
          <div className={styles.showcaseItem}>
            <Image 
              src="/images/gallery/3.png" 
              alt="Patient Care Area" 
              fill 
              className={styles.showcaseImage} 
            />
          </div>
          <div className={styles.showcaseItem}>
            <Image 
              src="/images/gallery/4.png" 
              alt="Waiting Lounge" 
              fill 
              className={styles.showcaseImage} 
            />
          </div>
          <div className={styles.showcaseItem}>
            <Image 
              src="/images/gallery/5.png" 
              alt="Doctor Consultation" 
              fill 
              className={styles.showcaseImage} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
