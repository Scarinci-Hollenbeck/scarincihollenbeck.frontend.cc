import DisclaimerText from 'components/atoms/DisclaimerText';
import AccordionItem from 'components/molecules/attorney/AccordionItem';
import { Accordion } from 'react-bootstrap';
import {
  ProfileAccordionHolder,
  ProfileAccordionWrapper,
} from 'styles/attorney-page/ProfileAccordion.style';
import { ContainerDefault } from 'styles/Containers.style';
import empty from 'is-empty';
import Link from 'next/link';
import ProfileClients from 'components/molecules/attorney/ProfileClients';
import dynamic from 'next/dynamic';
import { StandardLightBlueButton } from 'styles/Buttons.style';
import AccordionDynamicItem from 'components/molecules/attorney/AccordionDynamicItem';
import GallerySlider from 'components/molecules/attorney/GallerySlider';
import MediaSlider from 'components/molecules/attorney/MediaSlider';
import { useRouter } from 'next/router';
import { reservedAccordionTitles } from 'utils/constants';
import { getPaginationData } from '../../../requests/getPaginationData';
import { attorneyPostsQuery } from '../../../requests/graphql-queries';

const AwardsSlider = dynamic(() => import('components/molecules/home/AwardsSlider'));

const BlogsBox = dynamic(() => import('../../molecules/attorney/BlogsBox'));

const renderBlogPosts = (data, config, isBlogsAttorney, isWide, name) => isBlogsAttorney && (
<AccordionItem
  as="li"
  eventKey={`${config?.actionKey}-${name}`}
  title={config?.title}
>
  <BlogsBox
    queryParamsForPagination={config?.queryParams}
    paginationData={data}
    isWideCards={isWide}
  />
</AccordionItem>
);

const checkOnDuplicate = (title) => {
  if (reservedAccordionTitles.includes(title)) {
    return (
      <>
        {title}
        <span className="duplicate">Duplicate</span>
      </>
    );
  }

  return title;
};

const ProfileAccordion = ({
  clients,
  awards,
  attorneyBiography,
  additionalTabs,
  representativeMatters,
  gallery,
  mediaItems,
  presentationsItems,
  publicationsItems,
  videos,
  govLawPosts,
  isArticlesAttorney,
  isNewsAttorney,
  name,
  authorId,
  attorneyId,
}) => {
  const router = useRouter();

  // Articles from Firm Insights category START
  const blogConfig = {
    title: 'Articles',
    queryParams: 'articles-page',
    actionKey: 'articles',
    params: {
      authorId,
      attorneyId,
      currentPage: router?.query?.['articles-page'] || 1,
      itemsPerPage: 3,
      categories: [599],
    },
  };

  const articlesPaginationData = getPaginationData(
    attorneyPostsQuery,
    blogConfig.params,
  );
  // Articles from Firm Insights category END

  // Articles from Firm News, Client Alerts, Firm Events categories START
  const newsConfig = {
    title: 'The News',
    queryParams: 'news-page',
    actionKey: 'news',
    params: {
      authorId,
      attorneyId,
      currentPage: router?.query?.['news-page'] || 1,
      itemsPerPage: 3,
      categories: [98, 99, 20098],
    },
  };

  const newsPaginationData = getPaginationData(
    attorneyPostsQuery,
    newsConfig.params,
  );
  // Articles from Firm News, Client Alerts, Firm Events categories END

  return (
    <ProfileAccordionWrapper data-testid="profile-accordion">
      <ContainerDefault>
        <ProfileAccordionHolder>
          <Accordion as="ul" alwaysOpen>
            {!empty(awards) && (
              <AccordionItem
                as="li"
                eventKey={`profile-awards-${name}`}
                title="Awards"
              >
                <StandardLightBlueButton as={Link} href="/awards">
                  Award Methodology
                </StandardLightBlueButton>
                <AwardsSlider items={awards} isLightVariant />
              </AccordionItem>
            )}

            {!empty(attorneyBiography?.biographyContent) && (
              <AccordionDynamicItem
                tag="li"
                eventKey={`profile-biography-${name}`}
                title="Full Biography"
                content={attorneyBiography?.biographyContent}
                isTwoColumns
              />
            )}

            {!empty(representativeMatters) && (
              <AccordionDynamicItem
                tag="li"
                eventKey={`profile-representative-matters-${name}`}
                title="Representative Matters"
                ulProps={{ $columnsCountUl: 2, $columnGapUl: 40 }}
                content={representativeMatters}
                disclaimer="* Results may vary depending on your particular facts and legal circumstances."
              />
            )}

            <ProfileClients clients={clients} name={name} />

            {renderBlogPosts(
              articlesPaginationData,
              blogConfig,
              isArticlesAttorney,
              false,
              name,
            )}

            {renderBlogPosts(
              newsPaginationData,
              newsConfig,
              isNewsAttorney,
              false,
              name,
            )}

            {!empty(mediaItems) && (
              <AccordionItem
                as="li"
                eventKey={`profile-media-${name}`}
                title="Media"
              >
                <MediaSlider items={mediaItems} />
              </AccordionItem>
            )}

            {!empty(presentationsItems) && (
              <AccordionItem
                as="li"
                eventKey={`profile-presentations-${name}`}
                title="Presentations"
              >
                <MediaSlider items={presentationsItems} />
              </AccordionItem>
            )}

            {!empty(videos) && (
              <AccordionItem
                as="li"
                eventKey={`profile-videos-${name}`}
                title="Video"
              >
                <MediaSlider items={videos} />
              </AccordionItem>
            )}

            {!empty(gallery) && (
              <AccordionItem
                as="li"
                eventKey={`profile-gallery-${name}`}
                title="Gallery"
              >
                <GallerySlider items={gallery} />
              </AccordionItem>
            )}

            {!empty(publicationsItems) && (
              <AccordionItem
                as="li"
                eventKey={`profile-publications-${name}`}
                title="Publications"
              >
                <MediaSlider items={publicationsItems} />
              </AccordionItem>
            )}

            {!empty(govLawPosts?.posts) && (
              <AccordionItem
                as="li"
                eventKey={`profile-gov-law-${name}`}
                title="Government & Law"
              >
                <MediaSlider items={govLawPosts?.posts} />
              </AccordionItem>
            )}

            {!empty(additionalTabs)
              && additionalTabs.map(
                (tab) => !empty(tab?.content) && (
                <AccordionDynamicItem
                  tag="li"
                  key={`${tab?.id}-additional-tab`}
                  eventKey={`profile-additional-${tab?.id}-${name}`}
                  title={checkOnDuplicate(tab?.title)}
                  content={tab?.content}
                />
                ),
              )}
          </Accordion>
          <DisclaimerText text="No Aspect of the advertisement has been approved by the Supreme Court. Results may vary depending on your particular facts and legal circumstances." />
        </ProfileAccordionHolder>
      </ContainerDefault>
    </ProfileAccordionWrapper>
  );
};

export default ProfileAccordion;
