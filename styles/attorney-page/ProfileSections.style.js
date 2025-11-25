import styled from 'styled-components';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileSectionsStyled = styled.div`
  max-width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 60px;
  overflow: hidden;

  ${media_breakpoint_down('lg')} {
    gap: 40px;
  }
`;

export const ProfileSectionContainer = styled.section`
  scroll-margin-top: var(--header-height);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProfileSectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  > a {
    margin-left: auto;
  }
`;
