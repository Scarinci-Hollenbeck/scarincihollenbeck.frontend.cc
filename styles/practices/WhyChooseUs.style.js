import styled from 'styled-components';
import { Title32, Title20 } from 'styles/common/Typography.style';
import {
  customListMarker,
  globalBorderRadius,
  globalColor,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const WhyChooseUsSection = styled.section`
  padding: 40px 0;
  background-color: ${globalColor.white};

  ${Title32} {
    margin-bottom: 24px;

    ${media_breakpoint_down('xxl')} {
      margin-bottom: 12px;
    }
  }

  ${media_breakpoint_down('md')} {
    padding: 24px 0;
  }

  @media print {
    padding: 0;
  }
`;

export const WhyChooseUsCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;

  ${media_breakpoint_down('xl')} {
    gap: 16px;
  }

  @media print {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

export const WhyChooseUsCardContent = styled.div`
  flex: 1;
  padding: 24px 0 24px 24px;
  color: ${globalColor.white};
  font-family: var(--font-poppins);
  display: flex;
  flex-direction: column;

  ${Title20} {
    margin: 0 0 4px 0;
    font-size: ${rem(24)};
    font-weight: 400;
    line-height: 1.5;
    text-transform: uppercase;
    font-family: var(--font-lato);
    color: inherit;

    ${media_breakpoint_down('md')} {
      font-size: ${rem(16)};
      line-height: 1.5;
    }

    @media print {
      font-size: ${rem(16)};
      line-height: 1.4;
      margin-bottom: 8px;
    }
  }

  ${media_breakpoint_down('xl')} {
    padding: 8px 16px 16px;
  }

  ${media_breakpoint_down('md')} {
    padding: 8px 12px 12px;
  }

  @media print {
    padding: 8px 12px 12px;
  }
`;

export const WhyChooseUsCardDescription = styled.div`
  margin: 0;
  line-height: 1.5;
  font-weight: 400;

  p,
  ul {
    &:last-of-type {
      margin: 0;
    }
  }

  a {
    color: ${globalColor.white};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  ul {
    li {
      padding: 0;
      ${customListMarker};

      &::before {
        display: none;
      }
    }
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }

  @media print {
    font-size: ${rem(10)};
    line-height: 1.6;
  }
`;

export const WhyChooseUsCardImage = styled.picture`
  width: 42%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  ${media_breakpoint_down('xxl')} {
    width: 34%;
  }

  ${media_breakpoint_down('xl')} {
    width: 100%;
    height: 140px;
    order: -1;
  }

  ${media_breakpoint_down('sm')} {
    height: 80px;
  }

  @media print {
    width: 34%;
    height: 100%;
    order: 0;
  }
`;

export const WhyChooseUsCardWrapper = styled.div`
  flex: 1 1 calc((100% - 32px) / 2);
  min-height: 285px;
  display: flex;
  column-gap: 48px;
  border-radius: ${globalBorderRadius.middle};
  background: linear-gradient(98deg, #060b2a -0.14%, #377ec4 108.53%);
  overflow: hidden;

  &:not(:has(${WhyChooseUsCardImage})) {
    ${WhyChooseUsCardContent} {
      padding: 24px;

      ${media_breakpoint_down('xl')} {
        padding: 8px 16px;
      }

      ${media_breakpoint_down('md')} {
        padding: 8px 12px;
      }
    }
  }

  ${media_breakpoint_down('xxl')} {
    column-gap: 16px;
  }

  ${media_breakpoint_down('xl')} {
    flex-direction: column;
    flex-basis: calc((100% - 16px) / 2);
  }

  ${media_breakpoint_down('lg')} {
    flex-basis: 100%;
  }

  @media print {
    flex: 1 1 calc((100% - 16px) / 2);
    width: 100%;
    flex: 1;
    break-inside: avoid;
    page-break-inside: avoid;
    column-gap: 8px;
    flex-direction: row;
  }
`;
