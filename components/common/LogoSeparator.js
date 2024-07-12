import Image from 'next/image';
import React from 'react';
import { LogoSeparatorWrapper } from 'styles/Separators.style';
import { SITE_TITLE } from 'utils/constants';
import SHDiamond from '../../public/images/sh-mini-diamond-PNG.svg';

const LogoSeparator = () => (
  <LogoSeparatorWrapper>
    <Image alt={`${SITE_TITLE}, LLC`} width={40} height={40} src={SHDiamond} />
  </LogoSeparatorWrapper>
);

export default LogoSeparator;