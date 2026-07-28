// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppExperience from '~/components/AppExperience.vue';
import type { CvExperience } from '~/shared/types/config';

const experience: CvExperience[] = [
  { employer: 'Volpi.tech', location: 'Remote', tenure: 'Dec 2024 — Jul 2026', roles: [] },
  { employer: 'LuizaLabs', location: 'Remote', tenure: 'Dec 2022 — Nov 2024', roles: [] },
];

const mount = (entries = experience) =>
  mountSuspended(AppExperience, { props: { experience: entries } });

describe('AppExperience', () => {
  it('uses the section title recruiters and parsers look for', async () => {
    expect((await mount()).find('h2').text()).toBe('Experience');
  });

  it('renders one entry per employer, preserving config order', async () => {
    expect((await mount()).findAll('h3').map(heading => heading.text())).toEqual([
      'Volpi.tech',
      'LuizaLabs',
    ]);
  });

  it('renders nothing when there is no experience to show', async () => {
    expect((await mount([])).find('section').exists()).toBe(false);
  });
});
