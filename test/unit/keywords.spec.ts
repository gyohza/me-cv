import { describe, expect, it } from 'vitest';
import { collectKeywords } from '~/shared/cv/keywords';
import type { CvSkillCategory } from '~/shared/types/config';

const frontend: CvSkillCategory = {
  name: 'Frontend',
  skills: ['TypeScript', 'Vue.js/Nuxt'],
  keywords: ['ts', 'vue', 'nuxt'],
};

const tools: CvSkillCategory = {
  name: 'Tools',
  skills: ['Git', 'Jest'],
  keywords: ['git', 'unit testing'],
};

describe('collectKeywords', () => {
  it('merges skills and keywords in source order', () => {
    expect(collectKeywords([frontend])).toEqual(['TypeScript', 'Vue.js/Nuxt', 'ts', 'vue', 'nuxt']);
  });

  it('spans every category', () => {
    expect(collectKeywords([frontend, tools])).toContain('unit testing');
  });

  it('drops case-insensitive duplicates, keeping the first spelling', () => {
    expect(collectKeywords([tools])).toEqual(['Git', 'Jest', 'unit testing']);
  });

  it('ignores blank entries', () => {
    expect(collectKeywords([{ name: 'Empty', skills: ['  '], keywords: [''] }])).toEqual([]);
  });

  it('returns an empty list when there are no categories', () => {
    expect(collectKeywords([])).toEqual([]);
  });
});
