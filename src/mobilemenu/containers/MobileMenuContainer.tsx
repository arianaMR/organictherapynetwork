import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import $ from 'jquery';
import uuid from 'uuid';

import useDispatch from '../../helpers/hooks/useDispatch';
import scroll from '../../helpers/scroll';
import { closeMobileMenu } from '../../sidebar';
import MobileMenu from '../organisms/MobileMenu';

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  background-color: rgba(34, 34, 34, 0.4);
  opacity: ${p => (p.open ? 1 : 0)};
  transition: opacity 0.3s;
  display: none;
  z-index: 99;
`;

const Sidebar = styled.div<{ open: boolean }>`
  position: fixed;
  top: 60px;
  left: ${p => (p.open ? 0 : '-100vw')};
  width: 100%;
  height: calc(100% - 40px);
  transition: left 0.3s;
  display: none;
  z-index: 99;
`;

export default function MobileMenuContainer() {
  const closeMobileMenuAction = useDispatch(closeMobileMenu);
  const { showMobileMenu } = useSelector((s: { sidebar: { showMobileMenu: boolean } }) => s.sidebar);

  const [id] = useState(uuid());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!process.browser) return;
    if (showMobileMenu && !open) {
      $(`#${id}overlay`).css({ display: 'inline' });
      $(`#${id}sidebar`).css({ display: 'inline' });
      scroll.lock();
      setTimeout(() => {
        setOpen(true);
      }, 10);
    } else if (!showMobileMenu) {
      setOpen(false);
      setTimeout(() => {
        $(`#${id}overlay`).css({ display: 'none' });
        $(`#${id}sidebar`).css({ display: 'none' });

        scroll.unlock();
      }, 300);
    }
  }, [showMobileMenu]);

  return (
    <div id="mobile-menu-container">
      <Overlay open={open} id={`${id}overlay`} onClick={closeMobileMenuAction} />
      <Sidebar open={open} id={`${id}sidebar`}>
        <MobileMenu />
      </Sidebar>
    </div>
  );
}
