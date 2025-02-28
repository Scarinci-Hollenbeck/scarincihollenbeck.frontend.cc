import styled from 'styled-components';
import {
  globalColor,
  globalTransition,
  rem,
} from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

export const FooterWrapper = styled.footer`
  padding-top: 12px;
  background-color: ${globalColor.blue.darkBlue};
  color: ${globalColor.white};

  @media print {
    display: ${({ $isPrint }) => (!$isPrint ? 'flex' : 'none')};
  }
`;

export const FooterHolder = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  row-gap: 60px;

  a {
    color: ${globalColor.white};
  }

  ${media_breakpoint_down('lg')} {
    padding: 16px 0 40px;
    row-gap: 24px;
  }

  ${media_breakpoint_down('md')} {
    padding: 12px 0 40px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;

  ${media_breakpoint_down('xl')} {
    flex-direction: column-reverse;
  }

  ${media_breakpoint_down('lg')} {
    gap: 32px;
  }
`;

export const DetailsContainer = styled.section`
  width: max-content;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  gap: 40px;

  ${media_breakpoint_down('xl')} {
    width: 100%;

    > div {
      width: calc((100% - 80px) / 3);
    }
  }

  ${media_breakpoint_down('lg')} {
    gap: 32px;

    > div {
      width: calc((100% - 32px) / 2);
    }
  }
`;

export const BottomLinks = styled.ul`
  margin: 12px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  ${media_breakpoint_down('sm')} {
    gap: 8px 12px;
  }

  li {
    a {
      font-weight: 600;
      transition: ${globalTransition.default};

      &:hover {
        color: ${globalColor.blue.skyBlue};
      }
    }
  }

  ${media_breakpoint_down('sm')} {
    margin-top: 16px;
  }

  @media print {
    display: none;
  }
`;

export const Advertising = styled.article`
  display: flex;
  align-items: center;
  column-gap: 16px;

  .advertising-title {
    margin: 0 0 4px 0;
    color: ${globalColor.gray.gray300};
    font-family: var(--font-lato);
    font-size: ${rem(12)};
    line-height: 1.67;
    text-transform: uppercase;
  }

  .advertising-text {
    margin: 0;
    color: ${globalColor.gray.gray300};
    font-size: ${rem(14)};

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(12)};
      line-height: 1.67;
    }
  }

  > img {
    width: 95px;
    height: 92px;
  }
`;

export const FooterDoubleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  ${media_breakpoint_down('lg')} {
    flex-direction: row;
    gap: 32px;
  }

  ${media_breakpoint_down('sm')} {
    order: -1;
  }
`;

export const LinksSEOBox = styled.section`
  display: flex;
  gap: 40px;

  ${media_breakpoint_down('xl')} {
    > div {
      flex: 1;
    }
  }

  ${media_breakpoint_down('lg')} {
    flex-wrap: wrap;
    gap: 32px;

    > div {
      flex: unset;
      width: calc((100% - 32px) / 2);
    }

    ${FooterDoubleColumn} {
      width: 100%;

      > div {
        width: 50%;
      }
    }
  }

  ${media_breakpoint_down('sm')} {
    > div {
      width: 100%;
    }
  }

  @media print {
    display: none;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const LinkTitle = styled.p`
  margin: 0;
  color: ${globalColor.white};
  font-size: inherit;
  line-height: 1.5;
  font-weight: 600;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const LinkList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  > li {
    display: inline-flex;
    align-items: center;
    column-gap: 8px;

    > a {
      transition: ${globalTransition.default};

      &:hover {
        color: ${globalColor.blue.skyBlue};
      }
    }

    svg {
      flex-shrink: 0;
      fill: ${globalColor.blue.skyBlue};
    }

    ${media_breakpoint_down('sm')} {
      font-size: ${rem(14)};
    }
  }

  .phone-mail-footer {
    display: inline-flex;
    align-items: center;
    column-gap: 8px;

    .link-text {
      border-bottom: 1px solid ${globalColor.white};
    }

    .icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    :hover {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;

export const SocialLinks = styled(LinkList)`
  li {
    a {
      display: flex;
      align-items: center;
      gap: 10px;

      .icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        > svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

export const NavWrapper = styled.div`
  background-color: ${globalColor.white};
`;

export const NavHolder = styled.section`
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
  row-gap: 12px;

  > div {
    color: ${globalColor.black};
  }

  .footer-subscription-btn {
    flex-shrink: 0;

    > span {
      padding: 8px 28px;
    }

    svg {
      width: 24px;
      height: 24px;
      display: flex;
      fill: ${globalColor.white};
    }

    ${media_breakpoint_down('md')} {
      align-self: flex-start;
      order: -1;
    }
  }

  ${media_breakpoint_down('md')} {
    flex-direction: column;
  }
`;

export const FooterNavigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  ul {
    width: 100%;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    column-gap: 32px;
    row-gap: 16px;

    ${media_breakpoint_down('md')} {
      gap: 16px;
    }

    li {
      a {
        color: ${globalColor.blue.darkBlue};
        font-size: ${rem(18)};
        line-height: 1.56;
        font-weight: 500;
        transition: ${globalTransition.default};

        :hover {
          color: ${globalColor.blue.dirtyBlue};
        }

        ${media_breakpoint_down('md')} {
          font-size: ${rem(16)};
          line-height: 1.5;
        }
      }

      ${media_breakpoint_down('md')} {
        width: calc((100% - 16px) / 2);
      }
    }
  }
`;
