import WhyChooseUsCard from 'components/molecules/practice/WhyChooseUsCard';
import React, { useId } from 'react';
import { Title32 } from 'styles/common/Typography.style';
import { ContainerDefault } from 'styles/Containers.style';
import {
  WhyChooseUsCards,
  WhyChooseUsSection,
} from 'styles/practices/WhyChooseUs.style';
import { defaultWhyChooseUsData } from 'utils/constants';
import empty from 'is-empty';

const createCardImage = (index) => ({
  src: `/images/whyChooseUs${index + 1}.webp`,
  width: 1000,
  height: 700,
});

const WhyChooseUs = ({
  anchorId,
  data,
  isPrint,
  isHideImage,
  isSectionTitle = true,
}) => {
  let isJSX = true;
  if (empty(data)) {
    data = defaultWhyChooseUsData;
    isJSX = false;
  }
  const id = useId();

  return (
    <WhyChooseUsSection className="margin-scroll" id={anchorId}>
      <ContainerDefault>
        <Title32 className={isSectionTitle ? '' : 'sr-only'}>
          Why Choose Us?
        </Title32>
        <WhyChooseUsCards>
          {data.map((card, index) => (
            <WhyChooseUsCard
              key={`${id}-${index + 1}-card`}
              title={card?.title}
              text={card?.description || card?.content}
              isHideImage={isHideImage}
              image={createCardImage(index)}
              isJSXDescription={isJSX}
              isPrint={isPrint}
            />
          ))}
        </WhyChooseUsCards>
      </ContainerDefault>
    </WhyChooseUsSection>
  );
};

export default WhyChooseUs;
