import React from 'react';
import CentresContent from './CentresContent';

export const metadata = {
  title: 'Our Centres | Malhotra Scanning Centre',
  description: 'Find a Malhotra Scanning Centre near you in Jalandhar, Punjab.',
};

import { getSettings } from '@/app/actions/settings';

export default async function CentresPage() {
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.data : {};

  return (
    <CentresContent settings={settings} />
  );
}
