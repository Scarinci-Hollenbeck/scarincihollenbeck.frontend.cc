import styled, { keyframes } from "styled-components";
import { rem } from "./global_styles/Global.styles";

export const CollapseContentWrapper = styled.div`
  &.collapse:not(.show) {
    height: 500px;
    overflow: hidden;
    display: block;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 161px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);
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
  color: #377EC4;
  font-size: ${rem(16)};
  line-height: 24px;
  font-weight: 700;
`;