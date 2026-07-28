import type { CvConfig, CvLocaleData } from '../types/config';

export type CvI18nLocale = {
  code: string;
  language: string;
};

export const FALLBACK_LOCALE = 'en-US';

const languageOf = (locale: string) => locale.toLowerCase().split('-')[0];

const toI18nLocale = (code: string): CvI18nLocale => ({ code, language: code });

/**
 * Derives the i18n module's locale list from the translations the config ships,
 * so adding a language to the remote JSON is the only step needed to publish it.
 * The list is typed non-empty because the module needs a default locale even
 * when the config could not be fetched.
 */
export const toI18nLocales = (config: CvConfig): [CvI18nLocale, ...CvI18nLocale[]] => {
  const [first = FALLBACK_LOCALE, ...rest] = Object.keys(config.data ?? {});

  return [toI18nLocale(first), ...rest.map(toI18nLocale)];
};

/**
 * Resolves the data slice for a locale, degrading from an exact tag match to a
 * language match to whatever the config actually ships, so a locale the config
 * has no translation for still renders a complete resume.
 */
export const resolveLocaleData = (
  config: CvConfig,
  locale: string,
): CvLocaleData | undefined => {
  const entries = Object.entries(config.data ?? {});
  const exact = entries.find(([code]) => code.toLowerCase() === locale.toLowerCase());
  const sameLanguage = entries.find(([code]) => languageOf(code) === languageOf(locale));

  return (exact ?? sameLanguage ?? entries[0])?.[1];
};
