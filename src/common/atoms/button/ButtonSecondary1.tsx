import React from 'react';

import ButtonTemplate, { PrimaryCommonProps } from './ButtonTemplate';
import defaultProps from './propTypes';

type IButtonSecondary1 = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  width: string;
  withinRed?: boolean;
};

const ButtonSecondary1 = ({ children, onClick, disabled, withinRed, loading, width, ...props }: IButtonSecondary1) => (
  <ButtonTemplate
    onClick={onClick}
    disabled={disabled}
    loading={loading}
    bgColor="white"
    textColor="red2"
    borderColor="red2"
    {...PrimaryCommonProps(withinRed ? 'red3' : '')}
    width={width}
    {...props}
  >
    {children}
  </ButtonTemplate>
);

ButtonSecondary1.defaultProps = {
  ...defaultProps,
  withinRed: false,
  width: '150px',
};

export default ButtonSecondary1;
