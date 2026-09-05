import React from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export default async function RadiologistPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="bg-primary">
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <Image 
                src="/images/dr-malhotra.png" 
                alt={dictionary.radiologist.title} 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
            
            <div>
              <span className="eyebrow">{dictionary.radiologist.subtitle}</span>
              <h1 className="h1-hero" style={{ marginBottom: '0.5rem' }}>{dictionary.radiologist.title}</h1>
              <p className="h3-card" style={{ color: 'var(--color-gold-accent)', marginBottom: '2rem' }}>
                {dictionary.radiologist.credentials}
              </p>
              
              <div className="text-body-large" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                <p>
                  {dictionary.radiologist.biography}
                </p>
                {/* Depending on locale, we might omit the rest or provide default EN text, 
                    but since dictionary has the full translated short bio, we just use that */}
                {locale === 'en' && (
                  <>
                    <p>
                      His specialty interests include colour dopplers and ultrasound scans like echocardiography, carotid doppler, vascular studies, arterial & venous doppler, comprehensive FWB (Fetal Well Being), sleep studies, VEP/BAER and botox therapy.
                    </p>
                    <p>
                      Dr. Malhotra completed his MBBS from Maulana Azad Medical College, New Delhi and his M.D in Radiodiagnosis from M.U.H.S. Dr. Vasantrao Pawar Medical College, Nasik, Maharashtra.
                    </p>
                    <p>
                      With a commitment to the highest clinical standards, his practice is grounded in the philosophy that "Perfection Is The Definition"—a standard upheld in every report generated.
                    </p>
                  </>
                )}
              </div>
              
              <Button href={`/${locale}/appointment`} variant="primary">{dictionary.radiologist.cta}</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
