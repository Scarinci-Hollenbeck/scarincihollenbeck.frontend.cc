import styled from 'styled-components';
import {
  media_breakpoint_down,
  media_breakpoint_exactly_down,
} from 'styles/mediaBreakpoints.style';
import { attorneyCardForPractices } from 'styles/subheader/SubHeader.style';

export const SubHeaderKeyContactsCards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${attorneyCardForPractices}

  ${media_breakpoint_exactly_down(1279)} {
    column-gap: 40px;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  ${media_breakpoint_down('sm')} {
    gap: 12px;
  }
`;

export const SubHeaderKeyContactsButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 24px;
  row-gap: 12px;

  button {
    flex: 1 0 fit-content;
    max-width: 230px;
  }

  ${media_breakpoint_down('sm')} {
    flex-direction: column;

    button {
      max-width: 100%;
      width: 100%;
    }
  }
`;
