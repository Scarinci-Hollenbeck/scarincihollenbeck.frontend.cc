import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  industrySectionContainer,
  industrySectionPaddingBlock,
  rem,
} from './global_styles/Global.styles';
import { ContainerDefault } from './Containers.style';
import { ContentContainer } from './Content.style';

const selectedNumberColor = '#F0C674';
const focusRing = `
  outline: 3px solid ${globalColor.blue.ultramarine};
  outline-offset: 2px;
`;

export const AreasSection = styled.section`
  ${industrySectionPaddingBlock};
`;

export const AreasContainer = styled(ContainerDefault)`
  ${industrySectionContainer};
`;

export const AreaHeadings = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  ${media_breakpoint_down('lg')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media_breakpoint_down('sm')} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const AreaHeading = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  min-height: 78px;
  padding: 16px 18px;
  background-color: ${globalColor.white};
  border: 1px solid ${globalColor.gray.gray800};
  border-radius: ${globalBorderRadius.small};
  color: ${globalColor.blue.darkBlue};
  font-family: var(--font-poppins);
  font-size: ${rem(16)};
  line-height: 1.35;
  font-weight: 600;
  text-align: start;
  cursor: pointer;
  transition: ${globalTransition.default};

  .area-number {
    color: ${globalColor.red.newRed};
  }

  &:hover {
    border-color: ${globalColor.blue.darkBlue};
  }

  &[aria-selected='true'] {
    background-color: ${globalColor.blue.darkBlue};
    border-color: ${globalColor.blue.darkBlue};
    color: ${globalColor.white};

    .area-number {
      color: ${selectedNumberColor};
    }
  }

  &:focus-visible {
    ${focusRing};
  }

  ${media_breakpoint_down('md')} {
    min-height: 0;
    padding: 12px 14px;
    font-size: ${rem(15)};
  }
`;

/* Every panel is in the server HTML; only the selected one is shown. */
export const AreaPanel = styled.div`
  display: none;
  flex-wrap: wrap;
  gap: 40px 56px;
  padding: 40px 44px;
  background-color: ${globalColor.white};
  border: 1px solid ${globalColor.gray.gray800};
  border-top: 4px solid ${globalColor.red.newRed};
  border-radius: ${globalBorderRadius.small};

  &.is-selected {
    display: flex;
  }

  ${media_breakpoint_down('xl')} {
    gap: 32px 40px;
    padding: 32px;
  }

  ${media_breakpoint_down('md')} {
    gap: 24px;
    padding: 20px 16px;
  }
`;

export const AreaMain = styled(ContentContainer)`
  flex: 999 1 520px;
  min-width: 0;

  ${media_breakpoint_down('md')} {
    flex-basis: 100%;
  }
`;

export const AreaCounter = styled.p`
  margin: 0 !important;
  color: ${globalColor.red.newRed};
  font-family: var(--font-poppins);
  font-size: ${rem(14)};
  line-height: 1.4;
  font-weight: 600;
  letter-spacing: 0.08em;
`;

export const AreaTitle = styled.h3`
  margin: 16px 0 !important;
  color: ${globalColor.blue.darkBlue};
  font-family: var(--font-poppins);
  font-size: ${rem(30)};
  line-height: 1.25;
  font-weight: 600;

  ${media_breakpoint_down('xl')} {
    font-size: ${rem(24)};
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(20)};
  }
`;

export const AreaNext = styled.button`
  min-height: 44px;
  margin-top: 8px;
  padding: 10px 0;
  background: none;
  border: 0;
  color: ${globalColor.red.newRed};
  font-family: var(--font-poppins);
  font-size: ${rem(15)};
  line-height: 1.3;
  font-weight: 600;
  text-align: start;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    ${focusRing};
  }
`;

export const AreaPractices = styled.div`
  flex: 1 1 280px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-left: 40px;
  border-left: 1px solid ${globalColor.gray.gray300};

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  a {
    display: inline-block;
    padding: 6px 0;
    color: ${globalColor.blue.blue500};
    font-family: var(--font-poppins);
    font-size: ${rem(17)};
    line-height: 1.4;
    font-weight: 600;
    text-decoration: underline;
    transition: ${globalTransition.default};

    &:hover {
      color: ${globalColor.red.newRed};
    }
  }

  ${media_breakpoint_down('md')} {
    flex-basis: 100%;
    padding: 20px 0 0;
    border-left: 0;
    border-top: 1px solid ${globalColor.gray.gray300};
  }
`;

export const AreaPracticesLabel = styled.p`
  margin: 0;
  color: ${globalColor.gray.gray110};
  font-family: var(--font-poppins);
  font-size: ${rem(14)};
  line-height: 1.4;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;
