// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppSkillCategory from '~/components/AppSkillCategory.vue';
import type { CvSkillCategory } from '~/shared/types/config';

const category: CvSkillCategory = {
  name: 'Frontend',
  skills: ['TypeScript', 'Vue.js/Nuxt'],
  keywords: ['ts', 'vue', 'nuxt'],
};

const mount = () => mountSuspended(AppSkillCategory, { props: { category } });

describe('AppSkillCategory', () => {
  it('names the category at heading level 3', async () => {
    expect((await mount()).find('h3').text()).toBe('Frontend');
  });

  it('marks each skill as something the person knows about', async () => {
    const skills = (await mount()).findAll('[itemprop="knowsAbout"]');

    expect(skills.map(skill => skill.text())).toEqual(['TypeScript', 'Vue.js/Nuxt']);
  });

  it('keeps synonym keywords out of the visible copy', async () => {
    expect((await mount()).text()).not.toContain('nuxt,');
  });

  it('keeps the category on a single printed page', async () => {
    expect((await mount()).classes()).toContain('break-inside-avoid');
  });
});
