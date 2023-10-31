import styled, { createGlobalStyle } from 'styled-components';
import { media_breakpoint_down } from '../mediaBreakpoints.style';

const mainFontSize = 16;

export const globalColor = {
  white: 'white',
  black: 'black',
  gray: {
    gray100: '#424242',
    gray90: '#4a4a4a',
    gray80: '#5E5E5E',
    gray70: '#656565',
    gray60: '#727272',
    gray50: '#757575',
    gray40: '#888888',
    gray10: '#F2F2F2',
  },

  grayLite: {
    grayLite100: '#8F8F8F',
    grayLite90: '#9A9A9A',
    grayLite80: '#989898',
    grayLite70: '#A2A2A2',
    grayLite60: '#ACACAC',
    grayLite50: '#AAAAAA',
    grayLite40: '#B0B0B0',
  },

  grayExtraLite: {
    grayExtraLite100: '#ABABAB',
    grayExtraLite90: '#AEAEAE',
    grayExtraLite80: '#B8B8B8',
    grayExtraLite70: '#BDBDBD',
    grayExtraLite60: '#C1C1C1',
    grayExtraLite50: '#C3C3C3',
    grayExtraLite40: '#C7C7C7',
  },

  graySmoke: {
    smoke: '#D9D9D9',
    liteSmoke: '#ADADAD',
    extraLiteSmoke: '#BDBDBD',
    whiteSmoke: '#F0F0F0',
    liteWhiteSmoke: '#F5F5F5',
    extraLiteWhiteSmoke: '#FAFAFA',
  },

  red: {
    liteRed: '#D81110',
    darkRed: '#A91110',
    burgundy: '#60191B',
    darkBurgundy: '#381314',
  },

  blue: {
    greyBlue: '#37B7D7',
    dirtyBlue: '#5787CF',
    ultramarine: '#2564E1',
  },
  socialNetworks: {
    linkedIn: '#0077B5',
    faceBook: '#4267B2',
    twitter: '#1DA1F2',
  },
  transparentBlack: {
    modal: 'rgba(0,0,0,.175)',
  },
};

export const cannabisLawColors = {
  cannabisColorGray: '#EBE9E4',
  cannabisColorDarkGray: '#202020',
  cannabisTransparentBlack: '#0000009e',
  cannabisColorDarkGrayLight: '#313131',
};

export const entAndMediaColors = {
  entAndMediaColorGold: '#D1C09D',
  entAndMediaColorMediumGray: '#505050',
  entAndMediaColorGray: '#4F4F4F',
}

export const cyberSecurityColors = {
  cyberSecurityColorBlack: '#161616',
  cyberSecurityColorGray: '#8D8D8D',
  cyberSecurityColorLightGray: '#E7E7E7',
  cyberSecurityColorDarkGray: '#646464',
  cyberSecurityColorDark: '#222222',
  cyberSecurityColorGray300: '#949494',
}

export const globalGradient = {
  award: 'linear-gradient(180deg, #101113 68.23%, #60191b 94.79%)',
};

export const globalShadow = {
  allSideShadow: `-10px 10px 19px 0px rgba(0, 0, 0, 0.06), 0px -7px 16px 0px rgba(0, 0, 0, 0.06)`,
  hoveredShadow: `-2px 0px 18px rgb(99 98 98 / 90%)`,
  blueShadow: `-2px 0px 18px ${globalColor.blue.ultramarine}`,
};

export const buttonsHoverActive = `
  &:hover {
    background-color: ${globalColor.red.liteRed};
  }

  &:active {
    background-color: ${globalColor.red.burgundy};
  }
`;

export const buttonHoverActive = (hoverColor, activeColor) => `
    &:hover {
    background-color: ${hoverColor};
  }

  &:active {
    background-color: ${activeColor};
  }
`;

export const globalBackgroundImage = {
  subHeader: '/images/skyscraper.png',
};

export const globalIndents = {
  attorneyProfilePaddings: '20px 30px',
};

// this function adds rules with three dots after overfilling a container.
export const threeDots = (lines) => `
-webkit-line-clamp: ${lines};
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
`;

export const rem = (sizeInPx) => {
  return `${sizeInPx / mainFontSize}rem`;
};

export const imageCoverBlock = (imgUrl) =>
  `url(${imgUrl}) center/cover no-repeat;`;

export const paragraphStyles = `
	font-weight: 500;
	font-size: 1.35rem;
	text-align: center;
  font-family: var(--font-rajdhani), sans-serif;
  color: ${globalColor.white};
	text-transform: uppercase;
  width: 40%;
`;
export const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${mainFontSize}px;
    scroll-behavior: smooth;
  }

body {
  font-weight: 400;
  background-color: ${globalColor.graySmoke.extraLiteWhiteSmoke};
  
  * {
    letter-spacing: .02rem;
  }
}

#__next {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

a {
  text-decoration: none;
  color: ${globalColor.blue.dirtyBlue};

  :hover {
    color: ${globalColor.red.darkRed};
  }
}

ul {
	list-style: none;
  padding: 0;
}

h1 {
  font-family: var(--font-poppins), sans-serif;
}

h2 {
  font-size: ${rem(38)};
  font-weight: 400;
}

h3 {
  color: ${globalColor.black};
  font-weight: 700;
  font-size: ${rem(28)};
  margin: 0;
}

h4, h5 {
  font-size: 1.2rem;
}

h6 {
  font-size: 1.125rem;
}

