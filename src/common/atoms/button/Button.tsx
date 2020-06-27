import React from 'react';

import ButtonTemplate, { PrimaryCommonProps } from './ButtonTemplate';

type IButton = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  width: string;
  withinRed?: boolean;
};

const Button = ({
  children = null,
  onClick = () => undefined,
  disabled = false,
  withinRed = false,
  loading = false,
  width = '150px',
  ...props
}: IButton) => (
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

export default Button;
