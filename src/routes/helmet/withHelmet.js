import React from 'react';

const withHelmet = PageComponent => HelmetComponent => props => (
  <>
    <HelmetComponent />
    <PageComponent {...props} />
  </>
);

export default withHelmet;
