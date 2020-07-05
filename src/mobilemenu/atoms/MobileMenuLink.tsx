import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import AngleSrc from '../../assets/icons/mobile-menu-angle.svg';
import { closeMobileMenu } from '../../sidebar';
import useDispatch from '../../helpers/hooks/useDispatch';

type IMobileMenuLink = {
  setPage?: (data: any) => void;
  parent?: any;
  nav?: any;
};

const Container = styled(Link)<{ subNav: any }>`
  position: relative;
  width: 100%;
  height: 60px;
  display: block;
  color: ${p => p.theme.colors.black};
  line-height: 60px;
  font-size: 15px;
  padding-left: ${p => (p.subNav ? '40px' : '20px')};
  border-bottom: 1px solid ${p => p.theme.colors.gray27};
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${p => p.theme.colors.white};

  &:hover {
    color: #a20000;
    background-color: #f9f9f9;
  }
`;

const Angle = styled.img`
  position: absolute;
  right: 20px;
  top: 25px;
`;

export default function MobileMenuLink({ setPage, nav, parent }: IMobileMenuLink) {
  const closeMobileMenuAction = useDispatch(closeMobileMenu);
  const hasSubNavPage = nav.url === '#';

  return (
    <Container
      to={nav.url}
      subNav={parent}
      onClick={() => {
        if (hasSubNavPage) {
          if (setPage) setPage({ page: nav });
        } else if (nav.url) {
          closeMobileMenuAction();
        }
      }}
    >
      {nav.title || nav.pageTitle}
      {hasSubNavPage && <Angle src={AngleSrc} alt="Next Page" />}
    </Container>
  );
}
