import type { CvConfig } from './app/shared/types/config';
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

const config = await fetchConfig();

const isHexColor = (value?: string): value is string =>
  !!value && /^#[0-9a-f]{3,8}$/i.test(value);

const resolveAccentColor = (value?: string) =>
  isHexColor(value) ? value : 'var(--color-content)';

const accentColor = resolveAccentColor(config.ui?.accentColor);
const accentColorDark = resolveAccentColor(config.ui?.accentColorDark);

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

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: {
        style: `--config-accent: light-dark(${accentColor}, ${accentColorDark});`,
      },
    },
  },
});
