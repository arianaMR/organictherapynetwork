import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import $ from 'jquery';
import uuid from 'uuid';

import scroll from '../../helpers/scroll';

import { resetSidebar } from '..';

const Container = styled.div``;

const Overlay = styled.div`
  position: fixed;
  top: 106px;
  left: 0;
  width: 100%;
  height: calc(100% - 106px);
  background-color: rgba(34, 34, 34, 0.4);
  opacity: ${p => (p.open ? 1 : 0)};
  transition: opacity 0.3s;
  display: none;
  z-index: 99;
  ${p => p.theme.breakpoint.down('m')`
    top: 99px;
    height: calc(100% - 99px);
  `}
  @media only screen and (max-width: 497px) {
    top: 0;
    height: 100%;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 106px;
  right: ${p => (p.open ? 0 : '-497px')};
  width: 100%;
  max-width: 497px;
  height: calc(100% - 106px);
  transition: right 0.3s;
  display: none;
  background-color: #fff;
  z-index: 99;
  border-top: 2px solid ${p => p.theme.colors.red2};
  ${p => p.theme.breakpoint.down('m')`
    top: 99px;
    height: calc(100% - 99px);
  `}
  @media only screen and (max-width: 497px) {
    top: 0;
    border-top: 4px solid ${p => p.theme.colors.red2};
    height: 100%;
  }
`;

const SidebarContainer = ({ showSidebar, detailInfo, resetSidebarAction }) => {
  const [id] = useState(uuid());
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const { component: Component, backgroundColor } = detailInfo;

  useEffect(() => {
    if (!process.browser) return;
    if (showSidebar) {
      $(`#${id}overlay`).css({ display: 'inline' });
      $(`#${id}sidebar`).css({ display: 'inline' });

      scroll.lock();
      setActiveComponent(Component);
      setTimeout(() => {
        setOpen(true);
      }, 10);
    } else if (!showSidebar) {
      setOpen(false);
      setTimeout(() => {
        $(`#${id}overlay`).css({ display: 'none' });
        $(`#${id}sidebar`).css({ display: 'none' });

        scroll.unlock();
        setActiveComponent(null);
      }, 50);
    }
  }, [showSidebar, detailInfo]);

  return (
    <Container>
      <Overlay className="sidebar overlay" open={open} id={`${id}overlay`} onClick={resetSidebarAction} />
      <Sidebar className="sidebar" open={open} id={`${id}sidebar`} backgroundColor={backgroundColor}>
        {activeComponent}
      </Sidebar>
    </Container>
  );
};

SidebarContainer.defaultProps = {
  detailInfo: {
    backgroundColor: '#fff',
  },
};

const mstp = s => ({
  detailInfo: s.sidebar.detailInfo,
  showSidebar: s.sidebar.showSidebar,
});

const mdtp = {
  resetSidebarAction: resetSidebar,
};

export default connect(mstp, mdtp)(SidebarContainer);
