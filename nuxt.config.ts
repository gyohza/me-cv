import tailwindcss from '@tailwindcss/vite';
import { toAccentStyle } from './app/shared/cv/accent';
import { resolveLocaleData, toI18nLocales } from './app/shared/cv/locale';
import { buildSeo } from './app/shared/cv/seo';
import type { CvConfig } from './app/shared/types/config';

const fetchConfig = async (): Promise<CvConfig> => {
  const url = process.env.NUXT_CONFIG_URL;

  if (!url) {
    throw new Error('NUXT_CONFIG_URL not set');
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `failed to fetch config: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
};

const resolveSiteUrl = () => {
  const url = process.env.NUXT_PUBLIC_SITE_URL;

  if (!url) {
    console.warn(
      'NUXT_PUBLIC_SITE_URL not set: robots.txt, the sitemap and og:image will be built ' +
        'against a placeholder origin and must not be deployed',
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
    'nuxt-og-image',
  ],
  css: ['assets/css/main.css'],

  nitro: {
    preset: 'github-pages',
  },

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