input {
  border-radius: 0;
  border: 1px solid ${globalColor.grayExtraLite.grayExtraLite100};
  background-color: ${globalColor.graySmoke.liteWhiteSmoke};
  ::placeholder {
    color: ${globalColor.grayExtraLite.grayExtraLite80};
  }

  :active {
    border-color: ${globalColor.blue.ultramarine};
  }

  :focus-visible {
    border: 1px solid ${globalColor.blue.ultramarine};
    border-radius: 0 !important;
  }
}

video {
  width: -webkit-fill-available;
}

button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &[disabled] {
    background-color: ${globalColor.grayLite.grayLite100};
  }
}

.content {
  h4 {
    font-weight: bold;
  }

  p {
    margin-bottom: 1.125rem;
    line-height: 1.7;
  }

  li {
    font-size: 1rem;
  }

  img {
    max-width: 100%;
  }
}

.slick-list {
  text-align: center;
}

.smallExcerpt {
  font-size: 13px;
  line-height: 1.5;
  margin-top: 0;
  margin-bottom: 0;
}

.fs-1_2rem {
  font-size: 1.2rem;
}

.redTitle {
  color: ${globalColor.red.darkRed};
}

/** Button Styling **/
.btn-danger {
  font-weight: bold;
  background: linear-gradient(360deg, #901918 60%, #dd2624 100%), #333333;
}

  /** Hide captcha in print **/
  @media print {
    .grecaptcha-badge {
      display: none !important;
    }
  }
.kw-border-success {
  margin-left: 0;
}

/** Hide captcha in print **/
@media print {
  .grecaptcha-badge {
    display: none !important;
  }
}

/** Handle center button styles from wordpress **/
.aligncenter > img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.aligncenter > figcaption {
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
}

.alignleft {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: column;
  float: left;
  margin-right: 24px;
  width: min-content;
}

.alignright {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  flex-direction: column;
  float: right;
  margin-left: 24px;
  width: min-content;
}

.wp-block-columns {
  display: flex;
}

.wp-block-column {
  flex: 1;
}

.has-text-align-center {
  text-align: center;
}

.wrapper-section {
  width: 1650px;
  max-width: 96%;
  margin: 0 auto 150px;
}

footer .wrapper-section {
  margin-bottom: 0;
}

.box-shadow {
  box-shadow: -2px 0 10px rgb(0 0 0 / 13%);
}

.dNone {
  display: none;
}

.modal-header_my {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 30px;
  position: relative;
  text-align: center;
}

.modal-title_my {
  font-weight: bold;
}

@media (max-width: 992px) {
  .wp-block-columns {
    display: block;
  }
}

@media (min-width: 576px) {
  .container {
    max-width: 90%;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 96%;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1440px;
    padding: 0 5%;
  }
}

@media only screen and (max-width: 768px) {
  .modal-dialog {
    margin: 0;
  }
  .modal-content {
    width: 90%;
    margin: 0 auto;
  }

  .wrapper-section {
    margin: 0 auto 70px;
  }
}

.modal-link {
  font-weight: bold;
  color: #a91110;
  margin-bottom: 10px;
}

.modal-link:hover {
  text-decoration: none;
  color: #a91110;
}

.hovered-client {
  img {
    :hover {
      border: 1px solid ${globalColor.grayExtraLite.grayExtraLite80};
    }
  }
}

.bullets-li {
  padding-left: 20px;
  position: relative;
  
  ::before {
    top: 0;
    left: 0;
    content: '➤';
    position: absolute;
  }
}

  .slick-track {
    display: flex;
  }

  .key-contacts-title {
    color: ${globalColor.white};
    text-transform: uppercase;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
  }

  .attorneys-article-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 140px;

    h3 {
      font-size: ${rem(44)};
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 38px;
      color: ${globalColor.white};
    }

    p {
      ${paragraphStyles};
    }
  }
`;

export const ButtonLinkCss = `
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  width: 168px;
  transition: background 0.8s;
  background: ${globalColor.red.darkRed};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  color: ${globalColor.white};
  text-decoration: none;

  span {
    display: flex;
  }

  svg {
    display: none;
  }

  :hover {
    color: ${globalColor.white};
    text-decoration: none;
  }

  ${media_breakpoint_down('lg')} {
    width: 50px;

    span {
      display: none;
    }

    svg {
      display: block;
      height: 25px;
      width: 25px;
    }
  }
`;

export const beforeDoteStyledList = `
:before {
	 content: '';
	 width: 3px;
	 height: 5px;
	 margin-right: 5px;
	 background-color: ${globalColor.black};
	 position: absolute;
	 left: -10px;
	 top: 12px;
	 border-radius: 1px;
}
`;

export const attorneyCardForCannabis = `
	border: none;

    section {
      section {
        h3, p, address {
          font-family: var(--font-rajdhani), sans-serif;
          text-transform: uppercase;
          color: ${globalColor.white};

          svg {
            fill: ${globalColor.white};
          }
        }
        address {
          a {
            font-weight: 500;
          }
        }
      }
    }
`;

export const successMessage = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: ${globalColor.white};
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  color: ${globalColor.black};

  :before {
    content: '';
    display: inline-block;
    width: 84px;
    height: 75px;
    background-image: url('/images/sh-mini-diamond-PNG.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right center;
  }

  :after {
    content: 'Thank you for reaching out! We will get in touch with you soon.';
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
  }
`;

export const OptionalIndent = styled.div`
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '0')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};
`;
