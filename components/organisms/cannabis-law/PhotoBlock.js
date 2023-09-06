import Image from 'next/image';
import { PhotoBlockContainer, PhotoCannabisBox } from '../../../styles/practices-special-style/canabis-law/PhotoBlock.style';
import scarinci from '../../../public/images/scarinci_word.webp';
import hollenbeck from '../../../public/images/hollenbeck_word.webp';
import wordsPicture from '../../../public/images/helping_Cannabis_words.webp';
import PhotoCardPolaroid from '../../atoms/PhotoCardPolaroid';
import ArticleCannabis from '../../molecules/cannabis-law/ArticleCannabis';
import { FullHDContainer } from '../../../styles/practices-special-style/commonForSpecial.style';

const PhotoBlock = ({ photoBlockData, anchorIdBlock }) => (
  <PhotoBlockContainer>
    <FullHDContainer>
      <div className="photo-article-box">
        <PhotoCannabisBox id={anchorIdBlock}>
          <PhotoCardPolaroid capture={photoBlockData.photo1.caption} imgUrl={photoBlockData.photo1.sourceUrl} imgAlt={photoBlockData.photo1.altText}>
            <Image src={scarinci} alt="Scarinci word" />
          </PhotoCardPolaroid>
          <PhotoCardPolaroid capture={photoBlockData.photo2.caption} imgUrl={photoBlockData.photo2.sourceUrl} imgAlt={photoBlockData.photo2.altText}>
            <Image src={hollenbeck} alt="Hollenback word" />
          </PhotoCardPolaroid>
          <Image className="words-picture" src={wordsPicture} alt="Helping Cannabis Businesses Navigate Complex Laws" />
        </PhotoCannabisBox>
        <ArticleCannabis titleSize={44} title={photoBlockData.articleBox.title} paragraph={photoBlockData.articleBox.paragraph} />
      </div>
    </FullHDContainer>
  </PhotoBlockContainer>
);

export default PhotoBlock;