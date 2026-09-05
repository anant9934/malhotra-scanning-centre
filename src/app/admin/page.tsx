import { redirect } from 'next/navigation';
import { checkAuth } from '@/app/actions/auth';
import { getAppointments } from '@/app/actions/appointment';
import { getSettings } from '@/app/actions/settings';
import DashboardClient from './DashboardClient';

export default async function AdminPage() {
  const isAuth = await checkAuth();
  if (!isAuth) redirect('/admin/login');

  const [initialData, settingsData] = await Promise.all([
    getAppointments(),
    getSettings(),
  ]);

  return (
    <DashboardClient
      initialAppointments={initialData.data || []}
      initialSettings={settingsData.data || {}}
    />
  );
}
