import React from 'react';
import NavigationBar from '../molecules/NavigationBar';

const NavigationBarContainer = () => {
  const navbarItems = [
    { title: 'HOME', url: '/test1' },
    { title: 'ABOUT', url: '/test2' },
    { title: 'SCHEDULE', url: '/test3' },
    { title: 'OUR MISSION', url: '/test4' },
    { title: 'BLOG', url: '/test5' },
    { title: 'RESOURCES', url: '/test6' },
    { title: 'SHOP', url: '/test7' },
  ];

  return <NavigationBar navbarItems={navbarItems} />;
};

export default NavigationBarContainer;
