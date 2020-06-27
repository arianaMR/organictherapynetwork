import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakSizes: {
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      max: number;
      sidebar: number;
    };
    breakpoint: {
      down: (size: string) => (strings: TemplateStringsArray, ...args: string[]) => string;
      up: (size: string) => (strings: TemplateStringsArray, ...args: string[]) => string;
    };
    // TODO media and autofill should probably be removed but they do seeem to be used in a few places
    media: object;
    autofill: object;
    colors: {
      green2: string;
      green1: string;
      blue2: string;
      blue1: string;
      purple: string;
      pink: string;
      yellow: string;
      red3: string;
      red2: string;
      red1: string;
      black: string;
      gray9: string;
      gray8: string;
      gray7: string;
      gray65: string;
      gray6: string;
      gray5: string;
      gray45: string;
      gray4: string;
      gray31: string;
      gray3: string;
      gray26: string;
      gray25: string;
      gray2: string;
      gray1: string;
      white: string;

      sativaDominant: string;
      sativa: string;
      indicaDominant: string;
      hybrid: string;
      indica: string;
    };
    fonts: {
      primary: string;
    };
    elements: {
      header: string;
      footer: string;
      maxWidth: string;
    };
  }
}
