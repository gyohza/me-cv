// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppHighlights from '~/components/AppHighlights.vue';

const mount = (highlights: string[]) => mountSuspended(AppHighlights, { props: { highlights } });

describe('AppHighlights', () => {
  it('renders one list item per highlight, in order', async () => {
    const wrapper = await mount(['Shipped six repos', 'Raised Lighthouse scores']);

    expect(wrapper.findAll('li').map(item => item.text())).toEqual([
      '• Shipped six repos',
      '• Raised Lighthouse scores',
    ]);
  });

  it('omits the list entirely when there is nothing to show', async () => {
    const wrapper = await mount([]);

    expect(wrapper.find('ul').exists()).toBe(false);
  });
});
