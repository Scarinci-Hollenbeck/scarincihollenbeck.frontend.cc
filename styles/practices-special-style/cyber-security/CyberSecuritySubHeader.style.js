import styled from 'styled-components';
import { cyberSecurityColors, rem } from 'styles/global_styles/Global.styles';

export const CyberSecuritySubHeaderSection = styled.section`
  padding: ${rem(32)} 0 ${rem(80)} 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 1440px) {
    padding: ${rem(32)} 0 ${rem(60)} 0;
  }

  @media (max-width: 768px) {
    padding: ${rem(20)} 0 ${rem(100)} 0;
  }
`;

export const CyberSecuritySubHeaderBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.7;
  }
`;
export const CyberSecuritySubHeaderContent = styled.div`
  margin: ${rem(80)} 0 ${rem(60)} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 3%;

  @media (max-width: 1440px) {
    margin: ${rem(40)} 0 ${rem(75)} 0;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;
export const CyberSecuritySubHeaderTitle = styled.div`
  position: relative;

  h1 {
    margin: 0;
    max-width: ${rem(875)};
    color: ${cyberSecurityColors.cyberSecurityColorBlack};
    font-family: var(--font-poppins), sans-serif;
    font-weight: 500;
    font-size: ${rem(116)};
    line-height: ${rem(130)};
    z-index: 2;
    position: relative;
  }

  img {
    position: absolute;
    top: 50%;
    left: 105%;
    transform: translate(-50%, -50%);
    z-index: 1;

    @media (max-width: 768px) {
      display: none;
    }
  }
  

  @media (max-width: 1850px) {
    h1 {
      max-width: ${rem(650)};
      font-size: ${rem(84)};
      line-height: ${rem(100)};
    }
    
  }

  @media (max-width: 1440px) {
    margin-bottom: ${rem(40)};
    h1 {
      max-width: ${rem(470)};
      font-size: ${rem(62)};
      line-height: ${rem(78)};
    }
    
  }

  @media (max-width: 768px) {
    margin-bottom: ${rem(32)};
    h1 {
      font-size: ${rem(44)};
      line-height: ${rem(54)};
    }
  }
`;
export const CyberSecuritySubHeaderText = styled.div`
  max-width: ${rem(510)};
  position: relative;
  z-index: 2;
  p {
    margin: 0 0 ${rem(16)} 0;
    color: ${cyberSecurityColors.cyberSecurityColorBlack};
    font-family: var(--font-poppins), sans-serif;
    font-weight: 400;
    font-size: ${rem(18)};
    line-height: ${rem(26)};
  }

  @media (max-width: 1850px) {
    p {
      font-size: ${rem(16)};
    }
  }

  @media (max-width: 1440px) {
    max-width: 100%;
  }
`;
export const CyberSecuritySubHeaderFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: none;
  }
`;
