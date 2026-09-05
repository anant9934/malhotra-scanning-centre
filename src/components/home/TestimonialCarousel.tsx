"use client";

import React, { useEffect, useState } from 'react';
import styles from './TestimonialCarousel.module.css';
import { testimonials } from '@/data/testimonials';

export const TestimonialCarousel = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Duplicate dataset to ensure seamless infinite scrolling loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  if (!mounted) {
    return <div className={styles.carouselContainerPlaceholder}></div>;
  }

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselTrack}>
        {duplicatedTestimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <div className={styles.rating}>
              {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
            </div>
            <p className={styles.reviewText}>"{testimonial.text}"</p>
            <div className={styles.reviewerInfo}>
              <div className={styles.avatar}>
                {testimonial.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.reviewerMeta}>
                <span className={styles.reviewerName}>{testimonial.name}</span>
                <span className={styles.sourceLabel}>Google review</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
