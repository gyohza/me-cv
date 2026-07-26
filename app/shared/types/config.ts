export interface CvLink {
  icon: string;
  label: string;
  value: string;
  url: string;
}

export interface CvRole {
  name: string;
  highlights: string[];
}

export interface CvExperience {
  employer: string;
  location: string;
  tenure: string;
  roles: CvRole[];
}

export interface CvEducation {
  institution: string;
  title: string;
  graduatedIn: string;
  highlights?: string[];
}

export interface CvSkillCategory {
  name: string;
  skills: string[];
  keywords: string[];
}

export interface CvLocaleData {
  firstName: string;
  lastName: string;
  title: string;
  links: CvLink[];
  summary: string;
  experience: CvExperience[];
  education: CvEducation[];
  skillCategories: CvSkillCategory[];
}

export interface CvUiConfig {
  accentColor: string;
  accentColorDark: string;
}

export interface CvConfig {
  ui?: CvUiConfig;
  data: Record<string, CvLocaleData>;
}
