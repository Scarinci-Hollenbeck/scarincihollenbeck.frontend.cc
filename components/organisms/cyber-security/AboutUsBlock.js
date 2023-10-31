import AttorneyCard from 'components/shared/AttorneyCard';
import Image from 'next/image';
import React, { Fragment, useId, useState } from 'react';

import { ContainerContent } from 'styles/practices-special-style/commonForSpecial.style';
import {
  AboutUsImage,
  AboutUsInfoItem,
  AboutUsInfoItems,
  AboutUsListDescription,
  AboutUsHeader,
  AboutUsListItem,
  AboutUsListItemNumber,
  AboutUsListItems,
  AboutUsHeaderLogo,
  AboutUsSection,
  AboutUsSidebar,
  AboutUsTitle,
  AboutUsList,
  AboutUsSidebarAttorneys,
  WhoWeAre,
  WhatWeDo,
  AboutUsSidebarAttorneysHeader,
  AboutUsSidebarAttorneysHeaderBtns,
  AboutUsSidebarAttorneysHeaderBtn,
} from 'styles/practices-special-style/cyber-security/AboutUsBlock.style';
import { AnimatePresence, motion } from 'framer-motion';

const AboutUsBlock = ({
  aboutUsContent,
  attorneyListPractice,
  chairPractice,
  maxAttorneys,
}) => {
  const {
    title, title2, infoItems, image, listInfo, listItems,
  } = aboutUsContent;
  const [countVisibleAttorneys, setCountVisibleAttorneys] = useState(maxAttorneys);

  const handleShowAll = () => {
    setCountVisibleAttorneys(attorneyListPractice.length);
  };

  const handleShowLess = () => {
    setCountVisibleAttorneys(maxAttorneys);
  };
  return (
    <AboutUsSection>
      <ContainerContent>
        <WhoWeAre>
          <AboutUsTitle>
            <div className="bage">Safeguarding Your Business</div>
            <h2>{title}</h2>
          </AboutUsTitle>
          <AboutUsInfoItems>
            {infoItems.map((infoItem, index) => (
              <AboutUsInfoItem key={infoItem.id}>
                <div>{`00${index + 1}`}</div>
                <h4>{infoItem.title}</h4>
                <p>{infoItem.description}</p>
                <a href="#">See more</a>
              </AboutUsInfoItem>
            ))}
          </AboutUsInfoItems>
          <AboutUsImage>
            <Image
              src={image.sourceUrl}
              alt={image.altText}
              width={image.width}
              height={image.height}
            />
          </AboutUsImage>
        </WhoWeAre>
        <WhatWeDo>
          <AboutUsHeader>
            <AboutUsTitle>
              <div className="bage">Safeguarding Your Business</div>
              <h2>{title2}</h2>
            </AboutUsTitle>
            <AboutUsHeaderLogo>
              <Image
                src="/images/whoWeAreLogo.png"
                alt="logo"
                width={150}
                height={150}
              />
            </AboutUsHeaderLogo>
          </AboutUsHeader>
          <AboutUsList>
            <AboutUsListDescription>{listInfo}</AboutUsListDescription>
            <AboutUsListItems>
              {listItems.map((listItem, index) => (
                <AboutUsListItem key={useId()}>
                  <AboutUsListItemNumber>
                    {index + 1 < 10
                      ? `00${index + 1}`
                      : index + 1 < 100
                        ? `0${index + 1}`
                        : index + 1}
                  </AboutUsListItemNumber>
                  {listItem}
                </AboutUsListItem>
              ))}
            </AboutUsListItems>
          </AboutUsList>
        </WhatWeDo>

        <AboutUsSidebar>
          <h3>Chair</h3>
          <AboutUsSidebarAttorneys>
            {chairPractice.map((chairPractice, index) => (
              <AttorneyCard
                key={chairPractice.databaseId}
                link={chairPractice.uri || chairPractice.link}
                name={chairPractice.display_name || chairPractice.title}
                designation={chairPractice.designation}
                image={chairPractice.profileImage}
                number={chairPractice.phoneNumber}
                email={chairPractice.email}
              />
            ))}
          </AboutUsSidebarAttorneys>
          <AboutUsSidebarAttorneysHeader>
            <h3>{`Attorneys (${attorneyListPractice.length})`}</h3>
            <AboutUsSidebarAttorneysHeaderBtns>
              <AboutUsSidebarAttorneysHeaderBtn
                onClick={handleShowLess}
              />
              <AboutUsSidebarAttorneysHeaderBtn
                onClick={handleShowAll}
                className="down"
              />
            </AboutUsSidebarAttorneysHeaderBtns>
          </AboutUsSidebarAttorneysHeader>

          <AboutUsSidebarAttorneys>
            <AnimatePresence>
              {attorneyListPractice.slice(0, countVisibleAttorneys).map((attorney, index) => (
                <motion.div
                  key={attorney.databaseId}
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AttorneyCard
                    link={attorney.uri || attorney.link}
                    name={attorney.display_name || attorney.title}
                    designation={attorney.designation}
                    image={attorney.profileImage}
                    number={attorney.phoneNumber}
                    email={attorney.email}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </AboutUsSidebarAttorneys>
        </AboutUsSidebar>
      </ContainerContent>
    </AboutUsSection>
  );
};

export default AboutUsBlock;
