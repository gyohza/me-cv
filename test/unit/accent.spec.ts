import { describe, expect, it } from 'vitest';
import { resolveAccentColor, toAccentStyle, toOgAccentColor } from '~/shared/cv/accent';

describe('resolveAccentColor', () => {
  it.each(['#abc', '#5c9ead', '#5C9EAD', '#5c9eadff'])('accepts the hex colour %s', (value) => {
    expect(resolveAccentColor(value)).toBe(value);
  });

  it.each([undefined, '', 'red', 'javascript:alert(1)', '#5c9ead; color: red', '#xyzxyz'])(
    'falls back to the content colour for %s',
    (value) => {
      expect(resolveAccentColor(value)).toBe('var(--color-content)');
    },
  );
});

describe('toAccentStyle', () => {
  it('declares both themes in a single custom property', () => {
    expect(toAccentStyle({ accentColor: '#5c9ead', accentColorDark: '#8fd3e0' })).toBe(
      '--config-accent: light-dark(#5c9ead, #8fd3e0);',
    );
  });

  it('degrades to the content colour when the config has no ui block', () => {
    expect(toAccentStyle(undefined)).toBe(
      '--config-accent: light-dark(var(--color-content), var(--color-content));',
    );
  });
});

describe('toOgAccentColor', () => {
  it('picks the dark accent, since the og image is always rendered dark', () => {
    expect(toOgAccentColor({ accentColor: '#5c9ead', accentColorDark: '#8fd3e0' })).toBe('#8fd3e0');
  });

  it.each([undefined, { accentColor: '#5c9ead', accentColorDark: 'rebeccapurple' }])(
    'yields nothing for %s, because satori cannot resolve a css custom property',
    (ui) => {
      expect(toOgAccentColor(ui)).toBeUndefined();
    },
  );
});
