import styled from 'styled-components';
import { globalColor, rem } from 'styles/global_styles/Global.styles';

export const ProfileRepresentativeContainer = styled.div`
  padding-top: 20px;
  border-top: 1px solid ${globalColor.blue.blue400};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProfileRepresentativeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: inherit;
  row-gap: 4px;
`;

export const ProfileRepresentativeTitle = styled.h3`
  font-size: ${rem(16)};
  line-height: 1.5;
  font-weight: 700;
  color: ${globalColor.blue.blue500};
`;

export const ProfileRepresentativeLabel = styled.span`
  margin-left: auto;
  margin-right: 4px;
  color: ${globalColor.blue.darkBlue};
  font-style: italic;
`;
