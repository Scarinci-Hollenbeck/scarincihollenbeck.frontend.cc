import DisclaimerText from 'components/atoms/DisclaimerText';
import AccordionItem from 'components/molecules/attorney/AccordionItem';
import { Fragment } from 'react';
import { Accordion } from 'react-bootstrap';
import {
  AccordionNewsList,
  ProfileAccordionBody,
  ProfileAccordionHolder,
  ProfileAccordionWrapper,
} from 'styles/attorney-page/ProfileAccordion.style';
import { ContainerDefault } from 'styles/Containers.style';
import empty from 'is-empty';
import Link from 'next/link';
import ProfileClients from 'components/molecules/attorney/ProfileClients';
import dynamic from 'next/dynamic';
import { formatSrcToCloudinaryUrl } from 'utils/helpers';
import { StandardLightBlueButton } from 'styles/Buttons.style';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import SimpleNewsCard from '../../common/SimpleNewsCard';

const AwardsSlider = dynamic(
  () => import('components/molecules/home/AwardsSlider'),
  {
    ssr: false,
  },
);

const sanitizeAwardsForSlider = (awards) => {
  if (empty(awards)) return null;

  const formattedAwards = awards.map(
    ({
      awardImage, awardLink, awardTitle, year,
    }) => ({
      id: awardTitle,
      year,
      label: awardTitle,
      image: {
        src: formatSrcToCloudinaryUrl(awardImage.sourceUrl),
        alt: awardTitle,
        width: 200,
        height: 200,
      },
      link: awardLink,
    }),
  );

  return formattedAwards;
};

const ProfileAccordion = ({
  clients,
  awards,
  attorneyBiography,
  affiliations,
  additionalTabs,
  attorneyNewsAndArticles,
}) => {
  const sanitizedAwardsForSlider = sanitizeAwardsForSlider(awards);
  return (
    <ProfileAccordionWrapper>
      <ContainerDefault>
        <ProfileAccordionHolder>
          <Accordion as="ul">
            <ProfileClients clients={clients} />

            {!empty(sanitizedAwardsForSlider) && (
              <AccordionItem eventKey="1" title="Awards">
                <ProfileAccordionBody>
                  <StandardLightBlueButton as={Link} href="/awards">
                    Award Methodology
                  </StandardLightBlueButton>
                  <AwardsSlider
                    items={sanitizedAwardsForSlider}
                    isLightVariant
                  />
                </ProfileAccordionBody>
              </AccordionItem>
            )}

            {!empty(attorneyBiography?.biographyContent) && (
              <AccordionItem eventKey="2" title="Full Biography">
                <ProfileAccordionBody>
                  <JSXWithDynamicLinks
                    HTML={attorneyBiography?.biographyContent}
                  />
                </ProfileAccordionBody>
              </AccordionItem>
            )}

            {!empty(affiliations) && (
              <AccordionItem eventKey="3" title="Affiliations Area">
                <ProfileAccordionBody>
                  <JSXWithDynamicLinks HTML={affiliations} />
                </ProfileAccordionBody>
              </AccordionItem>
            )}
            {!empty(attorneyNewsAndArticles) && (
              <AccordionItem
                eventKey="news-and-press"
                title="News & Press Releases"
              >
                <AccordionNewsList>
                  {attorneyNewsAndArticles.map((article) => (
                    <Fragment key={article.databaseId}>
                      <SimpleNewsCard
                        link={article.uri}
                        title={article.title}
                        author={article.author}
                        date={article.date}
                      />
                    </Fragment>
                  ))}
                </AccordionNewsList>
              </AccordionItem>
            )}
          </Accordion>

          <DisclaimerText text="No Aspect of the advertisement has been approved by the Supreme Court. Results may vary depending on your particular facts and legal circumstances." />
        </ProfileAccordionHolder>
      </ContainerDefault>
    </ProfileAccordionWrapper>
  );
};

export default ProfileAccordion;
