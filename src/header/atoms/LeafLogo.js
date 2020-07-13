import React, { useMemo } from 'react';
import styled, { withTheme } from 'styled-components';

import '../_c-header.scss';
import { Link } from 'react-router-dom';
import Logo from './OTN-Logo.png';

const Wrapper = styled.div`
  z-index: 1;
  cursor: ${({ isLink }) => isLink && 'pointer'};
  color: black;
  position: relative;
  font-size: 60px;
  font-family: 'Times New Roman', Times, serif;
  letter-spacing: 5px;
  width: 150px;
`;

const Img = styled.img`
  width: 150px;
  bottom: 6px;
  position: absolute;
`;

const LeafLogo = ({ to, theme }) => {
  const props = useMemo(
    () =>
      to
        ? {
            to,
            className: 'c-header__logo-link',
            isLink: to,
            as: Link,
          }
        : {},
    [to],
  );
  return (
    <Wrapper {...props}>
      <Img src={Logo} />
    </Wrapper>
  );
};

LeafLogo.defaultProps = {
  to: '',
};

export default withTheme(LeafLogo);
