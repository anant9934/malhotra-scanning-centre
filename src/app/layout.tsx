import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Malhotra Scanning Centre | Diagnostic & Imaging Centre in Jalandhar",
  description: "Advanced diagnostic imaging in Jalandhar. Ultrasound, Colour Doppler, Digital X-Ray, CT Scan and comprehensive diagnostic investigations under expert radiological care.",
  openGraph: {
    title: "Malhotra Scanning Centre | Diagnostic & Imaging Centre in Jalandhar",
    description: "Advanced diagnostic imaging in Jalandhar. Ultrasound, Colour Doppler, Digital X-Ray, CT Scan and comprehensive diagnostic investigations under expert radiological care.",
    locale: "en_IN",
    type: "website",
  },
};

import FrontendWrapper from "@/components/layout/FrontendWrapper";
import { getSettings } from "@/app/actions/settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.data : {};

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <FrontendWrapper settings={settings}>{children}</FrontendWrapper>
      </body>
    </html>
  );
}
