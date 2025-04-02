import styled from 'styled-components';
import { globalColor, rem } from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { StandardBlueButton } from './Buttons.style';

export const SubscriptionBannerHolder = styled.div`
  --banner-gap: 64px;
  display: flex;
  gap: var(--banner-gap);

  ${media_breakpoint_down('lg')} {
    --banner-gap: 16px;
    flex-direction: column;
  }
`;

export const SubscriptionBannerTitle = styled.h2`
  max-width: 270px;
  color: inherit;
  text-transform: uppercase;

  strong {
    font-weight: inherit;
  }

  ${media_breakpoint_down('lg')} {
    max-width: 100%;
  }
`;

export const SubscriptionBannerContent = styled.div`
  flex: 1;
  padding-left: var(--banner-gap);
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  border-left: 1px solid ${globalColor.gray.gray500};

  button {
    max-width: 240px;
  }

  ${media_breakpoint_down('lg')} {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid ${globalColor.gray.gray500};
    padding-top: var(--banner-gap);
  }

  ${media_breakpoint_down('md')} {
    row-gap: 16px;
  }
`;

export const SubscriptionBannerSubtitle = styled.h3`
  margin: 0;
  color: inherit;
  font-family: var(--font-lato);
  font-size: ${rem(24)};
  line-height: 1.5;
  font-weight: 400;
  text-transform: uppercase;

  ${media_breakpoint_down('md')} {
    font-size: ${rem(18)};
  }
`;

export const SubscriptionBannerDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  p {
    margin: 0;
  }

  ${media_breakpoint_down('md')} {
    row-gap: 16px;
  }
`;

export const SubscriptionBannerSection = styled.section`
  padding: 80px 0;
  background-color: ${globalColor.blue.darkBlue};
  color: ${globalColor.white};

  ${media_breakpoint_down('xl')} {
    padding: 60px 0;
  }

  ${media_breakpoint_down('lg')} {
    padding: 40px 0;
  }

  &.subscription-industry {
    background-color: ${globalColor.blue.blue6002};

    ${SubscriptionBannerTitle} {
      width: 525px;
      max-width: 100%;
      text-transform: unset;

      strong {
        color: ${globalColor.blue.blue200};
      }

      ${media_breakpoint_down('xxl')} {
        width: 400px;
      }

      ${media_breakpoint_down('xl')} {
        width: 340px;
      }

      ${media_breakpoint_down('lg')} {
        width: 100%;
      }
    }

    ${SubscriptionBannerHolder} {
      gap: 40px;

      ${media_breakpoint_down('lg')} {
        flex-direction: column;
        gap: 24px;
      }

      ${media_breakpoint_down('md')} {
        gap: 16px;
      }
    }

    ${SubscriptionBannerContent} {
      padding: 0;
      border: 0;

      ${media_breakpoint_down('lg')} {
        gap: 8px;
      }
    }

    ${SubscriptionBannerSubtitle} {
      text-transform: capitalize;
      font-size: ${rem(20)};
      font-weight: 600;

      ${media_breakpoint_down('md')} {
        font-size: ${rem(18)};
      }
    }

    ${SubscriptionBannerDescription} {
      ${media_breakpoint_down('lg')} {
        gap: 20px;
      }
    }

    ${StandardBlueButton} {
      ${media_breakpoint_down('lg')} {
        margin-top: 12px;
      }

      ${media_breakpoint_down('sm')} {
        max-width: 100%;
      }
    }

    ${media_breakpoint_down('xxl')} {
      padding: 40px 0;
    }

    ${media_breakpoint_down('md')} {
      padding: 24px 0;
    }
  }
`;
