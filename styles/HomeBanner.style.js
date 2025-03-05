import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import Image from 'next/image';
import { UnderlinedLink } from './common/Typography.style';

export const Banner = styled.section`
  padding: 60px 0;
  position: relative;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(227, 238, 255, 0.6) 42.59%,
      #e3eeff 100%
    );
    z-index: -1;

    ${media_breakpoint_down('lg')} {
      width: 100%;
    }
  }

  ${media_breakpoint_down('md')} {
    padding: 40px 0;
  }
`;

export const BannerImage = styled(Image)`
  z-index: -2;
  object-fit: cover;
  object-position: 77%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const BannerSlogans = styled.ul`
  margin: 0 0 16px 140px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 12px;
  position: relative;

  &::before {
    position: absolute;
    right: calc(100% + 12px);
    width: 50vw;
    content: '';
    height: 2px;
    border-radius: 4px;
    background-color: ${globalColor.blue.blue400};

    ${media_breakpoint_down('md')} {
      content: none;
    }
  }

  ${media_breakpoint_down('md')} {
    margin: 0 0 8px 0;
    column-gap: 4.5px;
  }
`;

export const BannerSlogan = styled.li`
  color: ${globalColor.gray.gray700};
  font-family: var(--font-lato);
  font-size: ${rem(24)};
  line-height: 1.5;
  text-transform: uppercase;

  ${media_breakpoint_down('md')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }
`;

export const BannerTitle = styled.h1`
  margin: 0 0 24px 0;
  max-width: 720px;
  color: ${globalColor.blue.darkBlue};
  font-size: ${rem(48)};
  line-height: 1.5;
  font-weight: 500;

  ${media_breakpoint_down('md')} {
    margin-bottom: 16px;
    font-size: ${rem(32)};
    line-height: 1.38;
  }
`;

export const BannerText = styled.p`
  max-width: 752px;
  margin: 0;
  color: ${globalColor.gray.gray700};
  font-size: ${rem(20)};
  line-height: 1.6;
  font-style: italic;

  ${media_breakpoint_down('md')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }
`;

export const BannerCards = styled.div`
  margin-top: 40px;
  padding: 28px 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  border-radius: ${globalBorderRadius.big};
  background-color: rgba(255, 255, 255, 0.84);
  box-shadow: 0px 2px 16px 0px rgba(10, 62, 108, 0.22);
  /* backdrop-filter: blur(4px); */

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
  }

  ${media_breakpoint_down('md')} {
    margin-top: 16px;
  }

  ${media_breakpoint_down('sm')} {
    border-radius: ${globalBorderRadius.middle};
    padding: 12px;
    gap: 16px;
  }
`;

export const BannerCard = styled.article`
  flex: 1 1 calc((100% - 64px) / 3);
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  padding-right: 32px;
  border-right: 1px solid ${globalColor.gray.gray300};

  &:hover {
    .icon {
      color: ${globalColor.blue.blue400};
    }

    .link {
      border-color: ${globalColor.blue.blue400};
    }
  }

  &:last-child,
  &:nth-child(3) {
    padding-right: 0;
    border-right: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  ${media_breakpoint_down('lg')} {
    padding-right: 0;
    border-right: 0;
    padding-bottom: 32px;
    border-bottom: 1px solid ${globalColor.gray.gray300};
  }

  ${media_breakpoint_down('sm')} {
    row-gap: 8px;
    padding-bottom: 16px;
  }
`;

export const BannerCardHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;

  ${media_breakpoint_down('sm')} {
    column-gap: 8px;
  }
`;

export const BannerCardIcon = styled.span`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${globalTransition.default};

  svg {
    width: 100%;
    height: 100%;
  }

  ${media_breakpoint_down('sm')} {
    width: 24px;
    height: 24px;
  }
`;

export const BannerCardTitle = styled.h2`
  margin: 0;
  color: ${globalColor.blue.darkBlue};
  font-family: var(--font-lato);
  font-size: ${rem(24)};
  line-height: 1.5;
  font-weight: 400;
  text-transform: uppercase;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(16)};
  }
`;

export const BannerCardContent = styled.div`
  margin: 0 0 12px 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  p,
  ul {
    margin: 0;
    color: ${globalColor.gray.gray110};

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }

  ul {
    list-style: disc;

    li {
      margin-left: 24px;
      &::marker {
        font-size: ${rem(12)};
      }
    }
  }

  ${media_breakpoint_down('sm')} {
    margin-bottom: 8px;
    row-gap: 12px;
  }
`;

export const BannerCardLink = styled(UnderlinedLink)`
  margin-top: auto;
`;
