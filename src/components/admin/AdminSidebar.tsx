import React from 'react';
import styles from '@/app/admin/admin.module.css';

export type Tab = 'appointments' | 'analytics' | 'pricing' | 'centres' | 'settings';

export const NAV: { id: Tab; icon: string; label: string }[] = [
  { id: 'appointments', icon: '📋', label: 'Appointments' },
  { id: 'analytics', icon: '📊', label: 'Analytics' },
  { id: 'pricing', icon: '₹', label: 'Pricing' },
  { id: 'centres', icon: '🏥', label: 'Centres' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export function AdminSidebar({
  tab,
  setTab,
  sidebarOpen,
  setSidebarOpen,
  newApptCount,
  setNewApptCount,
  lastUpdated
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newApptCount: number;
  setNewApptCount: (n: number) => void;
  lastUpdated: Date;
}) {
  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? '' : styles.sidebarCollapsed}`}>
      <div className={styles.sidebarBrand}>
        <span className={styles.brandMsc}>MSC</span>
        {sidebarOpen && <span className={styles.brandLabel}>Admin</span>}
      </div>

      <nav className={styles.sidebarNav}>
        {NAV.map(n => (
          <button
            key={n.id}
            className={`${styles.navItem} ${tab === n.id ? styles.navActive : ''}`}
            onClick={() => { setTab(n.id); setNewApptCount(0); }}
          >
            <span className={styles.navIcon}>{n.icon}</span>
            {sidebarOpen && <span className={styles.navLabel}>{n.label}</span>}
            {n.id === 'appointments' && newApptCount > 0 && (
              <span className={styles.navBadge}>{newApptCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        {sidebarOpen && <span className={styles.liveText}>🟢 Live · {lastUpdated.toLocaleTimeString()}</span>}
        <button className={styles.collapseBtn} onClick={() => setSidebarOpen(o => !o)}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </div>
    </aside>
  );
}
