import { ACCESS_TOKEN as accessToken } from './storage';

export const ACCESS_TOKEN = accessToken;
export const BUILD_NUMBER = 'BUILD_NUMBER';

export const domain = (() => {
  if (!process.browser) return '.[SITE NAME].com';
  if (!window.location.href.includes('.com')) return '';
  return '.[SITE NAME].com';
})();
