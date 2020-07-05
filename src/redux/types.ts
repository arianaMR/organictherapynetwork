import { Store } from 'redux';
import { SagaMiddleware } from 'redux-saga';

import { ConfigState } from '../config';
import { SidebarState } from '../sidebar';

export interface ReduxState {
  config: ConfigState;
  sidebar: SidebarState;
}

export type ReduxStore = Store & {
  runSaga: SagaMiddleware['run'];
  close: () => void;
};
