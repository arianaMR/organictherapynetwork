import React from 'react';

import ButtonTemplate, { PrimaryCommonProps } from './ButtonTemplate';
import defaultProps from './propTypes';

const ButtonPrimary2 = ({ children, onClick, disabled, width, loading, ...props }) => (
  <ButtonTemplate
    onClick={onClick}
    disabled={disabled}
    bgColor="red2"
    textColor="white"
    borderColor="red2"
    loading={loading}
    {...PrimaryCommonProps('red3')}
    width={width}
    {...props}
  >
    {children}
  </ButtonTemplate>
);

ButtonPrimary2.defaultProps = {
  ...defaultProps,
  width: '150px',
};

export default ButtonPrimary2;
