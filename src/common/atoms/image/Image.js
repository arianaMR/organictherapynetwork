import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import uuid from 'uuid';
import $ from 'jquery';

import useIsIntersecting from '../../../helpers/hooks/useIsIntersecting';
import contentfulClient from '../../../config/contentful';
import webp from '../../../helpers/webp';

const Skeleton = process.browser ? require('react-loading-skeleton').default : () => null;

const Container = styled.div`
  position: ${p => p.position};
  overflow: hidden;
  background-color: ${p => (p.transparent ? 'transparent' : p.theme.colors.gray1)};
  width: ${p => (p.width ? p.width : '100%')};
  text-align: left;
  padding-bottom: ${p => p.ratio};
  ${p => {
    if (!p.ratio)
      return `
        height: 100%;
      `;

    return null;
  }}

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const Template = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const Thumb = styled(Template)`
  width: ${p => (p.transparent ? '100%' : '106%')};
  height: ${p => (p.transparent ? '100%' : '106%')};
  top: ${p => (p.transparent ? '0' : '-3%')};
  left: ${p => (p.transparent ? '0' : '-3%')};
  filter: blur(4px);
  transition: opacity 0.3s;
`;

const Fullsize = styled(Template)`
  transition: opacity 0.3s;
  top: 0;
  left: 0;
`;
// TODO set up image so it only lazy loads if image not in cache (currently, brief gray flash even if image in cache) https://www.darrenlester.com/blog/instantly-loading-cached-images

const Img = ({
  src,
  contentfulAsset,
  ratio,
  skeleton,
  thumbWidth,
  fullsizeWidth,
  position,
  transparent,
  onLoad,
  width,
}) => {
  const divRef = useRef(null);

  const [id] = useState(uuid());
  const [path, setPath] = useState(null);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [fullsizeLoaded, setFullsizeLoaded] = useState(false);

  const intersecting = useIsIntersecting(divRef);

  const postfix = () => {
    if (!fullsizeWidth && !webp()) return '';

    return `?${fullsizeWidth ? `w=${fullsizeWidth}&` : ''}${webp() ? 'fm=webp&' : ''}`;
  };

  useEffect(() => {
    if (path === src) return;
    let isSubscribed = true;

    if (!contentfulAsset) setPath(src);
    else
      contentfulClient.getAsset(src).then(x => {
        if (isSubscribed && x.fields && x.fields.file && x.fields.file.url) setPath(x.fields.file.url);
      });

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
          $(`#${id}thumb`).css({ opacity: 1 });
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

          $(`#${id}thumb`).css({
            display: 'none',
            filter: 'blur(0px)',
            '-webkit-filter': 'blur(0px)',
            '-moz-filter': 'blur(0px)',
            '-o-filter': 'blur(0px)',
            '-ms-filter': 'blur(0px)',
          });

          $(`#${id}full`).css({ opacity: 1 });
        }
      };
      image.src = path + postfix();
    }
    return () => {
      isSubscribed = false;
    };
  }, [thumbLoaded]);

  useEffect(() => {
    if (thumbLoaded && fullsizeLoaded && typeof onLoad === 'function') onLoad();
  }, [thumbLoaded, fullsizeLoaded]);

  return (
    <Container
      className="image-container"
      width={width}
      ratio={ratio}
      ref={divRef}
      position={position}
      transparent={transparent}
    >
      {!transparent && skeleton && <Skeleton width="100%" height="100%" />}

      {thumbLoaded && (
        <Thumb
          id={`${id}thumb`}
          className="image-thumb"
          src={`${path}?w=${thumbWidth}`}
          transparent={transparent}
          alt="thumb"
        />
      )}

      {fullsizeLoaded && <Fullsize id={`${id}full`} className="image-full" src={`${path}${postfix()}`} alt="full" />}
    </Container>
  );
};

Img.defaultProps = {
  ratio: null,
  skeleton: true,
  thumbWidth: '100',
  position: 'relative',
  fullsizeWidth: null,
  contentfulAsset: false,
  transparent: false,
};

export default Img;
