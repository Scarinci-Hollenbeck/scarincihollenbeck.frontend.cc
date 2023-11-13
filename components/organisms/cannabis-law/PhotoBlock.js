import { useId, useState } from 'react';
import Image from 'next/image';
import empty from 'is-empty';
import { AnimatePresence, motion } from 'framer-motion';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import {
  PhotoBlockContainer,
  PhotoCannabisBox,
  PhotoCardLink,
  PhotoClient,
} from '../../../styles/practices-special-style/canabis-law/PhotoBlock.style';
import PhotoCardPolaroid from '../../atoms/PhotoCardPolaroid';
import ArticleCannabis from '../../molecules/cannabis-law/ArticleCannabis';
import { FullHDContainer } from '../../../styles/practices-special-style/commonForSpecial.style';

const PhotoBlock = ({ photoBlockData, anchorIdBlock }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextPhoto = () => {
    const lastIndex = photoBlockData.cannabisClients.length - 1;
    if (activeIndex < lastIndex) {
      setActiveIndex(activeIndex + 1);
    }
    if (activeIndex === lastIndex) {
      setActiveIndex(0);
    }
  };

  const handlePrevPhoto = () => {
    const lastIndex = photoBlockData.cannabisClients.length - 1;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    if (activeIndex === 0) {
      setActiveIndex(lastIndex);
    }
  };

  const activeClient = photoBlockData.cannabisClients[activeIndex];

  const { clientLink, clientLogo, clientTitle } = activeClient;

  return (
    <PhotoBlockContainer id={anchorIdBlock}>
      <FullHDContainer>
        <div className="photo-article-box">
          <PhotoCannabisBox>
            <AnimatePresence>
              {!empty(activeClient) && (
                <>
                  <MdArrowBackIos
                    className="prev-arrow"
                    onClick={handlePrevPhoto}
                  />
                  <MdArrowForwardIos
                    className="next-arrow"
                    onClick={handleNextPhoto}
                  />
                  {!empty(clientLink) ? (
                    <PhotoCardLink
                      key={clientLogo.title}
                      href={clientLink.url}
                      target="_blank"
                      rel="noreferrer"
                      className="big-image"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5 }}
                    >
                      <PhotoCardPolaroid
                        capture={clientTitle}
                        imgUrl={clientLogo?.sourceUrl}
                        imgAlt={clientLogo?.title}
                      />
                    </PhotoCardLink>
                  ) : (
                    <motion.div
                      key={clientLogo.title}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5 }}
                      className="big-image"
                    >
                      <PhotoCardPolaroid
                        imgUrl={clientLogo.sourceUrl}
                        imgAlt={clientLogo.title}
                        capture={clientTitle}
                      />
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>

            {photoBlockData.cannabisClients.map(({ clientLogo }, index) => (
              <PhotoClient
                key={clientLogo?.databaseId}
                onClick={() => setActiveIndex(index)}
                className={activeIndex === index ? 'active' : ''}
              >
                <Image
                  src={clientLogo?.sourceUrl}
                  alt={clientLogo?.title}
                  width="300"
                  height="300"
                />
              </PhotoClient>
            ))}
          </PhotoCannabisBox>
          <ArticleCannabis
            titleSize={44}
            title={photoBlockData.articleBox.title}
            paragraph={photoBlockData.articleBox.paragraph}
          />
        </div>
      </FullHDContainer>
    </PhotoBlockContainer>
  );
};

export default PhotoBlock;
