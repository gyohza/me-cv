// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppResume from '~/components/AppResume.vue';
import { cvData, cvEmail } from '../fixtures/cv';

const mount = (data = cvData) => mountSuspended(AppResume, { props: { data } });

const headingLevels = (wrapper: { findAll: (selector: string) => { element: Element }[] }) =>
  wrapper.findAll('h1, h2, h3, h4, h5, h6').map(({ element }) => Number(element.tagName[1]));

describe('AppResume', () => {
  it('scopes the whole document as a single Person', async () => {
    const root = (await mount()).find('[itemscope]');

    expect(root.attributes('itemtype')).toBe('https://schema.org/Person');
  });

  it('keeps every section inside the Person scope so worksFor and alumniOf attach to it', async () => {
    const wrapper = await mount();
    const person = wrapper.find('[itemtype="https://schema.org/Person"]');

    expect(person.find('[itemprop="worksFor"]').exists()).toBe(true);
    expect(person.find('[itemprop="alumniOf"]').exists()).toBe(true);
    expect(person.find('[itemprop="description"]').exists()).toBe(true);
  });

  it('declares exactly one level 1 heading', async () => {
    expect(headingLevels(await mount()).filter(level => level === 1)).toHaveLength(1);
  });

  it('never skips a heading level', async () => {
    const levels = headingLevels(await mount());

    levels.forEach((level, index) => {
      const previous = levels[index - 1] ?? 0;

      expect(level).toBeLessThanOrEqual(previous + 1);
    });
  });

  it('orders sections the way a resume parser reads them', async () => {
    const wrapper = await mount();
    const sections = wrapper.findAll('h2').map(heading => heading.text());

    expect(sections).toEqual(['Experience', 'Education', 'Skills']);
  });

  it('lays the extracted text out as identity, then contact, then history', async () => {
    const text = (await mount()).text();
    const positions = [
      cvData.firstName,
      cvData.title,
      cvEmail.value,
      'Summary',
      'Experience',
      cvData.experience[0]!.employer,
      'Education',
      cvData.education[0]!.institution,
      'Skills',
    ].map(needle => text.indexOf(needle));

    expect(positions).not.toContain(-1);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it('omits sections the config does not provide', async () => {
    const wrapper = await mount({ ...cvData, education: [], skillCategories: [] });

    expect(wrapper.findAll('h2').map(heading => heading.text())).toEqual(['Experience']);
  });
});
