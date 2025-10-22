import styled from 'styled-components';
import { globalColor } from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileContentSection = styled.section`
  padding-block: 60px;
  background-color: ${globalColor.gray.gray10};

  ${media_breakpoint_down('md')} {
    padding-top: 12px;
    padding-bottom: 40px;
  }
`;

export const ProfileContentContainer = styled.div`
  display: flex;
  gap: 40px;

  ${media_breakpoint_down('lg')} {
    flex-direction: column;
  }
`;

export const ProfileContentAside = styled.aside`
  width: 33%;

  ${media_breakpoint_down('lg')} {
    order: -1;
    width: 100%;
  }
`;
