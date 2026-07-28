// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppHeader from '~/components/AppHeader.vue';
import type { CvLink } from '~/shared/types/config';

const links: CvLink[] = [
  { label: 'Email', value: 'dan@example.com', url: 'mailto:dan@example.com' },
];

const mount = () =>
  mountSuspended(AppHeader, {
    props: {
      firstName: 'Daniel',
      lastName: 'Nagaoka',
      title: 'Senior Frontend Software Engineer',
      links,
    },
  });

describe('AppHeader', () => {
  it('is a banner landmark', async () => {
    expect((await mount()).find('header').exists()).toBe(true);
  });

  it('puts identity before contact details, the order ATS parsers expect', async () => {
    const wrapper = await mount();
    const heading = wrapper.find('h1').element;
    const contacts = wrapper.find('ul').element;

    expect(heading.compareDocumentPosition(contacts)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('renders the identity and the contact links', async () => {
    const wrapper = await mount();

    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('a').attributes('href')).toBe('mailto:dan@example.com');
  });
});
