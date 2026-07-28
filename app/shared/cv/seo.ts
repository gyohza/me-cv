import type { CvLocaleData } from '../types/config';
import { collectKeywords } from './keywords';

export interface CvSeo {
  title: string;
  description: string;
  keywords: string;
}

const DESCRIPTION_MAX_LENGTH = 160;
const ELLIPSIS = '…';

export const truncateAtWord = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  const slice = text.slice(0, maxLength - ELLIPSIS.length);
  const endsMidWord = !/\s/.test(text.charAt(maxLength - ELLIPSIS.length));
  const lastBoundary = slice.lastIndexOf(' ');
  const cut = endsMidWord && lastBoundary > 0 ? slice.slice(0, lastBoundary) : slice;

  return `${cut.trimEnd()}${ELLIPSIS}`;
};

export const buildSeo = (data: CvLocaleData | undefined): CvSeo => {
  if (!data) return { title: '', description: '', keywords: '' };

  return {
    title: `${data.firstName} ${data.lastName} — ${data.title}`,
    description: truncateAtWord(data.summary, DESCRIPTION_MAX_LENGTH),
    keywords: collectKeywords(data.skillCategories).join(', '),
  };
};
