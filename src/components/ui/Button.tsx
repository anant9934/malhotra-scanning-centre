import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, external, fullWidth, children, className = '', ...props }, ref) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      className,
    ].filter(Boolean).join(' ');

    if (href) {
      if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return (
          <a
            href={href}
            className={classNames}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classNames} ref={ref as any} {...props as any}>
          {children}
        </Link>
      );
    }

    return (
      <button className={classNames} ref={ref as React.ForwardedRef<HTMLButtonElement>} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
