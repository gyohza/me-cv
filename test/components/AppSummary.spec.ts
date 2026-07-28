// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppSummary from '~/components/AppSummary.vue';

const summary = 'Senior software engineer with over 10 years of experience.';

const mount = (text = summary) => mountSuspended(AppSummary, { props: { summary: text } });

describe('AppSummary', () => {
  it('renders the summary as prose', async () => {
    expect((await mount()).find('p').text()).toContain(summary);
  });

  it('marks the summary as the person description', async () => {
    expect((await mount()).find('[itemprop="description"]').text()).toContain(summary);
  });
});
