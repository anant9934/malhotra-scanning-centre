import React from 'react';
import styles from '@/app/admin/admin.module.css';
import { EditableField } from './EditableField';
import { AdminSettings } from '@/types';

export function CentreManager({ 
  settings, 
  onCentreUpdate 
}: { 
  settings: AdminSettings; 
  onCentreUpdate: (centreId: string, field: string, value: string) => Promise<void>; 
}) {
  return (
    <div className={styles.centreGrid}>
      {[
        { id: 'maqsudan', label: 'Maqsudan Centre', num: '01', accent: '#3182ce' },
        { id: 'ramamandi', label: 'Rama Mandi Centre', num: '02', accent: '#6b46c1' },
      ].map(c => {
        const info = settings.centres?.[c.id] || {};
        return (
          <div key={c.id} className={styles.centreCard} style={{ borderTopColor: c.accent }}>
            <div className={styles.centreCardHead}>
              <span className={styles.centreNum} style={{ color: c.accent }}>{c.num}</span>
              <h3 className={styles.centreName}>{c.label}</h3>
            </div>
            <div className={styles.centreFields}>
              {[
                { key: 'phone', label: '📞 Phone' },
                { key: 'hours', label: '🕐 Hours' },
                { key: 'address', label: '📍 Address' },
              ].map(f => (
                <div key={f.key} className={styles.centreField}>
                  <label className={styles.centreFieldLabel}>{f.label}</label>
                  <EditableField
                    value={(info as any)[f.key] || '—'}
                    onSave={v => onCentreUpdate(c.id, f.key, v)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
