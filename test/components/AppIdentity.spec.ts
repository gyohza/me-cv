// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppIdentity from '~/components/AppIdentity.vue';

const mount = () =>
  mountSuspended(AppIdentity, {
    props: {
      firstName: 'Daniel',
      lastName: 'Nagaoka',
      title: 'Senior Frontend Software Engineer',
    },
  });

const collapse = (text: string) => text.replace(/\s+/g, ' ').trim();

describe('AppIdentity', () => {
  it('renders the full name as the single level 1 heading', async () => {
    const headings = (await mount()).findAll('h1');

    expect(headings).toHaveLength(1);
    expect(collapse(headings[0]!.text())).toBe('Daniel Nagaoka');
  });

  it('marks the name and job title for structured data consumers', async () => {
    const wrapper = await mount();

    expect(collapse(wrapper.find('[itemprop="name"]').text())).toBe('Daniel Nagaoka');
    expect(wrapper.find('[itemprop="jobTitle"]').text()).toBe('Senior Frontend Software Engineer');
  });

  it('exposes the job title as a document subtitle', async () => {
    expect((await mount()).find('[role="doc-subtitle"]').exists()).toBe(true);
  });
});
