import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import PostBreadCrumbs from 'components/organisms/post/PostBreadcrumbs';
import SocialShare from 'components/organisms/library/SocialShare';
import Image from 'next/image';
import { changeTitle } from 'utils/helpers';
import empty from 'is-empty';
import {
  SubHeaderContent,
  SubHeaderDescription,
  SubHeaderHolder,
  SubHeaderInfo,
  SubHeaderSocials,
} from 'styles/subheader/SubHeader.style';
import SubHeaderAuthors from './SubHeaderAuthors';
import SubHeaderDate from './SubHeaderDate';
import SubHeaderCategory from './SubHeaderCategory';

const SubHeaderDefault = ({
  title,
  subtitle,
  backgroundImage,
  isSubscription,
  RightContentComponent,
  rightContentProps = {},
  isSocials,
  isSocialsPrint,
  category,
  authors,
  date,
}) => {
  const subHeaderClassnames = [
    'sub-header',
    empty(backgroundImage) ? 'sub-header--without-image' : '',
    rightContentProps?.menu ? 'sub-header--menu' : '',
    isSubscription ? 'sub-header--subscription' : '',
    !empty(category) ? 'sub-header--article' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <SubHeaderHolder
      className={subHeaderClassnames}
      data-testid="default-sub-header"
    >
      {backgroundImage && (
        <picture className="sub-header__image" key={`${title}-subheader-image`}>
          <Image
            src={backgroundImage}
            alt={title || 'sub header image'}
            width={400}
            height={400}
            priority
            sizes="400px"
            loading="eager"
          />
        </picture>
      )}

      <SubHeaderContent className="sub-header__content">
        <PostBreadCrumbs data={{ title, category }} />

        <SubHeaderInfo key={`${title}-subheader-content`}>
          <SubHeaderCategory
            categoryTitle={category?.name}
            categoryColor={category?.categoryFields?.color}
          />

          {title && <JSXWithDynamicLinks HTML={changeTitle(title, true)} />}

          {subtitle?.length > 0 && (
            <SubHeaderDescription className="animate__animated animate__fadeInUp animate__fast sub-title">
              <JSXWithDynamicLinks HTML={subtitle} />
            </SubHeaderDescription>
          )}

          <SubHeaderAuthors authors={authors} />

          <SubHeaderDate date={date} />
        </SubHeaderInfo>

        {isSocials && (
          <SubHeaderSocials>
            <SocialShare
              isPrintBtn={isSocialsPrint}
              handlePrint={rightContentProps?.handlePrint}
            />
          </SubHeaderSocials>
        )}
      </SubHeaderContent>

      {/* Already exist components: SubHeaderKeyContacts, SubHeaderLocations, SubHeaderCardsSlider, SubHeaderMenu, SubHeaderSubscription */}
      {RightContentComponent && (
        <RightContentComponent {...rightContentProps} />
      )}
    </SubHeaderHolder>
  );
};

export default SubHeaderDefault;
