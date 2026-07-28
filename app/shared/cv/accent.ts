import type { CvUiConfig } from '../types/config';

const HEX_COLOR = /^#[0-9a-f]{3,8}$/i;
const FALLBACK_COLOR = 'var(--color-content)';

export const resolveAccentColor = (value?: string) =>
  value && HEX_COLOR.test(value) ? value : FALLBACK_COLOR;

export const toAccentStyle = (ui?: CvUiConfig) =>
  `--config-accent: light-dark(${resolveAccentColor(ui?.accentColor)}, ${resolveAccentColor(ui?.accentColorDark)});`;
