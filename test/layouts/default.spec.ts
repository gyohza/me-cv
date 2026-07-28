// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import DefaultLayout from '~/layouts/default.vue';

const mount = () =>
  mountSuspended(DefaultLayout, { slots: { default: '<p>resume</p>' } });

describe('default layout', () => {
  it('offers a skip link as the very first focusable element', async () => {
    const wrapper = await mount();
    const skipLink = wrapper.findAll('a')[0]!;

    expect(skipLink.attributes('href')).toBe('#main-content');
    expect(skipLink.text()).toBe('Skip to content');
  });

  it('keeps the skip link out of sight until it is focused', async () => {
    const classes = (await mount()).findAll('a')[0]!.classes();

    expect(classes).toEqual(expect.arrayContaining(['sr-only', 'focus:not-sr-only']));
  });

  it('exposes a main landmark that the skip link targets', async () => {
    const main = (await mount()).find('main');

    expect(main.attributes('id')).toBe('main-content');
    expect(main.text()).toContain('resume');
  });

  it('gives the main landmark a focus target for the skip link', async () => {
    expect((await mount()).find('main').attributes('tabindex')).toBe('-1');
  });
});
