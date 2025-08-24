export type Theme = 'light' | 'dark';

export const themes = {
  light: {
    background: 'rgb(239 246 255)',
    foreground: 'rgb(30 58 138)',
  },
  dark: {
    background: 'rgb(15 23 42)',
    foreground: 'rgb(241 245 249)',
  },
};

export const getThemeColors = (theme: Theme) => themes[theme];

