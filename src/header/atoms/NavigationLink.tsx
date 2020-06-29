import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import uuid from 'uuid';
import $ from 'jquery';
import isAbsoluteUrl from 'is-absolute-url';
import { Link } from 'react-router-dom';

export type ISubNav = { title: string; url: string; subnav?: [{ title?: string; pageTitle?: string; url: string }] };
type INavigationLink = {
  item: ISubNav;
  onMouseEnter: (x: ISubNav) => void;
  onMouseLeave: () => void;
  closeOverlay: () => void;
};

const Container = styled.div`
  position: relative;
  height: 100%;
  color: #000;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  z-index: 2;
  vertical-align: top;
`;

const Title = styled.div`
  height: 100%;
  box-sizing: border-box;
  transition: all 0.1s linear;
  color: ${p => p.theme.colors.black};
  margin-right: 40px;
  ${p => p.theme.breakpoint.down('xl')`
    margin-right: 18px;
  `}

  &:hover {
    color: ${p => p.theme.colors.red2};
    border-bottom: 3px solid ${p => p.theme.colors.red2};
  }

  a {
    height: 100%;
    display: inline-block;
    line-height: 80px;
    color: inherit;
    text-decoration: none;
  }
`;

const Subnav = styled.div<{ visible: boolean; adjustment: number }>`
  position: absolute;
  top: 65px;
  background-color: #fff;
  padding: 30px 30px 25px 30px;
  color: #222;
  display: ${p => (p.visible ? 'block' : 'none')};
  margin-left: ${p => `${p.adjustment}px`};
  white-space: nowrap;

  div {
    transition: all 0.2s;
    margin-bottom: 15px;

    &:hover {
      color: ${p => p.theme.colors.red2};
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  div:last-child {
    margin-bottom: 0;
  }
`;

const Wrapper = styled.div``;

export default function NavigationLink({ item, onMouseEnter, onMouseLeave, closeOverlay }: INavigationLink) {
  const [id] = useState(uuid());
  const [visible, setVisible] = useState(false);
  const [adjustment, setAdjustment] = useState(0);

  useEffect(() => {
    if (!process.browser || !item.subnav || !item.subnav.length) return;
    const menu = $(`#${id}menu`);
    const outerWidth = menu.outerWidth();
    const innerWidth = menu.innerWidth();

    setAdjustment((((outerWidth || 0) - (innerWidth || 0)) / 2) * -1);
  }, []);

  return (
    <Container
      id={id}
      onMouseEnter={() => {
        onMouseEnter(item);
        setVisible(true);
      }}
      onMouseLeave={() => {
        onMouseLeave();
        setVisible(false);
      }}
    >
      {item.title === 'Shop' ? (
        <Title
          id={`${id}title`}
          onClick={() => {
            closeOverlay();
            setVisible(false);
          }}
        >
          <Link data-testid={item.url} to="/shop">
            {item.title}
          </Link>
        </Title>
      ) : (
        <Title id={`${id}title`}>
          {item.url &&
            (isAbsoluteUrl(item.url) ? (
              <a href={item.url}>{item.title}</a>
            ) : (
              <Link data-testid={item.url} to={item.url}>
                {item.title}
              </Link>
            ))}
          {!item.url && <span>{item.title}</span>}
        </Title>
      )}

      {item.subnav && item.subnav.length > 0 && item.title !== 'Shop' && (
        <Subnav visible={visible} id={`${id}menu`} adjustment={adjustment}>
          {item.subnav.map(x => (
            <Wrapper
              key={`submenu-dd-${x.title || x.pageTitle}`}
              onClick={() => {
                closeOverlay();
                setVisible(false);
              }}
            >
              <Link data-testid={x.url} to={x.url}>
                {x.title || x.pageTitle}
              </Link>
            </Wrapper>
          ))}
        </Subnav>
      )}
    </Container>
  );
}
