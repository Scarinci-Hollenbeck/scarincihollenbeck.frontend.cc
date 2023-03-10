import styled from 'styled-components'
import { ButtonLinkCss, globalColor, globalGradient, rem } from './global_styles/Global.styles'
import { media_breakpoint_down } from './mediaBreakpoints.style'

export const CheckBoxesList = styled.ul`
  margin: 8px 0 16px 0;
  padding: 0;
  column-count: 2;
  column-gap: 0;
`

export const GradientSubscriptionBox = styled.article`
  display: flex;
  flex-direction: column;
  padding: 20px 8%;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${globalGradient.award};

  h5 {
    font-weight: bold;
    font-size: ${rem(28)};
    text-align: start;
    color: ${globalColor.white};
  }

  p {
    color: ${globalColor.white};
  }

  a {
    width: 100%;
    height: 50px;

    :hover {
      background-color: ${globalColor.white};
      cursor: pointer;
      transition: 0.8s;
      color: ${globalColor.red.darkRed};
    }

    ${media_breakpoint_down('lg')} {
      span {
        display: flex;
      }
    }
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 320px;

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h4 {
      margin-bottom: 0;
      font-size: 1.2rem;
    }
  }
`

export const SubscribeBtn = styled.button`
  ${ButtonLinkCss};
  width: 100%;
  height: 55px;
`
