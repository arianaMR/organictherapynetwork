import base, { Env } from './base';

const dev: Env = {
  ...base,
  AZURE_INSIGHTS_INSTRUMENTATION_KEY: '[KEY]',
  AZURE_APPLICATION_INSIGHTS_KEY: '[KEY]',
  REACT_APP_CONTENTFUL_CLIENT_SPACE: '9wfbedjgw2mp',
  REACT_APP_CONTENTFUL_CLIENT_ACCESS_TOKEN: 'rWck6jwWDGaKMTwn2GQNRiAHnc908Tx8FdWhgiqydGI',
  REACT_APP_CONTENTFUL_CLIENT_HOST: 'preview.contentful.com',
};

export default dev;
