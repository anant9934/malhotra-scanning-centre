/**
 * Core domain types for the Malhotra Scanning Centre website.
 * Centralizing these interfaces ensures high cohesion across UI components and API layers.
 */

export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  investigation: string;
  preferredCentre: string;
  preferredDate: string;
  preferredTime: string;
  message: string | null;
  status: string; // 'Pending' | 'Confirmed' | 'Cancelled'
  createdAt: Date;
}

export interface Investigation {
  name: string;
  price: string;
  isSpecial?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Lucide-react icon component (any type to bypass ReactNode type mismatches) */
  icon: any; 
  duration: string;
  report: string;
  priceSummary: string;
  preparation: string;
  whenAdvised: string;
  investigations: Investigation[];
}

export interface CentreInfo {
  phone?: string;
  hours?: string;
  address?: string;
}

export interface SiteSettings {
  phone?: string;
  tagline?: string;
  openHours?: string;
}

export interface AdminSettings {
  prices?: Record<string, Record<string, string>>;
  centres?: Record<string, CentreInfo>;
  site?: SiteSettings;
}
