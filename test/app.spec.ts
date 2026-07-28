// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppRoot from '~/app.vue';
import { toI18nLocales } from '~/shared/cv/locale';
import { cvConfig } from './fixtures/cv';

const defaultLocale = toI18nLocales(cvConfig)[0].code;

describe('app root', () => {
  it('declares the document language, which screen readers and parsers rely on', async () => {
    (useRuntimeConfig().public as Record<string, unknown>).config = cvConfig;
    await mountSuspended(AppRoot, { route: '/' });
    await new Promise(resolve => setTimeout(resolve));

    expect(document.documentElement.getAttribute('lang')).toBe(defaultLocale);
  });
});
