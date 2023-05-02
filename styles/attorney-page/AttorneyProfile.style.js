import { Col } from 'react-bootstrap'
import styled from 'styled-components'
import { globalColor, globalIndents, globalShadow, rem } from '../global_styles/Global.styles'
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
  media_breakpoint_up,
} from '../mediaBreakpoints.style'

export const ProfileHeaderContainer = styled.div`
  padding: ${globalIndents.attorneyProfilePaddings};
  margin-top: 5%;
  margin-bottom: 25px;
  box-shadow: ${globalShadow.allSideShadow};

  ${media_breakpoint_down('xl')} {
    padding: 20px 20px;
  }

  ${media_breakpoint_down('sm')} {
    position: sticky;
    margin-bottom: 72px;
    top: calc(-100vh + 150px);
    z-index: 10;
  }

  ${media_breakpoint_exactly_down(412)} {
    top: calc(-100vh + 180px);
  }

  ${media_breakpoint_exactly_down(393)} {
    top: calc(-100vh + 115px);
  }

  ${media_breakpoint_exactly_down(390)} {
    top: calc(-100vh + 157px);
  }

  ${media_breakpoint_exactly_down(375)} {
    top: -103vh;
  }

  ${media_breakpoint_exactly_down(360)} {
    top: calc(-100vh + 54px);
  }
`

export const ColStyled = styled(Col)`
  position: relative;
  top: ${({ top }) => (top ? top : 'none')};
  bottom: ${({ bottom }) => (bottom ? bottom : 'none')};
`

export const ColForSidebar = styled(ColStyled)`
  margin-bottom: 80px;
  top: ${({ top }) => (top ? top : 'none')};

  ${({ top }) => {
    const topNum = top.slice(0, -2)
    return top
      ? `
      ${media_breakpoint_exactly_down(1400)} {
        top: ${topNum - 10}px;
      }
      ${media_breakpoint_down('lg')} {
        top: 0;
        margin-bottom: 25px;
      }
      `
      : `border: none`
  }}
`

export const SubTitleProfileBox = styled.div`
  margin-top: 0;
  margin-bottom: 18px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${globalColor.graySmoke.extraLiteSmoke};

  h2,
  h4 {
    color: ${globalColor.gray.gray80};
    font-size: 1rem;
    margin: 10px 0 2px;
  }

  p {
    color: ${globalColor.gray.gray80};
    margin-bottom: 0;
  }

  ${media_breakpoint_down('sm')} {
    height: 90px;
  }
`

export const AddressBox = styled.address`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a,
  p {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0;
    font-size: ${rem(18)};
  }

  svg {
    color: ${globalColor.gray.gray80};
    width: 20px;
  }

  ${media_breakpoint_down('sm')} {
    border-bottom: 1px solid ${globalColor.grayExtraLite.grayExtraLite50};
    padding-bottom: 15px;
  }
`

export const DetailsBox = styled.div`
  display: flex;
  gap: 10%;

  ${media_breakpoint_down('sm')} {
    flex-direction: column;

    ul {
      padding-left: 0;
    }
  }
`

export const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ItemContactList = styled.li`
  a {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  svg {
    fill: ${(props) => globalColor.socialNetworks[props?.socialNetwork] || globalColor.gray.gray80};
  }

  ${(props) =>
    props?.socialNetwork === 'vizibility' &&
    `
     a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 10px;
      width: 135px;
      height: 80px;
      border-radius: 5px;
      font-size: 15px;
      box-shadow: 5px 6px 20px rgb(180 177 177);
      color: ${globalColor.black};

      svg {
        width: 25px;
        height: 25px;
      }

      transition: .5s;
      :hover {
        box-shadow: 5px 6px 0px ${globalColor.graySmoke.extraLiteSmoke};
        border: 1px solid ${globalColor.grayLite.grayLite100};
        cursor: pointer;
        color: ${globalColor.black};
      }
     }
   `}
`

export const ProfileName = styled.h1`
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 600;
`

export const UpFromMobile = styled.div`
  ${media_breakpoint_up('md')} {
    display: block;
  }
  ${media_breakpoint_down('sm')} {
    display: none;
  }
`
export const MobileWrapp = styled.div`
  display: none;
  margin-bottom: 10px;
  ${media_breakpoint_down('sm')} {
    display: flex;
    justify-content: center;
  }

  ${media_breakpoint_exactly_down(391)} {
    img {
      width: 300px;
      height: 350px;
    }
  }
`
