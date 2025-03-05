import styled from 'styled-components';
import { globalColor } from './global_styles/Global.styles';
import { ContentContainer } from './Content.style';

export const CollapseContentWrapper = styled(ContentContainer)`
  &.collapse:not(.show) {
    height: 500px;
    overflow: hidden;
    display: block;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 161px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    }
  }
  &.collapsing {
    min-height: 500px;
  }
`;

export const CollapseButton = styled.button`
  margin: 0 auto;
  display: flex;
  transform: translateY(calc(-100% - 8px));
  text-transform: uppercase;
  text-decoration: underline;
  color: ${globalColor.blue.blue600};
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${globalColor.red.darkRed};
  }
`;
