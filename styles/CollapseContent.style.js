import styled from 'styled-components';
import { globalColor, globalTransition } from './global_styles/Global.styles';
import { ContentContainer } from './Content.style';

export const CollapseContentWrapper = styled(ContentContainer)`
  --collapse-gradient-color: ${({ $gradientColor = globalColor.white }) =>
    $gradientColor};

  &.collapse {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 161px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        var(--collapse-gradient-color) 100%
      );
      pointer-events: none;
      opacity: 0;
      transition: ${globalTransition.default};
    }
  }

  &.collapse:not(.show) {
    height: 500px;
    overflow: hidden;
    display: block;

    &::after {
      opacity: 1;
    }
  }
  &.collapsing {
    min-height: 500px;
  }
`;

export const CollapseButton = styled.button`
  margin: 0 auto;
  display: flex;
  text-transform: uppercase;
  text-decoration: underline;
  color: ${globalColor.blue.blue600};
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${globalColor.red.darkRed};
  }
`;
