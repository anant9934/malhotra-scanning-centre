import React from 'react';
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "@/app/[locale]/(public)/page.module.css";
import { Button } from "@/components/ui/Button";
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface RadiologistSectionProps {
  locale: Locale;
}

export async function RadiologistSection({ locale }: RadiologistSectionProps) {
  const dictionary = await getDictionary(locale);

  return (
    <section className={`section-padding bg-secondary`}>
      <div className={`container ${styles.radiologistContainer}`}>
        <div className={styles.radiologistImageWrapper}>
          <Image 
            src="/images/dr-malhotra.png" 
            alt={dictionary.radiologist.title} 
            fill 
            className={styles.docImage}
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={true}
          />
        </div>
        <div className={styles.signature}>{dictionary.radiologist.title}</div>
        <div className={styles.radiologistContent}>
          <span className="eyebrow">{dictionary.nav.radiologist.toUpperCase()}</span>
          <h2 className="h2-section" style={{ marginBottom: '0.25rem' }}>{dictionary.radiologist.title}</h2>
          <p className={styles.credentials}>{dictionary.radiologist.credentials}</p>
          <div className={styles.cardLine} style={{margin: '1.5rem 0'}}></div>
          <p className={`text-body ${styles.bio}`}>
            {dictionary.radiologist.biography}
          </p>
          <Button href={`/${locale}/radiologist`} variant="outline" size="md" style={{marginTop: '2rem'}}>
            {dictionary.common.readMore} <ArrowRight size={14} style={{marginLeft: '0.25rem'}} />
          </Button>
        </div>
        <div className={styles.quoteBlock}>
          <h3 className={styles.quoteText}>"Where Perfection Is The Definition."</h3>
          <div className={styles.cardLine} style={{margin: '1.5rem 0', borderColor: 'var(--color-gold-accent)'}}></div>
          <span className={styles.quoteAuthor}>{dictionary.radiologist.title.toUpperCase()}</span>
        </div>
      </div>
    </section>
  );
}
