import styled from 'styled-components';
import { globalColor } from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileMediaSection = styled.section`
  @media print {
    display: none;
  }

  padding-block: 60px;
  background-color: ${globalColor.gray.gray10};

  ${media_breakpoint_down('md')} {
    padding-block: 40px;
  }
`;

export const ProfileMediaItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
