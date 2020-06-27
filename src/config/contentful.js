import { createClient } from 'contentful';

import env from './environment/env';

export default createClient({
  space: env.REACT_APP_CONTENTFUL_CLIENT_SPACE,
  host: env.REACT_APP_CONTENTFUL_CLIENT_HOST,
  accessToken: env.REACT_APP_CONTENTFUL_CLIENT_ACCESS_TOKEN,
});
