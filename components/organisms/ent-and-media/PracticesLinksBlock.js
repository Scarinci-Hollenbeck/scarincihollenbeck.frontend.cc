import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ContainerDefault } from 'styles/Containers.style';
import {
  PracticesContent,
  PracticesImage,
  PracticesLinks,
  PracticesPreview,
  PracticesSection,
  PracticesTitle,
} from 'styles/practices-special-style/ent-adn-media/PracticesLinksBlock';

const PracticesLinksBlock = ({
  practices,
  practicesFooterImage,
  practicesListTitle,
}) => (
  <PracticesSection>
    <ContainerDefault>
      <PracticesContent>
        <PracticesPreview>
          <PracticesTitle>{practicesListTitle}</PracticesTitle>
          <PracticesImage>
            <Image
              src={practicesFooterImage?.sourceUrl}
              alt={practicesFooterImage?.title}
              width={practicesFooterImage?.mediaDetails.width}
              height={practicesFooterImage?.mediaDetails.height}
            />
          </PracticesImage>
        </PracticesPreview>
        <PracticesLinks>
          {practices.map(({ databaseId, title, uri }) => (
            <li key={databaseId}>
              <Link href={uri}>{title}</Link>
            </li>
          ))}
        </PracticesLinks>
      </PracticesContent>
    </ContainerDefault>
  </PracticesSection>
);

export default PracticesLinksBlock;
