import styled from 'styled-components';
import {
  entAndMediaColors,
  globalColor,
  rem,
} from 'styles/global_styles/Global.styles';
import { EnterntainmentTabBtn } from './EntertainmentInfoBlock.style';
import { motion } from 'framer-motion';

export const EntertainmentModal = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background-color: ${globalColor.white};
  box-shadow: 0 ${rem(4)} ${rem(33)} 0 rgba(0, 0, 0, 0.33);
  z-index: 1;
  overflow: auto;

  @media (max-width: 1440px) {
    width: 75%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const EntertainmentModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
`;
export const EntertainmentModalContent = styled.div`
  padding: ${rem(40)} ${rem(135)} 0 ${rem(40)};

  @media (max-width: 1850px) {
    padding: ${rem(40)} ${rem(84)} 0 ${rem(40)};
  }

  @media (max-width: 1440px) {
    padding: ${rem(40)} ${rem(32)} 0 ${rem(40)};
  }

  @media (max-width: 768px) {
    padding: ${rem(40)} ${rem(16)};
  }
`;
export const EntertainmentModalClose = styled.div`
  margin: 0 0 0 auto;
  cursor: pointer;
  width: ${rem(30)};
  height: ${rem(30)};
  position: relative;
  transform: rotate(45deg);
  transition: all 0.5s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: ${globalColor.black};
  }

  &::before {
    width: ${rem(30)};
    height: ${rem(2)};
    top: ${rem(14)};
    left: 0;
  }

  &::after {
    width: ${rem(2)};
    height: ${rem(30)};
    top: 0;
    left: ${rem(14)};
  }

  &:hover {
    transform: rotate(225deg);
  }

  @media (max-width: 768px) {
    width: ${rem(20)};
    height: ${rem(20)};

    &::before {
      width: ${rem(20)};
      height: ${rem(2)};
      top: ${rem(9)};
      left: 0;
    }

    &::after {
      width: ${rem(2)};
      height: ${rem(20)};
      top: 0;
      left: ${rem(9)};
    }
  }
`;
export const EntertainmentModalList = styled.div`
  margin-bottom: ${rem(50)};
  display: flex;
  flex-direction: column;
  row-gap: ${rem(15)};
`;
export const EntertainmentModalListItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${rem(24)};
  font-family: var(--font-poppins), sans-serif;
  color: ${globalColor.black};

  @media (max-width: 768px) {
    font-size: ${rem(14)};
    line-height: ${rem(21)};
  }
`;
export const EntertainmentModalListNumber = styled.div`
  padding-left: ${rem(29)};
  width: ${rem(54)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${entAndMediaColors.entAndMediaColorGray};
  position: relative;

  ::before {
    position: absolute;
    left: 12.5px;
    content: "";
    display: flex;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 5px solid ${entAndMediaColors.entAndMediaColorGray};
    border-bottom: 5px solid transparent;
  }

  @media (max-width: 768px) {
    font-size: ${rem(14)};
    line-height: ${rem(21)};
    width: ${rem(34)};
    padding-left: ${rem(15)};

    ::before {
      left: 0;
    }
  }
`;

export const EntertainmentModalDescription = styled.div`
  margin-bottom: ${rem(50)};
  font-family: var(--font-poppins), sans-serif;
  color: ${entAndMediaColors.entAndMediaColorGray};

  @media (max-width: 768px) {
    font-size: ${rem(14)};
    line-height: ${rem(21)};
  }
`;
export const EntertainmentModalFooter = styled.div`
  margin-top: auto;
  background-color: ${globalColor.black};
  padding: ${rem(20)} ${rem(135)} ${rem(20)} ${rem(40)};
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${EnterntainmentTabBtn} {
    border-color: white;
  }

  @media (max-width: 1850px) {
    padding: ${rem(20)} ${rem(84)} ${rem(20)} ${rem(40)};
  }

  @media (max-width: 1440px) {
    padding: ${rem(20)} ${rem(32)} ${rem(20)} ${rem(40)};
  }

  @media (max-width: 768px) {
    padding: ${rem(20)} ${rem(16)};
  }
`;
