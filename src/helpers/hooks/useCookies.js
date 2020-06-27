import React, { useState, createContext, useContext } from 'react';
import useInterval from '@use-it/interval';
import Cookies from 'js-cookie';
import * as cookieConstants from '../../constants/cookies';

const CookiesContext = createContext();

const cookieModuleBlacklist = ['domain'];
const cookieWhitelist = Object.keys(cookieConstants).filter(x => !cookieModuleBlacklist.includes(x));

const getStringCookies = cookies => {
  // on server, cookies will come in. otherwise, just call cookies.get
  if (process.browser) cookies = Cookies.get();
  // retain only our whitelisted cookies and stringify
  return JSON.stringify(
    Object.entries(typeof cookies === 'object' ? cookies : {})
      .filter(([key]) => cookieWhitelist.includes(key))
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
  );
};

export const CookiesProvider = ({ children, cookies }) => {
  const [cookiesStr, setCookies] = useState(getStringCookies(cookies));
  useInterval(() => {
    const newCookiesStr = getStringCookies(cookies);
    if (cookiesStr !== newCookiesStr) setCookies(newCookiesStr);
  }, 1000);
  return <CookiesContext.Provider value={cookiesStr}>{children}</CookiesContext.Provider>;
};

export default () => {
  const cookiesStr = useContext(CookiesContext);
  const cookies = JSON.parse(cookiesStr);
  // send out all the cookies, and all the methods on Cookies
  return { ...cookies, ...Cookies };
};
