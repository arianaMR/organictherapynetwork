import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';

const QueryStringContext = createContext();

export const QueryStringProvider = ({ children }) => {
  const { search } = useLocation();
  return <QueryStringContext.Provider value={search}>{children}</QueryStringContext.Provider>;
};

const defaultOptions = { parseBooleans: true, parseNumbers: true };

export default (options = defaultOptions) => {
  const search = useContext(QueryStringContext);
  const [params, setParams] = useState(queryString.parse(search, options));
  useEffect(() => {
    const parsed = queryString.parse(search, options);
    if (JSON.stringify(search) !== JSON.stringify(parsed)) setParams(parsed);
  }, [options, search]);
  return { ...params, ...queryString };
};
