import currentEnvironment from '../../constants/currentEnvironment';

type Base = {
  environment: string;
  REACT_APP_GOOGLE_PLACES_API_KEY: string;
  REACT_APP_GOOGLE_EMBEDED_PLACES_API_KEY: string;
  REACT_APP_RECAPTCHA_KEY: string;
};

export type Env = {
  AZURE_INSIGHTS_INSTRUMENTATION_KEY: string;
  REACT_APP_CONTENTFUL_CLIENT_SPACE: string;
  REACT_APP_CONTENTFUL_CLIENT_HOST: string;
  REACT_APP_CONTENTFUL_CLIENT_ACCESS_TOKEN: string;
  AZURE_APPLICATION_INSIGHTS_KEY: string;
} & Base;

const base: Base = {
  environment: currentEnvironment,
  REACT_APP_GOOGLE_PLACES_API_KEY: '[KEY]',
  REACT_APP_GOOGLE_EMBEDED_PLACES_API_KEY: '[KEY]',
  REACT_APP_RECAPTCHA_KEY: '[KEY]',
};

export default base;
