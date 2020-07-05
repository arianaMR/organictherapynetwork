import React from 'react';
import { ThemeProvider } from 'styled-components';
// must use this same instance on server side
import Helmet from 'react-helmet';
import { StateInspector } from 'reinspect';
import theme from './theme';
import HeaderContainer from './header/containers/HeaderContainer';
import MobileMenuContainer from './mobilemenu/containers/MobileMenuContainer';
import GlobalStyle from './theme/globalstyle';
import Routes from './routes/organisms/Routes';
import CustomIsomorphicProviders from './common/molecules/CustomIsomorphicProviders';

import Loader from './common/atoms/Loader';

export const clientHelmetInstance = Helmet;

const useAppReady = () => {
  const appReady = true; // useSelectors((s) => Object.keys(s.header.stores).length > 0);
  // const fetchHeaderDataAction = useDispatch(fetchHeaderData);

  if (!appReady) return 'App is ready';
  // fetchHeaderDataAction();
  return appReady;
};

const useBootApp = () => 'run any sagas before app boots up';

const Loading = () => (
  <ThemeProvider theme={theme}>
    <div css="width:100%;height:60vh;display: flex;justify-content: center;align-items: center;">
      <Loader />
    </div>
  </ThemeProvider>
);

const App = () => {
  useBootApp();
  const appReady = useAppReady();
  return appReady ? (
    <StateInspector name="Hooks State">
      <CustomIsomorphicProviders>
        <ThemeProvider theme={theme}>
          <div style={{ width: '100vw' }}>
            <GlobalStyle />
            <HeaderContainer />
            <Routes />
            <MobileMenuContainer />
          </div>
        </ThemeProvider>
      </CustomIsomorphicProviders>
    </StateInspector>
  ) : (
    <Loading />
  );
};
export default App;
