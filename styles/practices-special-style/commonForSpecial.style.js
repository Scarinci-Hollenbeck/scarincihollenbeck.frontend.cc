import styled from 'styled-components';
import {
  cannabisLawColors,
  globalColor,
  rem,
} from '../global_styles/Global.styles';
import empty from 'is-empty';
import { media_breakpoint_exactly_down } from '../mediaBreakpoints.style';

export const ArticleCommonBox = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .article-common-title {
    font-size: ${({ titleFontSize }) =>
      !empty(titleFontSize) ? `${rem(titleFontSize)}` : '1.3rem'};
    font-weight: 600;
    margin-bottom: ${({ mbTitle }) =>
      !empty(mbTitle) ? `${mbTitle}px` : '48px'};
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: ${({ isColorWordsWhite }) =>
      !empty(isColorWordsWhite)
        ? `${globalColor.white}`
        : `${cannabisLawColors.cannabisColorDarkGray}`};
  }

  p {
    text-transform: uppercase;
    font-family: var(--font-rajdhani), sans-serif;
    font-size: ${({ paragraphFontSize }) =>
      !empty(paragraphFontSize) ? `${rem(paragraphFontSize)}` : `${rem(20)}`};
    font-weight: 500;
    color: ${({ isColorWordsWhite }) =>
      !empty(isColorWordsWhite)
        ? `${globalColor.white}`
        : `${cannabisLawColors.cannabisColorDarkGray}`};
  }
`;

export const FullHDContainer = styled.div`
  width: 1950px;

  ${media_breakpoint_exactly_down(1980)} {
    // display: ${({ display }) => (display ? display : 'block')};
    width: 100%;
  }
`;

export const ContainerContent = styled.div`
  width: ${rem(1920)};
  max-width: 100%;
  padding: 0 135px;
  margin: 0 auto;

  @media (max-width: 1850px) {
    padding: 0 84px;
  }

  @media (max-width: 1440px) {
    padding: 0 32px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;
