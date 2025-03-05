import React from 'react';
import {
  SubHeaderSlide,
  SubHeaderSlideContent,
  SubHeaderSlideDescription,
  SubHeaderSlideImage,
  SubHeaderSlideLabel,
  SubHeaderSlideNavigationButton,
  SubHeaderSlideNavigationIcon,
  SubHeaderSlider,
  SubHeaderSlideTitle,
} from 'styles/subheader/SubHeaderCardsSlider.style';
import empty from 'is-empty';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { UnderlinedLink } from 'styles/common/Typography.style';
import { useDispatch } from 'react-redux';
import useSlider from 'hooks/useSlider';
import { handleModalOpener } from '../../redux/slices/modals.slice';

const SubHeaderCardsSlider = ({
  slides = [],
  autoplayInterval = 10000,
  slidesLabel,
  isContact,
}) => {
  const dispatch = useDispatch();
  const {
    activeSlide,
    prevSlide,
    nextSlide,
    activeSlideIndex,
    sliderRef,
    swipeHandlers,
    onClickPrev,
    onClickNext,
  } = useSlider({ slides, autoplayInterval });

  if (empty(slides)) return null;

  return (
    <SubHeaderSlider {...swipeHandlers}>
      <SubHeaderSlide ref={sliderRef}>
        {activeSlide?.image && (
          <SubHeaderSlideImage key={activeSlide?.image}>
            <Image
              alt={`${activeSlide?.title} industry`}
              src={activeSlide?.image}
              width={300}
              height={350}
              priority={activeSlideIndex === 0}
              loading={activeSlideIndex === 0 ? 'eager' : 'lazy'}
            />
          </SubHeaderSlideImage>
        )}

        <SubHeaderSlideContent>
          <SubHeaderSlideNavigationButton
            onClick={onClickPrev}
            className={!isContact ? 'mb-auto' : ''}
          >
            <span className="nav-text">{prevSlide?.title}</span>
            <SubHeaderSlideNavigationIcon>
              <IoIosArrowUp size={24} />
            </SubHeaderSlideNavigationIcon>
          </SubHeaderSlideNavigationButton>

          <SubHeaderSlideTitle>{activeSlide?.title}</SubHeaderSlideTitle>

          {!empty(slidesLabel) && (
            <SubHeaderSlideLabel>{slidesLabel}</SubHeaderSlideLabel>
          )}

          {!empty(activeSlide?.description) && (
            <SubHeaderSlideDescription>
              <JSXWithDynamicLinks HTML={activeSlide?.description} />
            </SubHeaderSlideDescription>
          )}
          {isContact && (
            <UnderlinedLink
              as="button"
              onClick={() => dispatch(handleModalOpener({ active: true }))}
              $isWhite
            >
              Contact now
            </UnderlinedLink>
          )}

          <SubHeaderSlideNavigationButton
            onClick={onClickNext}
            className={!isContact ? 'mt-auto' : ''}
          >
            <span className="nav-text">{nextSlide?.title}</span>
            <SubHeaderSlideNavigationIcon>
              <IoIosArrowDown size={24} />
            </SubHeaderSlideNavigationIcon>
          </SubHeaderSlideNavigationButton>
        </SubHeaderSlideContent>
      </SubHeaderSlide>
    </SubHeaderSlider>
  );
};

export default SubHeaderCardsSlider;
