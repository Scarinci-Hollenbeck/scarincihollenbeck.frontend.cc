import Link from 'next/link';
import styled from 'styled-components';
import { globalColor, rem } from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const SubHeaderMenuList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const SubHeaderMenuLink = styled(Link)`
  color: ${globalColor.white};
  border-bottom: 1px dashed ${globalColor.blue.blue400};

  &:hover {
    color: ${globalColor.blue.skyBlue};
  }

  &:active {
    color: ${globalColor.blue.skyBlue};
  }

  &.active {
    color: ${globalColor.white};
    border-bottom: 1px solid ${globalColor.blue.blue200};
    pointer-events: none;
    font-weight: 600;
  }

  ${media_breakpoint_down('md')} {
    font-size: ${rem(14)};
  }
`;
