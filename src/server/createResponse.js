/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import serialize from 'serialize-javascript';
import html from './html';
import renderAppString from './renderAppString';
import currentEnvironment from '../constants/currentEnvironment';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default (ServerApp, initialState, apolloState) => {
  const { styles, root, helmet } = renderAppString(ServerApp);
  return `<!doctype html>
            <html lang="">
            <head>
              ${helmet}
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>${styles}</style>
              ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
              ${
                process.env.NODE_ENV === 'production'
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`
              }
              ${html.head}
            </head>
            <body>
              ${html.body}
              <div id="root">${root}</div>
              <script>
                window.__ENVIRONMENT__ = ${serialize(currentEnvironment)};
                window.__INITIAL_STATE__ = ${serialize(initialState)};
                window.__APOLLO_STATE__ = ${serialize(apolloState)};
                window.__BUILD_NUMBER__ = ${serialize(process.env.BUILD_NUMBER)};
              </script>
            </body>
        </html>`;
};
