// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppContactLinks from '~/components/AppContactLinks.vue';
import type { CvLink } from '~/shared/types/config';

const links: CvLink[] = [
  {
    label: 'Location',
    value: 'Sao Paulo state, Brazil',
    url: 'https://maps.app.goo.gl/TEupcbpUActkp11d6',
  },
  { label: 'Email', value: 'dan@example.com', url: 'mailto:dan@example.com' },
  { label: 'WhatsApp', value: '+55 11 99931-5049', url: 'https://wa.me/5511999315049' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/daninagaoka',
    url: 'https://www.linkedin.com/in/daninagaoka',
    icon: 'ph:linkedin-logo-fill',
  },
];

const mount = (items = links) => mountSuspended(AppContactLinks, { props: { links: items } });

describe('AppContactLinks', () => {
  it('renders one anchor per link, pointing at the configured url', async () => {
    const anchors = (await mount()).findAll('a');

    expect(anchors.map(anchor => anchor.attributes('href'))).toEqual(links.map(link => link.url));
  });

  it('renders nothing when there are no links', async () => {
    expect((await mount([])).find('ul').exists()).toBe(false);
  });

  it('never overrides the visible link text with an aria-label', async () => {
    const wrapper = await mount();

    wrapper.findAll('a').forEach((anchor) => {
      expect(anchor.attributes('aria-label')).toBeUndefined();
    });
  });
});
