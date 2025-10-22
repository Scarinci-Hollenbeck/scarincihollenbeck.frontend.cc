import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  rem,
} from 'styles/global_styles/Global.styles';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from 'styles/mediaBreakpoints.style';

export const ProfileDetailItem = styled.div`
  padding: 8px 16px;
  border-radius: ${globalBorderRadius.middle};
  background-color: ${globalColor.gray.gray1002};
  box-shadow: 0 2px 16px 0 rgba(10, 62, 108, 0.08);
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  ${media_breakpoint_down('sm')} {
    flex-shrink: 100%;
  }
`;

const profileDetailTitleStyles = `
  margin: 0;
  color: ${globalColor.blue.blue500};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  text-transform: uppercase;
  font-weight: 400;
`;

export const ProfileDetailTitle = styled.h2`
  ${profileDetailTitleStyles};
`;

export const ProfileDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  ul {
    margin: 0;
    list-style: disc;
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    li {
      margin: 0 0 0 20px;
      font-size: ${rem(14)};
      color: ${globalColor.blue.darkBlue};

      &::marker {
        color: ${globalColor.blue.blue400};
      }
    }
  }

  ul ul {
    margin-top: 4px;

    li {
      list-style-type: circle;
    }
  }

  p {
    margin: 0;
    font-size: ${rem(14)};
    line-height: 1.43;
    color: ${globalColor.blue.darkBlue};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${profileDetailTitleStyles};
    margin-top: 4px;

    * {
      text-decoration: none !important;
      font-weight: 400 !important;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    row-gap: inherit;
  }
`;

export const ProfileDetailColumns = styled.div`
  --columns-gap: 12px;
  display: flex;
  flex-direction: column;
  gap: var(--columns-gap);
`;

export const ProfileDetailColumn = styled.div`
  width: 100%;
  padding-bottom: var(--columns-gap);
  border-bottom: 1px solid ${globalColor.gray.gray300};
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  color: ${globalColor.blue.darkBlue};

  &:last-child {
    padding: 0;
    border: none;
  }
`;

export const ProfileDetailColumnSubtitle = styled.p`
  margin: 0;
  text-decoration: underline;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const ProfileDetailColumnTitle = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: inherit;
  line-height: 1.5;

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;

export const ProfileDetailColumnText = styled.div`
  p,
  ul {
    &:last-child {
      margin: 0;
    }
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(14)};
  }
`;
