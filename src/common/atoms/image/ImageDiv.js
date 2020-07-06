import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import uuid from 'uuid';
import $ from 'jquery';

import useIsIntersecting from '../../../helpers/hooks/useIsIntersecting';
import contentfulClient from '../../../config/contentful';
import webp from '../../../helpers/webp';

const Skeleton = process.browser ? require('react-loading-skeleton').default : () => null;

const fadeIn = () => keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${p => (p.transparent ? 'transparent' : p.theme.colors.gray1)};
  z-index: 0;
  opacity: ${p => (p.desktop ? 1 : 0)};
  ${p => p.theme.breakpoint.down('s')`
    opacity: ${p.mobile ? 1 : 0};
  `}

  span {
    position: absolute !important;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const Template = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  opacity: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const Thumb = styled(Template)`
  width: 106%;
  height: 106%;
  top: -3%;
  left: -3%;
  filter: blur(4px);
  animation: ${fadeIn} 0.1s forwards;
`;

const Fullsize = styled(Template)`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} 0.3s forwards;
`;

const Img = ({ src, contentfulAsset, skeleton, thumbWidth, fullsizeWidth, mobile, desktop, transparent }) => {
  const divRef = useRef(null);

  const [id] = useState(uuid());
  const [path, setPath] = useState();
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [fullsizeLoaded, setFullsizeLoaded] = useState(false);

  const intersecting = useIsIntersecting(divRef);

  const postfix = () => {
    if (!fullsizeWidth && !webp()) return '';

    return `?${fullsizeWidth ? `w=${fullsizeWidth}&` : ''}${webp() ? 'fm=webp&' : ''}`;
  };

  useEffect(() => {
    let isSubscribed = true;
    if (path) return;
    if (!contentfulAsset) setPath(src);
    else contentfulClient.getAsset(src).then(asset => isSubscribed && setPath(asset.fields.file.url));

    // eslint-disable-next-line consistent-return
    return () => {
      isSubscribed = false;
    };
  }, [src]);

  useEffect(() => {
    let isSubscribed = true;

    if (intersecting && !thumbLoaded) {
      const thumb = new Image();
      thumb.onload = () => {
        if (isSubscribed) {
          setThumbLoaded(true);
          $(`#${id}thumb`).css({ 'background-image': `url(${path}?w=${thumbWidth})` });
        }
      };
      thumb.src = `${path}?w=${thumbWidth}`;
    }

    return () => {
      isSubscribed = false;
    };
  }, [path, intersecting]);

  useEffect(() => {
    let isSubscribed = true;
    if (thumbLoaded && !fullsizeLoaded) {
      const image = new Image();
      image.onload = () => {
        if (isSubscribed) {
          setFullsizeLoaded(true);
          $(`#${id}fullsize`).css({ 'background-image': `url(${path}${postfix()})` });
        }
      };
      image.src = path + postfix();
    }

    return () => {
      isSubscribed = false;
    };
  }, [thumbLoaded]);

  return (
    <Container ref={divRef} mobile={mobile} desktop={desktop} transparent={transparent}>
      {!transparent && skeleton && <Skeleton width="100%" height="100%" />}

      {thumbLoaded && <Thumb id={`${id}thumb`} alt="thumb" />}

      {fullsizeLoaded && <Fullsize id={`${id}fullsize`} alt="full" />}
    </Container>
  );
};

Img.defaultProps = {
  skeleton: true,
  thumbWidth: '100',
  fullsizeWidth: null,
  contentfulAsset: false,
  mobile: true,
  desktop: true,
  transparent: false,
};

export default Img;
