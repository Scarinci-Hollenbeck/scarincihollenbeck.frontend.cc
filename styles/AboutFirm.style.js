import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from './mediaBreakpoints.style';
import Link from 'next/link';

export const AboutSection = styled.section`
  padding: 60px 0;
  background-color: ${globalColor.blue.darkBlue};

  ${media_breakpoint_down('md')} {
    padding: 40px 0;
  }
`;

export const AboutBlocks = styled.div`
  display: flex;
  gap: 32px;

  ${media_breakpoint_down('xl')} {
    flex-direction: column;
  }
`;

export const AboutBlock = styled.div`
  flex: 1 1 50%;
  color: ${globalColor.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 16px;

  &:first-child {
    align-self: center;

    ${media_breakpoint_down('xxl')} {
      flex-basis: 45%;
    }

    ${media_breakpoint_exactly_down(1350)} {
      flex-basis: 30%;
    }
  }

  ${media_breakpoint_down('md')} {
    row-gap: 8px;
  }
`;

export const AboutDescription = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  p,
  ul {
    margin: 0;

    strong {
      color: ${globalColor.blue.skyBlue};
      font-weight: 400;
    }

    ${media_breakpoint_down('md')} {
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

  ${media_breakpoint_down('md')} {
    row-gap: 12px;
  }
`;

export const AboutCard = styled.article`
  /* max-height: 400px; */
  height: 100%;
  padding: 24px;
  margin-top: 48px;
  display: flex;
  align-items: flex-end;
  column-gap: 20px;
  row-gap: 16px;
  border-radius: ${globalBorderRadius.big};
  background-color: ${globalColor.blue.blue6002};

  ${media_breakpoint_down('xl')} {
    margin-top: 88px;
    position: relative;
    padding-left: 324px;
  }

  ${media_breakpoint_down('sm')} {
    margin-top: 104px;
    padding: 239px 12px 12px 12px;
    flex-direction: column;
  }
`;

export const AboutCardImage = styled.div`
  width: 280px;
  min-height: 284px;
  height: calc(100% + 72px);
  border-radius: ${globalBorderRadius.small};
  box-shadow: 0px 1px 12px 0px rgba(255, 255, 255, 0.12);
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    object-position: top;
  }

  ${media_breakpoint_down('xl')} {
    height: calc(100% + 64px);
    position: absolute;
    left: 24px;
    bottom: 24px;
  }

  ${media_breakpoint_down('sm')} {
    height: 327px;
    max-width: 330px;
    width: calc(100% - 24px);
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% - 223px);
  }
`;

export const AboutCardContent = styled.div`
  max-height: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  ${media_breakpoint_down('xl')} {
    min-height: 180px;
  }

  ${media_breakpoint_down('sm')} {
    min-height: auto;
  }
`;

export const AboutCardDescription = styled.div`
  margin-block: auto;
  margin-right: -20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  overflow: auto;

  p {
    margin: 0;
    font-weight: 300;

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }

  ${media_breakpoint_down('sm')} {
    margin-top: unset;
    row-gap: 12px;
  }
`;

export const AboutCardTitle = styled(Link)`
  color: ${globalColor.white};
  font-weight: 600;
  transition: ${globalTransition.default};

  &:hover {
    color: ${globalColor.blue.skyBlue};
  }
`;
