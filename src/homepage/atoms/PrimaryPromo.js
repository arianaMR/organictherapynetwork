import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import UniversalLink from '../../common/atoms/UniversalLink';
import LogoSrc from '../../assets/logo-mm-white.svg';
import Image from '../../common/atoms/image/Image';

const Skeleton = process.browser ? require('react-loading-skeleton').default : () => null;

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
  ${p =>
    p.theme.breakpoint.down('s')`
    padding-left: 0;
    padding-right: 0;
  `}
  img {
    margin: 0;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: portrait) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Content = styled.div`
  position: absolute;
  /* top: 45%;
  /* top: 60%; */
  /* left: 48.5%;  */

  top: 85%;
  left: 42%;
  width: fit-content;
  max-width: calc(100% - 100px);
  transform: translateY(-50%);
  color: ${p => p.color};
  z-index: 2;
  ${p => {
    if (p.desktopPosition === 'Left' && p.width > 767)
      return `
        left: 200px;
        right: auto;
    `;
    if (p.desktopPosition === 'Center' && p.width > 767)
      return `
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    `;
    if (p.desktopPosition === 'Right' && p.width > 767)
      return `
        right: 200px;
        left: auto;
        text-align: right;
    `;
    if (p.mobilePosition === 'Left' && p.width <= 767)
      return `
        left: 200px;
        right: auto;
    `;
    if (p.mobilePosition === 'Center' && p.width <= 767)
      return `
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    `;
    if (p.mobilePosition === 'Right' && p.width <= 767)
      return `
        right: 200px;
        left: auto;
        text-align: right;
    `;
    return ``;
  }}

  ${p => p.theme.breakpoint.down('m')`
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

const DesktopImage = styled.div`
  /* position: relative;
  background-color: #16282f; */
  ${p => p.theme.breakpoint.down('m')`
    display: none
  `} /* img {
    top: 135px;
    width: 85%;
    height: 85%;
  } */
`;
const Wrapper = styled.div`
  position: relative;
`;

const MobileImage = styled.div`
  display: none;
  ${p => p.theme.breakpoint.down('m')`
    display: inline;
  `}
`;

const Logo = styled.img`
  width: 183px;
  margin-bottom: 15px;
  ${p => p.theme.breakpoint.down('s')`
    width: 129px;
  `}
`;
const Label = styled.div`
  color: #8f8f8f;
  position: relative;
  font-size: 82px;
  font-size: 90px;
  font-family: 'Times New Roman', Times, serif;
  width: 100%;
  letter-spacing: 4px;
`;
const Overlay = styled.div`
  position: absolute;
  color: white;
  font-size: 30px;
  top: 86px;
  /* left: 334px; */
  left: 378px;
`;

const Header = styled.div`
  font-size: ${p => (p.isLogoVisible ? '28px' : '48px')};
  font-family: 'Avenir Next', sans-serif;
  white-space: nowrap;
  font-weight: 600;
  margin: ${p => (p.isLogoVisible ? '10px 0' : '0')};
  ${p => p.theme.breakpoint.down('m')`
    font-size: ${p.isLogoVisible ? '22px' : '38px'};
    margin: 0;
  `}

  ${p => p.theme.breakpoint.down('s')`
    font-size: ${p.isLogoVisible ? '18px' : '32px'};
    margin: 0;
    white-space: normal;
  `}
`;

const PrimaryPromo = ({ data }) => {
  const {
    header,
    image: { url },
  } = data;
  const [width, setWidth] = useState(process.browser ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    if (process.browser) window.addEventListener('resize', handleResize);
    return () => process.browser && window.removeEventListener('resize', handleResize);
  }, []);

  if (!header) {
    return (
      <Container>
        <Skeleton width="100%" height={300} />
      </Container>
    );
  }

  return (
    <Container>
      <UniversalLink to={url}>
        <DesktopImage>
          <Image src={url} ratio="53%" fullsizeWidth="2000" />
        </DesktopImage>

        {/* <MobileImage>
          <Image src={mobileImage.url} ratio="83%" fullsizeWidth="1000" />
        </MobileImage> */}

        <Content width={width}>
          {/* <Logo src={LogoSrc} alt="logo" /> */}
          <Wrapper>
            <Label>ORGANIC THERAPY</Label>
            <Overlay>NETWORK</Overlay>
          </Wrapper>
          {/* {width > 767 && <Header dangerouslySetInnerHTML={{ __html: header }} />}
          {width <= 767 && <Header isLog dangerouslySetInnerHTML={{ __html: header }} />} */}
        </Content>
      </UniversalLink>
    </Container>
  );
};

export default PrimaryPromo;
