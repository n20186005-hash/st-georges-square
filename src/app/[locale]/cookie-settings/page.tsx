import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://stgeorgessquaremalta.com';
  
  const urls = {
    en: `${baseUrl}/en/cookie-settings`,
    zh: `${baseUrl}/zh/cookie-settings`,
    es: `${baseUrl}/es/cookie-settings`,
    it: `${baseUrl}/it/cookie-settings`,
    mt: `${baseUrl}/mt/cookie-settings`
  };
  
  const selfUrl = urls[locale as keyof typeof urls] || urls.en;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'en': urls.en,
        'zh': urls.zh,
        'es': urls.es,
        'it': urls.it,
        'mt': urls.mt,
        'x-default': urls.en,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
