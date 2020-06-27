import { createBrowserHistory, createMemoryHistory } from 'history';
import isAbsoluteUrl from 'is-absolute-url';

const destinationIsSame = input => {
  let next = '';
  if (typeof input === 'string') next = input;
  if (typeof input === 'object' && typeof input.pathname === 'string' && typeof input.search === 'string') {
    next = input.pathname + input.search;
  }
  const currentUrl = process.browser && window.location.pathname + window.location.search;
  return next.replace(window.location.origin, '') === currentUrl;
};

export default initialEntries => {
  let history;

  if (process.browser) {
    history = createBrowserHistory();
    // override history push in case the url is absolute
    const { push } = history;
    history.push = input => {
      if (history.secondaryClickKey) {
        return window.open(
          typeof input === 'string' && !isAbsoluteUrl(input) ? window.location.origin + input : input,
          '_blank',
        );
      }
      // skip the history action if the string path is same as current url
      if (destinationIsSame(input)) return null;
      return typeof input === 'string' && isAbsoluteUrl(input) ? window.location.assign(input) : push(input);
    };
  } else {
    history = createMemoryHistory({
      initialEntries,
    });
  }

  return history;
};
