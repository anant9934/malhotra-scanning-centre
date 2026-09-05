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

import { getDictionary } from '@/i18n/dictionaries';
import { Locale } from '@/i18n/config';

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const dictionary = await getDictionary(locale);
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }
  
  const dictDetails = (dictionary as any).serviceDetails?.services?.[service.id] || {};
  const dictUI = (dictionary as any).serviceDetails?.serviceUI || {};

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
            <Link href={`/${locale}/services`} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-text-secondary)', marginBottom: '3rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> {dictUI.allServices}
            </Link>
            
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>{dictUI.ourServices.toUpperCase()}</span>
            <h1 className="h1-hero" style={{ marginBottom: '1.5rem', fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>{dictDetails.title || service.title}</h1>
            <p className="text-body-large" style={{ marginBottom: '4rem', color: 'var(--color-text-primary)' }}>
              {dictDetails.description || service.description}
            </p>
            
            {/* AT A GLANCE */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>{dictUI.atAGlance}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    <Clock size={16} /> <span style={{ fontSize: '0.875rem' }}>{dictUI.duration}</span>
                  </div>
                  <div style={{ fontWeight: 500 }}>{dictDetails.duration || service.duration}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    <Activity size={16} /> <span style={{ fontSize: '0.875rem' }}>{dictUI.preparation}</span>
                  </div>
                  <div style={{ fontWeight: 500 }}>{dictUI.variesByTest}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    <FileText size={16} /> <span style={{ fontSize: '0.875rem' }}>{dictUI.report}</span>
                  </div>
                  <div style={{ fontWeight: 500 }}>{dictDetails.report || service.report}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    <CreditCard size={16} /> <span style={{ fontSize: '0.875rem' }}>{dictUI.price}</span>
                  </div>
                  <div style={{ fontWeight: 500 }}>{dictUI.indicativeRange}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                {dictUI.priceDisclaimer}
              </p>
            </div>
            
            {/* AVAILABLE INVESTIGATIONS */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>{dictUI.availableInvestigations}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {service.investigations.map((inv, index) => (
                  <div key={index} style={{ backgroundColor: 'var(--color-white)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 250px' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-green-primary)', marginBottom: '0.5rem' }}>{inv.name}</h4>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        {dictUI.indicativeRange}: <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{getDynamicPrice(inv.name, inv.price)}</span>
                      </div>
                    </div>
                    <Button href={`/${locale}/appointment?investigation=${encodeURIComponent(inv.name)}`} variant="outline" size="sm" style={{ flexShrink: 0 }}>
                      {dictUI.bookAppointment} <ChevronRight size={14} style={{ marginLeft: '0.25rem' }} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* WHEN IT MAY BE ADVISED */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>{dictUI.whenAdvised}</h3>
              <p className="text-body" style={{ lineHeight: 1.8 }}>
                {dictDetails.whenAdvised || service.whenAdvised}
              </p>
            </div>
            
            {/* PREPARATION */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>{dictUI.beforeVisit}</h3>
              <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
                <p className="text-body" style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                  {dictDetails.preparation || service.preparation}
                </p>
                <p className="text-body" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-green-primary)' }}>
                  {dictUI.preparationVaries}
                </p>
              </div>
            </div>
            
            {/* NEED HELP / CTA */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>{dictUI.needHelp}</h3>
              <div style={{ backgroundColor: 'var(--color-green-primary)', color: 'white', padding: '3rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{dictUI.notSure}</h4>
                <p style={{ opacity: 0.9, marginBottom: '2rem', lineHeight: 1.6 }}>
                  {dictUI.bringPrescription}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button href={`tel:${maqPhone.replace(/[^+0-9]/g, '')}`} variant="outline" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                    {dictUI.callMaqsudan}
                  </Button>
                  <Button href={`tel:${ramaPhone.replace(/[^+0-9]/g, '')}`} variant="outline" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                    {dictUI.callRamaMandi}
                  </Button>
                  <Button href={`/${locale}/appointment`} variant="primary" style={{ backgroundColor: 'white', color: 'var(--color-green-primary)' }}>
                    {dictUI.bookAppointment} &rarr;
                  </Button>
                </div>
              </div>
            </div>
            
            {/* WHY MSC */}
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>{dictUI.whyChoose}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{dictUI.why1Title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{dictUI.why1Desc}</p>
                </div>
                <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{dictUI.why2Title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{dictUI.why2Desc}</p>
                </div>
                <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{dictUI.why3Title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{dictUI.why3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
