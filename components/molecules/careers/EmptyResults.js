import styled from 'styled-components';
import { globalColor } from 'styles/global_styles/tokens';

const EmptyStyles = styled.h2`
  margin-block: 48px;
  color: ${globalColor.red.darkRed};
  text-align: center;
`;

const EmptyResults = () => (
  <EmptyStyles>Sorry, no career positions available</EmptyStyles>
);

export default EmptyResults;
