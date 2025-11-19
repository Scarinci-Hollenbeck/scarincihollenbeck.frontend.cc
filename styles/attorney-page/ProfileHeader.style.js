import styled from 'styled-components';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileHeaderSection = styled.section`
  @media print {
    display: none;
  }

  display: flex;
  flex-direction: column;
  background-color: ${globalColor.gray.gray10};
  position: relative;
  z-index: 0;

  &::after {
    content: '';
    width: 100%;
    height: 50px;
    background-color: ${globalColor.blue.blue6002};

    ${media_breakpoint_down('lg')} {
      display: none;
    }
  }

  .breadcrumb-container {
    margin: 12px 0;
    padding: 0;

    > li {
      > a {
        font-size: ${rem(14)};
        color: ${globalColor.gray.gray140};

        &:hover {
          color: ${globalColor.gray.gray110};
        }
      }

      > span {
        font-size: ${rem(14)};
        color: ${globalColor.gray.gray110};
      }
    }
  }
`;

export const ProfileHeaderHolder = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 52px;
  row-gap: 24px;

  ${media_breakpoint_down('xxl')} {
    grid-template-columns: 400px 1fr;
    column-gap: 40px;
  }

  ${media_breakpoint_down('xl')} {
    column-gap: 24px;
    row-gap: 12px;
  }

  ${media_breakpoint_down('lg')} {
    grid-template-columns: 360px 1fr;
    row-gap: 24px;
    column-gap: 12px;
  }

  ${media_breakpoint_down('md')} {
    grid-template-columns: 1fr;
    row-gap: 12px;
  }
`;

export const ProfileHeaderLeft = styled.div`
  position: relative;
  grid-row: span 2;

  ${media_breakpoint_down('lg')} {
    grid-row: unset;
  }
`;

export const ProfileHeaderActions = styled.div`
  padding-bottom: 24px;
  height: fit-content;
  display: flex;
  gap: 24px;

  ${media_breakpoint_down('xl')} {
    gap: 12px;
  }

  ${media_breakpoint_down('lg')} {
    padding-bottom: 0;
    flex-direction: column;
  }
`;

export const ProfileHeaderButtons = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > button {
    margin-top: auto;
  }

  ${media_breakpoint_down('xl')} {
    gap: 12px;
  }

  ${media_breakpoint_down('lg')} {
    display: contents;
  }
`;

export const ProfileHeaderWhiteButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: inherit;

  > :nth-child(n) {
    width: 100%;

    ${media_breakpoint_down('lg')} {
      flex: 1 1 calc((100% - 12px) / 2);
    }
  }

  ${media_breakpoint_down('lg')} {
    order: -1;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const ProfileHeaderTop = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media_breakpoint_down('xl')} {
    gap: 12px;
  }

  ${media_breakpoint_down('lg')} {
    order: 3;
    grid-column: span 2;
    gap: 24px;
  }

  ${media_breakpoint_down('md')} {
    margin-top: 28px;
    grid-column: unset;
    gap: 12px;
  }
`;

export const ProfileHeaderTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 12px;
`;

export const ProfileHeaderDesignation = styled.span`
  margin: 4px 0 2px 0;
  color: ${globalColor.gray.gray110};
  font-family: var(--font-lato);
  font-size: ${rem(24)};
  line-height: 1.5;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  column-gap: inherit;

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
  }

  ${media_breakpoint_down('sm')} {
    margin: 2px 0 0 0;
    font-size: ${rem(16)};
  }
`;
