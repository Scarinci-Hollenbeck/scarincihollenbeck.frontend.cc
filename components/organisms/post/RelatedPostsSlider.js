import React from 'react';
import SwiperWrapper from 'components/organisms/common/SwiperWrapper';
import empty from 'is-empty';
import SwiperSlide from 'components/organisms/common/SwiperSlide';
import { RelatedPostsSliderWrapper } from 'styles/Post/RelatedPosts.style';
import LibraryCard from 'components/molecules/library/LibraryCard';

const breakpoints = {
  1440: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  768: {
    spaceBetween: 32,
    slidesPerView: 2,
  },
  0: {
    slidesPerView: 1,
  },
};

const RelatedPostsSlider = ({ items, isDarkerCards = false }) => {
  if (empty(items)) return null;

  return (
    <RelatedPostsSliderWrapper>
      <SwiperWrapper
        breakpoints={breakpoints}
        grab-cursor="true"
        slides-per-view="3"
      >
        {items?.map((item) => (
          <SwiperSlide key={item.databaseId}>
            <LibraryCard
              title={item?.title}
              image={
                item?.featuredImage?.node?.sourceUrl || item?.featuredImage
              }
              uri={item?.uri}
              description={item?.excerpt}
              author={item?.author?.node}
              date={item?.date}
              tags={item?.tags?.nodes}
              isDarker={isDarkerCards}
            />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </RelatedPostsSliderWrapper>
  );
};

export default RelatedPostsSlider;
