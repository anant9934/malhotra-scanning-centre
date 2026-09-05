"use client";

import React, { useState, useEffect } from 'react';
import { logout } from '@/app/actions/auth';
import styles from './admin.module.css';
import { Appointment, AdminSettings } from '@/types';
import { useAdminData } from '@/hooks/useAdminData';

import { AdminSidebar, Tab, NAV } from '@/components/admin/AdminSidebar';
import { AppointmentsTable } from '@/components/admin/AppointmentsTable';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { PricingEditor } from '@/components/admin/PricingEditor';
import { CentreManager } from '@/components/admin/CentreManager';
import { SiteSettingsManager } from '@/components/admin/SiteSettingsManager';

/**
 * Main Client Component for the Admin Dashboard.
 * Serves as the high-level shell organizing modular sub-components.
 */
export default function DashboardClient({
  initialAppointments,
  initialSettings,
}: {
  initialAppointments: Appointment[];
  initialSettings: AdminSettings;
}) {
  const {
    appointments,
    settings,
    isLoading,
    error,
    handleDelete,
    handleStatusChange,
    handleUpdateSettings
  } = useAdminData(initialAppointments, initialSettings);

  const [tab, setTab] = useState<Tab>('appointments');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newApptCount, setNewApptCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Watch for new appointments during polling to update the badge
  useEffect(() => {
    if (appointments.length > initialAppointments.length) {
      const diff = appointments.length - initialAppointments.length;
      setNewApptCount(prev => prev + diff);
      setLastUpdated(new Date());
    }
  }, [appointments.length, initialAppointments.length]);

  const onPriceUpdate = async (serviceId: string, invName: string, price: string) => {
    const newSettings = {
      ...settings,
      prices: { ...settings.prices, [serviceId]: { ...(settings.prices?.[serviceId] || {}), [invName]: price } }
    };
    await handleUpdateSettings(newSettings);
  };

  const onCentreUpdate = async (centreId: string, field: string, value: string) => {
    const newSettings = {
      ...settings,
      centres: { ...settings.centres, [centreId]: { ...(settings.centres?.[centreId] || {}), [field]: value } }
    };
    await handleUpdateSettings(newSettings);
  };

  const onSiteUpdate = async (key: string, value: string) => {
    const newSettings = {
      ...settings,
      site: { ...settings.site, [key]: value }
    };
    await handleUpdateSettings(newSettings);
  };

  return (
    <div className={styles.shell}>
      <AdminSidebar 
        tab={tab} 
        setTab={setTab} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        newApptCount={newApptCount} 
        setNewApptCount={setNewApptCount} 
        lastUpdated={lastUpdated} 
      />

      <div className={styles.main}>
        {/* TOPBAR */}
        <div className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <h1 className={styles.pageTitle}>{NAV.find(n => n.id === tab)?.icon} {NAV.find(n => n.id === tab)?.label}</h1>
          </div>
          <div className={styles.topbarRight}>
            <a href="/" target="_blank" rel="noopener noreferrer" className={styles.topbarLink}>↗ View Site</a>
            <button className={styles.topbarLogout} onClick={() => logout()}>Logout</button>
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          
          {error && <div className={styles.toast} style={{ backgroundColor: 'var(--color-error)' }}>{error}</div>}

          {tab === 'appointments' && (
            <AppointmentsTable 
              appointments={appointments} 
              isRefreshing={isLoading}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}

          {tab === 'analytics' && <AnalyticsCharts appointments={appointments} />}

          {tab === 'pricing' && <PricingEditor settings={settings} onPriceUpdate={onPriceUpdate} />}

          {tab === 'centres' && <CentreManager settings={settings} onCentreUpdate={onCentreUpdate} />}

          {tab === 'settings' && <SiteSettingsManager settings={settings} onSiteUpdate={onSiteUpdate} />}
        </div>
      </div>
    </div>
  );
}
