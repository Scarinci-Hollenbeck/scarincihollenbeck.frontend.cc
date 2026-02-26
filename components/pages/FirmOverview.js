import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import NonFiltered from 'components/molecules/attorneys/NonFiltered';
import { ContainerDefault } from 'styles/Containers.style';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import { FIRM_PAGES } from 'utils/constants';
import empty from 'is-empty';
import {
  FirmOverviewWrapper,
  FirmOverviewContentContainer,
  KeyPointsWrapper,
} from 'styles/FirmOverview.style';
import ContentSection from 'components/molecules/ContentSection';
import dynamic from 'next/dynamic';
import SubHeaderMenu from 'layouts/SubHeader/SubHeaderMenu';
import { Title20 } from 'styles/common/Typography.style';

const WhyChooseUs = dynamic(() => import('components/organisms/practices/WhyChooseUs'));

const FirmOverviewPage = ({
  title,
  seo,
  canonicalUrl,
  sections,
  description,
  firmOverviewTabs,
  firmMembers,
  subHeaderImage,
  breadcrumbs,
  webPageData,
}) => (
  <>
    <BasicSiteHead
      title={seo.title}
      metaDescription={seo.metaDesc}
      canonicalUrl={canonicalUrl}
      breadcrumbs={breadcrumbs}
      webPageData={webPageData}
      includeOrganizationSchema
    />
    <SubHeaderDefault
      title={title}
      subtitle={description}
      backgroundImage={subHeaderImage}
      RightContentComponent={SubHeaderMenu}
      rightContentProps={{ menu: FIRM_PAGES }}
    />
    <FirmOverviewWrapper>
      <ContainerDefault>
        <FirmOverviewContentContainer>
          {!empty(sections) && !empty(sections[0]) && (
            <ContentSection
              title={sections[0].title}
              content={sections[0].content}
              link={sections[0].link}
              isTwoColumns
              TitleComponent={Title20}
              contentGap="8px"
            />
          )}

          <KeyPointsWrapper>
            {sections?.length > 1
              && sections
                .slice(1)
                .map(({ title, content, link }, index) => (
                  <ContentSection
                    key={`${index + 1}-firm-overview-content`}
                    title={title}
                    content={content}
                    link={link}
                    TitleComponent={Title20}
                    contentGap="8px"
                  />
                ))}
          </KeyPointsWrapper>
        </FirmOverviewContentContainer>
      </ContainerDefault>

      <ContainerDefault>
        <NonFiltered attorneys={firmMembers} isVertical />
      </ContainerDefault>

      {!empty(firmOverviewTabs) && (
        <WhyChooseUs
          data={firmOverviewTabs.additionalContent}
          isHideImage
          isSectionTitle={false}
        />
      )}
    </FirmOverviewWrapper>
  </>
);

export default FirmOverviewPage;
