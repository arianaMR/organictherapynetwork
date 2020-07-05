import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  font-family: 'Playfair Display', sans-serif;

  a {
    text-decoration: none;
  }

  body {
    box-sizing: border-box;
    overflow-x: hidden;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    font-family: ${props => props.theme.fonts.primary};

    input {
      outline: none;
    }

    button {
      :hover {
        cursor: pointer;
      }

      :disabled {
        color: ${props => props.theme.colors.white};
      }

      :hover:disabled {
        cursor: not-allowed;
      }
    }

    a {
      cursor: pointer;
    }
  }
`;

export default GlobalStyle;

/*

  * {
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translateZ(0px);
  }

*/
