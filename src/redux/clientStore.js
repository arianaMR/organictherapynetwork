import storeFactory from './storeFactory';

// merge in any state that may have been created server side
let initialState;
if (process.browser) {
  initialState = window.__INITIAL_STATE__;
  delete window.__INITIAL_STATE__;
}

export default storeFactory({ initialState });
