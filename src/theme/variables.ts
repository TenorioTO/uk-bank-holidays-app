export const Spacing = {
  xSmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xLarge: 32,
} as const;
type Spacing = (typeof Spacing)[keyof typeof Spacing];

export const FontSize = {
  regular: 15,
  titles: 18,
  large: 20,
  xLarge: 24,
} as const;
type FontSize = (typeof FontSize)[keyof typeof FontSize];
