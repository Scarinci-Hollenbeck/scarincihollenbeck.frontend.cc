
import LazyLoad from 'react-lazyload';
import Carousel from 'react-multi-carousel';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function limitTitleLength(title) {
  if (title.length > 200) {
    return `${title.substring(0, 200)} ...`;
  }

  return title;
}

export default function SimpleNewsArticlesCarousel(props) {
  const { slides } = props;

  return (slides.length > 0) && (
    <Carousel responsive={responsive} infinite arrows swipeable>
      {slides.map((post) => (
        <div key={parseInt(post.id, 10)} className={`pb-2 px-4 carousel-slide level-${parseInt(post.id, 10)}`}>
          <a href={(post.link) ? post.link : '#'}>
            <LazyLoad height={150}>
              <img rel="preconnect" src={(post.image) ? post.image : (post.featuredImg) ? post.featuredImg : 'https://shhcsgmvsndmxmpq.nyc3.digitaloceanspaces.com/2020/04/no-image-found-diamond.png'} alt={post.title} className="img-thumbnail mx-auto d-block" />
            </LazyLoad>
            <p className="text-muted small-excerpt text-center">{limitTitleLength(post.title)}</p>
          </a>
        </div>
      ))}
    </Carousel>
  );
}
