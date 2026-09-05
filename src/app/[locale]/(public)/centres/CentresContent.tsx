"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './centres.module.css';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/components/providers/I18nProvider';

export default function CentresContent({ settings }: { settings?: any }) {
  const [activeCentre, setActiveCentre] = useState<'maqsudan' | 'ramamandi'>('maqsudan');
  const { locale, dictionary } = useI18n();

  const servicesList = [
    dictionary.services.categories.ultrasound.split('(')[0].trim(),
    dictionary.services.categories.doppler.split('(')[0].trim(),
    dictionary.services.categories.xray.split('(')[0].trim(),
    dictionary.services.categories.ctscan.split('(')[0].trim(),
    dictionary.services.categories.fetal.split('(')[0].trim(),
    dictionary.services.categories.cardiac.split('(')[0].trim(),
    dictionary.services.categories.ecg.split('(')[0].trim(),
    dictionary.services.categories.fibroscan.split('(')[0].trim(),
    dictionary.services.categories.lab.split('(')[0].trim()
  ];
  
  const maq = settings?.centres?.maqsudan || {};
  const rama = settings?.centres?.ramamandi || {};
  
  const maqPhone = maq.phone || '+91 6283930230';
  const maqPhoneClean = maqPhone.replace(/[^+0-9]/g, '');
  const maqAddress = maq.address || dictionary.centres.maqsudan.address;
  const maqHours = maq.hours || 'Monday – Saturday, 9:00 AM – 7:30 PM';
  
  const ramaPhone = rama.phone || '+91 6283930231';
  const ramaPhoneClean = ramaPhone.replace(/[^+0-9]/g, '');
  const ramaAddress = rama.address || dictionary.centres.ramamandi.address;
  const ramaHours = rama.hours || 'Monday – Saturday, 9:00 AM – 7:30 PM';

  return (
    <>
      <section className="section-padding" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          {/* Header Section */}
          <div className={styles.header}>
            <span className="eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: '1rem' }}>
              {dictionary.nav.centres.toUpperCase()}
            </span>
            <h1 className="h1-hero" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem' }}>
              {dictionary.centres.title.split(',')[0]}<br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold-accent)' }}>{dictionary.centres.title.split(',')[1]}</span>
            </h1>
            <p className="text-body-large" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
              {dictionary.centres.subtitle}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button href={`/${locale}/appointment`} variant="primary">
                {dictionary.nav.appointment} &rarr;
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
                  {dictionary.centres.maqsudan.name}
                </h2>
                
                <div className={styles.infoList}>
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>{dictionary.centres.labels.address.toUpperCase()}</span>
                    <p className={styles.infoText}>
                      {maqAddress.split(', ').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                  </div>
                  
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>{dictionary.centres.labels.phone.toUpperCase()}</span>
                    <p className={styles.infoText}>
                      {maqPhone}
                    </p>
                  </div>

                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>{dictionary.centres.labels.hours.toUpperCase()}</span>
                    <p className={styles.infoText}>
                      {maqHours.split(', ').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <a href={`tel:${maqPhoneClean}`} className={styles.actionBtn}>
                    {dictionary.centres.labels.call.split(' ')[0]}
                  </a>
                  <a href={`https://wa.me/91${maqPhoneClean.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                    {dictionary.centres.labels.whatsapp}
                  </a>
                  <a 
                    href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Maqsudan+Jalandhar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${styles.actionBtn} ${styles.primaryAction}`}
                  >
                    {dictionary.centres.labels.directions} <ArrowRight size={14} className={styles.arrow} />
                  </a>
                </div>
              </div>

              <div className={styles.servicesSection}>
                <span className={styles.infoLabel} style={{ marginBottom: '1rem', display: 'block' }}>{dictionary.centres.labels.servicesAvailable.toUpperCase()}</span>
                <div className={styles.serviceChips}>
                  {servicesList.map(service => (
                    <span key={service} className={styles.serviceChip}>{service}</span>
                  ))}
                </div>
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
                  {dictionary.centres.ramamandi.name}
                </h2>
                
                <div className={styles.infoList}>
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>{dictionary.centres.labels.address.toUpperCase()}</span>
                    <p className={styles.infoText}>
                      {ramaAddress.split(', ').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                  </div>
                  
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>{dictionary.centres.labels.phone.toUpperCase()}</span>
                    <p className={styles.infoText}>
                      {ramaPhone}
                    </p>
                  </div>

                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>{dictionary.centres.labels.hours.toUpperCase()}</span>
                    <p className={styles.infoText}>
                      {ramaHours.split(', ').map((line: string, i: number) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <a href={`tel:${ramaPhoneClean}`} className={styles.actionBtn}>
                    {dictionary.centres.labels.call.split(' ')[0]}
                  </a>
                  <a href={`https://wa.me/91${ramaPhoneClean.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                    {dictionary.centres.labels.whatsapp}
                  </a>
                  <a 
                    href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Rama+Mandi+Jalandhar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${styles.actionBtn} ${styles.primaryAction}`}
                  >
                    {dictionary.centres.labels.directions} <ArrowRight size={14} className={styles.arrow} />
                  </a>
                </div>
              </div>

              <div className={styles.servicesSection}>
                <span className={styles.infoLabel} style={{ marginBottom: '1rem', display: 'block' }}>{dictionary.centres.labels.servicesAvailable.toUpperCase()}</span>
                <div className={styles.serviceChips}>
                  {servicesList.map(service => (
                    <span key={service} className={styles.serviceChip}>{service}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section-padding bg-secondary">
        <div className="container">
          
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
                {dictionary.centres.labels.directions} <ArrowRight size={16} className={styles.arrow} />
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
                {dictionary.centres.labels.directions} <ArrowRight size={16} className={styles.arrow} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-green-primary)', color: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="h1-hero" style={{ color: 'var(--color-white)', marginBottom: '2.5rem' }}>{dictionary.appointment.subtitle}</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Button href={`/${locale}/appointment`} variant="primary" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-green-primary)' }}>
                {dictionary.nav.appointment} &rarr;
              </Button>
              <Button href={`/${locale}/contact`} variant="outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-white)' }}>
                {dictionary.nav.contact}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
