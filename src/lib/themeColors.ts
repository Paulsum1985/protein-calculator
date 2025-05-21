export const themeColors = {
  purple: {
    primary: '260 70% 60%',
    'primary-dark': '260 70% 70%', 
    'primary-hover': '260 70% 50%',
    'primary-hover-dark': '260 70% 60%', 
    accent: '280 70% 65%',
    'accent-dark': '280 70% 75%', 
    'card-bg': '260 30% 97%',
    'card-bg-dark': '260 20% 12%', 
    'card-border': '260 40% 85%',
    'card-border-dark': '260 20% 20%', 
    'text-on-primary': '0 0% 100%',
    'text-on-primary-dark': '0 0% 100%', 
    'page-bg': '260 50% 95%',         // Very light purple for page background
    'page-bg-dark': '260 30% 10%',    // Very dark purple for page background
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
    'page-bg': '210 50% 95%',
    'page-bg-dark': '210 30% 10%',
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
    'text-on-primary': '0 0% 100%',
    'text-on-primary-dark': '0 0% 100%',
    'page-bg': '140 50% 95%',
    'page-bg-dark': '140 30% 10%',
  }
};
export type ThemeKey = keyof typeof themeColors;
export type ThemeColorProperties = keyof typeof themeColors['purple'];
