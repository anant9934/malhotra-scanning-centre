import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="bg-secondary">
      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="eyebrow">About Us</span>
            <h1 className="h1-hero" style={{ marginBottom: '2rem' }}>
              Committed to <span className="text-italic-gold">precision</span> in diagnostics
            </h1>
            
            <div style={{ marginBottom: '3rem', position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden' }}>
              <Image 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt="Malhotra Scanning Centre facility"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            <div className="text-body-large" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--color-text-primary)' }}>
              <p>
                Malhotra Scanning Centre is a premier diagnostic and imaging facility located in Jalandhar, Punjab. With a guiding philosophy of "Where Perfection Is The Definition", we are dedicated to providing the highest standard of radiological care to our patients.
              </p>
              <p>
                Led by Dr. Rajat Malhotra, our centre combines state-of-the-art imaging technology with expert medical interpretation. We understand that accurate diagnostics are the critical first step in effective medical treatment.
              </p>
              <p>
                We currently operate out of two convenient locations in Jalandhar—Maqsudan and Rama Mandi—ensuring that premium diagnostic care is accessible when you need it most. Our patient-first approach means we prioritize your comfort, privacy, and timely access to reports.
              </p>
            </div>
            
            <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button href="/centres" variant="primary">View Our Locations</Button>
              <Button href="/radiologist" variant="outline">Meet the Radiologist</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
