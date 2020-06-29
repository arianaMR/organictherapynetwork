import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';

import NavigationLink, { ISubNav } from '../atoms/NavigationLink';
import scroll from '../../helpers/scroll';

type INavigationBar = { navbarItems: ISubNav[] };

const fadeIn = (val: number) => keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: ${val};
  }
`;

const fadeOut = (val: number) => keyframes`
  from {
    opacity: ${val};
  }

  to {
    opacity: 0;
  }
`;

const Container = styled.div`
  height: 65px;
  z-index: 2;
  padding-left: 25px;
`;

const Overlay = styled.div<{ visible: boolean }>`
  z-index: 1;
  width: 200vw;
  margin: 0 -50%;
  height: 100vh;
  background-color: #222;
  opacity: 0.45;
  display: inline-block;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  animation: ${props => (props.visible ? fadeIn(0.45) : fadeOut(0.45))} 0.1s linear;
  transition: visibility 0.1s linear;
  ${p => p.theme.breakpoint.down('m')`
    top: 104px;
  `}
`;

export default function NavigationBar({ navbarItems }: INavigationBar) {
  const [selected, setSelected] = useState<ISubNav | null>(null);

  const overlayVisible = process.browser && selected && selected.subnav;
  if (process.browser) {
    if (overlayVisible) scroll.lock();
    else scroll.unlock();
  }
  return (
    <>
      <Container>
        {navbarItems.map(x => (
          <NavigationLink
            item={x}
            onMouseEnter={(tab: ISubNav) => setSelected(tab)}
            onMouseLeave={() => setSelected(null)}
            key={JSON.stringify(x)}
            closeOverlay={() => setSelected(null)}
          />
        ))}
      </Container>
      {overlayVisible && createPortal(<Overlay visible />, document.getElementById('HeaderWrapper'))}
    </>
  );
}
