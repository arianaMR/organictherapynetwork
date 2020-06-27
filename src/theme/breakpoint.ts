import styledBreakpoint from '@intellihr/styled-components-breakpoint';

// Create an instance of styled-components-breakpoint and pass it an object of breakpoints.

export const breakSizes = {
  xs: 320,
  s: 576,
  m: 768,
  l: 1024,
  xl: 1200,
  max: 1440,
  sidebar: 497,
};

export default styledBreakpoint(breakSizes);
