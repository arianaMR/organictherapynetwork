import $ from 'jquery';

export default {
  lock(target) {
    if (!process.browser) return;
    if (target) $('body').css({ [target]: 'hidden' });
    else {
      $('body').css({ overflow: 'hidden' });
    }
  },

  unlock(target) {
    if (!process.browser) return;
    if (target) $('body').css({ [target]: 'scroll' });
    else $('body').css({ overflow: 'scroll', position: 'relative' });
  },
};
