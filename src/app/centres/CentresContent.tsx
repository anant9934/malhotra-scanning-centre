"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './centres.module.css';
import { Button } from '@/components/ui/Button';

export default function CentresContent({ settings }: { settings?: any }) {
  const [activeCentre, setActiveCentre] = useState<'maqsudan' | 'ramamandi'>('maqsudan');

  const servicesList = [
    'Ultrasound', 'Colour Doppler', 'Digital X-Ray', 'CT Scan', 'Fetal Imaging', 'ECHO', 'ECG / EEG', 'FibroScan', 'Laboratory'
  ];
  
  const maq = settings?.centres?.maqsudan || {};
  const rama = settings?.centres?.ramamandi || {};
  
  const maqPhone = maq.phone || '+91 6283930230';
  const maqPhoneClean = maqPhone.replace(/[^+0-9]/g, '');
  const maqAddress = maq.address || 'Plot No. 2, Maqsudan Chowk, HDFC Bank Basement, Near Police Station, Jalandhar, Punjab 144008';
  const maqHours = maq.hours || 'Monday – Saturday, 9:00 AM – 7:30 PM';
  
  const ramaPhone = rama.phone || '+91 6283930231';
  const ramaPhoneClean = ramaPhone.replace(/[^+0-9]/g, '');
  const ramaAddress = rama.address || 'Main Market, Opposite Dashmesh Vaishno Dhaba, Rama Mandi, Jalandhar, Punjab 144005';
  const ramaHours = rama.hours || 'Monday – Saturday, 9:00 AM – 7:30 PM';

  return (
    <>
      <section className="section-padding" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          {/* Header Section */}
          <div className={styles.header}>
            <span className="eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: '1rem' }}>
              OUR LOCATIONS
            </span>
            <h1 className="h1-hero" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem' }}>
              Two locations.<br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold-accent)' }}>One standard of care.</span>
            </h1>
            <p className="text-body-large" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
              Visit Malhotra Scanning Centre at our two convenient locations in Jalandhar, Punjab.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button href="/appointment" variant="primary">
                Book an Appointment &rarr;
              </Button>
            </div>
          </div>

          {/* Mobile Segmented Control */}
          <div className={styles.segmentedControl}>
            <button 
              className={`${styles.segmentBtn} ${activeCentre === 'maqsudan' ? styles.active : ''}`}
              onClick={() => setActiveCentre('maqsudan')}
            >
              MAQSUDAN
            </button>
            <button 
              className={`${styles.segmentBtn} ${activeCentre === 'ramamandi' ? styles.active : ''}`}
              onClick={() => setActiveCentre('ramamandi')}
            >
              RAMA MANDI
            </button>
          </div>

          {/* Cards Grid */}
          <div className={styles.cardsGrid}>
            
            {/* Card 1: Maqsudan */}
            <div className={`${styles.card} ${activeCentre === 'maqsudan' ? styles.showOnMobile : styles.hideOnMobile}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>01</span>
                <span className={styles.cardLabel}>MALHOTRA SCANNING CENTRE</span>
              </div>
              
              <div className={styles.cardBody}>
                <h2 className="h2-section" style={{ fontSize: '2.5rem', marginBottom: '2.5rem' }}>
                  Maqsudan Centre
                </h2>
                
                <div className={styles.infoList}>
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>LOCATION</span>
                    <p className={styles.infoText}>
                      {maqAddress.split(', ').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                  </div>
                  
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>CONTACT</span>
                    <p className={styles.infoText}>
                      {maqPhone}
                    </p>
                  </div>

                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>HOURS</span>
                    <p className={styles.infoText}>
                      {maqHours.split(', ').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <a href={`tel:${maqPhoneClean}`} className={styles.actionBtn}>
                    Call
                  </a>
                  <a href={`https://wa.me/91${maqPhoneClean.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                    WhatsApp
                  </a>
                  <a 
                    href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Maqsudan+Jalandhar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${styles.actionBtn} ${styles.primaryAction}`}
                  >
                    Get Directions <ArrowRight size={14} className={styles.arrow} />
                  </a>
                </div>
              </div>

              <div className={styles.servicesSection}>
                <span className={styles.infoLabel} style={{ marginBottom: '1rem', display: 'block' }}>SERVICES AT THIS CENTRE</span>
                <div className={styles.serviceChips}>
                  {servicesList.map(service => (
                    <span key={service} className={styles.serviceChip}>{service}</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: '1rem' }}>
                  Services may vary by location. Please contact the centre to confirm availability.
                </p>
              </div>
            </div>

            {/* Card 2: Rama Mandi */}
            <div className={`${styles.card} ${activeCentre === 'ramamandi' ? styles.showOnMobile : styles.hideOnMobile}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>02</span>
                <span className={styles.cardLabel}>MALHOTRA SCANNING CENTRE</span>
              </div>
              
              <div className={styles.cardBody}>
                <h2 className="h2-section" style={{ fontSize: '2.5rem', marginBottom: '2.5rem' }}>
                  Rama Mandi Centre
                </h2>
                
                <div className={styles.infoList}>
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>LOCATION</span>
                    <p className={styles.infoText}>
                      {ramaAddress.split(', ').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                  </div>
                  
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>CONTACT</span>
                    <p className={styles.infoText}>
                      {ramaPhone}
                    </p>
                  </div>

                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>HOURS</span>
                    <p className={styles.infoText}>
                      {ramaHours.split(', ').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <a href={`tel:${ramaPhoneClean}`} className={styles.actionBtn}>
                    Call
                  </a>
                  <a href={`https://wa.me/91${ramaPhoneClean.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                    WhatsApp
                  </a>
                  <a 
                    href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Rama+Mandi+Jalandhar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${styles.actionBtn} ${styles.primaryAction}`}
                  >
                    Get Directions <ArrowRight size={14} className={styles.arrow} />
                  </a>
                </div>
              </div>

              <div className={styles.servicesSection}>
                <span className={styles.infoLabel} style={{ marginBottom: '1rem', display: 'block' }}>SERVICES AT THIS CENTRE</span>
                <div className={styles.serviceChips}>
                  {servicesList.map(service => (
                    <span key={service} className={styles.serviceChip}>{service}</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: '1rem' }}>
                  Services may vary by location. Please contact the centre to confirm availability.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section-padding bg-secondary">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>LOCATE US</span>
            <h2 className="h2-section" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Easy to find.<br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold-accent)' }}>Easy to reach.</span>
            </h2>
          </div>
          
          <div className={styles.mapGrid}>
            <div className={styles.mapWrapper}>
              <iframe 
                src="https://maps.google.com/maps?q=Malhotra+Scanning+Centre,+Maqsudan,+Jalandhar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Maqsudan Map"
              ></iframe>
              <a href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Maqsudan+Jalandhar" target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                Directions to Maqsudan <ArrowRight size={16} className={styles.arrow} />
              </a>
            </div>
            <div className={styles.mapWrapper}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37911.4510713788!2d75.57176491511392!3d31.337697305057823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a59b25b7c7c6d%3A0x1e4f44433a8004ee!2sMalhotra%20scanning%20Centre%202.0!5e1!3m2!1sen!2sin!4v1788603560885!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Rama Mandi Map"
              ></iframe>
              <a href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Rama+Mandi+Jalandhar" target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                Directions to Rama Mandi <ArrowRight size={16} className={styles.arrow} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VISITING INFORMATION */}
      <section className="section-padding" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className={styles.visitingInfoGrid}>
            <div className={styles.infoColumn}>
              <span className={styles.cardNumber}>01</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>BEFORE YOUR VISIT</h3>
              <p className="text-body">Carry your prescription or referral where applicable. Please bring past medical records or previous scan reports if available.</p>
            </div>
            <div className={styles.infoColumn}>
              <span className={styles.cardNumber}>02</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>PREPARATION</h3>
              <p className="text-body">Investigation-specific preparation may be required (such as fasting or a full bladder). Confirm instructions while booking.</p>
            </div>
            <div className={styles.infoColumn}>
              <span className={styles.cardNumber}>03</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>NEED HELP?</h3>
              <p className="text-body">Contact the centre before visiting if you are unsure about preparation, availability or exact location details.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANCH COMPARISON */}
      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="h2-section" style={{ textAlign: 'center', marginBottom: '3rem' }}>Branch Comparison</h2>
            
            <div className={styles.comparisonTable}>
              <div className={styles.comparisonHeader}>
                <div className={styles.colLabel}></div>
                <div className={styles.colHeader}>MAQSUDAN</div>
                <div className={styles.colHeader}>RAMA MANDI</div>
              </div>
              
              <div className={styles.comparisonRow}>
                <div className={styles.rowLabel}>Location</div>
                <div className={styles.rowCheck}>✓</div>
                <div className={styles.rowCheck}>✓</div>
              </div>
              
              {servicesList.map((service, index) => (
                <div key={index} className={styles.comparisonRow}>
                  <div className={styles.rowLabel}>{service}</div>
                  <div className={styles.rowConfirm}>Confirm</div>
                  <div className={styles.rowConfirm}>Confirm</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-green-primary)', color: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="eyebrow" style={{ color: 'var(--color-white)', opacity: 0.8, marginBottom: '1rem', display: 'block' }}>READY FOR YOUR VISIT?</span>
            <h2 className="h1-hero" style={{ color: 'var(--color-white)', marginBottom: '2.5rem' }}>Choose your centre and book your visit.</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Button href="/appointment" variant="primary" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-green-primary)' }}>
                Book Appointment &rarr;
              </Button>
              <Button href="/contact" variant="outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-white)' }}>
                Contact Us
              </Button>
            </div>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              Our team can help you select the appropriate centre and provide investigation-specific guidance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
