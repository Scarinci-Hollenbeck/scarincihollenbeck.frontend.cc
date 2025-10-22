import styled from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
  rem,
} from 'styles/global_styles/Global.styles';
import { media_breakpoint_down } from 'styles/mediaBreakpoints.style';

export const ProfileServicesWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  border-radius: ${globalBorderRadius.middle};
  background-color: ${globalColor.gray.gray1002};
  box-shadow: 0px 2px 16px 0px rgba(10, 62, 108, 0.08);
`;

export const ProfileServicesTitle = styled.p`
  margin: 0;
  color: ${globalColor.blue.blue500};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  text-transform: uppercase;
`;

export const ProfileServicesContent = styled.ul`
  margin: 0;
  column-gap: 12px;
  list-style: disc;
  column-count: 3;

  ${media_breakpoint_down('xl')} {
    column-count: 2;
  }

  ${media_breakpoint_down('sm')} {
    column-count: 1;
  }
`;

export const ProfileServicesChair = styled.div`
  margin: 0 0 4px -16px;
  padding: 4px 12px;
  background-color: ${globalColor.blue.blue500};
  border-radius: 0 ${globalBorderRadius.small} ${globalBorderRadius.small} 0px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  break-inside: avoid;

  &.co-chair {
    break-before: avoid;
  }
`;

export const ProfileServicesChairTitle = styled.p`
  margin: 0;
  color: ${globalColor.white};
  font-family: var(--font-lato);
  font-size: ${rem(12)};
  line-height: 1.67;
  text-transform: uppercase;
  font-weight: 400;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  border-left: 1px solid ${globalColor.blue.blue400};
`;

export const ProfileServicesChairList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const ProfileServicesChairItem = styled.li`
  font-size: ${rem(14)};
  color: ${globalColor.white};

  > a {
    color: inherit;
    font-size: inherit;
    transition: ${globalTransition.default};

    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }
`;

export const ProfileServicesItem = styled.li`
  margin: 0 0 4px 20px;
  font-size: ${rem(14)};
  color: ${globalColor.blue.darkBlue};
  break-inside: avoid;

  &::marker {
    color: ${globalColor.blue.blue400};
  }

  > a {
    color: inherit;
    font-size: inherit;
    font-weight: 400;
    transition: ${globalTransition.default};

    &:hover {
      color: ${globalColor.blue.skyBlue};
    }
  }

  ${media_breakpoint_down('sm')} {
    margin-bottom: 7px;
  }
`;
