import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = ({ settings }: { settings?: any }) => {
  const currentYear = new Date().getFullYear();
  const phoneVal = settings?.site?.phone || '99990-62109';
  const phoneClean = phoneVal.replace(/[^0-9]/g, '');

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerTop}`}>
        <div className={styles.logoCol}>
          <Image src="/logo.png" alt="Malhotra Scanning Centre" width={180} height={50} className={styles.logoImg} />
        </div>
        
        <div className={styles.linksCol}>
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/centres">Our Centres</Link>
          <Link href="/radiologist">Radiologist</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.socialCol}>
          <a href={`https://wa.me/91${phoneClean}`} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
            <MessageCircle size={18} />
          </a>
          <a href={`tel:+91${phoneClean}`} className={styles.socialIcon} aria-label="Phone">
            <Phone size={18} />
          </a>
          <a href="https://maps.google.com/?q=Malhotra+Scanning+Centre+Maqsudan+Jalandhar" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Location">
            <MapPin size={18} />
          </a>
          <a href="https://www.instagram.com/malhotrascanningcentre/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomContainer}`}>
          <p className={styles.copyrightText}>&copy; {currentYear} Malhotra Scanning Centre. All rights reserved.</p>
          <p className={styles.designedBy}>Designed for a healthier tomorrow.</p>
        </div>
      </div>
    </footer>
  );
};
