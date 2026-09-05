"use client";

import { usePathname } from 'next/navigation';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileConversionBar } from "@/components/layout/MobileConversionBar";

export default function FrontendWrapper({ children, settings }: { children: React.ReactNode, settings?: any }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <MobileConversionBar settings={settings} />
    </>
  );
}
