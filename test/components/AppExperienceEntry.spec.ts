// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppExperienceEntry from '~/components/AppExperienceEntry.vue';
import type { CvExperience } from '~/shared/types/config';

const entry: CvExperience = {
  employer: 'JOIT Solutions',
  location: 'Jundiaí, SP',
  tenure: 'Aug 2019 — Jun 2021',
  roles: [
    { name: 'Technical Leader, Portal Vesta', highlights: ['Managed GitLab pipelines'] },
    { name: 'Angular/.NET Developer', highlights: ['Built aggregation dashboards'] },
  ],
};

const mount = () => mountSuspended(AppExperienceEntry, { props: { entry } });

describe('AppExperienceEntry', () => {
  it('leads with the employer at heading level 3', async () => {
    expect((await mount()).find('h3').text()).toContain('JOIT Solutions');
  });

  it('states location and tenure as text so they survive PDF extraction', async () => {
    const text = (await mount()).text();

    expect(text).toContain('Jundiaí, SP');
    expect(text).toContain('Aug 2019 — Jun 2021');
  });

  it('exposes the tenure as a machine readable date range', async () => {
    expect((await mount()).find('time').text()).toBe('Aug 2019 — Jun 2021');
  });

  it('marks the employer as an organization the person works for', async () => {
    const article = (await mount()).find('article');

    expect(article.attributes('itemprop')).toBe('worksFor');
    expect(article.attributes('itemtype')).toBe('https://schema.org/Organization');
    expect(article.find('[itemprop="name"]').text()).toBe('JOIT Solutions');
  });

  it('renders every role at heading level 4, in order', async () => {
    expect((await mount()).findAll('h4').map(heading => heading.text())).toEqual([
      'Technical Leader, Portal Vesta',
      'Angular/.NET Developer',
    ]);
  });

  it('renders each role highlights', async () => {
    expect((await mount()).findAll('li').map(item => item.text())).toEqual([
      '• Managed GitLab pipelines',
      '• Built aggregation dashboards',
    ]);
  });

  it('keeps the entry on a single printed page', async () => {
    expect((await mount()).find('article').classes()).toContain('break-inside-avoid');
  });
});
