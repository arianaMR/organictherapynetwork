import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import endpoints from '../../config/endpoints';
import GET_HOMEPAGE from '../graphql';
import PrimaryPromo from '../atoms/PrimaryPromo';

const PromoBand = () => {
  const { data, loading, error } = useQuery(GET_HOMEPAGE, {
    variables: endpoints.contentful.homepage,
    context: { clientName: 'contentful' },
  });

  // const primaryItem = data ? data.homepage.items[0] : {};

  if (error || loading || !data) return null;

  return (
    <>
      <PrimaryPromo data={data.homepage} />
      {/* <SecondaryPromosWrapper>
        <SecondaryPromoOverflow>
          {secondaryItems.map((x, i) => (
            <SecondaryPromo {...x} key={x.url || x.tempId} count={i} />
          ))}
        </SecondaryPromoOverflow>
      </SecondaryPromosWrapper> */}
    </>
  );
};

export default PromoBand;
