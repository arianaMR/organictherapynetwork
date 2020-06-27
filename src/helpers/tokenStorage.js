import { ACCESS_TOKEN } from '../constants/storage';

export default {
  get() {
    return process.browser && sessionStorage.getItem(ACCESS_TOKEN);
  },
  set(token) {
    return process.browser && sessionStorage.setItem(ACCESS_TOKEN, token);
  },
  remove() {
    return process.browser && sessionStorage.removeItem(ACCESS_TOKEN);
  },
};
