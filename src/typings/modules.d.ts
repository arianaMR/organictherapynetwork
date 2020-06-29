declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module 'uuid' {
  const value: string;
  export default () => value;
}

declare module 'redux-actions';
declare module '@intellihr/styled-components-breakpoint';
declare module '@redux-saga/simple-saga-monitor';
