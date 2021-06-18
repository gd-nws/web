export interface Theme extends BaseTheme {
  colors: ColorScheme;
}

interface ColorScheme {
  negative: string;
  negativeLight: string;
  positive: string;
  positiveLight: string;
  info: string;
  infoDark: string;
  infoLight: string;
  offWhite: string;
}

interface BaseTheme {
  breakpoints: {
    mobile: number;
    desktop: number;
  };
  transition: string;
  boxShadow: string;
  font: string;
}

const baseTheme: BaseTheme = {
  breakpoints: {
    mobile: 900,
    desktop: 1200
  },
  transition: "all 0.2s ease",
  boxShadow:
    "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);",
  font: `"Avenir", Helvetica, Arial, sans-serif`
};

export const LightTheme: Theme = {
  ...baseTheme,
  colors: {
    negative: "rgba(255, 56, 96, 1)",
    negativeLight: "hsl(347, 90%, 96%)",
    positive: "rgba(0, 209, 178, 1)",
    positiveLight: "hsl(171, 100%, 96%)",
    info: "hsl(204, 86%, 53%)",
    infoLight: "hsl(206, 70%, 96%)",
    infoDark: "hsl(217, 71%, 53%)",
    offWhite: "#ccc"
  }
};

export interface ThemeState {
  theme: Theme;
}
