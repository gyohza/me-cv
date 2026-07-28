import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const mainCss = readFileSync(resolve(process.cwd(), 'app/assets/css/main.css'), 'utf8');

export const readThemeColor = (token: string) => {
  const match = mainCss.match(
    new RegExp(`--color-${token}:\\s*light-dark\\(\\s*(#[0-9a-f]{6})\\s*,\\s*(#[0-9a-f]{6})\\s*\\)`, 'i'),
  );

  if (!match) throw new Error(`No light-dark() declaration found for --color-${token}`);

  return { light: match[1]!, dark: match[2]! };
};
