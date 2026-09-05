import React from 'react';
import { Activity, Users, CheckCircle, Heart } from "lucide-react";
import styles from "@/app/page.module.css";

export function TrustBand() {
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
              <h3 className={styles.trustBandItemTitle}>Advanced Equipment</h3>
              <p className={styles.trustBandItemDesc}>State-of-the-art machines for precise imaging.</p>
            </div>
          </div>
          <div className={styles.trustBandItem}>
            <div className={styles.trustBandIconCircle}><Users size={20} /></div>
            <div>
              <h3 className={styles.trustBandItemTitle}>Expert Radiologist</h3>
              <p className={styles.trustBandItemDesc}>Experienced & dedicated medical professional.</p>
            </div>
          </div>
          <div className={styles.trustBandItem}>
            <div className={styles.trustBandIconCircle}><CheckCircle size={20} /></div>
            <div>
              <h3 className={styles.trustBandItemTitle}>Accurate Reports</h3>
              <p className={styles.trustBandItemDesc}>Fast, reliable and patient-friendly reporting.</p>
            </div>
          </div>
          <div className={styles.trustBandItem}>
            <div className={styles.trustBandIconCircle}><Heart size={20} /></div>
            <div>
              <h3 className={styles.trustBandItemTitle}>Patient-First Approach</h3>
              <p className={styles.trustBandItemDesc}>Comfort, care and respect at every step.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
