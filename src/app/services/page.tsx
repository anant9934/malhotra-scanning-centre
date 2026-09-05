import React from 'react';
import Link from 'next/link';
import { Activity, Bone, Brain, Heart, Stethoscope, ArrowRight } from 'lucide-react';

import { services } from '@/data/services';
import styles from './services.module.css';

export default function ServicesPage() {
  return (
    <div className="bg-secondary" style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow">Our Services</span>
            <h1 className="h1-hero">Comprehensive <span className="text-italic-gold">Diagnostics</span></h1>
            <p className="text-body-large" style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
              We offer a complete range of diagnostic imaging and laboratory services under one roof.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, index) => (
              <Link 
                href={`/services/${service.id}`} 
                key={service.id}
                className={styles.serviceCard}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
                    0{index + 1}
                  </span>
                  <service.icon size={24} style={{ color: 'var(--color-gold-accent)' }} />
                </div>
                <h3 className="h3-card">{service.title}</h3>
                <p className="text-body" style={{ marginTop: '0.75rem', marginBottom: '2rem', flexGrow: 1 }}>
                  {service.description}
                </p>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-green-primary)', display: 'flex', alignItems: 'center' }}>
                  View details <ArrowRight size={16} className={styles.arrow} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
