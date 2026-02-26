import BasicSiteHead from 'components/shared/head/BasicSiteHead';
import SubHeaderDefault from 'layouts/SubHeader/SubHeaderDefault';
import { FIRM_PAGES, SIDEBAR_POLITIC_LINKS } from 'utils/constants';
import { ContainerDefault } from 'styles/Containers.style';
import empty from 'is-empty';
import ContentSection from 'components/molecules/ContentSection';
import { BasicPageContentHolder } from 'styles/BasicPage.style';
import SubHeaderMenu from 'layouts/SubHeader/SubHeaderMenu';
import { Title20 } from 'styles/common/Typography.style';

const BasicPageContent = ({
  sections,
  canonicalUrl,
  seo,
  title,
  description,
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
    />
    <SubHeaderDefault
      title={title}
      subtitle={description}
      backgroundImage={subHeaderImage}
      RightContentComponent={SubHeaderMenu}
      rightContentProps={{
        menu: canonicalUrl.includes('work-life-integration')
          ? FIRM_PAGES
          : SIDEBAR_POLITIC_LINKS,
      }}
    />
    <ContainerDefault as="section">
      <BasicPageContentHolder as="div">
        {!empty(sections)
          && sections?.map(({ title, content, link }, index) => (
            <ContentSection
              key={`${index + 1}-basic-page-section`}
              title={title}
              content={content}
              link={link}
              TitleComponent={Title20}
              contentGap="8px"
            />
          ))}
      </BasicPageContentHolder>
    </ContainerDefault>
  </>
);

export default BasicPageContent;
