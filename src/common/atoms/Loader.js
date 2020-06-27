import React from 'react';
import styled, { keyframes } from 'styled-components';

import Logo from '../../assets/loader.svg';

const containerAnim = keyframes`
  100% { transform: rotate(360deg); }
`;

const strokeAnim = keyframes`
  0% {
    stroke-dasharray: 0, 300;
    stroke-dashoffset: 0;
    background-color: red;
  }

  50% {
    stroke-dasharray: 120, 300;
    stroke-dashoffset: -58;
    background-color: red;
  }

  100% {
    stroke-dasharray: 120, 300;
    stroke-dashoffset: -175;
    background-color: red;
  }
`;

const Container = styled.div`
	margin: 20px 45%;
	position: relative;
	${(props) =>
		props.small
			? `
    height: 33px;
    width: 33px;
  `
			: `
    height: 66px;
    width: 66px;
  `};
`;

const Spinner = styled.div`
	animation: ${containerAnim} 2s linear infinite;
	background: white;
	border-radius: 50%;
	${(props) =>
		props.small
			? `
    height: 33px;
    width: 33px;
  `
			: `
    height: 66px;
    width: 66px;
  `};
`;

const SVG = styled.svg`
	height: 100%;
	left: 0;
	top: 0;
	position: absolute;
	transform: rotate(-90deg);
	width: 100%;
`;

const Circle = styled.circle`
	animation: ${strokeAnim} 2s 0.2s ease infinite;
	stroke: ${(props) => props.theme.colors.red2};
	stroke-dasharray: 0, 300;
	stroke-dashoffset: 0;
	transform-origin: center center;
`;

const LoadingLogo = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Loader = ({ small = false }) => (
	<Container data-testid='loader' small={small}>
		<Spinner small={small}>
			<SVG viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
				<Circle fill='none' strokeWidth='3' cx='33' cy='33' r='28' />
			</SVG>
		</Spinner>
		<LoadingLogo src={Logo} alt='loading' />
	</Container>
);

export default Loader;
