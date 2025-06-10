import Image from 'next/image';
import SwiperWrapper from 'components/organisms/common/SwiperWrapper';
import empty from 'is-empty';
import Link from 'next/link';
import {
  ClientsSliderCard,
  ClientsSliderTitle,
  ClientsSliderWrapper,
} from 'styles/attorney-page/ClientsSlider.style';
import SwiperSlide from 'components/organisms/common/SwiperSlide';

const breakpoints = {
  1800: {
    slidesPerView: 9,
  },
  1440: {
    slidesPerView: 7,
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 24,
  },
  768: {
    spaceBetween: 20,
    slidesPerView: 4,
  },
  0: {
    spaceBetween: 12,
    slidesPerView: 2,
  },
};

const ClientSlider = ({ clients }) => {
  const clientsWithImages = clients.filter(
    ({ clientImage }) => !empty(clientImage),
  );

  if (empty(clientsWithImages)) return null;
  return (
    <ClientsSliderWrapper>
      <ClientsSliderTitle>Clients</ClientsSliderTitle>
      <SwiperWrapper
        space-between={24}
        breakpoints={breakpoints}
        grab-cursor="true"
        autoplay="true"
        speed="1000"
        loop="true"
        lazy="true"
      >
        {clientsWithImages.map(({ clientImage, clientLink, clientTitle }) => (
          <SwiperSlide key={`${clientTitle}-slide`}>
            <ClientsSliderCard
              as={!empty(clientLink) && Link}
              href={!empty(clientLink) ? clientLink : undefined}
              target={!empty(clientLink) ? '_blank' : undefined}
              rel={!empty(clientLink) ? 'noreferrer' : undefined}
              $isLink={!empty(clientLink)}
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
