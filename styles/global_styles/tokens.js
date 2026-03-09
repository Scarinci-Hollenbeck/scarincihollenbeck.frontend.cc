export const rem = (sizeInPx) => `${sizeInPx / 16}rem`;

export const globalColor = {
  white: 'white',
  black: 'black',
  gray: {
    gray900: '#959595',
    gray800: '#CECECF',
    gray700: '#414141',
    gray500: '#929292',
    gray300: '#E4E4E5',
    gray150: '#B3B3B3',
    gray140: '#555555',
    gray130: '#4D4D4D',
    gray120: '#666',
    gray110: '#6A6A6A',
    gray1002: '#FBFBFB',
    gray100: '#424242',
    gray90: '#4a4a4a',
    gray80: '#5E5E5E',
    gray70: '#656565',
    gray60: '#727272',
    gray50: '#757575',
    gray40: '#888888',
    gray10: '#F2F2F2',
    dark: '#787E93',
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
    ultraLiteRed: '#F6A2A2',
    newRed: '#8F1B11',
    сoffee: '#450A05',
    light: '#FDEFEE',
  },

  blue: {
    skyBlue: '#8DC0F2',
    greyBlue: '#37B7D7',
    dirtyBlue: '#5787CF',
    ultramarine: '#2564E1',
    darkBlue: '#060B2A',
    darkUltramarine: '#162153',
    lightBlue: '#8AD',
    blue200: '#AFDCF5',
    blue400: '#568EDC',
    blue500: '#164587',
    blue550: '#31364F',
    blue600: '#377EC4',
    blue6002: '#242944',
    blue700: '#314AF5',
    blue800: '#E5F3FC',
    blue900: '#99A6FF',
    blue1000: '#B5CDF0',
    blue1100: '#73A4EA',
  },

  yellow: {
    liteYellow: '#FCD503',
  },

  socialNetworks: {
    linkedIn: '#0077B5',
    faceBook: '#4267B2',
    twitter: '#1DA1F2',
  },
  transparentBlack: {
    modal: 'rgba(0,0,0,.75)',
  },
};

export const globalShadow = {
  allSideShadow: `-10px 10px 19px 0px rgba(0, 0, 0, 0.06), 0px -7px 16px 0px rgba(0, 0, 0, 0.06)`,
  hoveredShadow: `-2px 0px 18px rgb(99 98 98 / 90%)`,
  blueShadow: `-2px 0px 18px ${globalColor.blue.ultramarine}`,
  shadowM: '0px 4px 12px 0px rgba(10, 62, 108, 0.06)',
};

export const globalBorderRadius = {
  big: '16px',
  middle: '12px',
  small: '8px',
  extraSmall: '4px',
};

const transitionDuration = 300;

export const globalTransition = {
  transitionDuration,
  default: `all ${transitionDuration}ms ease-out`,
};
