import styled from 'styled-components';
import Link from 'next/link';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
  media_breakpoint_range_exacly,
  media_breakpoint_up,
} from './mediaBreakpoints.style';
import { globalColor, globalShadow, rem } from './global_styles/Global.styles';
import empty from 'is-empty';

const addressPointConst = `
      span {
        span {
          :first-child {
            position: relative;
            top: -18px;
            margin-top: 0;
          }
        }
      }
`;

export const LocationPageContainer = styled.section`
  .form-column {
    margin-top: 60px;
    padding-bottom: 40px;
  }

  .row-content {
    ${media_breakpoint_exactly_down(1080)} {
      margin-right: 3%;
      margin-left: 3%;
    }
  }
  ${media_breakpoint_up('fullHd')} {
    padding-right: 7%;
    padding-left: 7%;
  }

  ${media_breakpoint_down('fullHd')} {
    padding-right: 7%;
    padding-left: 7%;
  }

  ${media_breakpoint_exactly_down(1440)} {
    padding-right: 3%;
    padding-left: 3%;
  }

  ${media_breakpoint_exactly_down(1080)} {
    padding-right: 0;
    padding-left: 0;
  }
`;
export const LinkMapBox = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const DownloadTheMap = styled.a`
  display: flex;
  gap: 15px;
  color: ${globalColor.blue.ultramarine};
  width: fit-content;
  margin-bottom: 15px;
  font-size: 1.2rem;
`;

export const MediaBr = styled.br`
  display: none;

  ${media_breakpoint_exactly_down(450)} {
    display: block;
  }
`;

export const OfficeTabs = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  position: relative;
  z-index: 20;
  top: -50px;

  ${({ isBlueVariant }) =>
    !empty(isBlueVariant) &&
    `
    top: auto;
    gap: 8px;
    flex-direction: column;
  `};

  ${media_breakpoint_down('md')} {
    gap: 10px;
  }

  ${media_breakpoint_down('sm')} {
    top: ${({ isBlueVariant }) => (isBlueVariant ? '0' : '-20px')};
  }
`;

export const BlueLinkTab = styled(Link)`
  padding: 13px 8px;
  color: ${globalColor.white};
  font-size: ${rem(14)};
  font-weight: 700;
  line-height: 13px;
  transition: all 0.5s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  outline: none;
  ${({ locationturned }) =>
    !empty(locationturned) &&
    `
      background-color: #162153;
      pointer-events: none;
    `}

  :before {
    transition-delay: 0.1s;
    transition: all 0.5s ease-in-out;
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
    width: 12px;
    height: 20px;
    background-color: #162153;
    clip-path: polygon(100% 50%, 0 0, 0% 100%);
    opacity: ${({ locationturned }) => (!empty(locationturned) ? '1' : '0')};
  }

  :hover {
    cursor: ${({ locationturned }) =>
      !empty(locationturned) ? 'not-allowed' : 'pointer'};
    border-radius: 4px;
    background-color: #162153;
    color: ${globalColor.white};

    :before {
      opacity: 1;
    }
  }
`;

export const OfficeTab = styled(Link)`
  display: flex;
  justify-content: start;
  width: 220px;
  padding: 15px 10px;
  box-shadow: ${globalShadow.allSideShadow};
  text-transform: uppercase;
  font-weight: 600;
  position: relative;

  > div {
    width: 91%;
  }

  span {
    z-index: 1;
  }

  ${(props) => {
    return (
      props?.imgurl?.length > 0 &&
      `
      background: no-repeat url(${props?.imgurl});
      background-size: 50% 138%;
      background-position: right top 29%;
      color: ${globalColor.red.darkRed};
      box-shadow: ${globalShadow.hoveredShadow};
      cursor: default;
      pointer-events: none;
      `
    );
  }}

  :hover {
    box-shadow: ${globalShadow.hoveredShadow};
  }

  ${media_breakpoint_down('sm')} {
    width: 48%;
  }

  ${media_breakpoint_exactly_down(420)} {
    transition: 0.7s;
    width: ${(props) => (props?.imgurl?.length > 0 ? '76%' : '220px')};
  }
`;

export const OfficeCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0 20px;
  box-shadow: ${globalShadow.allSideShadow};
  ${({ backgroundColor }) => `
    background-color: ${backgroundColor};
  `}

  address {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px 0;
    font-size: 1.2rem;

    ${media_breakpoint_range_exacly(992, 1500)} {
      ${addressPointConst}
    }

    ${media_breakpoint_down('md')} {
      ${addressPointConst};
    }

    svg {
      color: ${globalColor.gray.gray80};
      margin-right: 5px;
    }

    > * {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

export const OfficeLocationBoxTitle = styled.h4`
  font-size: ${rem(32)};
  text-transform: uppercase;
  margin-bottom: 24px;
`;
