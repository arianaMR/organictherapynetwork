import React from 'react';
import styled, { css } from 'styled-components';

export const buttonCommonStyles = css`
  border-radius: 5px;
  min-height: 40px;
  font-weight: 600;

  :disabled {
    background-color: ${props => props.theme.colors.gray3};
    border: 1px solid ${props => props.theme.colors.gray3};
    cursor: not-allowed;
  }
`;

export const ButtonCommon = styled.button`
  ${buttonCommonStyles}
`;

export const PrimaryCommonProps = (bgHoverColor?: string) => ({
  fontSize: '15px',
  width: '150px',
  bgHoverColor,
});

type IStyledButton = {
  borderColor: string;
  bgColor: string;
  width: string;
  textColor: string;
  bgHoverColor: string;
  isStatic: boolean;
  fontSize: string;
  isLoading?: boolean;
};
// @ts-ignore
const StyledButton = styled(ButtonCommon)<IStyledButton>`
  background-color: ${props => props.theme.colors[props.bgColor]};
  border: ${props => (props.borderColor ? `1px solid ${props.theme.colors[props.borderColor]}` : 'none')};
  color: ${props => props.theme.colors[props.textColor]};
  font-size: ${props => props.fontSize || '13px'};
  ${props => props.width && `width: ${props.width};`};

  :hover:not([disabled]) {
    color: ${props => (props.isStatic ? '' : props.theme.colors.white)};
    border: ${props => {
      if (props.isStatic) return null;
      if (props.bgHoverColor) return `1px solid ${props.theme.colors[props.bgHoverColor]}`;
      return `1px solid ${props.theme.colors.red2}`;
    }};
    background-color: ${props => {
      if (props.isStatic) return null;
      if (props.bgHoverColor) return props.theme.colors[props.bgHoverColor];
      return props.theme.colors.red2;
    }};
    cursor: ${props => (props.isLoading ? 'progress' : '')};
  }
`;

type IButtonTemplate = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  width?: string;
  fontSize: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  bgHoverColor?: string;
  isStatic?: boolean;
};
// @ts-ignore
const ButtonTemplate = ({
  children,
  onClick,
  bgColor,
  textColor,
  disabled,
  borderColor,
  bgHoverColor,
  loading,
  width,
  fontSize,
  isStatic,
  ...props
}: IButtonTemplate) => (
  // @ts-ignore
  <StyledButton
    // @ts-ignore
    onClick={onClick}
    // @ts-ignore
    disabled={disabled}
    // @ts-ignore
    bgColor={bgColor}
    // @ts-ignore
    textColor={textColor}
    // @ts-ignore
    borderColor={borderColor}
    // @ts-ignore
    bgHoverColor={bgHoverColor}
    // @ts-ignore
    isLoading={loading}
    // @ts-ignore
    width={width}
    // @ts-ignore
    fontSize={fontSize}
    // @ts-ignore
    isStatic={isStatic}
    // @ts-ignore
    {...props}
  >
    {children}
  </StyledButton>
);

export const defaultProps = {
  disabled: false,
  bgHoverColor: '',
  width: '100px',
  fontSize: '13px',
  loading: false,
  isStatic: false,
};

ButtonTemplate.defaultProps = defaultProps;

export default ButtonTemplate;
