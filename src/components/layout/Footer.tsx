"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';
import { useI18n } from '@/components/providers/I18nProvider';

export const Footer = ({ settings }: { settings?: any }) => {
  const currentYear = new Date().getFullYear();
  const phoneVal = settings?.site?.phone || '99990-62109';
  const phoneClean = phoneVal.replace(/[^0-9]/g, '');
  const { locale, dictionary } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerTop}`}>
        <div className={styles.logoCol}>
          <Image src="/logo.png" alt="Malhotra Scanning Centre" width={180} height={50} className={styles.logoImg} />
          <p style={{ marginTop: '1rem', color: 'var(--color-gray-dark)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            {dictionary.footer.about}
          </p>
        </div>
        
        <div className={styles.linksCol}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-gold-accent)' }}>{dictionary.footer.quickLinks}</h4>
          <Link href={`/${locale}`}>{dictionary.nav.home}</Link>
          <Link href={`/${locale}/services`}>{dictionary.nav.services}</Link>
          <Link href={`/${locale}/centres`}>{dictionary.nav.centres}</Link>
          <Link href={`/${locale}/radiologist`}>{dictionary.nav.radiologist}</Link>
          <Link href={`/${locale}/contact`}>{dictionary.nav.contact}</Link>
        </div>

        <div className={styles.socialCol}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-gold-accent)' }}>{dictionary.footer.contactInfo}</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={`https://wa.me/91${phoneClean}`} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
            <a href={`tel:+91${phoneClean}`} className={styles.socialIcon} aria-label="Phone">
              <Phone size={18} />
            </a>
            <a href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Maqsudan+Jalandhar" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Location">
              <MapPin size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomContainer}`}>
          <p className={styles.copyrightText}>
            {dictionary.footer.legal.replace('2024', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};
