/* eslint-disable @typescript-eslint/camelcase */
import env from './environment/env';

const graphql: string = {
  // dev: 'http://localhost:4000/graphql',
  dev: 'https://ql-dev.my[SITE NAME]interface.com/graphql',
  test: 'https://ql-qa.my[SITE NAME]interface.com/graphql',
  stage: 'https://ql-stage.my[SITE NAME]interface.com/graphql',
  shadow: 'https://ql-shadow.my[SITE NAME]interface.com/graphql',
  smoke: 'https://ql-smoke.my[SITE NAME]interface.com/graphql',
  prod: 'https://ql.my[SITE NAME]interface.com/graphql',
}[env.environment];

const clutchBase: string = {
  dev: 'https://menu-api-dev.[SITE NAME].com/api',
  test: 'https://menu-api-qa.[SITE NAME].com/api',
  stage: 'https://menu-api-staging.[SITE NAME].com/api',
  shadow: 'https://menu-api-shadow.[SITE NAME].com/api',
  smoke: 'https://menu-api-smoke.[SITE NAME].com/api',
  prod: 'https://menu-api.[SITE NAME].com/api',
}[env.environment];

export type Endpoints = {
  graphql: string;
  external: {
    googleGeocode: string;
    ipApi: string;
    googleGeolocate: string;
  };
  contentful: {
    globalNav: {
      content_type: string;
      'sys.id[in]': string;
      include: number;
    };
    announcements: {
      homepage: string;
      giftCards: string;
      stores: string;
    };
    stores: {
      include: number;
      content_type: string;
    };
    whatWeDo: {
      stats: { 'sys.id[in]': string };
      redefining: { 'sys.id[in]': string };
      cultivation: { 'sys.id[in]': string };
      retail: { 'sys.id[in]': string };
    };
    footer: {
      quickLinks: string;
      company: string;
      help: string;
      gallery1: string;
      gallery2: string;
      gallery3: string;
      gallery4: string;
      gallery5: string;
    };
    pressReleaseArchivePageContent: {
      content_type: string;
      order: string;
    };
    homepage: {
      id: string;
    };
    blogCategory: { content_type: string; order: string };
  };
  clutch: {
    signup: string;
    getNearestDeliveryStore: string;
    getAllStoresByUsersState: string;
    socialAuth: string;
  };
};

const endpoints: Endpoints = {
  graphql,
  external: {
    googleGeocode: 'https://maps.googleapis.com/maps/api/geocode/json',
    ipApi: 'http://ip-api.com/json',
    googleGeolocate: `https://www.googleapis.com/geolocation/v1/geolocate?key=${env.REACT_APP_GOOGLE_PLACES_API_KEY}`,
  },
  contentful: {
    globalNav: {
      content_type: 'multiReferences',
      'sys.id[in]': '9v3c3eBcSn6DLMCHcSmwB',
      include: 2,
    },
    announcements: {
      homepage: '1l9xQkYiIcQmwUui0i8Oue',
      giftCards: '1uEy4NMypKAW0Skwu2EUIq',
      stores: '3Cgilf2wFGQOuG48u28A2k',
    },
    stores: {
      include: 2,
      content_type: 'store',
    },
    whatWeDo: {
      stats: { 'sys.id[in]': '5VkApp9CEwoqmiYOU8kG2W' },
      redefining: { 'sys.id[in]': '25CRNISFWMw0iIsU08qm2G' },
      cultivation: { 'sys.id[in]': '33dewHKcK4EUa04IYiyKGY' },
      retail: { 'sys.id[in]': '6bneJgOZCE2GYSE8WWOoYg' },
    },
    footer: {
      quickLinks: '5iFjlPYn5JpfdFAUpiqI7Q',
      company: '6b5PeABjHL8RH1OitIrM2R',
      help: '70WfKLP2Cfhd0Hl1qjxFHj',
      gallery1: '2vQvKMM73iemESuqmyEa2o',
      gallery2: '7hMf6qhza0wo4gYUio6eqO',
      gallery3: 'znL61aN9e0U8SoW2Qgkma',
      gallery4: '6dKTMF47aEY8cKeY42Kw4g',
      gallery5: '6N9URIdP0sM0qcc0oMq8Y0',
    },
    pressReleaseArchivePageContent: {
      content_type: 'pressRelease',
      order: '-fields.publishedDatetime',
    },
    homepage: {
      id: '7yjDSfwr3Wr0PViA9qzmqK',
    },
    blogCategory: { content_type: 'blogCategory', order: 'sys.createdAt' },
  },
  clutch: {
    signup: `${clutchBase}/signup`,
    getNearestDeliveryStore: `${clutchBase}/stores/getNearestDeliveryStore`,
    getAllStoresByUsersState: `${clutchBase}/stores/getAllStoresByUsersState`,
    socialAuth: `${clutchBase}/social/auth`,
  },
};

export default endpoints;
