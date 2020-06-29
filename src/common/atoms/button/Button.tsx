import React from 'react';

import ButtonTemplate from './ButtonTemplate';

type IButton = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  width: string;
  withinRed?: boolean;
  bgHoverColor?: string;
  fontSize?: string;
  isStatic?: boolean;
};

const Button = ({
  children = null,
  onClick = () => undefined,
  disabled = false,
  loading = false,
  width = '150px',
  bgHoverColor,
  fontSize,
  isStatic,
  ...props
}: IButton) => (
  <ButtonTemplate
    onClick={onClick}
    disabled={disabled}
    loading={loading}
    bgColor="white"
    textColor="red2"
    borderColor="red2"
    bgHoverColor={bgHoverColor}
    fontSize={fontSize}
    isStatic={isStatic}
    width={width}
    {...props}
  >
    {children}
  </ButtonTemplate>
);

export default Button;
