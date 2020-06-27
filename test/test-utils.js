import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MockedProvider } from '@apollo/react-testing';
import { useApolloClient } from '@apollo/react-hooks';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import theme from 'mmn/theme';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import deepmerge from 'deepmerge';
import createSagaMiddleware from 'redux-saga';
import reducers from '../src/redux/reducers';
import rootSaga from '../src/redux/sagas';
import accessFullStoreInActionsMiddleware from '../src/redux/accessFullStoreInActionsMiddleware';
// would normally put this in the setupTests file but razzle does not support setupFilesAfterEnv or setupTestFrameworkScriptFile so expect is not loaded yet, and this library errors out
import '@testing-library/jest-dom/extend-expect';
import { CookiesProvider } from '../src/helpers/hooks/useCookies';

const createCustomStore = state => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware, accessFullStoreInActionsMiddleware);
  let store = createStore(reducers, {}, middleware);
  if (typeof state === 'object' && Object.keys(state).length) {
    const defaultState = store.getState();
    const mergedState = deepmerge(defaultState, state);
    store = createStore(reducers, mergedState, middleware);
  }
  sagaMiddleware.run(rootSaga);
  return store;
};

const ThemeWrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

const customRender = (ui, options) => render(ui, { wrapper: ThemeWrapper, ...options });

// i think this will be easier than having a bunch of different individual renderers. However, leaving the initial renderers here until certain. can delete later
const dynamicProviderCreatingRender = (ui, providerOptions = {}, options) => {
  let store;
  let history;
  let state;
  let route;
  let mocks;
  let cookies;
  let client;
  // give the option to just feed in a string to indicate which providers are necessary if no initial state/route/mocks are needed; if you want to both feed in custom initial values, and use a string shorthand, feed in providers key on that object with the string you want
  const providersString = typeof providerOptions === 'string' ? providerOptions : providerOptions.providers;
  if (providersString) {
    // re = redux, ro = router, ap = apollo, co = cookies. feed in whatever desired and the defaults required will be set
    // NOTE if we pass in ff or
    if (providersString.match(/re/i)) state = {};
    if (providersString.match(/ro/i)) route = '/';
    if (providersString.match(/ap/i)) mocks = [];
    if (providersString.match(/co/i)) cookies = {};
  }
  // in addition to string provider shorthand, can also feed custom initial values to use for each of these
  if (providerOptions.state) ({ state } = providerOptions);
  if (providerOptions.route) ({ route } = providerOptions);
  if (providerOptions.mocks) ({ mocks } = providerOptions);
  if (providerOptions.cookies) ({ cookies } = providerOptions);
  const providers = [];
  if (state) {
    store = createCustomStore(state);
    providers.push(({ children }) => <Provider store={store}>{children}</Provider>);
  }
  if (route) {
    history = createMemoryHistory({ initialEntries: [route] });
    providers.push(({ children }) => <Router history={history}>{children}</Router>);
  }
  if (mocks) {
    const ClientAccessor = ({ children }) => {
      client = useApolloClient();
      return children;
    };
    // automatically add flags to the cache (in app they come back from server and hydrate client pre-boot). pass in any flag object to override defaults
    providers.push(({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <ClientAccessor>{children}</ClientAccessor>
      </MockedProvider>
    ));
  }
  if (cookies) {
    providers.push(({ children }) => <CookiesProvider cookies={cookies}>{children}</CookiesProvider>);
  }

  const Providers = ({ children }) => {
    if (!providers.length) return children;
    const Initial = providers[providers.length - 1];
    return providers.slice(0, -1).reduceRight((acc, X) => <X>{acc}</X>, <Initial>{children}</Initial>);
  };

  return {
    ...customRender(<Providers>{ui}</Providers>, options),
    store,
    history,
    client,
  };
};
export const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

export const setPathname = pathname =>
  Object.defineProperty(window, 'location', {
    value: {
      pathname,
    },
    writable: true,
  });

// eslint is having trouble resolving named exports eith the 'export * from ' syntax. until i find a fix for that i'm just manually exporting those that i've used so the linter stops complaining
export { screen, fireEvent, logDOM, wait, act } from '@testing-library/react';
// still adding this so we have access to all methods without defining them above, even if eslint doesnt recognize them
export * from '@testing-library/react';
export { dynamicProviderCreatingRender as render };
export { render as originalRender };

export * from './__mocks__/data';
