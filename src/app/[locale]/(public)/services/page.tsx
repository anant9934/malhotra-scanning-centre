import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { services } from '@/data/services';
import styles from './services.module.css';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  // Helper to get localized title if available, fallback to default
  const getServiceTitle = (id: string, defaultTitle: string) => {
    if (id === 'ultrasound') return dictionary.services.categories.ultrasound;
    if (id === 'colour-doppler') return dictionary.services.categories.doppler;
    if (id === 'digital-xray') return dictionary.services.categories.xray;
    if (id === 'ct-scan') return dictionary.services.categories.ctscan;
    if (id === 'fetal-imaging') return dictionary.services.categories.fetal;
    if (id === 'cardiac-diagnostics') return dictionary.services.categories.cardiac;
    if (id === 'ecg-eeg') return dictionary.services.categories.ecg;
    if (id === 'fibroscan') return dictionary.services.categories.fibroscan;
    if (id === 'laboratory') return dictionary.services.categories.lab;
    return defaultTitle;
  };

  return (
    <div className="bg-secondary" style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow">{dictionary.nav.services.toUpperCase()}</span>
            <h1 className="h1-hero">{dictionary.services.title.split(' ')[0]} <span className="text-italic-gold">{dictionary.services.title.split(' ').slice(1).join(' ')}</span></h1>
            <p className="text-body-large" style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
              {dictionary.services.subtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, index) => {
              const detailDict = (dictionary as any).serviceDetails?.services?.[service.id] || {};
              return (
                <Link 
                  href={`/${locale}/services/${service.id}`} 
                  key={service.id}
                  className={styles.serviceCard}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
                      0{index + 1}
                    </span>
                    <service.icon size={24} style={{ color: 'var(--color-gold-accent)' }} />
                  </div>
                  <h3 className="h3-card">{getServiceTitle(service.id, service.title)}</h3>
                  <p className="text-body" style={{ marginTop: '0.75rem', marginBottom: '2rem', flexGrow: 1 }}>
                    {detailDict.description || service.description}
                  </p>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-green-primary)', display: 'flex', alignItems: 'center' }}>
                    {dictionary.common.viewDetails} <ArrowRight size={16} className={styles.arrow} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
