export const themeColors = {
  purple: {
    primary: '260 70% 60%',
    'primary-dark': '260 70% 70%', // Slightly lighter for dark mode
    'primary-hover': '260 70% 50%',
    'primary-hover-dark': '260 70% 60%', // Lighter hover for dark
    accent: '280 70% 65%',
    'accent-dark': '280 70% 75%', // Lighter
    'card-bg': '260 30% 97%',
    'card-bg-dark': '260 20% 12%', // Darker card background
    'card-border': '260 40% 85%',
    'card-border-dark': '260 20% 20%', // Darker border
    'text-on-primary': '0 0% 100%',
    'text-on-primary-dark': '0 0% 100%', // Assuming primary colors remain dark enough for light text
  },
  blue: {
    primary: '210 70% 55%',
    'primary-dark': '210 70% 65%',
    'primary-hover': '210 70% 45%',
    'primary-hover-dark': '210 70% 55%',
    accent: '190 70% 60%',
    'accent-dark': '190 70% 70%',
    'card-bg': '210 30% 97%',
    'card-bg-dark': '210 20% 12%',
    'card-border': '210 40% 85%',
    'card-border-dark': '210 20% 20%',
    'text-on-primary': '0 0% 100%',
    'text-on-primary-dark': '0 0% 100%',
  },
  green: {
    primary: '140 60% 45%',
    'primary-dark': '140 60% 55%',
    'primary-hover': '140 60% 35%',
    'primary-hover-dark': '140 60% 45%',
    accent: '160 60% 50%',
    'accent-dark': '160 60% 60%',
    'card-bg': '140 30% 97%',
    'card-bg-dark': '140 20% 12%',
    'card-border': '140 40% 85%',
    'card-border-dark': '140 20% 20%',
    'text-on-primary': '0 0% 100%', // Green is a bit lighter, white text should still be fine.
    'text-on-primary-dark': '0 0% 100%',
  }
};
export type ThemeKey = keyof typeof themeColors;
export type ThemeColorProperties = keyof typeof themeColors['purple'];
