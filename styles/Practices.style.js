import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { globalColor, globalShadow, rem } from './global_styles/Global.styles';
import empty from 'is-empty';

export const BlockListBox = styled.section`
  margin-top: 3rem;

  .container {
    padding: 0;
  }
`;

export const ListSimple = styled.ul`
  column-count: 3;
  column-gap: 40px;
  padding-left: 15px;
  list-style: decimal;

  li {
    margin-bottom: 10px;

    a {
      color: ${globalColor.blue.dirtyBlue};

      :hover {
        color: ${globalColor.red.darkRed};
      }
    }
  }

  ${media_breakpoint_down('lg')} {
    column-count: 2;
  }

  ${media_breakpoint_down('sm')} {
    column-count: 1;
  }
`;

export const ArticleSearchBox = styled.div`
  display: flex;
  gap: 3%;

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
  }
`;

export const PracticesTilesContainer = styled.div`
  > :first-child {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3%;

    > li {
      margin-bottom: 3%;
    }
  }
`;

export const ShowMoreBtn = styled.button`
  color: ${globalColor.gray.gray90};
  position: absolute;
  z-index: 5;
  top: ${({ isRotateChevron }) => (!empty(isRotateChevron) ? '94%' : '85%')};
  right: 20px;

  svg {
    margin-left: 5px;
    stroke-width: 1px;
    transform: ${({ isRotateChevron }) =>
      !empty(isRotateChevron) ? 'rotate(180deg)' : 'rotate(0deg)'};
  }

  ${media_breakpoint_down('sm')} {
    display: none;
  }
`;

export const PracticeTile = styled.li`
  display: flex;
  width: 395px;
  height: 280px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: ${({ isSowMoreProp }) => (!empty(isSowMoreProp) ? '2' : '1')};
  cursor: pointer;

  > :first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    box-shadow: ${globalShadow.allSideShadow};

    img {
      position: relative;
      z-index: 3;
      filter: brightness(80%);
    }

    ${media_breakpoint_down('sm')} {
      flex-direction: column;
      background-color: white;
      justify-content: center;
      gap: 15px;
    }
  }

  > :last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: none;
    box-shadow: ${globalShadow.allSideShadow};

    img {
      position: relative;
      z-index: 3;
    }

    ${({ isRotateCard }) =>
      !empty(isRotateCard)
        ? `
    .practices-children-list {
        transition: 0s linear .15s, max-height .3s linear;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }`
        : ''}

    ${media_breakpoint_down('sm')} {
      display: none;
    }
  }

  .practices-children-list {
    display: flex;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    width: 100%;
    max-height: ${({ isSowMoreProp }) =>
      !empty(isSowMoreProp) ? '222%' : '100%'};
    min-height: 100%;
    padding: 20px 20px 20px 20px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    background-color: rgba(255, 255, 255);
    position: absolute;
    box-shadow: ${globalShadow.allSideShadow};
    top: 0;
    z-index: 4;

    h6 {
      flex-wrap: wrap;
      color: ${globalColor.gray.gray80};
      font-weight: 700;
      min-height: 25px;
    }

    ul {
      height: 80%;
      overflow: hidden;
      margin-bottom: 20px;
      list-style: disc;

      li {
        font-weight: 500;
        margin-left: 19px;
        text-align: left;
      }
    }
  }

  .light-title {
    filter: brightness(100%);
    position: absolute;
    z-index: 4;
    font-weight: 700;
    color: ${globalColor.white};
    font-size: 1.5rem;
    text-shadow: ${globalColor.black} 1px 0 10px;

    svg {
      display: none;
    }
  }

  ${media_breakpoint_down('sm')} {
    width: 100%;
    height: auto;
    align-items: flex-start;
    z-index: ${({ isRotateCard }) => (!empty(isRotateCard) ? 5 : 4)};

    img {
      width: 100%;
      height: 100px;
      object-fit: cover;
    }

    .light-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.2rem;
      /* top: 20%; */

      svg {
        display: block;
        stroke-width: 1.5px;
        transition: 0.8s;
        ${({ isRotateCard }) =>
          isRotateCard
            ? 'transform: rotate(180deg)'
            : 'transform: rotate(0deg)'};
      }
    }

    ${({ isRotateCard }) =>
      !empty(isRotateCard)
        ? `
     .practices-children-list {
      margin-top: 100px;
      visibility: visible;
      opacity: 1;
      height: auto;
      max-height: none;
      pointer-events: all;
      box-shadow: ${globalShadow.allSideShadow};
    }
    `
        : ''};
  }
`;
