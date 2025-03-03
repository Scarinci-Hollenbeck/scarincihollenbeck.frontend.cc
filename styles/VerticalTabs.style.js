import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  industrySectionContainer,
  rem,
} from './global_styles/Global.styles';
import { ContainerDefault } from './Containers.style';
import { ContentContainer } from './Content.style';

const headingStyles = `
  margin: 0 0 4px 0;
  color: ${globalColor.gray.gray700};
  font-size: ${rem(20)};
  line-height: 1.6;
  font-weight: 600;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(18)};
    line-height: 1.56;
  }
`;

export const VerticalTabsSection = styled.section`
  padding: 40px 0;

  ${media_breakpoint_down('md')} {
    padding: 24px 0;
  }
`;

export const VerticalTabsContainer = styled(ContainerDefault)`
  ${industrySectionContainer};
`;

export const VerticalTabsHolder = styled.div`
  min-height: 725px;
  display: flex;
  gap: 40px;

  ${media_breakpoint_down('xxl')} {
    gap: 24px;
  }

  ${media_breakpoint_down('xl')} {
    gap: 12px;
  }

  ${media_breakpoint_down('md')} {
    min-height: auto;
  }
`;

export const OpenersList = styled.ol`
  margin: 0;
  height: 100%;
  width: 500px;
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  background-color: ${globalColor.white};
  border-radius: ${globalBorderRadius.middle};
  box-shadow: 0px 12px 16px -4px rgba(9, 44, 71, 0.04),
    0px 4px 6px -2px rgba(9, 44, 71, 0.02);
  transition: all 0.3s ease-in-out;

  ${media_breakpoint_down('xxl')} {
    padding: 16px 24px;
    width: 400px;
  }

  ${media_breakpoint_down('xl')} {
    padding: 12px 16px;
    row-gap: 24px;
  }

  ${media_breakpoint_down('lg')} {
    width: 270px;
  }

  ${media_breakpoint_down('md')} {
    display: none;
  }
`;

export const OpenersListItem = styled.li`
  list-style: none;
`;

export const TabOpener = styled.button`
  color: ${globalColor.gray.gray500};
  font-family: var(--font-lato);
  font-size: ${rem(22)};
  line-height: 1.5;
  font-weight: 600;
  text-transform: uppercase;
  text-align: start;
  transition: ${globalTransition.default};

  &.active {
    color: ${globalColor.blue.blue500};
  }

  &:hover {
    color: ${globalColor.blue.blue500};
  }

  ${media_breakpoint_down('xxl')} {
    font-size: ${rem(18)};
    line-height: 1.6;
  }

  ${media_breakpoint_down('xl')} {
    font-size: ${rem(16)};
    line-height: 1.5;
  }
`;

export const TabMobileOpener = styled(TabOpener)`
  display: none;
  width: 100%;
  padding: 12px 16px;
  border-radius: ${globalBorderRadius.middle};
  box-shadow: 0px 12px 16px -4px rgba(9, 44, 71, 0.04),
    0px 4px 6px -2px rgba(9, 44, 71, 0.02);
  background-color: ${globalColor.white};

  ${media_breakpoint_down('md')} {
    display: block;
  }
`;

export const VerticalTabsContent = styled.div`
  flex: 1;
  padding: 24px 60px;
  background-color: ${globalColor.white};
  box-shadow: 0px 12px 16px -4px rgba(9, 44, 71, 0.04),
    0px 4px 6px -2px rgba(9, 44, 71, 0.02);
  border-radius: ${globalBorderRadius.middle};

  ${media_breakpoint_down('xxl')} {
    padding: 16px 24px;
  }

  ${media_breakpoint_down('xl')} {
    padding: 12px;
  }

  ${media_breakpoint_down('md')} {
    padding: 0;
    box-shadow: none;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
`;

export const TabTitle = styled.h2`
  ${headingStyles};
`;

export const TabContent = styled(ContentContainer)`
  display: none;
  color: ${globalColor.gray.gray110};

  &.active {
    display: block;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    ${headingStyles};
  }

  ${media_breakpoint_down('md')} {
    padding: 12px;
    border-radius: ${globalBorderRadius.middle};
    background-color: ${globalColor.white};

    &.active {
      margin: -8px 0 20px;
    }
  }
`;

export const TabContentColumns = styled.ul`
  --column-gap: 32px;
  list-style: none !important;
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--column-gap);
  row-gap: 24px;

  > li {
    margin-left: 0 !important;
  }

  ${media_breakpoint_down('xl')} {
    flex-direction: column;
  }

  ${media_breakpoint_down('md')} {
    row-gap: 16px;
  }
`;

export const TabContentColumn = styled.li`
  width: calc((100% - var(--column-gap)) / 2);

  ${media_breakpoint_down('xl')} {
    width: 100%;
  }
`;
