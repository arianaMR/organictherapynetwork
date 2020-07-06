import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import contentfulClient from '../../../config/contentful';
import webp from '../../../helpers/webp';

const fadeIn = () => keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Img = styled.img`
  opacity: 0;
  animation: ${fadeIn} 0.3s forwards;
`;
const ContentfulImage = ({ asset, width = null, alt = 'asset', ...rest }) => {
  const [src, setSrc] = useState(null);

  const postfix = useCallback(() => {
    if (!width && !webp()) return '';

    return `?${width ? `w=${width}&` : ''}${webp() ? 'fm=webp&' : ''}`;
  }, [width]);

  useEffect(() => {
    let isSubscribed = true;
    if (asset)
      contentfulClient.getAsset(asset).then(x => {
        if (isSubscribed && x.fields && x.fields.file && x.fields.file.url) setSrc(x.fields.file.url + postfix());
      });
    return () => { isSubscribed = false };
  }, [asset, postfix]);

  if (!src) return null;

  return <Img src={src} alt={alt} {...rest} />;
};

export default ContentfulImage;
