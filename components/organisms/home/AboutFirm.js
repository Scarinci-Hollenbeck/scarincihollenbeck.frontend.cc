import {
  AboutBlock,
  AboutBlocks,
  AboutCard,
  AboutCardContent,
  AboutCardDescription,
  AboutCardImage,
  AboutCardTitle,
  AboutDescription,
  AboutSection,
  AboutTitle,
} from 'styles/AboutFirm.style';
import { ContainerDefault } from 'styles/Containers.style';
import Image from 'next/image';
import LogoSeparator from 'components/common/LogoSeparator';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';

const AboutFirm = ({
  title,
  heroProfileLink = '/attorneys',
  aboutHero,
  arcticle,
  heroPhoto,
}) => (
  <AboutSection data-testid="who-we-are">
    <ContainerDefault>
      <AboutBlocks>
        <AboutBlock>
          <AboutTitle>{title}</AboutTitle>
          <AboutDescription>
            <JSXWithDynamicLinks HTML={arcticle} />
          </AboutDescription>
        </AboutBlock>
        <LogoSeparator />
        <AboutBlock>
          <AboutCard>
            <AboutCardImage>
              <Image
                src={heroPhoto?.sourceUrl}
                width={280}
                height={420}
                alt={heroPhoto?.altText}
                sizes="(max-width: 576px) 100vw, 280px"
              />
            </AboutCardImage>
            <AboutCardContent>
              <AboutCardDescription>
                <JSXWithDynamicLinks HTML={aboutHero} />
              </AboutCardDescription>

              <AboutCardTitle href={heroProfileLink?.url}>
                {heroProfileLink?.title}
              </AboutCardTitle>
            </AboutCardContent>
          </AboutCard>
        </AboutBlock>
      </AboutBlocks>
    </ContainerDefault>
  </AboutSection>
);

export default AboutFirm;
