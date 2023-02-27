import styled from 'styled-components'
import {
  media_breakpoint_down,
  media_breakpoint_up,
  media_breakpoint_exactly,
} from './mediaBreakpoints.style'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 1.5%;
  padding-right: 1.5%;
  height: fit-content;
  width: 100vw;
  background: #fff;
  box-shadow: ${({ scrollDown }) => (scrollDown ? '-2px 0px 10px rgb(0 0 0 / 13%);' : 'none')};
  position: sticky;
  top: 0;
  z-index: 1020;

  @media print {
    display: none;
  }

  ${media_breakpoint_down('lg')} {
    height: 14vh;
  }

  ${media_breakpoint_down('md')} {
    height: 21vh;
  }
`

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
  align-items: center;
  height: 46px;
`
export const DesktopVisible = styled.div`
  ${media_breakpoint_down('lg')} {
    width: 55%;
  }

  ${media_breakpoint_up('md')} {
    display: flex;
    width: 48%;
  }

  ${media_breakpoint_down('md')} {
    display: none;
  }
`

export const MobileVisible = styled.div`
  ${media_breakpoint_up('md')} {
    display: none;
  }

  ${media_breakpoint_down('md')} {
    display: flex;
    margin-top: 20px;
    margin-left: 3%;

    .scroll-search {
      width: 95%;
    }
  }

  ${media_breakpoint_exactly('430px')} {
    width: 94vw;
  }
`

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
`

export const LinksBox = styled.div`
  display: flex;
  gap: 20px;
  height: inherit;
`
