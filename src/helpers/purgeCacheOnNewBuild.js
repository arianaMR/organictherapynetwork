import Cookies from 'js-cookie';
import { BUILD_NUMBER } from '../constants/cookies';

export default persistor => {
  const buildNumber = window.__BUILD_NUMBER__;
  delete window.__BUILD_NUMBER__;

  const previousBuildNumber = Cookies.get(BUILD_NUMBER);
  Cookies.set(BUILD_NUMBER, buildNumber);

  if (buildNumber !== previousBuildNumber) persistor.purge();
};
