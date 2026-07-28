// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppEducation from '~/components/AppEducation.vue';
import type { CvEducation } from '~/shared/types/config';

const education: CvEducation[] = [
  {
    institution: 'Universidade Paulista',
    location: 'Jundiaí, SP',
    title: 'BSc Computer Science',
    graduatedIn: 'Dec 2020',
  },
  {
    institution: 'Vasco Antônio Venchiarutti',
    location: 'Jundiaí, SP',
    title: 'IT Technician',
    graduatedIn: 'Dec 2016',
  },
];

const mount = (entries = education) =>
  mountSuspended(AppEducation, { props: { education: entries } });

describe('AppEducation', () => {
  it('uses the section title recruiters and parsers look for', async () => {
    expect((await mount()).find('h2').text()).toBe('Education');
  });

  it('renders one entry per institution, preserving config order', async () => {
    expect((await mount()).findAll('h3').map(heading => heading.text())).toEqual([
      'Universidade Paulista',
      'Vasco Antônio Venchiarutti',
    ]);
  });

  it('renders nothing when there is no education to show', async () => {
    expect((await mount([])).find('section').exists()).toBe(false);
  });
});
