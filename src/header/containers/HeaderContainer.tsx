import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import pathsWithoutHeader from '../../constants/pathsWithoutHeader';
import pathIsOneOfPaths from '../../helpers/pathIsOneOfPaths';
// import MobileHeader from '../organisms/MobileHeader';
import DesktopHeader from '../organisms/DesktopHeader';

type IHeaderContainer = {
  history: { location: { pathname: string } };
};

const HeaderWrapper = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  width: 100%;
`;

const HeaderRearPaddingForNonHeaderContent = styled.div`
  height: 106px;
  ${p => p.theme.breakpoint.down('m')`
    height: 99px;
  `}
`;

const HeaderContent = styled.div`
  position: relative;
  width: 100vw;
  height: 66px;
  background-color: #fff;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.gray25};
  z-index: 1;
  ${p => p.theme.breakpoint.down('m')`
    height: 59px;
    border-bottom: 2px solid red;
  `}
`;

const isVisible = (history: { location: { pathname: string } }) =>
  !pathIsOneOfPaths(history.location.pathname, pathsWithoutHeader);

function HeaderContainer({ history }: IHeaderContainer) {
  const [visible, toggleVisibility] = useState(isVisible(history));
  const [width, setWidth] = useState(process.browser ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      if (process.browser) setWidth(window.innerWidth);
    };
    const removeListener = () => process.browser && window.removeEventListener('resize', handleResize);

    if (process.browser) window.addEventListener('resize', handleResize);
    removeListener();
  }, []);

  useEffect(() => {
    if (isVisible(history)) {
      toggleVisibility(true);
    } else {
      toggleVisibility(false);
    }
  }, [history.location.pathname]);

  return visible ? (
    <>
      <HeaderWrapper id="HeaderWrapper">
        {/* <HeaderContent>{width <= 1024 ? <MobileHeader /> : <DesktopHeader />}</HeaderContent> */}
        <HeaderContent>{width <= 1024 ? <div /> : <DesktopHeader />}</HeaderContent>
      </HeaderWrapper>
      <HeaderRearPaddingForNonHeaderContent />
    </>
  ) : null;
}

export default withRouter(HeaderContainer);
