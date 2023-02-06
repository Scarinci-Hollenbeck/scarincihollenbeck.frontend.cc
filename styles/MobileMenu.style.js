import styled from 'styled-components'
import Accordion from 'react-bootstrap/Accordion'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { globalColor, globalShadow } from './global_styles/Global.styles'
import { media_breakpoint_down } from './mediaBreakpoints.style'

export const BurgerBtn = styled.button`
  display: none;
  margin-left: 20px;
  padding: 0;
  background-color: transparent;
  outline: 0;
  border: 0;

  .icon {
    width: 36px;
    height: 36px;
    color: black;
  }

  ${media_breakpoint_down('lg')} {
    display: block;
  }
`

export const OffcanvasBody = styled(Offcanvas.Body)`
  padding: 0;
`
export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 0 10px 0;
`
export const AccordionStyled = styled(Accordion)`
  .accordion-item {
    border: 0;
    border-radius: 0;
    box-shadow: ${globalShadow.allSideShadow};

    :hover {
      box-shadow: ${globalShadow.hoveredShadow};
    }

    .accordion-body {
      padding: 0;
      ul {
        li {
          width: 100%;
          height: 52px;
          border-bottom: 1px solid ${globalColor.gray.gray40};
        }
      }
    }

    .accordion-button {
      border-radius: 0;
      .collapsed {
        border-radius: 0;
      }
      :focus {
        box-shadow: ${globalShadow.blueShadow};
      }
    }
    .accordion-button:not(.collapsed) {
      background-color: white;
    }
  }
`

export const GrayButtonLink = styled.a`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15px 0 15px 22px;
  color: inherit;

  :hover {
    background-color: ${globalColor.grayExtraLite.grayExtraLite40};
  }
`

export const ButtonLinkBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 12% 0 12%;
  margin-bottom: 20px;

  a {
    padding: 10px;
    width: 100%;

    span {
      display: flex;
      margin-left: 10px;
    }
  }
`
