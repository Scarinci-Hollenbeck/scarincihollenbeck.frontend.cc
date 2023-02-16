import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const ClientSlider = ({
  clients, imgSize, numbers, buttons,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: numbers || 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    easing: 'ease-in',
    arrows: buttons || false,
    variableWidth: true,
  };
  return (
    <>
      <Slider {...settings}>
        {clients.map(({ clientImage, clientLink, clientTitle }) => (
          <div style={{ width: imgSize?.width }} key={clientTitle}>
            <a href={clientLink}>
              <Image
                src={clientImage.sourceUrl}
                alt={clientTitle}
                width={imgSize?.width || 300}
                height={imgSize?.height || 300}
              />
            </a>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ClientSlider;
