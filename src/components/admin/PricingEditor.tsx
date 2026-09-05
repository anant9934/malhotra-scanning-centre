import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { EditableField } from './EditableField';
import { services } from '@/data/services';
import { AdminSettings } from '@/types';

export function PricingEditor({ 
  settings, 
  onPriceUpdate 
}: { 
  settings: AdminSettings; 
  onPriceUpdate: (serviceId: string, invName: string, price: string) => Promise<void>; 
}) {
  const [openService, setOpenService] = useState<string | null>(null);

  const getPrice = (serviceId: string, invName: string, defaultPrice: string) =>
    settings.prices?.[serviceId]?.[invName] || defaultPrice;

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Service Prices</h2>
        <p className={styles.sectionSub}>Click any price to edit it. Changes are saved live to the website.</p>
      </div>
      
      {services.map(svc => (
        <div key={svc.id} className={styles.card} style={{ marginBottom: '1rem' }}>
          <button 
            className={styles.serviceAccordion} 
            onClick={() => setOpenService(openService === svc.id ? null : svc.id)}
          >
            <span className={styles.serviceTitle}>{svc.title}</span>
            <span className={styles.serviceCount}>{svc.investigations.length} investigations</span>
            <span className={styles.accordionArrow}>{openService === svc.id ? '▲' : '▼'}</span>
          </button>
          
          {openService === svc.id && (
            <div className={styles.priceTable}>
              <div className={styles.priceHeader}>
                <span>Investigation</span>
                <span>Current Price</span>
              </div>
              {svc.investigations.map(inv => (
                <div key={inv.name} className={styles.priceRow}>
                  <span className={styles.invName}>{inv.name}</span>
                  <EditableField
                    value={getPrice(svc.id, inv.name, inv.price)}
                    onSave={v => onPriceUpdate(svc.id, inv.name, v)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
