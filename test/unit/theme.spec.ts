import { describe, expect, it } from 'vitest';
import { contrastRatio } from '../support/contrast';
import { mainCss, readThemeColor } from '../support/stylesheet';

const surface = readThemeColor('surface');
const content = readThemeColor('content');
const label = readThemeColor('label');

const WCAG_AA_NORMAL_TEXT = 4.5;

describe('theme contrast', () => {
  it.each([
    ['body text, light', content.light, surface.light],
    ['body text, dark', content.dark, surface.dark],
    ['secondary text, light', label.light, surface.light],
    ['secondary text, dark', label.dark, surface.dark],
  ])('meets WCAG AA for %s', (_name, foreground, background) => {
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  it('tunes the secondary text colour separately per theme', () => {
    expect(label.light).not.toBe(label.dark);
  });
});

describe('print stylesheet', () => {
  const printBlock = mainCss.slice(mainCss.indexOf('@media print'));

  it('pins the printed page to the light palette, whatever the screen theme is', () => {
    expect(printBlock).toMatch(/color-scheme:\s*light/);
  });

  it('gives the page real margins instead of bleeding to the paper edge', () => {
    const margin = printBlock.match(/@page\s*{[^}]*margin:\s*([^;]+);/)?.[1];

    expect(margin).toBeDefined();
    expect(margin).not.toMatch(/^0/);
  });

  it('never flattens every element spacing, which would collapse the layout', () => {
    expect(printBlock).not.toMatch(/\*\s*{[^}]*padding:\s*0/);
  });

  it('keeps headings attached to the content they introduce', () => {
    expect(printBlock).toMatch(/break-after:\s*avoid/);
  });
});
