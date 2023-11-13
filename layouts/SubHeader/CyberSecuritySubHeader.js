import ScrollDownSwitch from 'components/molecules/subheader/ScrollDownSwitch';
import SmallRoundPhotos from 'components/molecules/subheader/SmallRoundPhotos';
import PostBreadCrumbs from 'components/organisms/post/PostBreadcrumbs';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { ContainerContent } from 'styles/practices-special-style/commonForSpecial.style';
import {
  CyberSecuritySubHeaderBg,
  CyberSecuritySubHeaderContent,
  CyberSecuritySubHeaderFooter,
  CyberSecuritySubHeaderSection,
  CyberSecuritySubHeaderText,
  CyberSecuritySubHeaderTitle,
} from 'styles/practices-special-style/cyber-security/CyberSecuritySubHeader.style';

const CyberSecuritySubHeader = ({
  title, subtitle, backgroundGif, subHeaderBgLogo, attorneyListPractice,
}) => {
  const photos = [];

  attorneyListPractice.forEach(({ profileImage }) => {
    if (profileImage) {
      photos.push(profileImage);
    }
  }, []);

  return (
    <CyberSecuritySubHeaderSection backgroundGif={backgroundGif}>
      <CyberSecuritySubHeaderBg>
        <Image src={backgroundGif} alt="bg" width={1920} height={1080} />
      </CyberSecuritySubHeaderBg>
      <ContainerContent>
        <PostBreadCrumbs />
        <CyberSecuritySubHeaderContent subHeaderBgLogo={subHeaderBgLogo}>
          <CyberSecuritySubHeaderTitle>
            <h1>{title}</h1>
            <Image src={subHeaderBgLogo} alt="arrow" width={260} height={260} />
          </CyberSecuritySubHeaderTitle>

          <CyberSecuritySubHeaderText>
            {subtitle.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </CyberSecuritySubHeaderText>
        </CyberSecuritySubHeaderContent>
        <CyberSecuritySubHeaderFooter>
          <SmallRoundPhotos attorneyListPractice={attorneyListPractice} photos={photos} maxPhotos={4} />
          <ScrollDownSwitch />
        </CyberSecuritySubHeaderFooter>
      </ContainerContent>
    </CyberSecuritySubHeaderSection>
  );
};
export default CyberSecuritySubHeader;
