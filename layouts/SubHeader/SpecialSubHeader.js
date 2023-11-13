import empty from 'is-empty';
import PostBreadcrumbs from '../../components/organisms/post/PostBreadcrumbs';
import { changeTitle } from '../../utils/helpers';
import {
  MiddleContainer,
  SpecialSubHeaderContainer,
} from '../../styles/practices-special-style/SpecialSubHeader.style';
import ScrollDownArrow from '../../components/common/ScrollDownArrow';
import DescriptionPlusBtn from '../../components/organisms/cannabis-law/DescriptionPlusBtn';
import {
  CannabisSubTitle,
  CannabisTitle,
} from '../../styles/practices-special-style/canabis-law/CannabisSubHeader';
import { FullHDContainer } from '../../styles/practices-special-style/commonForSpecial.style';

const SpecialSubHeader = ({
  title,
  subtitle,
  backgroundImage = '/images/smoke.png',
  anchorId,
  article,
  backgroundVideo,
  handleClickAnchor,
}) => (
  <SpecialSubHeaderContainer
    backgroundImage={!empty(backgroundVideo) ? backgroundImage : ''}
  >
    <FullHDContainer>
      {!empty(backgroundVideo) && (
        <video autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      <PostBreadcrumbs />
      <MiddleContainer>
        <ScrollDownArrow
          handleOnClick={handleClickAnchor}
          anchorId={anchorId}
          text="Learn more?"
        />
        <DescriptionPlusBtn labelForBtn="See attorneys" text={article} />
      </MiddleContainer>
      <CannabisTitle>
        <h1 className="animate__animated animate__fadeInDown animate__fast">
          {changeTitle(title)}
        </h1>

        {!empty(subtitle) && (
          <CannabisSubTitle>
            <p>{subtitle}</p>
          </CannabisSubTitle>
        )}
      </CannabisTitle>
    </FullHDContainer>
  </SpecialSubHeaderContainer>
);

export default SpecialSubHeader;
