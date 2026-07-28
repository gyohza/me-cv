// @vitest-environment nuxt
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppEducationEntry from '~/components/AppEducationEntry.vue';
import type { CvEducation } from '~/shared/types/config';

const entry: CvEducation = {
  institution: 'Universidade Paulista',
  location: 'Jundiaí, SP',
  title: 'Bachelor of Computer Science',
  graduatedIn: 'Dec 2020',
  highlights: ['Highest overall grade in class: 9.3/10'],
};

const mount = (props = entry) => mountSuspended(AppEducationEntry, { props: { entry: props } });

describe('AppEducationEntry', () => {
  it('leads with the institution at heading level 3', async () => {
    expect((await mount()).find('h3').text()).toBe('Universidade Paulista');
  });

  it('states the degree and graduation date as text', async () => {
    const text = (await mount()).text();

    expect(text).toContain('Bachelor of Computer Science');
    expect(text).toContain('Dec 2020');
  });

  it('marks the institution as a school the person attended', async () => {
    const article = (await mount()).find('article');

    expect(article.attributes('itemprop')).toBe('alumniOf');
    expect(article.attributes('itemtype')).toBe('https://schema.org/EducationalOrganization');
    expect(article.find('[itemprop="name"]').text()).toBe('Universidade Paulista');
  });

  it('renders highlights when present', async () => {
    expect((await mount()).findAll('li').map(item => item.text())).toEqual([
      '• Highest overall grade in class: 9.3/10',
    ]);
  });

  it('omits the highlight list when the entry has none', async () => {
    const wrapper = await mount({ ...entry, highlights: undefined });

    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('keeps the entry on a single printed page', async () => {
    expect((await mount()).find('article').classes()).toContain('break-inside-avoid');
  });
});
