import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import useDispatch from '../../helpers/hooks/useDispatch';
import MedMenLogoSrc from '../../assets/logo-red.svg';
import MobileMenuSrc from '../../assets/icons/mobile-menu.svg';
import { toggleSidebarLogic, resetSidebar } from '../../sidebar';

const Container = styled.header`
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 1025px) {
    display: flex;
  }

  .left-container {
    padding-top: 5px;
  }
`;

const Section = styled.div`
  right: 50px;
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  ${p => p.theme.breakpoint.down('s')`
    right: 20px;
  `}
`;

const MobileLogoLink = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const MobileLogo = styled.img`
  display: block;
`;

const MobileMenu = styled.div`
  position: relative;
  height: 17px;
  cursor: pointer;
  margin-left: 30px;
  ${p => p.theme.breakpoint.down('xs')`
    margin-left: 20px;
  `}

  img {
    margin: 0;
    vertical-align: top;
    height: 12px;
  }
`;

export default function MobileHeader() {
  const { detailInfo, showMobileMenu } = useSelector(
    (s: { sidebar: { detailInfo: { component: {} }; showMobileMenu: boolean } }) => s.sidebar,
  );
  const toggleSidebarLogicAction = useDispatch(toggleSidebarLogic);
  const resetSidebarAction = useDispatch(resetSidebar);

  useEffect(() => {
    const activeNav = showMobileMenu || !!detailInfo.component;
    if (process.browser) {
      // @ts-ignore
      if (activeNav && $(window).width <= 497) {
        $('body').css({ position: 'fixed' });
      } else {
        $('body').css({ position: '' });
      }
    }
  }, [detailInfo, showMobileMenu]);

  const toggleMenu = () => {
    toggleSidebarLogicAction();
  };
  const handleHomepage = () => {
    resetSidebarAction();
  };
  return (
    <Container>
      <MobileLogoLink to="/" onClick={handleHomepage}>
        <MobileLogo src={MedMenLogoSrc} alt="logo" />
      </MobileLogoLink>
      <Section>
        <MobileMenu onClick={toggleMenu}>
          <img src={MobileMenuSrc} alt="Menu" />
        </MobileMenu>
      </Section>
    </Container>
  );
}
