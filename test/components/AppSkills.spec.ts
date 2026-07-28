// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppSkills from '~/components/AppSkills.vue';
import type { CvSkillCategory } from '~/shared/types/config';

const skillCategories: CvSkillCategory[] = [
  { name: 'Frontend', skills: ['TypeScript'], keywords: ['ts'] },
  { name: 'Backend', skills: ['NestJS'], keywords: ['nest.js'] },
];

const mount = (categories = skillCategories) =>
  mountSuspended(AppSkills, { props: { skillCategories: categories } });

describe('AppSkills', () => {
  it('uses the section title recruiters and parsers look for', async () => {
    expect((await mount()).find('h2').text()).toBe('Skills');
  });

  it('renders one group per category, preserving config order', async () => {
    expect((await mount()).findAll('h3').map(heading => heading.text())).toEqual([
      'Frontend',
      'Backend',
    ]);
  });

  it('renders nothing when there are no skills to show', async () => {
    expect((await mount([])).find('section').exists()).toBe(false);
  });
});
