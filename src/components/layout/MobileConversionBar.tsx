import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import styles from './MobileConversionBar.module.css';

export const MobileConversionBar = ({ settings }: { settings?: any }) => {
  const phoneVal = settings?.site?.phone || '6283930230';
  const phoneClean = phoneVal.replace(/[^0-9]/g, '');

  return (
    <div className={styles.conversionBar}>
      <a href={`tel:+91${phoneClean}`} className={styles.actionItem}>
        <Phone size={20} />
        <span>Call</span>
      </a>
      
      <a 
        href={`https://wa.me/91${phoneClean}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.actionItem}
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
      
      <Link href="/appointment" className={`${styles.actionItem} ${styles.primary}`}>
        <Calendar size={20} />
        <span>Book</span>
      </Link>
    </div>
  );
};
