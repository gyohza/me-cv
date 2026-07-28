// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import IndexPage from '~/pages/index.vue';
import { buildSeo } from '~/shared/cv/seo';
import { cvConfig, cvData } from '../fixtures/cv';
import type { CvConfig } from '~/shared/types/config';

const seo = buildSeo(cvData);

const mountWith = (config: CvConfig) => {
  (useRuntimeConfig().public as Record<string, unknown>).config = config;
  return mountSuspended(IndexPage);
};

const flushHead = () => new Promise(resolve => setTimeout(resolve));

describe('index page', () => {
  it('renders the resume for the active locale', async () => {
    const wrapper = await mountWith(cvConfig);

    expect(wrapper.find('h1').text()).toContain(cvData.firstName);
    expect(wrapper.findAll('h2').map(heading => heading.text())).toEqual([
      'Experience',
      'Education',
      'Skills',
    ]);
  });

  it('titles the document with the name and role', async () => {
    await mountWith(cvConfig);
    await flushHead();

    expect(document.title).toBe(seo.title);
  });

  it('publishes the summary and skill keywords as metadata', async () => {
    await mountWith(cvConfig);
    await flushHead();

    const contentOf = (name: string) =>
      document.querySelector(`meta[name="${name}"]`)?.getAttribute('content');

    expect(contentOf('description')).toBe(seo.description);
    expect(contentOf('keywords')).toBe(seo.keywords);
  });

  it('reports missing data instead of rendering an empty resume', async () => {
    const wrapper = await mountWith({ data: {} });

    expect(wrapper.find('h1').exists()).toBe(false);
    expect(wrapper.find('[role="status"]').exists()).toBe(true);
  });
});
