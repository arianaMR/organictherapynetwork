import React from 'react';
import NavigationBar from '../molecules/NavigationBar';

import useNavigation from '../../helpers/hooks/useNavigation';

const NavigationBarContainer = () => {
  const navbarItems = useNavigation();

  return <NavigationBar navbarItems={navbarItems} />;
};

export default NavigationBarContainer;
