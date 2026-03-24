export const Spacing = {
  xSmall: 4,
  small: 8,
  regular: 12,
  medium: 16,
  large: 24,
  xLarge: 32,
} as const;
type Spacing = (typeof Spacing)[keyof typeof Spacing];

export const FontSize = {
  small: 13,
  regular: 15,
  titles: 18,
  large: 20,
  xLarge: 24,
} as const;
type FontSize = (typeof FontSize)[keyof typeof FontSize];

export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 20,
} as const;
type BorderRadius = (typeof BorderRadius)[keyof typeof BorderRadius];

export const Colors = {
  navy: "#1B2A4A",
  navyLight: "#2C3E6B",
  background: "#FAFBFC",
  cardBackground: "#FFFFFF",
  accent: "#1B2A4A",
  accentMuted: "#C5CAD3",
  gold: "#C8A951",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  error: "#B91C1C",
  success: "#15803D",
  successLight: "#DCFCE7",
  white: "#FFFFFF",
} as const;
