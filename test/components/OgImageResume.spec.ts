// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import OgImageResume from '~/components/OgImage/Resume.satori.vue';
import { readThemeColor } from '../support/stylesheet';

const surface = readThemeColor('surface');
const content = readThemeColor('content');

const name = 'Daniel Nagaoka';
const title = 'Senior Frontend Software Engineer';

const mount = (props: Record<string, string> = {}) =>
  mountSuspended(OgImageResume, { props: { name, title, ...props } });

const titleStyleOf = (wrapper: Awaited<ReturnType<typeof mount>>) =>
  wrapper.findAll('span')[1]!.attributes('style');

describe('OgImage Resume', () => {
  it('renders the name and the job title', async () => {
    const text = (await mount()).text();

    expect(text).toContain(name);
    expect(text).toContain(title);
  });

  it('defaults to the dark palette declared in the stylesheet, which satori cannot read', async () => {
    const style = (await mount()).attributes('style');

    expect(style).toContain(surface.dark);
    expect(style).toContain(content.dark);
  });

  it('tints the job title with the configured accent', async () => {
    const accent = '#8fd3e0';

    expect(titleStyleOf(await mount({ accent }))).toContain(accent);
  });

  it('falls back to the content colour when no accent is configured', async () => {
    expect(titleStyleOf(await mount())).toContain(content.dark);
  });
});
