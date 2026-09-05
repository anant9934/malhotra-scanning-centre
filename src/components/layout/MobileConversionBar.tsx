"use client";

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import styles from './MobileConversionBar.module.css';
import { useI18n } from '@/components/providers/I18nProvider';

export const MobileConversionBar = ({ settings }: { settings?: any }) => {
  const phoneVal = settings?.site?.phone || '6283930230';
  const phoneClean = phoneVal.replace(/[^0-9]/g, '');
  const { locale, dictionary } = useI18n();

  return (
    <div className={styles.conversionBar}>
      <a href={`tel:+91${phoneClean}`} className={styles.actionItem}>
        <Phone size={20} />
        <span>{dictionary.centres.labels.call.split(' ')[0]}</span>
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
      
      <Link href={`/${locale}/appointment`} className={`${styles.actionItem} ${styles.primary}`}>
        <Calendar size={20} />
        <span>{dictionary.nav.appointment.split(' ')[0]}</span>
      </Link>
    </div>
  );
};
