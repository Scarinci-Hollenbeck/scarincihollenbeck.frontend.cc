import ProfileContent from 'components/organisms/attorney/ProfileContent';
import MemorialHeader from 'components/organisms/memorials/MemorialHeader';
import PersonSiteHead from 'components/shared/head/PersonSiteHead';
import { CURRENT_DOMAIN } from 'utils/constants';

const MemorialPage = ({ seo, pageData, breadcrumbs }) => {
  const {
    name, image, additionalInfo, title, description, born, death,
  } = pageData;

  return (
    <>
      <PersonSiteHead
        title={seo?.title}
        metaDescription={seo?.metaDescription}
        canonicalUrl={`${CURRENT_DOMAIN}/${seo.canonicalLink}`}
        name={name}
        featuredImage={seo.image}
        breadcrumbs={breadcrumbs}
      />
      <MemorialHeader
        name={name}
        profileImage={image}
        born={born}
        death={death}
      />

      <ProfileContent
        profileContent={{
          attorneyBiographyTitle: title,
          attorneyBiography: description,
        }}
        asideItems={{ additionalInfo }}
      />
    </>
  );
};

export default MemorialPage;
