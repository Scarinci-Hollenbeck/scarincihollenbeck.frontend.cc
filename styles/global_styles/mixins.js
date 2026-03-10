import { globalColor } from './tokens';
import { media_breakpoint_down } from '../mediaBreakpoints.style';

export const customListMarker = `
  margin-left: 1.220em;
  &::marker {
    content: "⬥  ";
  }
`;

export const hideListMarker = `
  margin-left: 0;
  &::marker {
    content: none;
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
    background-image: url('/images/sh-mini-diamond-PNG.svg');
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

export const industrySectionPaddingBlock = `
  padding-block: 60px;

  ${media_breakpoint_down('xxl')} {
    padding-block: 40px;
  }

  ${media_breakpoint_down('md')} {
    padding-block: 24px;
  }
`;

export const industrySectionContainer = `
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  ${media_breakpoint_down('md')} {
    row-gap: 16px;
  }
`;
