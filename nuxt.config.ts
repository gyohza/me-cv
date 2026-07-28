import type { CvConfig } from './app/shared/types/config';
import { resolveLocaleData, toI18nLocales } from './app/shared/cv/locale';
import { buildSeo } from './app/shared/cv/seo';
import { toAccentStyle } from './app/shared/cv/accent';
import tailwindcss from '@tailwindcss/vite';

const fetchConfig = async (): Promise<CvConfig> => {
  const url = process.env.NUXT_CONFIG_URL;

  if (!url) {
    console.warn('NUXT_CONFIG_URL not set');
    return { data: {} };
  }

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('failed to fetch config', error);
    return { data: {} };
  }
};

const resolveSiteUrl = () => {
  const url = process.env.NUXT_PUBLIC_SITE_URL;

  if (!url) {
    console.warn(
      'NUXT_PUBLIC_SITE_URL not set: robots.txt, the sitemap and og:image will be built '
      + 'against a placeholder origin and must not be deployed',
    );
  }

  return url;
};

const config = await fetchConfig();
const siteUrl = resolveSiteUrl();

const locales = toI18nLocales(config);
const defaultLocale = locales[0].code;
const { title: siteName, description: siteDescription } = buildSeo(
  resolveLocaleData(config, defaultLocale),
);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
  ],
  css: ['assets/css/main.css'],

  runtimeConfig: {
    public: {
      config,
    },
  },

  site: {
    url: siteUrl,
    name: siteName,
    description: siteDescription,
  },

  i18n: {
    locales,
    defaultLocale,
    strategy: 'prefix_except_default',
    baseUrl: siteUrl,
  },

  robots: {
    allow: '/',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: {
        style: toAccentStyle(config.ui),
      },
    },
  },
});
