import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import PageSchemaMarkup from 'components/shared/head/PageSchemaMarkup';
import { useMemo } from 'react';
import empty from 'is-empty';
import dynamic from 'next/dynamic';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import PracticeContent from 'components/organisms/practices/PracticeContent';
import PracticePrintPage from 'components/organisms/practices/PracticePrintPage';
import usePrintLogic from 'hooks/usePrintLogic';
import SubHeaderKeyContacts from 'layouts/SubHeader/SubHeaderKeyContacts';
import { DEFAULT_SCHEMA_FAQ } from 'utils/constants';

const PracticeAnchors = dynamic(() => import('components/organisms/practices/PracticeAnchors'));
const PracticeAttorneys = dynamic(() => import('components/organisms/practices/PracticeAttorneys'));
const WhyChooseUs = dynamic(() => import('components/organisms/practices/WhyChooseUs'));
const WhatWeDoSection = dynamic(() => import('components/organisms/home/WhatWeDoSection'));
const Awards = dynamic(() => import('components/organisms/home/Awards'));
const LatestPostsSection = dynamic(() => import('components/organisms/home/LatestPostsSection'));

const anchorDataDefault = {
  faq: {
    id: 'faq-section',
    title: 'FAQs',
  },
  awards: {
    id: 'awards-section',
    title: 'Awards',
  },
  attorneys: {
    id: 'attorneys-section',
    title: 'Attorneys',
  },
  posts: {
    id: 'posts-section',
    title: 'Posts',
  },
  whyChooseUs: {
    id: 'why-choose-us-section',
    title: 'Why choose us',
  },
  whatWeDo: {
    id: 'What-we-do',
    title: 'What we do',
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
  awards,
  sidebarContent,
  posts,
  breadcrumbs,
  webPageData,
  pageSchemaJsonLd,
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
    return {
      ...copyAnchorData,
      ...updatedAnchorData,
    };
  }, [awards, tabs, posts, anchorDataDefault]);

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
        breadcrumbs={breadcrumbs}
        faqData={!empty(faq) ? faq : DEFAULT_SCHEMA_FAQ}
        webPageData={webPageData}
        serviceSchemaData={{
          name: practice?.title,
          description: practice?.seo?.metaDesc,
          url: canonicalUrl,
        }}
      />
      <PageSchemaMarkup schemaJson={pageSchemaJsonLd} />
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
          sidebarContent={sidebarContent}
        />
        <Awards anchorId={anchorData?.awards?.id} awards={awards} />

        <PracticeAttorneys
          attorneys={attorneyListPractice}
          chairs={chairPractice}
          anchorId={anchorData.attorneys.id}
        />
        <LatestPostsSection
          title="Read more about this practice in our library"
          posts={posts}
          anchorId={anchorData?.posts?.id}
        />
        <WhyChooseUs
          anchorId={anchorData.whyChooseUs.id}
          data={whyChooseUsData}
        />
        <WhatWeDoSection
          practices={practices}
          anchorId={anchorData.whatWeDo.id}
        />
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
