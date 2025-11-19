import SeparatedTitle from 'components/common/SeparatedTitle';
import React from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import { globalColor } from 'styles/global_styles/Global.styles';
import {
  WhatWeDoHeader,
  WhatWeDoHolder,
  WhatWeDoWrapper,
} from 'styles/WhatWeDo.style';
import ContactModalOpener from 'components/atoms/ContactModalOpener';
import PracticesTabs from './PracticesTabs';

const WhatWeDoSection = ({ practices, anchorId }) => (
  <WhatWeDoWrapper id={anchorId} className="margin-scroll">
    <ContainerDefault className="practice-container">
      <WhatWeDoHolder>
        <WhatWeDoHeader>
          <SeparatedTitle
            separatorSize={24}
            separatorColor={globalColor.blue.skyBlue}
            title="What we do?"
          />

          <ContactModalOpener modalVariant="blue-modal">
            Free consultation
          </ContactModalOpener>
        </WhatWeDoHeader>
        <PracticesTabs practices={practices} />
      </WhatWeDoHolder>
    </ContainerDefault>
  </WhatWeDoWrapper>
);

export default WhatWeDoSection;
