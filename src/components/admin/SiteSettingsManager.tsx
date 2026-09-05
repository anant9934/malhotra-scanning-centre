import React from 'react';
import styles from '@/app/admin/admin.module.css';
import { EditableField } from './EditableField';
import { AdminSettings } from '@/types';

export function SiteSettingsManager({ 
  settings, 
  onSiteUpdate 
}: { 
  settings: AdminSettings; 
  onSiteUpdate: (key: string, value: string) => Promise<void>; 
}) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Site Settings</h2>
        <p className={styles.sectionSub}>Click any value to edit it live.</p>
      </div>
      
      <div className={styles.card}>
        <div className={styles.settingsGrid}>
          {[
            { key: 'phone', label: 'Header Phone Number', help: 'Shown in navigation header' },
            { key: 'openHours', label: 'Open Hours Text', help: 'Shown under phone in header' },
            { key: 'tagline', label: 'Site Tagline', help: 'Used in metadata and hero text' },
          ].map(s => (
            <div key={s.key} className={styles.settingRow}>
              <div>
                <div className={styles.settingLabel}>{s.label}</div>
                <div className={styles.settingHelp}>{s.help}</div>
              </div>
              <div className={styles.settingValue}>
                <EditableField
                  value={(settings.site as any)?.[s.key] || '—'}
                  onSave={v => onSiteUpdate(s.key, v)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: '1rem' }}>
        <h3 className={styles.cardHead}>Account</h3>
        <div className={styles.settingRow}>
          <div>
            <div className={styles.settingLabel}>Admin Password</div>
            <div className={styles.settingHelp}>Set <code>ADMIN_PASSWORD</code> env variable to change</div>
          </div>
          <span className={styles.settingValue}>••••••••</span>
        </div>
        <div className={styles.settingRow} style={{ marginTop: '1rem' }}>
          <div>
            <div className={styles.settingLabel}>Admin URL</div>
            <div className={styles.settingHelp}>Share only with authorized staff</div>
          </div>
          <code className={styles.settingCode}>/admin</code>
        </div>
      </div>
    </div>
  );
}
