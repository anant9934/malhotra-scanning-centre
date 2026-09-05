import React from 'react';
import styles from "@/app/page.module.css";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";

export function PatientStoriesSection() {
  return (
    <section className={`section-padding ${styles.testimonialsSection}`}>
      <div className="container">
        <div className={styles.servicesHeaderRow}>
          <div className={styles.servicesHeaderLeft} style={{ width: '100%' }}>
            <span className="eyebrow">PATIENT STORIES</span>
            <h2 className="h2-section">Trusted by the community.</h2>
            <p className="text-body-large" style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', maxWidth: '600px' }}>
              Real experiences from people who have visited Malhotra Scanning Centre.
            </p>
          </div>
        </div>
        
        <div style={{ marginBottom: '4rem', padding: '3rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          <div style={{ color: 'var(--color-gold-accent)', fontSize: '1.5rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
            ★★★★★
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--color-text-primary)', lineHeight: 1.4, marginBottom: '2rem' }}>
            "Fast and accurate reporting. I got my test result delivered on the exact same day. The facility is exceptionally neat and hygienic."
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>— Kiran Bala</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Google review</span>
          </div>
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  );
}
