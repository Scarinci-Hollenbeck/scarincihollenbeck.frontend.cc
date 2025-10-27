import Image from 'next/image';
import SwiperWrapper from 'components/organisms/common/SwiperWrapper';
import empty from 'is-empty';
import Link from 'next/link';
import {
  ClientsSliderCard,
  ClientsSliderWrapper,
} from 'styles/attorney-page/ClientsSlider.style';
import SwiperSlide from 'components/organisms/common/SwiperSlide';

const breakpoints = {
  1440: {
    slidesPerView: 6,
  },
  1280: {
    slidesPerView: 5,
  },
  992: {
    slidesPerView: 4,
  },
  768: {
    slidesPerView: 5,
  },
  580: {
    slidesPerView: 4,
  },
  0: {
    slidesPerView: 3,
  },
};

const ClientSlider = ({ clients }) => {
  if (empty(clients)) return null;

  return (
    <ClientsSliderWrapper>
      <SwiperWrapper
        space-between={16}
        breakpoints={breakpoints}
        grab-cursor="true"
        autoplay="true"
        speed="1000"
        loop="true"
        lazy="true"
      >
        {clients.map(({ clientImage, clientLink, clientTitle }) => (
          <SwiperSlide key={`${clientLink}-slide`}>
            <ClientsSliderCard
              as={!empty(clientLink) && Link}
              href={!empty(clientLink) ? clientLink : undefined}
              target={!empty(clientLink) ? '_blank' : undefined}
              rel={!empty(clientLink) ? 'noreferrer noopener' : undefined}
              $isLink={!empty(clientLink)}
              title={clientTitle}
            >
              <Image
                src={clientImage?.sourceUrl}
                alt={clientImage?.mediaDetails?.altText || clientTitle}
                width={170}
                height={170}
                loading="lazy"
              />
            </ClientsSliderCard>
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </ClientsSliderWrapper>
  );
};

export default ClientSlider;
