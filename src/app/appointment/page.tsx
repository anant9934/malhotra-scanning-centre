"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { submitAppointment } from '@/app/actions/appointment';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import styles from './page.module.css';

function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get('investigation') || searchParams.get('service') || '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitAppointment(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "An error occurred");
    }
  };

  if (isSuccess) {
    return (
      <div className={`section-padding ${styles.appointmentPage}`}>
        <div className="container">
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h1 className="h2-section" style={{ marginBottom: '1rem' }}>Request Received</h1>
            <p className="text-body-large" style={{ marginBottom: '2rem' }}>
              Your appointment request has been received.<br />
              Our team will contact you shortly for confirmation.
            </p>
            <Button href="/" variant="outline">
              Return to Homepage &rarr;
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
          <span className="eyebrow">Book an Appointment</span>
          <h1 className="h1-hero">Schedule your visit</h1>
          <p className="text-body" style={{ marginTop: '1rem' }}>
            Please fill out the form below to request an appointment. Our team will call you to confirm the exact time and preparation details.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Patient Name *</label>
              <input type="text" id="name" name="patientName" className="form-input" required placeholder="Enter full name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number *</label>
              <input type="tel" id="phone" name="phoneNumber" className="form-input" required placeholder="10-digit mobile number" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="investigation" className="form-label">Investigation Required *</label>
            <input 
              type="text" 
              id="investigation" 
              name="investigation" 
              className="form-input" 
              required 
              defaultValue={prefilledService}
              placeholder="E.g., Ultrasound Abdomen & Pelvis"
            />
          </div>

          <div className={styles.formGrid}>
            <div className="form-group">
              <label htmlFor="centre" className="form-label">Preferred Centre</label>
              <select id="centre" name="preferredCentre" className="form-input" defaultValue="Maqsudan">
                <option value="Maqsudan">Maqsudan Centre</option>
                <option value="Rama Mandi">Rama Mandi Centre</option>
                <option value="Any">No Preference / Any</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="date" className="form-label">Preferred Date *</label>
              <input type="date" id="date" name="preferredDate" className="form-input" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="time" className="form-label">Preferred Time (Morning/Evening)</label>
            <select id="time" name="preferredTime" className="form-input" defaultValue="Any">
              <option value="Morning">Morning (9:00 AM - 1:00 PM)</option>
              <option value="Evening">Evening (4:00 PM - 8:00 PM)</option>
              <option value="Any">Any Available Time</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Additional Message or Symptoms</label>
            <textarea id="message" name="message" className="form-input" rows={4} placeholder="Briefly describe your symptoms or doctor's advice"></textarea>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Request Appointment →'}
            </Button>
            <p className={styles.disclaimer}>
              This is an appointment request. Your booking is only confirmed after our staff contacts you.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div className="section-padding text-center">Loading booking form...</div>}>
      <AppointmentForm />
    </Suspense>
  );
}
