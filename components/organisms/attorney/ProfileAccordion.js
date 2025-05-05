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
import {
  ATTORNEY_ACCORDIONS_BLOGS_TITLES,
  reservedAccordionTitles,
} from 'utils/constants';
import { useCallback } from 'react';
import { getPaginationData } from '../../../requests/getPaginationData';
import { postsForPaginationByAuthorIdQuery } from '../../../requests/graphql-queries';

const AwardsSlider = dynamic(() => import('components/molecules/home/AwardsSlider'));

const BlogsBox = dynamic(() => import('../../molecules/attorney/BlogsBox'));

const renderBlogPosts = (data, config, blogTitles, isWide, name) => blogTitles?.includes(config?.title) && (
<AccordionItem
  as="li"
  eventKey={`${config?.actionKey}-${name}`}
  title={config?.title}
  id={config?.actionKey}
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
  blogTitles,
  name,
  authorId,
  setActiveAccordion,
  activeAccordion,
}) => {
  const router = useRouter();

  // News Press Releases section START
  const newsPressReleasesConfig = {
    title: ATTORNEY_ACCORDIONS_BLOGS_TITLES.releases,
    queryParams: 'news-press-releases-page',
    actionKey: 'news-and-press',
    params: {
      authorId,
      categoryId: 98,
      currentPage: router?.query?.['news-press-releases-page'] || 1,
      itemsPerPage: 6,
    },
  };

  const newsPressReleasesPaginationData = getPaginationData(
    postsForPaginationByAuthorIdQuery,
    newsPressReleasesConfig.params,
  );
  // News Press Releases section END

  // Blog section START
  const blogConfig = {
    title: ATTORNEY_ACCORDIONS_BLOGS_TITLES.blog,
    queryParams: 'blogs-page',
    actionKey: 'blogs',
    params: {
      authorId,
      categoryId: 599,
      currentPage: router?.query?.['blogs-page'] || 1,
      itemsPerPage: 3,
    },
  };

  const blogPostsPaginationData = getPaginationData(
    postsForPaginationByAuthorIdQuery,
    blogConfig.params,
  );
  // Blog section END

  // Events section START
  const eventsConfig = {
    title: ATTORNEY_ACCORDIONS_BLOGS_TITLES.events,
    queryParams: 'events-page',
    actionKey: 'events',
    params: {
      authorId,
      categoryId: 99,
      currentPage: router?.query?.['events-page'] || 1,
      itemsPerPage: 6,
    },
  };

  const eventsPostsPaginationData = getPaginationData(
    postsForPaginationByAuthorIdQuery,
    eventsConfig.params,
  );
  // Events section END

  // Lawyer Spotlight section START
  const layerSpotlightConfig = {
    title: ATTORNEY_ACCORDIONS_BLOGS_TITLES.lawyerSpotlight,
    queryParams: 'lawyer-spotlight-page',
    actionKey: 'lawyer-spotlight',
    params: {
      authorId,
      categoryId: 30518,
      currentPage: router?.query?.['lawyer-spotlight-page'] || 1,
      itemsPerPage: 6,
    },
  };

  const layerSpotlightPostsPaginationData = getPaginationData(
    postsForPaginationByAuthorIdQuery,
    layerSpotlightConfig.params,
  );
  // Lawyer Spotlight section END

  const openAccordion = useCallback((key) => {
    setActiveAccordion((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }, []);

  return (
    <ProfileAccordionWrapper>
      <ContainerDefault>
        <ProfileAccordionHolder>
          <Accordion
            as="ul"
            activeKey={activeAccordion}
            onSelect={openAccordion}
          >
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
              layerSpotlightPostsPaginationData,
              layerSpotlightConfig,
              blogTitles,
              false,
              name,
            )}

            {renderBlogPosts(
              newsPressReleasesPaginationData,
              newsPressReleasesConfig,
              blogTitles,
              false,
              name,
            )}

            {renderBlogPosts(
              blogPostsPaginationData,
              blogConfig,
              blogTitles,
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

            {renderBlogPosts(
              eventsPostsPaginationData,
              eventsConfig,
              blogTitles,
              true,
              name,
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
