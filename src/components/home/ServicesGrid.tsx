import React from 'react';
import Link from "next/link";
import { ArrowRight, Activity, Heart, Bone, Brain } from "lucide-react";
import styles from "@/app/page.module.css";

export function ServicesGrid() {
  return (
    <section className={`section-padding`}>
      <div className={`container`}>
        <div className={styles.servicesHeaderRow}>
          <div className={styles.servicesHeaderLeft}>
            <span className="eyebrow">OUR SERVICES</span>
            <h2 className="h2-section">Essential diagnostics.<br />All in one place.</h2>
          </div>
          <div className={styles.servicesHeaderRight}>
            <p className="text-body-large">From routine scans to advanced imaging, we provide accurate, reliable and timely reports to support better healthcare decisions.</p>
            <Link href="/services" className={styles.headerLink}>
              View all services <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>
        </div>
        
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <Activity strokeWidth={1} size={48} className={styles.serviceIcon} />
            </div>
            <h3 className="h3-card" style={{textAlign: 'center'}}>Ultrasound<br/>& Sonography</h3>
            <p className={styles.serviceDesc}>Abdomen, Pelvis, Thyroid, OBG, TVS, TRUS and more.</p>
            <Link href="/services/ultrasound" className={styles.exploreLink}>
              Explore <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <Heart strokeWidth={1} size={48} className={styles.serviceIcon} />
            </div>
            <h3 className="h3-card" style={{textAlign: 'center'}}>Colour Doppler</h3>
            <p className={styles.serviceDesc}>Vascular, Arterial & Venous, Kidney, Liver, Obstetrics and more.</p>
            <Link href="/services/colour-doppler" className={styles.exploreLink}>
              Explore <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <Bone strokeWidth={1} size={48} className={styles.serviceIcon} />
            </div>
            <h3 className="h3-card" style={{textAlign: 'center'}}>Digital X-Ray</h3>
            <p className={styles.serviceDesc}>Chest, Spine, Limbs, Joints, KUB and more.</p>
            <Link href="/services/digital-xray" className={styles.exploreLink}>
              Explore <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrapper}>
              <Brain strokeWidth={1} size={48} className={styles.serviceIcon} />
            </div>
            <h3 className="h3-card" style={{textAlign: 'center'}}>CT Scan</h3>
            <p className={styles.serviceDesc}>High resolution imaging for accurate diagnosis.</p>
            <Link href="/services/ct-scan" className={styles.exploreLink}>
              Explore <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
