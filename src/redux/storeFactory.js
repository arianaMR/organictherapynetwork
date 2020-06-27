import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';

import { createLogger } from 'redux-logger';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import rootSaga from './sagas';
import persistReducer from './persistReducer';
import accessFullStoreInActionsMiddleware from './accessFullStoreInActionsMiddleware';

export default ({ initialState = {} } = {}) => {
  const logger = createLogger({
    predicate: () => process.browser && (window.location.search.includes('redux') || window.redux),
  });
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const devToolsOptions = {
    trace: true,
  };
  const composeEnhancers = composeWithDevTools(devToolsOptions);
  const middleware = applyMiddleware(sagaMiddleware, logger, accessFullStoreInActionsMiddleware);

  const store = createStore(persistReducer, initialState, composeEnhancers(middleware));

  sagaMiddleware.run(rootSaga);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (process.browser && process.env.ENVIRONMENT !== 'prod') {
    window.store = store;
  }

  return store;
};
