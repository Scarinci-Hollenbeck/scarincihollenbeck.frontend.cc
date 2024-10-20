import {
  NewsPaperBox,
  NewsPaperContainer,
} from '../../../styles/practices-special-style/canabis-law/NewsPeperBlock.style';
import PhotoCardPolaroid from '../../atoms/PhotoCardPolaroid';
import ArticleCannabis from '../../molecules/cannabis-law/ArticleCannabis';
import { FullHDContainer } from '../../../styles/practices-special-style/commonForSpecial.style';
import DisclaimerText from '../../atoms/DisclaimerText';

const NewsPaperBlock = ({ newsPepperArticle, article }) => (
  <NewsPaperContainer>
    <FullHDContainer>
      <ArticleCannabis
        titleSize={44}
        isColorWhite
        title={article.title}
        paragraph={article.paragraph}
      />
      <NewsPaperBox>
        <p>{newsPepperArticle.newspaperArticle}</p>
        <PhotoCardPolaroid
          imgUrl={newsPepperArticle.newspaperPhotoBox.sourceUrl}
          isBlackBack
          capture={newsPepperArticle.newspaperPhotoBox.caption}
          imgAlt={newsPepperArticle.newspaperPhotoBox.altText}
        />
      </NewsPaperBox>
    </FullHDContainer>
    <DisclaimerText text="No Aspect of the advertisement has been approved by the Supreme Court." />
  </NewsPaperContainer>
);

export default NewsPaperBlock;
