import styled from 'styled-components';
import {
  entAndMediaColors,
  globalColor,
  rem,
} from 'styles/global_styles/Global.styles';

export const EntertainmentInfoSection = styled.section`
  padding: ${rem(140)} 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 1850px) {
    padding: ${rem(120)} 0;
  }

  @media (max-width: 1440px) {
    padding: ${rem(100)} 0;
  }

  @media (max-width: 768px) {
    padding: ${rem(80)} 0;
  }
`;
export const EnterntainmentTabNumber = styled.span`
  margin: 0 0 ${rem(32)} 0;
  font-family: var(--font-poppins), sans-serif;
  font-size: ${rem(16)};
  line-height: ${rem(24)};
  font-weight: 400;
  color: ${entAndMediaColors.entAndMediaColorGray};
  display: flex;
  align-items: center;
  column-gap: ${rem(10)};

  :before {
    content: '';
    display: flex;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 5px solid ${entAndMediaColors.entAndMediaColorGray};
    border-bottom: 5px solid transparent;
  }

  @media (max-width: 1440px) {
    margin: 0 0 ${rem(26)} 0;
    font-size: ${rem(14)};
    line-height: ${rem(21)};
  }
`;
export const EnterntainmentTabHeader = styled.div`
  margin-bottom: ${rem(32)};
  display: flex;
  justify-content: space-between;

  .delimiter {
    margin: ${rem(40)} ${rem(100)} 0;

    svg {
      width: 100%;
    }
  }

  @media (max-width: 1440px) {
    align-items: center;

    .delimiter {
      margin: ${rem(25)} ${rem(50)} 0;
      align-self: flex-start;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: ${rem(26)};
    align-items: flex-start;
    flex-direction: column;

    .delimiter {
      display: none;
    }
  }
`;
export const EnterntainmentTabTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const EnterntainmentTabTitle = styled.h2`
  margin: 0;
  color: ${globalColor.black};
  font-family: var(--font-carilo), sans-serif;
  font-size: ${rem(84)};
  line-height: ${rem(100)};
  font-weight: 400;
  font-style: italic;

  &.title-indent {
    margin-left: ${rem(90)};
  }

  @media (max-width: 1850px) {
    font-size: ${rem(64)};

    &.title-indent {
      margin-left: ${rem(70)};
    }
  }

  @media (max-width: 1440px) {
    font-size: ${rem(48)};
    line-height: ${rem(72)};

    &.title-indent {
      margin-left: ${rem(50)};
    }
  }

  @media (max-width: 768px) {
    font-size: ${rem(32)};
    line-height: ${rem(48)};

    &.title-indent {
      margin-left: ${rem(30)};
    }
  }
`;
export const EnterntainmentTabBtns = styled.div`
  margin-top: ${rem(20)};
  display: flex;
  align-items: flex-start;
  column-gap: ${rem(24)};

  @media (max-width: 1850px) {
    margin-top: ${rem(25)};
  }

  @media (max-width: 1440px) {
    margin-top: 0;
    align-items: flex-end;
    flex-direction: column;
    row-gap: ${rem(24)};
  }

  @media (max-width: 768px) {
    row-gap: ${rem(16)};
    align-self: flex-end;
  }
`;
export const EnterntainmentTabBtn = styled.a`
  min-width: max-content;
  cursor: pointer;
  padding: ${rem(16)} ${rem(24)};
  font-size: ${rem(18)};
  font-weight: 600;
  line-height: ${rem(27)};
  font-family: var(--font-poppins), sans-serif;
  color: ${globalColor.white};
  background-color: ${globalColor.black};
  border-radius: ${rem(40)};
  border: ${rem(2)} solid transparent;
  transition: all 0.5s ease;
  display: block;

  &:hover {
    border: ${rem(2)} solid ${globalColor.black};
    background-color: ${globalColor.white};
    color: ${globalColor.black};
  }

  &.btn-white {
    border: ${rem(2)} solid ${globalColor.black};
    background-color: ${globalColor.white};
    color: ${globalColor.black};

    &:hover {
      background-color: ${globalColor.black};
      color: ${globalColor.white};
    }
  }

  @media (max-width: 1850px) {
    padding: ${rem(12)} ${rem(24)};
    font-size: ${rem(16)};
    line-height: ${rem(24)};
  }

  @media (max-width: 1440px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: ${rem(14)};
    line-height: ${rem(21)};
  }
`;
export const EnterntainmentTabNavbar = styled.div`
  margin: 0 0 ${rem(48)} 0;
  display: flex;
  flex-direction: column;
  row-gap: ${rem(11)};

  @media (max-width: 1440px) {
    font-size: ${rem(14)};
    line-height: ${rem(21)};
    margin-bottom: ${rem(32)};
  }
`;
export const EnterntainmentTabNavbarItem = styled.div`
  width: max-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: ${rem(10)};
  font-size: ${rem(16)};
  font-family: var(--font-poppins), sans-serif;
  font-weight: 400;
  line-height: ${rem(24)};
  color: ${globalColor.grayExtraLite.grayExtraLite50};
  transition: all 0.5s ease;

  ::before {
    content: '';
    display: flex;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 5px solid ${globalColor.grayExtraLite.grayExtraLite50};
    border-bottom: 5px solid transparent;
    transition: all 0.5s ease;
  }

  &.active,
  &:hover {
    color: ${globalColor.black};

    ::before {
      border-left: 5px solid ${globalColor.black};
    }
  }
`;
export const EnterntainmentTabContent = styled.div`
  padding: 0 ${rem(140)};
  display: grid;
  grid-template-columns: 1fr 40%;
  align-items: center;
  gap: ${rem(48)};

  &.full-image {
    grid-template-columns: 1fr;
    row-gap: ${rem(32)};
    ${() => {
      return `
        ${EnterntainmentTabImage} {
          max-height: ${rem(328)};
          order: 2;
        }
        ${EnterntainmentTabDescription} {
          order: 1;
        }
        ${EnterntainmentTabList} {
          order: 3;
          display: grid;
          column-gap: ${rem(20)};
          grid-template-columns: 1fr 1fr;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        }
      `;
    }}
  }

  &.right-image {
    grid-template-columns: 1fr 1fr;
    ${() => {
      return `
        ${EnterntainmentTabImage} {
          order: 3;
          grid-column: 2 / 3;
          grid-row: 1 / span 2;
          height: ${rem(552)};

          @media (max-width: 768px) {
            grid-column: 1;
            grid-row: 1;
            height: ${rem(240)};
          }
        }
        ${EnterntainmentTabDescription} {
          order: 1;
        }
        ${EnterntainmentTabList} {
          max-width: ${rem(537)};
          order: 2;
          margin-left: auto;
        }
      `;
    }}

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 1850px) {
    padding: 0 ${rem(108)};
  }

  @media (max-width: 1440px) {
    padding: 0;
    gap: ${rem(32)};
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${rem(28)};
  }
`;
export const EnterntainmentTabImage = styled.div`
  width: 100%;
  max-height: ${rem(624)};
  height: 100%;
  grid-row: span 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
    filter: grayscale(100%);
  }

  @media (max-width: 768px) {
    height: ${rem(240)};
  }
`;
export const EnterntainmentTabDescription = styled.div`
  color: ${entAndMediaColors.entAndMediaColorMediumGray};
  font-family: var(--font-poppins), sans-serif;
  font-size: ${rem(16)};
  line-height: ${rem(24)};
  font-weight: 400;
  text-transform: uppercase;

  @media (max-width: 1440px) {
    font-size: ${rem(14)};
    line-height: ${rem(21)};
  }
`;
export const EnterntainmentTabList = styled.ul`
  margin: 0;
`;
export const EnterntainmentTabListItem = styled.li`
  color: ${globalColor.black};
  font-family: var(--font-poppins), sans-serif;
  font-size: ${rem(16)};
  line-height: ${rem(24)};
  font-weight: 600;
  display: flex;

  ::before {
    content: '•';
    color: ${globalColor.black};
    margin-right: 0.5em;
  }

  @media (max-width: 1440px) {
    font-size: ${rem(14)};
    line-height: ${rem(21)};
  }
`;
