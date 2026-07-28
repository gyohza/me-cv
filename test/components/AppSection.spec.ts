// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppSection from '~/components/AppSection.vue';

const mount = (title = 'Experience', slot = '<p>body</p>') =>
  mountSuspended(AppSection, { props: { title }, slots: { default: slot } });

describe('AppSection', () => {
  it('renders a section landmark holding the slotted content', async () => {
    const wrapper = await mount();

    expect(wrapper.find('section p').text()).toBe('body');
  });

  it('titles the section with a level 2 heading', async () => {
    const wrapper = await mount('Education');

    expect(wrapper.find('h2').text()).toBe('Education');
  });

  it('associates the section with its heading for assistive technology', async () => {
    const wrapper = await mount();
    const headingId = wrapper.find('h2').attributes('id');

    expect(headingId).toBeTruthy();
    expect(wrapper.find('section').attributes('aria-labelledby')).toBe(headingId);
  });

  it('keeps heading ids unique between sibling sections', async () => {
    const wrapper = await mountSuspended({
      components: { AppSection },
      template: '<div><AppSection title="One" /><AppSection title="Two" /></div>',
    });
    const [first, second] = wrapper.findAll('h2').map(heading => heading.attributes('id'));

    expect(first).not.toBe(second);
  });
});
