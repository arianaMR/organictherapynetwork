import React, { useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import $ from 'jquery';
import uuid from 'uuid';

import useDispatch from '../../helpers/hooks/useDispatch';
import IconMinusGray from '../../assets/icons/mobile-menu-minus.svg';
import IconPlusGray from '../../assets/icons/mobile-menu-plus.svg';
import { closeMobileMenu } from '../../sidebar';
import MobileMenuLink from './MobileMenuLink';

type IMobileMenuSubNav = { nav: any };

const Container = styled.button`
  position: relative;
  width: 100%;
  height: 60px;
  display: block;
  color: ${p => p.theme.colors.gray45};
  line-height: 60px;
  font-size: 14px;
  font-weight: 600;
  padding-left: 20px;
  border: none;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${p => p.theme.colors.gray2};
  text-align: left;

  &:hover {
    color: #a20000;
    background-color: #f9f9f9;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  right: 15px;

  img {
    margin: 0;
  }
`;

const SubNav = styled.div`
  height: 0;
  overflow: hidden;
  transition: all 0.1s;
`;

const Wrapper = styled.div`
  color: auto;
`;

export default function MobileMenuSubNav({ nav }: IMobileMenuSubNav) {
  const closeMobileMenuAction = useDispatch(closeMobileMenu);
  const [id] = useState(uuid());
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container
        onClick={() => {
          if (nav.url) {
            closeMobileMenuAction();
          } else {
            // @ts-ignore
            $(`#main${id}`).css({
              height: open ? 0 : $(`#wrapper${id}`).innerHeight(),
            });

            setOpen(!open);
          }
        }}
      >
        {nav.title}
        <Icon>
          <img src={open ? IconMinusGray : IconPlusGray} alt={open ? 'close menu' : 'open menu'} />
        </Icon>
      </Container>

      <SubNav id={`main${id}`}>
        <Wrapper id={`wrapper${id}`}>
          {nav.subnav.map((x: { title: string; url: string }) => (
            <MobileMenuLink nav={x} key={`mobile-menu-sub-${id}-${x.title}-${x.url}`} />
          ))}
        </Wrapper>
      </SubNav>
    </>
  );
}
