import React, { useState } from 'react';
import styled from 'styled-components';

import MobileMenuNavContainer from '../containers/MobileMenuNavContainer';
import SubNavPage from '../atoms/SubNavPage';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Menu = styled.div`
  width: 100%;
  background-color: #fff;
  overflow-y: scroll;
`;

export default function MobileMenu() {
  const [page, setPage] = useState(null);

  return (
    <Container>
      <Menu>
        {page ? (
          <SubNavPage subNavPage={page} setPage={data => setPage(data.page)} />
        ) : (
          // @ts-ignore
          <MobileMenuNavContainer setPage={(data: { page: any }) => setPage(data.page)} />
        )}
      </Menu>
    </Container>
  );
}
