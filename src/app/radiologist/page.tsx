import React from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function RadiologistPage() {
  return (
    <div className="bg-primary">
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <Image 
                src="/images/dr-malhotra.png" 
                alt="Dr. Rajat Malhotra" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
            
            <div>
              <span className="eyebrow">Consultant Radiologist</span>
              <h1 className="h1-hero" style={{ marginBottom: '0.5rem' }}>Dr. Rajat Malhotra</h1>
              <p className="h3-card" style={{ color: 'var(--color-gold-accent)', marginBottom: '2rem' }}>
                MBBS, MD Radiodiagnosis
              </p>
              
              <div className="text-body-large" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                <p>
                  Dr. Rajat Malhotra is a well-known Radiologist with 11+ years of experience in Radiodiagnosis. He is known for his attention to accurate diagnosis and treating patients empathetically.
                </p>
                <p>
                  His specialty interests include colour dopplers and ultrasound scans like echocardiography, carotid doppler, vascular studies, arterial & venous doppler, comprehensive FWB (Fetal Well Being), sleep studies, VEP/BAER and botox therapy.
                </p>
                <p>
                  Dr. Malhotra completed his MBBS from Maulana Azad Medical College, New Delhi and his M.D in Radiodiagnosis from M.U.H.S. Dr. Vasantrao Pawar Medical College, Nasik, Maharashtra.
                </p>
                <p>
                  With a commitment to the highest clinical standards, his practice is grounded in the philosophy that "Perfection Is The Definition"—a standard upheld in every report generated.
                </p>
              </div>
              
              <Button href="/appointment" variant="primary">Book an Appointment</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
