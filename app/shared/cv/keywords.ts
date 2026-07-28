import type { CvSkillCategory } from '../types/config';

/**
 * Flattens every category's skills and synonym keywords into one de-duplicated
 * list. Skills come first so the human-facing spelling wins over the synonym.
 */
export const collectKeywords = (categories: CvSkillCategory[]): string[] => {
  const seen = new Set<string>();

  return categories
    .flatMap(({ skills, keywords }) => [...skills, ...keywords])
    .map(term => term.trim())
    .filter((term) => {
      const key = term.toLowerCase();

      if (!term || seen.has(key)) return false;

      seen.add(key);
      return true;
    });
};
