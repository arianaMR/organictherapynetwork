import { css, DefaultTheme } from 'styled-components';
import breakpoint, { breakSizes } from './breakpoint';

// TODO remove autofill and media from theme
export const autofill = (...args: any) => css`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: ${p => p.theme.colors.black};
    box-shadow: 0 0 0 1000px ${p => p.theme.colors.white} inset;
    ${args && args.length && css(...args)}
  }
`;

// Iterate through the sizes and create a media template
const media = Object.keys(breakSizes).reduce((acc, label) => {
  acc[label] = (...args: any) => css`
    @media (max-width: ${breakSizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

const theme: DefaultTheme = {
  breakSizes,
  media,
  autofill,
  breakpoint,
  colors: {
    green2: '#00563f',
    green1: '#479f46',
    blue2: '#000a8b',
    blue1: '#00a8e1',
    purple: '#873299',
    pink: '#ea1d76',
    yellow: '#ffb819',
    red3: '#550505',
    red2: '#aa1f16',
    red1: '#bf1c1f',
    black: '#222',
    gray9: '#CCCCCC',
    gray8: '#22222260',
    gray7: '#22222220',
    gray65: '#53565A',
    gray6: '#585858',
    gray5: '#858585',
    gray45: '#7C7C7C',
    gray4: '#aaa',
    gray31: '#C4C4C4',
    gray3: '#c7c7c7',
    gray27: '#e4ecf6',
    gray26: '#D2D2D2',
    gray25: '#D9D9D6',
    gray2: '#f4f4f4',
    gray1: '#fafafa',
    white: '#fff',
    gold: '#DEB382',

    sativaDominant: '#EA1D76',
    sativa: '#FFB819',
    indicaDominant: '#00A8E1',
    hybrid: '#00A8E1',
    indica: '#000A8B',
  },
  fonts: {
    primary: 'Playfair Display',
  },
  elements: {
    header: '120px',
    footer: '800px',
    maxWidth: '1440px',
  },
};

export default theme;
