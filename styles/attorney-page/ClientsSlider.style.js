import styled, { css } from 'styled-components';
import {
  globalBorderRadius,
  globalColor,
  globalTransition,
} from 'styles/global_styles/Global.styles';

export const ClientsSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const ClientsSliderCard = styled.div`
  width: 162px;
  background-color: ${globalColor.white};
  border-radius: ${globalBorderRadius.small};
  overflow: hidden;
  border: 1px solid transparent;
  transition: ${globalTransition.default};
  aspect-ratio: 1 / 1;

  ${({ $isLink }) =>
    $isLink &&
    css`
      &:hover {
        border-color: ${globalColor.blue.skyBlue};
      }
    `}

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
