import React from 'react';

import ButtonTemplate, { PrimaryCommonProps } from './ButtonTemplate';
import defaultProps from './propTypes';

const ButtonPrimary1 = ({ children, onClick, disabled, withinRed, loading, ...props }) => (
  <ButtonTemplate
    onClick={onClick}
    disabled={disabled}
    bgColor="white"
    textColor="red2"
    borderColor="white"
    loading={loading}
    {...PrimaryCommonProps(withinRed && 'red3')}
    {...props}
  >
    {children}
  </ButtonTemplate>
);

ButtonPrimary1.defaultProps = {
  ...defaultProps,
  withinRed: false,
};

export default ButtonPrimary1;
