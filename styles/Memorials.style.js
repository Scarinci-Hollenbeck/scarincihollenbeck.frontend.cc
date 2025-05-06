import styled from 'styled-components';
import { media_breakpoint_down } from './mediaBreakpoints.style';
import { Title32 } from './common/Typography.style';
import {
  globalBorderRadius,
  globalColor,
  rem,
} from './global_styles/Global.styles';
import { ProfileBioListContent } from './attorney-page/AttorneyProfile.style';
import { LawyerCardLifespan } from './LawyerCard.style';

export const MemorialsSection = styled.section`
  padding: 100px 0;

  ${media_breakpoint_down('xxl')} {
    padding: 60px 0;
  }

  ${media_breakpoint_down('md')} {
    padding: 40px 0;
  }
`;

export const MemorialTitle = styled(Title32).attrs({
  as: 'h1',
})`
  width: fit-content;
  padding-bottom: 12px;
  border-bottom: 1px solid ${globalColor.blue.skyBlue};
`;

export const MemorialInfoItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .item-info-box {
    padding: 16px;

    ${media_breakpoint_down('md')} {
      padding: 8px 16px;
    }
  }

  ${ProfileBioListContent} {
    p {
      margin: 0;
      text-transform: none;
      color: ${globalColor.blue.darkBlue};
      font-size: inherit;
      font-family: var(--font-poppins);
      line-height: 1.5;

      ${media_breakpoint_down('sm')} {
        font-size: ${rem(14)};
      }
    }
  }

  ${media_breakpoint_down('md')} {
    gap: 8px;
  }
`;

export const MemorialLifespanList = styled(LawyerCardLifespan)`
  padding: 12px 16px;
  row-gap: 4px;
  border: none;
  background-color: ${globalColor.blue.blue6002};
  border-radius: ${globalBorderRadius.middle};
  box-shadow: 0px 2px 16px 0px rgba(10, 62, 108, 0.08);

  ${media_breakpoint_down('lg')} {
    height: 100%;
    flex: 1;
  }

  ${media_breakpoint_down('sm')} {
    padding: 8px 12px;
  }
`;

export const MemorialLifespanItem = styled.li`
  font-size: ${rem(18)};
  color: ${globalColor.white};
  display: inline-flex;
  gap: 4px;

  > span {
    flex-shrink: 0;
    width: 64px;
    font-weight: 300;
  }

  ${media_breakpoint_down('sm')} {
    font-size: ${rem(16)};
  }
`;
