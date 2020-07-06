import React from 'react';
import PromoBandContainer from './PromoBandContainer';

export default function HomePageContainer() {
  return (
    <>
      {/* {homepageAnnouncements && <AnnouncementBar {...homepageAnnouncements} />} */}
      <PromoBandContainer />
      {/* <BandLayout bands={bandsLayout} selectedStore={selectedStore} /> */}
    </>
  );
}
