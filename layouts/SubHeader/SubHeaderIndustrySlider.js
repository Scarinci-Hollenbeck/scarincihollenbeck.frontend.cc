import React from 'react';
import {
  SubHeaderIndustryCards,
  SubHeaderIndustrySliderControls,
  SubHeaderIndustrySliderNavigation,
  SubHeaderIndustrySliderNavigationNext,
  SubHeaderIndustrySliderNavigationPrev,
  SubHeaderIndustrySliderSteps,
  SubHeaderIndustrySliderStepsCurrent,
  SubHeaderIndustrySliderStepsDivider,
  SubHeaderIndustrySliderStepsTotal,
  SubHeaderIndustrySliderWrapper,
} from 'styles/subheader/SubHeaderIndustrySlider.style';
import useSlider from 'hooks/useSlider';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { AnimatePresence } from 'framer-motion';
import empty from 'is-empty';
import SubHeaderIndustryCard from './SubHeaderIndustryCard';

const SubHeaderIndustrySlider = ({
  slides = [],
  autoplayInterval,
  setActiveTab,
}) => {
  const {
    activeSlide,
    activeSlideIndex,
    sliderRef,
    swipeHandlers,
    onClickPrev,
    onClickNext,
  } = useSlider({ slides, autoplayInterval, loop: false });

  if (empty(slides)) return null;

  return (
    <SubHeaderIndustrySliderWrapper ref={sliderRef}>
      <SubHeaderIndustryCards {...swipeHandlers}>
        <AnimatePresence mode="wait">
          <SubHeaderIndustryCard
            key={`${activeSlide?.title}-slide`}
            image={activeSlide?.image}
            title={activeSlide?.title}
            description={activeSlide?.description}
            activeSlideIndex={activeSlideIndex}
            setActiveTab={setActiveTab}
          />
        </AnimatePresence>
      </SubHeaderIndustryCards>

      <SubHeaderIndustrySliderControls>
        <SubHeaderIndustrySliderSteps>
          <SubHeaderIndustrySliderStepsCurrent>
            {activeSlideIndex + 1}
          </SubHeaderIndustrySliderStepsCurrent>
          <SubHeaderIndustrySliderStepsDivider />
          <SubHeaderIndustrySliderStepsTotal>
            {slides?.length}
          </SubHeaderIndustrySliderStepsTotal>
        </SubHeaderIndustrySliderSteps>

        <SubHeaderIndustrySliderNavigation>
          <SubHeaderIndustrySliderNavigationPrev
            onClick={onClickPrev}
            disabled={activeSlideIndex === 0}
          >
            <BsArrowLeft size={24} />
          </SubHeaderIndustrySliderNavigationPrev>
          <SubHeaderIndustrySliderNavigationNext
            onClick={onClickNext}
            disabled={activeSlideIndex === slides?.length - 1}
          >
            <BsArrowRight size={24} />
          </SubHeaderIndustrySliderNavigationNext>
        </SubHeaderIndustrySliderNavigation>
      </SubHeaderIndustrySliderControls>
    </SubHeaderIndustrySliderWrapper>
  );
};

export default SubHeaderIndustrySlider;
