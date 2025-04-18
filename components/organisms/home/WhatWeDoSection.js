import SeparatedTitle from 'components/common/SeparatedTitle';
import React from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import { globalColor } from 'styles/global_styles/Global.styles';
import {
  WhatWeDoHeader,
  WhatWeDoHolder,
  WhatWeDoWrapper,
} from 'styles/WhatWeDo.style';
import { StandardBlueButton } from 'styles/Buttons.style';
import { useDispatch } from 'react-redux';
import PracticesTabs from './PracticesTabs';
import { handleModalOpener } from '../../../redux/slices/modals.slice';

const WhatWeDoSection = ({ practices, anchorId }) => {
  const dispatch = useDispatch();

  return (
    <WhatWeDoWrapper id={anchorId} className="margin-scroll">
      <ContainerDefault className="practice-container">
        <WhatWeDoHolder>
          <WhatWeDoHeader>
            <SeparatedTitle
              separatorSize={24}
              separatorColor={globalColor.blue.skyBlue}
              title="What we do?"
            />

            <StandardBlueButton
              onClick={() => dispatch(
                handleModalOpener({ active: true, className: 'blue-modal' }),
              )}
            >
              Free consultation
            </StandardBlueButton>
          </WhatWeDoHeader>
          <PracticesTabs practices={practices} />
        </WhatWeDoHolder>
      </ContainerDefault>
    </WhatWeDoWrapper>
  );
};

export default WhatWeDoSection;
