import styled from 'styled-components';

export const DisclaimerTextStyles = styled.p`
  margin: 0 auto;
  font-size: inherit;
  font-weight: 700;
  text-align: center;
`;

const DisclaimerText = ({ text }) => (
  <DisclaimerTextStyles>{text}</DisclaimerTextStyles>
);

export default DisclaimerText;
