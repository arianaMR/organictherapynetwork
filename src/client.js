import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'babel-polyfill';
import 'intersection-observer';

import React, { StrictMode } from 'react';
import { hydrate } from 'react-dom';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import 'normalize.css';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import Cookies from 'js-cookie';
import App from './App';
import clientStore from './redux/clientStore';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import initializeScripts from './config/scripts/initializeScripts';
import purgeCacheOnNewBuild from './helpers/purgeCacheOnNewBuild';
import { DeviceProvider } from './helpers/hooks/useDeviceDetect';
import client from './graphql';
import { CookiesProvider } from './helpers/hooks/useCookies';
import clientHistory from './history/clientHistory';

const persistor = persistStore(clientStore);
purgeCacheOnNewBuild(persistor);
hydrate(
  <StrictMode>
    <Provider store={clientStore}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Router history={clientHistory}>
            <PersistGate persistor={persistor} loading={null}>
              <DeviceProvider>
                <CookiesProvider>
                  <App />
                </CookiesProvider>
              </DeviceProvider>
            </PersistGate>
          </Router>
        </ApolloHooksProvider>
      </ApolloProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

if (module.hot) module.hot.accept();
