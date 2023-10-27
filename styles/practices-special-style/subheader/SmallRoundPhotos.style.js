import styled from "styled-components";
import { globalColor, rem } from "styles/global_styles/Global.styles";

export const PhotoList = styled.div`
  display: flex;
`;
export const Photo = styled.div`
  width: ${rem(70)};
  height: ${rem(70)};
  border-radius: 50%;
  border: ${rem(1)} solid ${globalColor.white};
  box-shadow: 6px 4px 5px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  margin-left: -10px;

  :first-child {
    margin: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PhotoCount = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background: ${globalColor.black};
  opacity: 0.6;
  color: ${globalColor.white};
  font-size: ${rem(20)};
  line-height: ${rem(30)};
  font-family: var(--font-poppins), sans-serif;
  font-weight: 500;
  z-index: 1;
`;