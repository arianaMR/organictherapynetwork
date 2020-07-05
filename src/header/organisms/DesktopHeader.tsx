import React from 'react';
import styled from 'styled-components';

import NavigationBarContainer from '../containers/NavigationBarContainer';
import LeafLogo from '../atoms/LeafLogo';

const Container = styled.header`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  ${p => p.theme.breakpoint.down('m')`
      display: none;
  `}
`;

const ContainerStart = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex: 0 0 auto;
`;

export default function DesktopHeader() {
  return (
    <Container>
      <ContainerStart>
        <LeafLogo to="/" />
        <NavigationBarContainer />
      </ContainerStart>
    </Container>
  );
}
