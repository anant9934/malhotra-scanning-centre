import React from 'react';
import { Button } from '@/components/ui/Button';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="bg-primary" style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow">{dictionary.nav.contact.toUpperCase()}</span>
            <h1 className="h1-hero">{dictionary.contact.title}</h1>
            <p className="text-body-large" style={{ marginTop: '1rem' }}>
              {dictionary.contact.subtitle}
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ backgroundColor: 'var(--color-white)', padding: '3rem 2rem', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
              <h3 className="h3-card" style={{ marginBottom: '1rem' }}>{dictionary.centres.labels.phone}</h3>
              <p className="text-body" style={{ marginBottom: '2rem' }}>
                Reach out to us directly for immediate assistance.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Button href="tel:+916283930230" variant="outline" fullWidth>{dictionary.contact.info.call} 6283930230</Button>
                <Button href="https://wa.me/916283930230" external variant="outline" fullWidth>{dictionary.centres.labels.whatsapp}</Button>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'var(--color-white)', padding: '3rem 2rem', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
              <h3 className="h3-card" style={{ marginBottom: '1rem' }}>{dictionary.contact.info.email}</h3>
              <p className="text-body" style={{ marginBottom: '2rem' }}>
                Send us an email for general queries or reports.
              </p>
              <Button href="mailto:malhotrascanningcentre@gmail.com" variant="outline" fullWidth>{dictionary.contact.info.email}</Button>
            </div>
            
            <div style={{ backgroundColor: 'var(--color-green-dark)', color: 'var(--color-white)', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center' }}>
              <h3 className="h3-card" style={{ color: 'var(--color-white)', marginBottom: '1rem' }}>{dictionary.appointment.title}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '2rem' }}>
                Schedule your visit online through our secure portal.
              </p>
              <Button href={`/${locale}/appointment`} variant="secondary" fullWidth>{dictionary.nav.appointment}</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
