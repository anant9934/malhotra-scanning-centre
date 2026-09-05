import { useState, useEffect, useCallback } from 'react';
import { getAppointments, updateAppointmentStatus } from '@/app/actions/appointment';
import { getSettings, updateSettings, deleteAppointment } from '@/app/actions/settings';
import { Appointment, AdminSettings } from '@/types';

/**
 * Custom hook to manage fetching and real-time polling of admin data.
 * Enhances cohesion by separating data fetching logic from the UI.
 * 
 * @param initialAppointments - Server-rendered initial appointments state
 * @param initialSettings - Server-rendered initial settings state
 */
export function useAdminData(initialAppointments: Appointment[], initialSettings: AdminSettings) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Polling for live updates
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const [apptsRes, settingsRes] = await Promise.all([
          getAppointments(),
          getSettings()
        ]);
        
        if (apptsRes.success && apptsRes.data) {
          // Deep compare could go here; for now we just update state
          setAppointments(apptsRes.data);
        }
        
        if (settingsRes.success && settingsRes.data) {
          setSettings(settingsRes.data);
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    };

    const intervalId = setInterval(fetchLatest, 10000); // 10s polling
    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    
    setIsLoading(true);
    try {
      const res = await deleteAppointment(id);
      if (res.success) {
        setAppointments(prev => prev.filter(a => a.id !== id));
      } else {
        alert(res.error || "Failed to delete");
      }
    } catch (e) {
      alert("Error deleting appointment");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStatusChange = useCallback(async (id: string, newStatus: string) => {
    try {
      const res = await updateAppointmentStatus(id, newStatus);
      if (res.success) {
        setAppointments(prev => prev.map(a => 
          a.id === id ? { ...a, status: newStatus } : a
        ));
      } else {
        alert("Failed to update status");
      }
    } catch (e) {
      alert("Error updating status");
    }
  }, []);

  const handleUpdateSettings = useCallback(async (newSettings: AdminSettings) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await updateSettings(newSettings);
      if (res.success) {
        setSettings(newSettings);
      } else {
        setError(res.error || "Failed to update settings");
      }
    } catch (e) {
      setError("An unexpected error occurred while saving.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    appointments,
    settings,
    isLoading,
    error,
    handleDelete,
    handleStatusChange,
    handleUpdateSettings
  };
}
