import React, { useMemo } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Appointment } from '@/types';

export function AnalyticsCharts({ appointments }: { appointments: Appointment[] }) {
  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter(a => a.status === 'Pending').length;
    const confirmed = appointments.filter(a => a.status === 'Confirmed').length;
    const cancelled = appointments.filter(a => a.status === 'Cancelled').length;
    const today = appointments.filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString()).length;
    return { total, pending, confirmed, cancelled, today };
  }, [appointments]);

  const invBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    appointments.forEach(a => { map[a.investigation] = (map[a.investigation] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [appointments]);

  const centreList = ['All', ...Array.from(new Set(appointments.map(a => a.preferredCentre)))];

  return (
    <div className={styles.analyticsGrid}>
      <div className={styles.card}>
        <h3 className={styles.cardHead}>Status Breakdown</h3>
        {[
          { l: 'Confirmed', v: stats.confirmed, c: '#38a169' }, 
          { l: 'Pending', v: stats.pending, c: '#dd6b20' }, 
          { l: 'Cancelled', v: stats.cancelled, c: '#e53e3e' }
        ].map(b => (
          <div key={b.l} className={styles.barRow}>
            <span className={styles.barLbl}>{b.l}</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: stats.total ? `${(b.v / stats.total) * 100}%` : '0%', background: b.c }} />
            </div>
            <span className={styles.barVal}>{b.v}</span>
          </div>
        ))}
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardHead}>Top Investigations</h3>
        {invBreakdown.map(([name, count]) => (
          <div key={name} className={styles.barRow}>
            <span className={styles.barLbl}>{name}</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${(count / (invBreakdown[0]?.[1] || 1)) * 100}%`, background: '#2d6a4f' }} />
            </div>
            <span className={styles.barVal}>{count}</span>
          </div>
        ))}
        {invBreakdown.length === 0 && <p className={styles.emptyCell}>No data yet.</p>}
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardHead}>Centre Distribution</h3>
        {centreList.filter(c => c !== 'All').map(centre => {
          const count = appointments.filter(a => a.preferredCentre === centre).length;
          const pct = appointments.length ? Math.round((count / appointments.length) * 100) : 0;
          return (
            <div key={centre} className={styles.barRow}>
              <span className={styles.barLbl}>{centre}</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${pct}%`, background: '#1b4332' }} />
              </div>
              <span className={styles.barVal}>{count} ({pct}%)</span>
            </div>
          );
        })}
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardHead}>Time Preferences</h3>
        {['Morning', 'Evening', 'Any Available Time'].map(t => {
          const count = appointments.filter(a => a.preferredTime === t).length;
          const pct = appointments.length ? Math.round((count / appointments.length) * 100) : 0;
          return (
            <div key={t} className={styles.barRow}>
              <span className={styles.barLbl}>{t}</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${pct}%`, background: '#6b46c1' }} />
              </div>
              <span className={styles.barVal}>{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
