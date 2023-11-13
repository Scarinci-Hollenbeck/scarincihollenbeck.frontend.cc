import styled from 'styled-components';
import {
  entAndMediaColors,
  globalColor,
  rem,
} from 'styles/global_styles/Global.styles';

export const PracticesSection = styled.section`
  padding: ${rem(140)} 0 ${rem(120)};
  background-color: ${globalColor.black};

  @media (max-width: 1850px) {
    padding: ${rem(120)} 0 ${rem(100)};
  }

  @media (max-width: 1440px) {
    padding: ${rem(100)} 0 ${rem(80)};
  }

  @media (max-width: 768px) {
    padding: ${rem(80)} 0 ${rem(60)};
  }
`;

export const PracticesContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 5%;

  @media (max-width: 1440px) {
    flex-direction: column;
    align-items: start;
    row-gap: ${rem(48)};
  }
`;
export const PracticesPreview = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  @media (max-width: 1440px) {
    align-items: flex-start;
    width: 380px;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    max-width: 343px;
    width: 100%;
  }
`;
export const PracticesTitle = styled.h2`
  font-family: var(--font-carilo);
  font-size: ${rem(84)};
  line-height: 100px;
  font-style: italic;
  font-weight: 400;
  color: ${entAndMediaColors.entAndMediaColorGold};

  @media (max-width: 1850px) {
    font-size: ${rem(64)};
  }

  @media (max-width: 1440px) {
    font-size: ${rem(48)};
    line-height: 72px;
  }

  @media (max-width: 768px) {
    font-size: ${rem(32)};
    line-height: 48px;
  }
`;
export const PracticesImage = styled.div`
  margin-left: 100px;
  width: 428px;
  height: 98px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1850px) {
    width: 260px;
    height: 80px;
  }
`;
export const PracticesLinks = styled.ul`
  margin: 0;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(min-content, max-content));
  justify-content: space-between;
  column-gap: 5%;

  li {
    display: flex;
    align-items: center;

    ::before {
      content: '•';
      color: white;
      margin-right: 0.5em;
    }

    a {
      font-size: ${rem(16)};
      font-family: var(--font-poppins), sans-serif;
      font-weight: 400;
      line-height: 24px;
      color: ${globalColor.white};
      text-decoration: underline;
      transition: all 0.3s ease;
      display: block;

      &:hover {
        text-decoration: none;
      }
    }
  }

  @media (max-width: 1440px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
