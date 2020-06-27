/* eslint-disable no-console */
import React from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { renderToString } from 'react-dom/server';
import createHelmet from './createHelmet';

export default App => {
  const sheet = new ServerStyleSheet();
  let root = '';
  let styles = '';
  try {
    const StyledApp = <StyleSheetManager sheet={sheet.instance}>{App}</StyleSheetManager>;
    root = renderToString(StyledApp);
    styles = sheet.getStyleTags();
  } catch (styleError) {
    console.error('error processing stylesheet: ', styleError);
    try {
      root = renderToString(App);
    } catch (appError) {
      console.error('error rendering app string: ', appError);
    }
  } finally {
    sheet.seal();
  }
  const helmet = createHelmet();

  return { root, styles, helmet };
};
