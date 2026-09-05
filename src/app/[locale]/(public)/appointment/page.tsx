"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { submitAppointment } from '@/app/actions/appointment';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import styles from './page.module.css';
import { useI18n } from '@/components/providers/I18nProvider';

function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get('investigation') || searchParams.get('service') || '';
  const { locale, dictionary } = useI18n();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitAppointment(formData, locale);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || dictionary.appointment.form.error);
    }
  };

  if (isSuccess) {
    return (
      <div className={`section-padding ${styles.appointmentPage}`}>
        <div className="container">
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h1 className="h2-section" style={{ marginBottom: '1rem' }}>{dictionary.appointment.form.success.split('.')[0]}</h1>
            <p className="text-body-large" style={{ marginBottom: '2rem' }}>
              {dictionary.appointment.form.success.split('. ').slice(1).join('. ')}
            </p>
            <Button href={`/${locale}`} variant="outline">
              &larr; {dictionary.nav.home}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`section-padding ${styles.appointmentPage}`}>
      <div className={`container ${styles.formContainer}`}>
        <div className={styles.formHeader}>
          <span className="eyebrow">{dictionary.nav.appointment.toUpperCase()}</span>
          <h1 className="h1-hero">{dictionary.appointment.title}</h1>
          <p className="text-body" style={{ marginTop: '1rem' }}>
            {dictionary.appointment.subtitle}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">{dictionary.appointment.form.patientName} *</label>
              <input type="text" id="name" name="patientName" className="form-input" required placeholder={dictionary.appointment.form.patientName} />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">{dictionary.appointment.form.phone} *</label>
              <input type="tel" id="phone" name="phoneNumber" className="form-input" required placeholder="10-digit" pattern="[0-9]{10}" title={dictionary.appointment.validation.phoneExact} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="investigation" className="form-label">{dictionary.appointment.form.investigation} *</label>
            <input 
              type="text" 
              id="investigation" 
              name="investigation" 
              className="form-input" 
              required 
              defaultValue={prefilledService}
              placeholder="Ultrasound, X-Ray, etc."
            />
          </div>

          <div className={styles.formGrid}>
            <div className="form-group">
              <label htmlFor="centre" className="form-label">{dictionary.appointment.form.centre}</label>
              <select id="centre" name="preferredCentre" className="form-input" defaultValue="Maqsudan">
                <option value="Maqsudan">{dictionary.centres.maqsudan.name}</option>
                <option value="Rama Mandi">{dictionary.centres.ramamandi.name}</option>
                <option value="Any">Any / ਕੋਈ ਵੀ</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="date" className="form-label">{dictionary.appointment.form.date} *</label>
              <input type="date" id="date" name="preferredDate" className="form-input" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="time" className="form-label">{dictionary.appointment.form.time}</label>
            <select id="time" name="preferredTime" className="form-input" defaultValue="Any">
              <option value="Morning">Morning / ਸਵੇਰ (9:00 AM - 1:00 PM)</option>
              <option value="Evening">Evening / ਸ਼ਾਮ (4:00 PM - 8:00 PM)</option>
              <option value="Any">Any Available Time / ਕੋਈ ਵੀ ਸਮਾਂ</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">{dictionary.appointment.form.message}</label>
            <textarea id="message" name="message" className="form-input" rows={4} placeholder="..."></textarea>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
              {isSubmitting ? dictionary.appointment.form.submitting : dictionary.appointment.form.submit} &rarr;
            </Button>
            <p className={styles.disclaimer}>
              {dictionary.appointment.form.disclaimer}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  const { dictionary } = useI18n();
  return (
    <Suspense fallback={<div className="section-padding text-center">{dictionary?.common?.loading || 'Loading...'}</div>}>
      <AppointmentForm />
    </Suspense>
  );
}
