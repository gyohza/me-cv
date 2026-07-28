import { describe, expect, it } from 'vitest';
import { resolveLocaleData, toI18nLocales } from '~/shared/cv/locale';
import type { CvConfig, CvLocaleData } from '~/shared/types/config';

const localeData = (firstName: string) => ({ firstName } as CvLocaleData);

const config = (data: Record<string, CvLocaleData>): CvConfig => ({ data });

describe('resolveLocaleData', () => {
  it('returns the exact locale match', () => {
    const data = config({ 'en-US': localeData('Daniel'), 'pt-BR': localeData('Danilo') });

    expect(resolveLocaleData(data, 'pt-BR')?.firstName).toBe('Danilo');
  });

  it('matches on language when the region differs', () => {
    const data = config({ 'en-US': localeData('Daniel') });

    expect(resolveLocaleData(data, 'en-GB')?.firstName).toBe('Daniel');
  });

  it('matches case-insensitively', () => {
    const data = config({ 'en-US': localeData('Daniel') });

    expect(resolveLocaleData(data, 'EN-us')?.firstName).toBe('Daniel');
  });

  it('falls back to the first available locale', () => {
    const data = config({ 'pt-BR': localeData('Danilo') });

    expect(resolveLocaleData(data, 'ja-JP')?.firstName).toBe('Danilo');
  });

  it('returns undefined when the config carries no data', () => {
    expect(resolveLocaleData(config({}), 'en-US')).toBeUndefined();
  });
});

describe('toI18nLocales', () => {
  it('derives one i18n locale per translated data set', () => {
    const data = config({ 'en-US': localeData('Daniel'), 'pt-BR': localeData('Danilo') });

    expect(toI18nLocales(data)).toEqual([
      { code: 'en-US', language: 'en-US' },
      { code: 'pt-BR', language: 'pt-BR' },
    ]);
  });

  it('falls back to a single english locale when the config is unreachable', () => {
    expect(toI18nLocales(config({}))).toEqual([{ code: 'en-US', language: 'en-US' }]);
  });
});
