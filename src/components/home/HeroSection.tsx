import React from 'react';
import Image from "next/image";
import { ArrowRight, Phone, CheckCircle, Clock, Users } from "lucide-react";
import styles from "@/app/page.module.css";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  tagline: string;
  phoneVal: string;
  phoneClean: string;
}

export function HeroSection({ tagline, phoneVal, phoneClean }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <span className="eyebrow fade-in-up" style={{ animationDelay: '0.1s' }}>
            {tagline.toUpperCase()}
          </span>
          <h1 className={`h1-hero fade-in-up ${styles.heroTitle}`} style={{ animationDelay: '0.2s' }}>
            Precision<br/>
            in diagnosis.<br />
            <span className="text-italic-gold">For what<br/>matters most.</span>
          </h1>
          <div className={`fade-in-up ${styles.heroSeparator}`} style={{ animationDelay: '0.25s' }}></div>
          <p className={`text-body-large fade-in-up ${styles.heroDescription}`} style={{ animationDelay: '0.3s' }}>
            Ultrasound, Doppler, X-Ray, CT Scan and comprehensive diagnostic investigations under expert radiological care.
          </p>
          <div className={`fade-in-up ${styles.heroActions}`} style={{ animationDelay: '0.4s' }}>
            <Button href="/appointment" variant="primary" size="lg">
              Book an Appointment <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
            </Button>
            <Button href={`tel:+91${phoneClean}`} variant="outline" size="lg">
              <Phone size={16} style={{ marginRight: '0.5rem', color: 'var(--color-gold-accent)' }} />
              Call {phoneVal}
            </Button>
          </div>
          
          <div className={`fade-in-up ${styles.trustPoints}`} style={{ animationDelay: '0.6s' }}>
            <div className={styles.trustPoint}>
              <div className={styles.trustIcon}><CheckCircle size={16} /></div>
              <span>Quick & Easy<br/>Appointments</span>
            </div>
            <div className={styles.trustPoint}>
              <div className={styles.trustIcon}><Clock size={16} /></div>
              <span>Minimal Waiting<br/>Time</span>
            </div>
            <div className={styles.trustPoint}>
              <div className={styles.trustIcon}><Users size={16} /></div>
              <span>Trusted by Families<br/>Across Jalandhar</span>
            </div>
          </div>
        </div>
        
        <div className={`fade-in-up ${styles.heroImageSide}`} style={{ animationDelay: '0.3s' }}>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Modern diagnostic equipment"
              fill
              className={styles.heroImage}
              priority
            />
            <div className={styles.heroImageOverlay}>
              <div className={styles.heroOverlayText}>
                Better<br/>
                Imaging<br/>
                Brighter<br/>
                Lives
              </div>
            </div>
          </div>
          
          <div className={styles.floatingCard}>
            <div className={styles.floatingCardDot}></div>
            <div>
              <strong>Modern</strong><br/>
              <strong>Technology.</strong><br/>
              Human Care.
              <div className={styles.cardLine}></div>
            </div>
          </div>
          
          <div className={styles.floatingCircle}>
            <svg viewBox="0 0 100 100" className={styles.circularText}>
              <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text width="100">
                <textPath href="#curve" startOffset="50%" textAnchor="middle" fill="var(--color-green-primary)">
                  CLEAR &bull; CARE &bull; TRUST &bull; ALWAYS &bull;
                </textPath>
              </text>
            </svg>
            <div className={styles.circleIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 12"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
