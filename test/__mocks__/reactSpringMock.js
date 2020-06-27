import React from 'react';

export const useTransition = show => [{ item: show }];

export const animated = {
  div: ({ children }) => React.createElement('div', null, children),
};
