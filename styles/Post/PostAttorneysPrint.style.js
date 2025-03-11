import styled from 'styled-components';
import { AttorneysAreaContainer } from 'styles/AttorneysArea.style';

export const PostAttorneysPrintSection = styled.div`
  page-break-inside: avoid;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;

  .attorney__contact {
    display: none;
  }

  ${AttorneysAreaContainer} {
    gap: 10px;
    grid-template-columns: repeat(auto-fit, 170px);
  }
`;
