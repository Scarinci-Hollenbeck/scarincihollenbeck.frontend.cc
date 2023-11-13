import styled from 'styled-components';
import { globalColor } from './global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from './mediaBreakpoints.style';

export const FooterContainer = styled.footer`
  display: flex;
  background-color: ${({ backgroundFooterColor }) =>
    backgroundFooterColor
      ? backgroundFooterColor
      : globalColor.red.darkBurgundy};
  color: #fff;
  padding: 2vw 3vw 1vw 3vw;
  width: 100%;

  a {
    color: #fff;
  }

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
    padding: 2vw 6vw 2vw 8vw;
  }
`;

export const DetailsContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
  }
`;

export const ContactsContainer = styled.section`
  display: flex;
  gap: 25px;

  ${media_breakpoint_down('lg')} {
    width: 100%;
    gap: 25px;
    padding: 0 12vw;
    margin-top: 25px;
    justify-content: space-between;
  }

  ${media_breakpoint_down('sm')} {
    padding: 0;
  }

  ${media_breakpoint_exactly_down(430)} {
    flex-direction: column;
  }
`;

export const BottomLinks = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 24px;
  margin-top: 13px;
  padding-left: 0;
  margin-bottom: 0;

  li {
    text-transform: none;
    border-bottom: 1.5px solid #aaaaaa;

    a:hover {
      text-decoration: none;
      color: ${globalColor.white};
    }
  }
`;
export const Advertising = styled.article`
  display: flex;

  section {
    display: flex;
    padding-top: 10px;
    justify-content: center;

    ${media_breakpoint_down('sm')} {
      flex-direction: column;
      margin-left: 0;
    }

    section {
      display: flex;
      flex-direction: column;
      margin-left: 25px;

      ${media_breakpoint_down('sm')} {
        margin-left: 0;
      }
    }
    p {
      margin: 0;
    }
  }
`;

export const ContactsBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 206px;

  ${media_breakpoint_down('sm')} {
    min-width: auto;
  }
`;

export const LinkTitle = styled.p`
  font-size: 20px;
  margin-bottom: 18px;
  font-weight: 600;
`;
export const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: 0;
  list-style-type: none;

  > li {
    margin-bottom: 5px;
  }
`;

export const SocialLinks = styled(LinkList)`
  min-width: 140px;
  li {
    a {
      display: flex;
      align-items: center;
      gap: 10px;
      ${media_breakpoint_down('sm')} {
        div {
          display: none;
        }
      }
    }
  }
`;

export const HiddenSEOBox = styled.section`
  display: flex;
  position: fixed;
  z-index: -1;

  @media print {
    display: none;
  }
`;
