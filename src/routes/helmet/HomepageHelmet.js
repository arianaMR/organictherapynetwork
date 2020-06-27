import React from 'react';
import HelmetTemplate from './HelmetTemplate';

const HomepageHelmet = () => (
  <HelmetTemplate
    title="[SITE NAME TITLE]"
    description="[DESCRIPTION"
    keywords="[KEYWORDS]"
    image="//[SITE NAME].com/img/meta/hello-world.jpg"
  >
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
  </HelmetTemplate>
);

export default HomepageHelmet;
