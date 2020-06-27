import React from 'react';
import styled from 'styled-components';

export const ButtonCommon = styled.button`
  border-radius: 5px;
  min-height: 40px;
  font-weight: 600;

  :disabled {
    background-color: ${props => props.theme.colors.gray3};
    border: 1px solid ${props => props.theme.colors.gray3};
    cursor: not-allowed;
  }
`;

export const PrimaryCommonProps = (bgHoverColor: string) => ({
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
};

const StyledButton = styled(ButtonCommon)<IStyledButton>`
  background-color: ${props => props.theme.colors[props.bgColor]};
  border: ${props => (props.borderColor ? `1px solid ${props.theme.colors[props.borderColor]}` : 'none')};
  color: ${props => props.theme.colors[props.textColor]};
  font-size: ${props => props.fontSize || '13px'};
  ${props => props.width && `width: ${props.width};`};

  :hover:not([disabled]) {
    ${() => `
    // @ts-ignore`}
    color: ${props => props.isStatic || props.theme.colors.white};
    ${() => `
    // @ts-ignore`}
    border: ${props => {
      if (props.isStatic) return null;
      if (props.bgHoverColor) return `1px solid ${props.theme.colors[props.bgHoverColor]}`;
      return `1px solid ${props.theme.colors.red2}`;
    }};
    ${() => `
    // @ts-ignore`}
    background-color: ${props => {
      if (props.isStatic) return null;
      if (props.bgHoverColor) return props.theme.colors[props.bgHoverColor];
      return props.theme.colors.red2;
    }};
    ${() => `
    // @ts-ignore`}
    cursor: ${props => props.isLoading && 'progress'};
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

const ButtonTemplate = ({
  children,
  onClick,
  bgColor = '',
  textColor,
  disabled = false,
  borderColor,
  bgHoverColor,
  loading = false,
  width = '100px',
  fontSize = '13px',
  isStatic = false,
  ...props
}: IButtonTemplate) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    bgColor={bgColor}
    textColor={textColor}
    borderColor={borderColor}
    bgHoverColor={bgHoverColor}
    isLoading={loading}
    width={width}
    fontSize={fontSize}
    isStatic={isStatic}
    {...props}
  >
    {children}
  </StyledButton>
);

export default ButtonTemplate;
