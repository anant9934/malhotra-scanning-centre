"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import styles from './Header.module.css';
import { Button } from '../ui/Button';

export const Header = ({ settings }: { settings?: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Our Centres', href: '/centres' },
    { label: 'Radiologist', href: '/radiologist' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logoWrapper}>
          <Image src="/logo.png" alt="Malhotra Scanning Centre" width={180} height={50} className={styles.logoImg} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <div className={styles.contactBlock}>
            <div className={styles.phoneCircle}>
              <Phone size={16} style={{ color: 'var(--color-gold-accent)' }} />
            </div>
            <div className={styles.contactText}>
              <a href={`tel:+91${(settings?.site?.phone || '99990-62109').replace(/[^0-9]/g, '')}`} className={styles.phoneNum}>{settings?.site?.phone || '99990-62109'}</a>
              <span className={styles.workingHours}>{settings?.site?.openHours || 'Mon - Sun, 8 AM - 8 PM'}</span>
            </div>
          </div>
          
          <div className={styles.bookBtnWrapper}>
            <Button href="/appointment" variant="primary" size="md">
              Book Appointment <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.mobileNavItem}>
                <Link 
                  href={link.href}
                  className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className={styles.mobileDrawerActions}>
            <Button href="/appointment" variant="primary" fullWidth>
              Book Appointment
            </Button>
            <Button href="tel:+919999062109" variant="outline" fullWidth style={{ marginTop: '1rem' }}>
              Call 99990-62109
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
