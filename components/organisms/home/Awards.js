import Link from 'next/link';
import { AwardsHeader, AwardsHolder, AwardsWrapper } from 'styles/Awards.style';
import {
  StandardBlueButton,
  StandardLightBlueButton,
} from 'styles/Buttons.style';
import { ContainerDefault } from 'styles/Containers.style';
import dynamic from 'next/dynamic';
import React from 'react';
import { Title32 } from 'styles/common/Typography.style';
import empty from 'is-empty';

const AwardsSlider = dynamic(() => import('components/molecules/home/AwardsSlider'));

const renderButton = (isLightVariant) => {
  const Component = isLightVariant
    ? StandardBlueButton
    : StandardLightBlueButton;
  return (
    <Component as={Link} href="/awards">
      Award Methodology
    </Component>
  );
};

const Awards = ({
  awards,
  anchorId,
  title = 'Awards / Accolades',
  isLightVariant,
}) => {
  if (empty(awards)) return null;

  return (
    <AwardsWrapper
      id={anchorId}
      data-testid="awards"
      className="margin-scroll"
      $isLightVariant={isLightVariant}
    >
      <ContainerDefault>
        <AwardsHolder $isLightVariant={isLightVariant}>
          <AwardsHeader>
            <Title32 $isWhite={!isLightVariant}>{title}</Title32>

            {renderButton(isLightVariant)}
          </AwardsHeader>

          <AwardsSlider items={awards} isLightVariant={isLightVariant} />
        </AwardsHolder>
      </ContainerDefault>
    </AwardsWrapper>
  );
};

export default Awards;
