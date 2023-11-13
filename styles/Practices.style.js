import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { globalColor, globalShadow, rem } from './global_styles/Global.styles';
import empty from 'is-empty';

export const ButtonTabToggle = styled(Dropdown.Toggle)`
  display: flex;
  width: 100%;
  padding: 10px 30px;
  justify-content: ${({ props }) =>
    props?.isButtonLink ? 'center' : 'space-between'};
  align-items: center;
  border: 1px solid
    ${({ props }) =>
      props?.isButtonLink
        ? globalColor.blue.ultramarine
        : globalColor.grayExtraLite.grayExtraLite100};
  text-decoration: none;
  transition: All 1s ease;
  -webkit-transition: All 1s ease;
  -moz-transition: All 1s ease;
  border-radius: 0;
  text-align: center;
  font-weight: 600;

  a {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${globalColor.gray.gray80};

    :hover {
      color: ${globalColor.red.darkRed};
      text-decoration: underline;
    }
  }

  :hover {
    background-color: ${({ props }) =>
      props?.isButtonLink
        ? globalColor.blue.dirtyBlue
        : globalColor.graySmoke.whiteSmoke};
    color: ${({ props }) =>
      props?.isButtonLink ? globalColor.white : globalColor.gray.gray100};
    text-decoration: none;
  }

  :focus {
    box-shadow: none;
  }

  :after {
    display: none;
  }

  svg {
    transition: 0.8s;
    fill: ${globalColor.gray.gray40};
    ${({ props }) =>
      props?.open ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'};
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const DropMenu = styled(Dropdown.Menu)`
  height: fit-content;
  max-height: 250px;
  overflow-y: auto;
`;

// export const DropdownItemPractice = styled(Dropdown.Item)`
//   font-size: 1rem;
//   overflow-wrap: break-word;
//   white-space: pre-wrap;
// `;

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

export const SideBarPracticeBox = styled.nav`
  padding: 10px 20px 20px;
  margin-bottom: 20px;

  h3 {
    margin-bottom: 10px;
  }
  ul {
    padding-left: 25px;
    list-style: decimal;
    margin-bottom: 0;

    li {
      a {
        font-weight: 500;
      }
    }
  }
`;

export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: ${globalShadow.allSideShadow};

  h4 {
    font-size: ${rem(20)};
    font-weight: 700;
    margin-bottom: 5px;
    margin-top: 20px;
  }

  p {
    color: ${globalColor.gray.gray80};
  }

  :hover {
    transition: 0.7s;
    box-shadow: ${globalShadow.hoveredShadow};
    cursor: pointer;
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
      !empty(isSowMoreProp) ? '214%' : '100%'};
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
