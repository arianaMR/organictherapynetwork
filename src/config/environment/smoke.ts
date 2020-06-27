import base, { Env } from './base';

const smoke: Env = {
  ...base,
  AZURE_INSIGHTS_INSTRUMENTATION_KEY: '[KEY]',
  AZURE_APPLICATION_INSIGHTS_KEY: '[KEY]',
  REACT_APP_CONTENTFUL_CLIENT_SPACE: '9wfbedjgw2mp',
  REACT_APP_CONTENTFUL_CLIENT_ACCESS_TOKEN: 'iCOLGpnrBP8e6akI-I0Nb6Th4zDw1nzExAt0TiyXxTU',
  REACT_APP_CONTENTFUL_CLIENT_HOST: 'cdn.contentful.com',
};

export default smoke;
