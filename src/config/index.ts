import { handleActions } from 'redux-actions';

import endpoints, { Endpoints } from './endpoints';
import env from './environment/env';
import { Env } from './environment/base';

export type ConfigState = {
  environment: string;
  buildNumber: string | undefined;
  env: Env;
} & Endpoints;

const initialState: ConfigState = {
  environment: env.environment,
  /* don't need to worry about browser vs node because the store will populate first on server, and that will be fed into browser store on page load */
  buildNumber: process.env.BUILD_NUMBER,
  env,
  ...endpoints,
};

export default handleActions({}, initialState);
