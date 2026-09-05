import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Clock, FileText, Activity, CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getServiceBySlug, services } from '@/data/services';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) {
    return {
      title: 'Service Not Found | Malhotra Scanning Centre'
    };
  }
  return {
    title: `${service.title} in Jalandhar | Malhotra Scanning Centre`,
    description: `Explore ${service.title.toLowerCase()} investigations available at Malhotra Scanning Centre in Jalandhar. ${service.description}`,
    openGraph: {
      title: `${service.title} in Jalandhar | Malhotra Scanning Centre`,
      description: service.description,
    }
  };
}

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.id,
  }));
}

import { getSettings } from '@/app/actions/settings';

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.data : {};
  
  const getDynamicPrice = (invName: string, defaultPrice: string) => {
    return settings?.prices?.[service.id]?.[invName] || defaultPrice;
  };
  
  const maqPhone = settings?.centres?.maqsudan?.phone || '+91 6283930230';
  const ramaPhone = settings?.centres?.ramamandi?.phone || '+91 6283930231';

  return (
    <div className="bg-primary" style={{ minHeight: 'calc(100vh - var(--header-height))', paddingBottom: '4rem' }}>
      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Top Header */}
            <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-text-secondary)', marginBottom: '3rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> All Services
            </Link>
            
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>OUR SERVICES</span>
            <h1 className="h1-hero" style={{ marginBottom: '1.5rem', fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>{service.title}</h1>
            <p className="text-body-large" style={{ marginBottom: '4rem', color: 'var(--color-text-primary)' }}>
              {service.description}
            </p>
            
            {/* AT A GLANCE */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>At A Glance</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    <Clock size={16} /> <span style={{ fontSize: '0.875rem' }}>Approx. duration</span>
                  </div>
                  <div style={{ fontWeight: 500 }}>{service.duration}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    <Activity size={16} /> <span style={{ fontSize: '0.875rem' }}>Preparation</span>
                  </div>
                  <div style={{ fontWeight: 500 }}>Varies by test</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    <FileText size={16} /> <span style={{ fontSize: '0.875rem' }}>Report</span>
                  </div>
                  <div style={{ fontWeight: 500 }}>{service.report}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    <CreditCard size={16} /> <span style={{ fontSize: '0.875rem' }}>Price</span>
                  </div>
                  <div style={{ fontWeight: 500 }}>Indicative market range*</div>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                *Prices shown are approximate market ranges for reference. Actual investigation charges may vary by centre, protocol, contrast/material requirements and reporting. Please contact Malhotra Scanning Centre for current pricing.
              </p>
            </div>
            
            {/* AVAILABLE INVESTIGATIONS */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Available Investigations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {service.investigations.map((inv, index) => (
                  <div key={index} style={{ backgroundColor: 'var(--color-white)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 250px' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-green-primary)', marginBottom: '0.5rem' }}>{inv.name}</h4>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        Indicative market range: <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{getDynamicPrice(inv.name, inv.price)}</span>
                      </div>
                    </div>
                    <Button href={`/appointment?investigation=${encodeURIComponent(inv.name)}`} variant="outline" size="sm" style={{ flexShrink: 0 }}>
                      Book <ChevronRight size={14} style={{ marginLeft: '0.25rem' }} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* WHEN IT MAY BE ADVISED */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>When It May Be Advised</h3>
              <p className="text-body" style={{ lineHeight: 1.8 }}>
                {service.whenAdvised}
              </p>
            </div>
            
            {/* PREPARATION */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Before Your Visit</h3>
              <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
                <p className="text-body" style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                  {service.preparation}
                </p>
                <p className="text-body" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-green-primary)' }}>
                  Preparation may vary. Please confirm with the centre when booking.
                </p>
              </div>
            </div>
            
            {/* NEED HELP / CTA */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Need Help?</h3>
              <div style={{ backgroundColor: 'var(--color-green-primary)', color: 'white', padding: '3rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Not sure which investigation you need?</h4>
                <p style={{ opacity: 0.9, marginBottom: '2rem', lineHeight: 1.6 }}>
                  Bring your prescription or referral and contact our centre. Our expert team will guide you to the right diagnostic service.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button href={`tel:${maqPhone.replace(/[^+0-9]/g, '')}`} variant="outline" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                    Call Maqsudan
                  </Button>
                  <Button href={`tel:${ramaPhone.replace(/[^+0-9]/g, '')}`} variant="outline" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                    Call Rama Mandi
                  </Button>
                  <Button href="/appointment" variant="primary" style={{ backgroundColor: 'white', color: 'var(--color-green-primary)' }}>
                    Book Appointment &rarr;
                  </Button>
                </div>
              </div>
            </div>
            
            {/* WHY MSC */}
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Why Choose MSC</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Expert Radiological Care</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Experienced radiologists ensuring precise and accurate reporting.</p>
                </div>
                <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Modern Diagnostic Imaging</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>State-of-the-art equipment for high-resolution clarity.</p>
                </div>
                <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Patient-Focused Experience</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Compassionate care with a commitment to patient comfort.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
