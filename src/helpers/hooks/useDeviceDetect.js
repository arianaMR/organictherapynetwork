import React, { useState, useEffect, createContext, useContext } from 'react';
import { breakSizes } from '../../theme/breakpoint';

const { s, l } = breakSizes;

const processWidth = width => {
  const isMobile = width <= s;
  const isTablet = width > s && width <= l;
  const isDesktop = !width || width > l;
  return { isMobile, isTablet, isDesktop, width };
};

const DeviceContext = createContext(processWidth());

const processDeviceServer = (isMobile, width) => ({
  isMobile,
  isTablet: false,
  isDesktop: !isMobile,
  width,
});

export const DeviceProvider = ({ children, isMobile }) => {
  const [width, setWidth] = useState(() => {
    if (process.browser) return window.innerWidth;
    return isMobile ? 375 : 1366;
  });
  useEffect(() => {
    // considered throttling this, but tested the number of renders, and a throttle of 300ms doesn't seem to make much difference in the render count
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    if (process.browser) window.addEventListener('resize', handleResize);
    return () => process.browser && window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <DeviceContext.Provider value={process.browser ? processWidth(width) : processDeviceServer(isMobile, width)}>
      {children}
    </DeviceContext.Provider>
  );
};

export default () => {
  const device = useContext(DeviceContext);
  return device;
};
