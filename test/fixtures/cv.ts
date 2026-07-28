import { FALLBACK_LOCALE, resolveLocaleData } from '~/shared/cv/locale';
import type { CvConfig, CvLink, CvLocaleData } from '~/shared/types/config';

export const cvConfig: CvConfig = {
  ui: { accentColor: '#5c9ead', accentColorDark: '#5c9ead' },
  data: {
    [FALLBACK_LOCALE]: {
      firstName: 'Daniel',
      lastName: 'Nagaoka',
      title: 'Senior Frontend Software Engineer',
      links: [
        {
          label: 'Location',
          value: 'Sao Paulo state, Brazil',
          url: 'https://maps.app.goo.gl/TEupcbpUActkp11d6',
        },
        { label: 'Email', value: 'dan@example.com', url: 'mailto:dan@example.com' },
        { label: 'WhatsApp', value: '+55 11 99931-5049', url: 'https://wa.me/5511999315049' },
        {
          label: 'LinkedIn',
          value: 'linkedin.com/in/daninagaoka',
          url: 'https://www.linkedin.com/in/daninagaoka',
          icon: 'ph:linkedin-logo-fill',
        },
      ],
      summary: 'Senior software engineer with over 10 years of experience.',
      experience: [
        {
          employer: 'Volpi.tech',
          location: 'Remote',
          tenure: 'Dec 2024 — Jul 2026',
          roles: [
            { name: 'Senior Frontend Engineer', highlights: ['Led the design system rewrite'] },
          ],
        },
        {
          employer: 'LuizaLabs',
          location: 'Remote',
          tenure: 'Dec 2022 — Nov 2024',
          roles: [
            { name: 'Frontend Engineer', highlights: ['Shipped the checkout redesign'] },
          ],
        },
      ],
      education: [
        {
          institution: 'Universidade Paulista',
          location: 'Jundiaí, SP',
          title: 'BSc Computer Science',
          graduatedIn: 'Dec 2020',
        },
      ],
      skillCategories: [
        { name: 'Frontend', skills: ['TypeScript', 'Vue.js/Nuxt'], keywords: ['ts', 'vue', 'nuxt'] },
      ],
    },
  },
};

const requireLocaleData = (): CvLocaleData => {
  const data = resolveLocaleData(cvConfig, FALLBACK_LOCALE);

  if (!data) throw new Error(`fixture ships no data for ${FALLBACK_LOCALE}`);

  return data;
};

export const cvData = requireLocaleData();

const requireLinkByLabel = (label: string): CvLink => {
  const link = cvData.links.find(candidate => candidate.label === label);

  if (!link) throw new Error(`fixture ships no ${label} link`);

  return link;
};

export const cvEmail = requireLinkByLabel('Email');
export const cvPhone = requireLinkByLabel('WhatsApp');
