import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import { useMemo } from 'react';
import empty from 'is-empty';
import dynamic from 'next/dynamic';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import PracticeContent from 'components/organisms/practices/PracticeContent';
import AnchorTop from 'components/atoms/AnchorTop';
import PracticePrintPage from 'components/organisms/practices/PracticePrintPage';
import usePrintLogic from 'hooks/usePrintLogic';
import SubHeaderKeyContacts from 'layouts/SubHeader/SubHeaderKeyContacts';

const PracticeAnchors = dynamic(() => import('components/organisms/practices/PracticeAnchors'));
const PracticeAttorneys = dynamic(() => import('components/organisms/practices/PracticeAttorneys'));
const WhyChooseUs = dynamic(() => import('components/organisms/practices/WhyChooseUs'));
const WhatWeDoSection = dynamic(() => import('components/organisms/home/WhatWeDoSection'));
const Awards = dynamic(() => import('components/organisms/home/Awards'));
const LatestPostsSection = dynamic(() => import('components/organisms/home/LatestPostsSection'));
// const GoogleReviews = dynamic(() => import('components/organisms/common/GoogleReviews'));

const anchorDataDefault = {
  faq: {
    id: 'faq-section',
    title: 'FAQs',
  },
  awards: {
    id: 'awards-section',
    title: 'Awards',
  },
  posts: {
    id: 'posts-section',
    title: 'Posts',
  },
  attorneys: {
    id: 'attorneys-section',
    title: 'Attorneys',
  },
  whyChooseUs: {
    id: 'why-choose-us-section',
    title: 'Why choose us',
  },
  whatWeDo: {
    id: 'What-we-do',
    title: 'What we do',
  },
  googleReviews: {
    id: 'reviews-section',
    title: 'Reviews',
  },
};

const PracticePageNew = ({
  practice,
  canonicalUrl,
  attorneysSchemaData,
  keyContactsList,
  tabs,
  chairPractice,
  attorneyListPractice,
  faq,
  whyChooseUsData,
  practices,
  googleReviews,
  awards,
  posts,
}) => {
  const anchorData = useMemo(() => {
    let updatedAnchorData = {};
    const copyAnchorData = { ...anchorDataDefault };

    if (!empty(tabs)) {
      tabs?.forEach(
        (tab) => (updatedAnchorData = {
          ...updatedAnchorData,
          [tab.id]: {
            id: `${tab.id}-section`,
            title: tab.title,
          },
        }),
      );
    }

    if (empty(awards)) {
      delete copyAnchorData.awards;
    }

    if (empty(posts)) {
      delete copyAnchorData.posts;
    }

    if (empty(googleReviews)) {
      delete copyAnchorData.googleReviews;
    }

    return {
      ...copyAnchorData,
      ...updatedAnchorData,
    };
  }, [googleReviews, awards, tabs, posts, anchorDataDefault]);

  const printPageProps = {
    title: practice?.title,
    subtitle: practice?.practicesIncluded.description,
    keyContacts: keyContactsList,
    contentSection: practice?.practicesIncluded?.contentSection,
    whyChooseUsData,
    faqData: faq,
    awards,
  };

  const { isRenderPdf, setIsPrintReady, handlePrint } = usePrintLogic();

  return (
    <>
      <BasicSiteHead
        title={practice?.seo?.title}
        metaDescription={practice?.seo?.metaDesc}
        canonicalUrl={canonicalUrl}
        personDataForSchema={attorneysSchemaData}
      />
      <div className="d-print-none">
        <SubHeaderDefault
          title={practice?.title}
          subtitle={practice?.practicesIncluded.description}
          backgroundImage={
            practice?.practicesIncluded?.practiceImage?.sourceUrl
          }
          RightContentComponent={SubHeaderKeyContacts}
          rightContentProps={{
            keyContacts: keyContactsList,
            handlePrint,
            printButtonText: 'Print practice page',
          }}
        />
        <PracticeAnchors anchorData={anchorData} title={practice?.title} />
        <PracticeContent
          data={tabs}
          title={practice?.title}
          anchorId={anchorData.overview?.id}
          anchorIdFaq={anchorData.faq.id}
          faqData={faq}
          handlePrint={handlePrint}
        />
        <Awards anchorId={anchorData?.awards?.id} awards={awards} />

        <LatestPostsSection
          title="Read more about this practice in our library"
          posts={posts}
          anchorId={anchorData?.posts?.id}
        />

        <PracticeAttorneys
          attorneys={attorneyListPractice}
          chairs={chairPractice}
          anchorId={anchorData.attorneys.id}
        />
        <WhyChooseUs
          anchorId={anchorData.whyChooseUs.id}
          data={whyChooseUsData}
        />
        <WhatWeDoSection
          practices={practices}
          anchorId={anchorData.whatWeDo.id}
        />
        {/* {!empty(googleReviews) && (
          <GoogleReviews
            reviews={googleReviews}
            anchorId={anchorData?.googleReviews?.id}
          />
        )} */}
        <AnchorTop />
      </div>

      {isRenderPdf && (
        <PracticePrintPage
          {...printPageProps}
          onReady={() => setIsPrintReady(true)}
        />
      )}
    </>
  );
};

export default PracticePageNew;
