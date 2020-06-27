declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module 'redux-actions';
declare module '@intellihr/styled-components-breakpoint';

declare namespace NodeJS {
  export interface Global {
    store: any;
  }
  export interface Process {
    browser: boolean;
  }
}
declare namespace Document {
  export interface Process {
    browser: boolean;
  }
}
