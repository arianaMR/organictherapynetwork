import React, { useState } from 'react';
import styled from 'styled-components';

import AngleSrc from '../../assets/icons/mobile-menu-back.svg';
import MobileMenuLink from './MobileMenuLink';

type ISubNavPage = {
  setPage: (data: any) => void;
  subNavPage: null | { title: string; pageTitle: string; subnav: [{ url: string; title: string }] };
};

const Back = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: block;
  color: #000;
  line-height: 60px;
  font-size: 15px;
  font-weight: 600;
  padding-left: 20px;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  box-sizing: border-box;

  img {
    vertical-align: unset;
    margin: 0 13px 0 0;
  }

  &:hover {
    color: #a20000;
    background-color: #f9f9f9;
  }
`;

const Angle = styled.img`
  position: relative;
  top: 1px;
  margin-right: 10px;
`;

export default function SubNavPage({ setPage, subNavPage }: ISubNavPage) {
  const [parentNav] = useState(subNavPage);
  const onPrevious = () => {
    if (subNavPage !== parentNav) setPage({ page: parentNav });
    else setPage({ page: null });
  };
  return (
    <>
      <Back onClick={() => onPrevious()}>
        <Angle src={AngleSrc} alt="Previous Page" />
        {subNavPage?.title || subNavPage?.pageTitle}
      </Back>
      {subNavPage?.subnav.map(x => (
        <MobileMenuLink nav={x} parent setPage={setPage} key={`${x.url}${x.title}`} />
      ))}
    </>
  );
}
