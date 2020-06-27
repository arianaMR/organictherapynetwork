/* eslint-disable no-console */
import React, { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import express, { Request, Response } from 'express';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import compression from 'compression';
import morgan from 'morgan';
import { join } from 'path';
import checkIfMobile from 'is-mobile';
import cookieParser from 'cookie-parser';
import App from './App';
import createApollo from './graphql/createApollo';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import customizeConsole from './server/utils/customizeConsole';
import storeFactory from './redux/storeFactory';
import createResponse from './server/createResponse';
import { DeviceProvider } from './helpers/hooks/useDeviceDetect';
import { CookiesProvider } from './helpers/hooks/useCookies';
import runApolloQueriesAndSagas, { CustomStore } from './server/runApolloQueriesAndSagas';
import routes from './server/routes';

const staticPath = join(__dirname, 'public');
const server = express();

server.use(compression());
server.use(morgan('dev'));
server.use(cookieParser());

// handle any specific non-client SPA routes
routes(server);

type IRouteContext = {
  url?: string;
  status?: number;
};

server
  .disable('x-powered-by')
  .use(express.static(staticPath))
  .get('/*', async (req: Request, res: Response) => {
    const store = storeFactory();
    // get rid of this when direct store imports all removed. just a bandaid until dependency cycles all resolved
    global.store = store;
    const client = createApollo();
    const isMobile = checkIfMobile({ ua: req.headers['user-agent'] });
    const context: IRouteContext = {};
    const ServerApp = (
      <StrictMode>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
              <StaticRouter location={req.url} context={context}>
                <DeviceProvider isMobile={isMobile}>
                  <CookiesProvider cookies={req.cookies}>
                    <App />
                  </CookiesProvider>
                </DeviceProvider>
              </StaticRouter>
            </ApolloHooksProvider>
          </ApolloProvider>
        </Provider>
      </StrictMode>
    );
    // await the resolution of any apollo/saga queries before rendering app, and grabbing prepopulated apolo/redux initial state
    const { apolloState, reduxState } = await runApolloQueriesAndSagas(ServerApp, store as CustomStore, client);

    const response = createResponse(ServerApp, reduxState, apolloState);
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(context.status || 200).send(response);
      console.log(`------successfully served ${req.url} ------`);
    }
    if (global.store) delete global.store;
  });

export default server;
