import { describe, expect, it } from 'vitest';
import { buildSeo, truncateAtWord } from '~/shared/cv/seo';
import type { CvLocaleData } from '~/shared/types/config';

const data = {
  firstName: 'Daniel',
  lastName: 'Nagaoka',
  title: 'Senior Frontend Software Engineer',
  summary: 'Senior software engineer with over 10 years of experience.',
  skillCategories: [{ name: 'Frontend', skills: ['TypeScript'], keywords: ['ts'] }],
} as CvLocaleData;

describe('truncateAtWord', () => {
  it('leaves short text untouched', () => {
    expect(truncateAtWord('short enough', 40)).toBe('short enough');
  });

  it('cuts on a word boundary and appends an ellipsis', () => {
    expect(truncateAtWord('the quick brown fox jumps', 16)).toBe('the quick brown…');
  });

  it('never exceeds the requested length', () => {
    expect(truncateAtWord('the quick brown fox jumps', 16).length).toBeLessThanOrEqual(16);
  });
});

describe('buildSeo', () => {
  it('titles the page with the full name and role', () => {
    expect(buildSeo(data).title).toBe('Daniel Nagaoka — Senior Frontend Software Engineer');
  });

  it('describes the page with the summary', () => {
    expect(buildSeo(data).description).toBe(
      'Senior software engineer with over 10 years of experience.',
    );
  });

  it('trims descriptions to a snippet-friendly length', () => {
    const verbose = { ...data, summary: 'word '.repeat(80).trim() };

    expect(buildSeo(verbose).description.length).toBeLessThanOrEqual(160);
  });

  it('flattens skills and keywords into a comma separated list', () => {
    expect(buildSeo(data).keywords).toBe('TypeScript, ts');
  });

  it('degrades gracefully when there is no data', () => {
    expect(buildSeo(undefined)).toEqual({ title: '', description: '', keywords: '' });
  });
});
