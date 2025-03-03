import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ButtonBreadcrumb } from 'styles/Breadcrumbs.style';
import { ContainerDefault } from 'styles/Containers.style';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const SubHeaderIndustrySection = styled.section`
  padding: 24px 0 40px;
  position: relative;
  min-height: calc(100dvh - 120px);
  z-index: 0;
  display: flex;

  .breadcrumb-container {
    padding: 0;
    margin: 0;

    .active {
      span {
        color: ${globalColor.gray.gray500};
        font-size: ${rem(14)};
      }
    }
  }

  ${ButtonBreadcrumb} {
    color: ${globalColor.gray.gray300};
    font-size: ${rem(14)};

    &:hover {
      color: ${globalColor.gray.gray150};
    }

    + svg {
      color: ${globalColor.gray.gray300};
    }
  }

  ${media_breakpoint_down('md')} {
    min-height: calc(100dvh - 90px);
    padding: 16px 0 28px;
  }
`;

export const SubHeaderIndustryBgImage = styled.picture`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(36, 41, 68, 0.7) 0%,
      rgba(36, 41, 68, 0.7)
    );
    /* backdrop-filter: blur(2px); */
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SubHeaderIndustryContainer = styled(ContainerDefault)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;

  ${media_breakpoint_down('lg')} {
    gap: 32px;
  }

  ${media_breakpoint_down('md')} {
    gap: 24px;
  }
`;

export const SubHeaderIndustryTop = styled.div`
  margin-bottom: auto;
  display: flex;
  justify-content: space-between;
  gap: 40px;

  ${media_breakpoint_down('md')} {
    flex-direction: column;
  }
`;

export const SubHeaderIndustryContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: ${globalColor.white};

  > h1 {
    margin: 0;
    font-size: ${rem(100)};
    line-height: 1;
    font-weight: 700;

    ${media_breakpoint_down('xxl')} {
      font-size: ${rem(80)};
    }

    ${media_breakpoint_down('lg')} {
      font-size: ${rem(52)};
    }

    ${media_breakpoint_down('md')} {
      font-size: ${rem(40)};
    }
  }

  ${media_breakpoint_down('lg')} {
    gap: 24px;
  }
`;

export const SubHeaderIndustryDescription = styled.div`
  max-width: 800px;
  font-family: var(--font-lato);
  font-size: ${rem(24)};
  line-height: 1.5;
  text-transform: uppercase;
  font-weight: 400;

  > p {
    &:last-child {
      margin: 0;
    }
  }

  ${media_breakpoint_down('xxl')} {
    max-width: 600px;
    font-size: ${rem(20)};
    line-height: 1.6;
  }

  ${media_breakpoint_down('lg')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }

  ${media_breakpoint_down('md')} {
    max-width: 100%;
  }
`;

export const SubHeaderIndustryAnchors = styled.div`
  max-width: 535px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media_breakpoint_down('lg')} {
    max-width: 100%;
    flex: unset;
  }
`;

export const SubHeaderIndustryAnchorsList = styled.ul`
  padding: 16px 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;

  li {
    flex-shrink: 0;
  }

  ${media_breakpoint_down('lg')} {
    padding: 0;
    gap: 16px;
    flex-direction: column;
    align-items: flex-end;
  }

  ${media_breakpoint_down('md')} {
    justify-content: unset;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: auto;
  }
`;

export const SubHeaderIndustryAnchorsLink = styled(Link)`
  display: inline-flex;
  padding: 4px 20px;
  border-radius: 40px;
  border: 1px solid currentColor;
  font-size: ${rem(18)};
  color: ${globalColor.white};
  font-weight: 500;

  &:hover {
    color: ${globalColor.white};
  }

  @media (hover: hover) {
    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }

  &:active {
    color: ${globalColor.blue.skyBlue};
  }

  ${media_breakpoint_down('lg')} {
    font-size: ${rem(16)};
  }

  ${media_breakpoint_down('md')} {
    padding: 4px 16px;
    font-size: ${rem(14)};
  }
`;

export const SubHeaderIndustryAttorneys = styled(Link)`
  margin-left: auto;
  display: inline-flex;
  width: fit-content;

  ${media_breakpoint_down('lg')} {
    display: none;
  }
`;

export const SubHeaderIndustryAttorneysAvatars = styled.ul`
  margin: 0;
  display: flex;
  justify-content: flex-end;
  row-gap: 16px;
  flex-wrap: wrap;

  li {
    margin-left: -10px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      inset: -2px;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      background: linear-gradient(90deg, #ffffff00 0%, #99a6ff 100%);
      z-index: -1;
      border-radius: 50%;
    }
  }
`;

export const SubHeaderIndustryAttorneysAvatar = styled(Image)`
  width: 67px;
  height: 67px;
  overflow: hidden;
  border-radius: 50%;
`;
