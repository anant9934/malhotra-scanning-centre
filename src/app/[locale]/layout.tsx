import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  return {
    title: dictionary.home.hero.heading.split(',').join(' | ') + " | Malhotra Scanning Centre",
    description: dictionary.home.hero.description,
    openGraph: {
      title: "Malhotra Scanning Centre",
      description: dictionary.home.hero.description,
      locale: locale === 'pa' ? 'pa_IN' : 'en_IN',
      type: "website",
    },
  };
}

import FrontendWrapper from "@/components/layout/FrontendWrapper";
import { getSettings } from "@/app/actions/settings";
import { I18nProvider } from "@/components/providers/I18nProvider";

export default async function PublicRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.data : {};

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <I18nProvider locale={locale as Locale} dictionary={dictionary}>
          <FrontendWrapper settings={settings}>{children}</FrontendWrapper>
        </I18nProvider>
      </body>
    </html>
  );
}
