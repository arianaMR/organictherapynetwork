import { ApolloClient } from 'apollo-client';
import { from, split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
// import Cookies from 'js-cookie';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';
// import sessionToken from '../helpers/tokenStorage';
// import { ACCESS_TOKEN } from '../constants/cookies';
// import endpoints from '../config/endpoints';
import env from '../config/environment/env';
import currentEnvironment from '../constants/currentEnvironment';
import introspectionQueryResultData from '../../fragmentTypes.json';

const { browser } = process;
// Polyfill fetch() on the server (used by apollo-client)
if (!browser) {
  global.fetch = fetch;
}

const { REACT_APP_CONTENTFUL_CLIENT_SPACE, REACT_APP_CONTENTFUL_CLIENT_ACCESS_TOKEN } = env;
// -----------------------------GRAPH_QL------------------//
// const { graphql } = endpoints;

// const httpLink = createHttpLink({
//   uri: graphql,
// });

// const authLink = setContext((_, { headers }) => {
//   const token = sessionToken.get() || Cookies.get(ACCESS_TOKEN);
//   const Authorization = token ? `Bearer ${token}` : '';
//   return {
//     headers: {
//       ...headers,
//       Authorization,
//     },
//   };
// });

// const httpAuthLink = authLink.concat(httpLink);

// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: graphql.replace(/https?/, x => (x === 'http' ? 'wss' : x === 'https' ? 'wss' : x)),
//       options: {
//         reconnect: true,
//       },
//     })
//   : httpAuthLink;

// const splitSocketAndHttp = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//   },
//   wsLink,
//   authLink.concat(httpLink),
// );
// -----------------------------GRAPH_QL------------------//

export const contentfulUri = `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_CONTENTFUL_CLIENT_SPACE}/environments/master`;
export const contentfulHeaders = {
  Authorization: `Bearer ${REACT_APP_CONTENTFUL_CLIENT_ACCESS_TOKEN}`,
};

const contentfulLink = createHttpLink({
  uri: contentfulUri,
  headers: contentfulHeaders,
});

const omitTypenameMiddleware = (operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
    // eslint-disable-next-line no-param-reassign
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }
  return forward(operation);
};

const setContentfulPreviewMiddleware = (operation, forward) => {
  if (operation.variables && operation.getContext().clientName === 'contentful') {
    operation.variables = {
      preview: currentEnvironment !== 'prod' && currentEnvironment !== 'smoke',
      ...operation.variables,
    };
  }
  return forward(operation);
};

const splitContentfulAndMyMedmen = split(
  operation => operation.getContext().clientName === 'contentful',
  contentfulLink,
  // splitSocketAndHttp,
);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default () => {
  const client = new ApolloClient({
    link: from([omitTypenameMiddleware, setContentfulPreviewMiddleware, splitContentfulAndMyMedmen]),
    cache: new InMemoryCache({ addTypename: true, fragmentMatcher }).restore(browser ? window.__APOLLO_STATE__ : ''),
    connectToDevTools: browser,
    ssrMode: !browser,
    ssrForceFetchDelay: 100,
  });
  if (browser) delete window.__APOLLO_STATE__;

  return client;
};
