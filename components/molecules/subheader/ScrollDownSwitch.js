import Image from 'next/image';
import React from 'react';
import { ScrollDownBlock, ScrollDownIcon, ScrollDownText } from 'styles/practices-special-style/subheader/ScrollDownSwitch.style';

const ScrollDownSwitch = () => {
  const imgToggle = '/images/scroll_down_icon.svg';
  const imgToggleActive = '/images/scroll-down-icon-active.svg';
  return (
    <ScrollDownBlock>
      <ScrollDownText>
        Scroll Down
      </ScrollDownText>
      <ScrollDownIcon>
        {/* <Image src={imgToggle} alt="toggle" width={46} height={46} /> */}
      </ScrollDownIcon>
    </ScrollDownBlock>

  );
};

export default ScrollDownSwitch;
