const channels = (hex: string) =>
  [1, 3, 5].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16));

const linearise = (value: number) => {
  const ratio = value / 255;

  return ratio <= 0.04045 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string) => {
  const [red, green, blue] = channels(hex).map(linearise);

  return 0.2126 * red! + 0.7152 * green! + 0.0722 * blue!;
};

export const contrastRatio = (foreground: string, background: string) => {
  const [darker, lighter] = [luminance(foreground), luminance(background)].sort((a, b) => a - b);

  return (lighter! + 0.05) / (darker! + 0.05);
};
