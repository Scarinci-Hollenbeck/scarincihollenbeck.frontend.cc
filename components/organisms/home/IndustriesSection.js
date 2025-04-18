import React from 'react';
import {
  IndustriesCards,
  IndustriesHeader,
  IndustriesHolder,
  IndustriesWrapper,
} from 'styles/Industries.style';
import { globalColor } from 'styles/global_styles/Global.styles';
import { ContainerDefault } from 'styles/Containers.style';
import SeparatedTitle from 'components/common/SeparatedTitle';
import empty from 'is-empty';
import { getIndustryLink } from 'utils/helpers';
import { UnderlinedLink } from 'styles/common/Typography.style';
import IndustriesCard from './IndustriesCard';

const IndustriesSection = ({
  title, subtitle, link, industries,
}) => {
  if (empty(industries)) return null;
  return (
    <IndustriesWrapper>
      <ContainerDefault>
        <IndustriesHolder>
          <IndustriesHeader>
            <SeparatedTitle
              separatorSize={24}
              separatorColor={globalColor.blue.skyBlue}
              title={title}
            />

            <p>{subtitle}</p>
          </IndustriesHeader>

          <IndustriesCards>
            {industries.map((item, index) => (
              <IndustriesCard
                key={item?.databaseId}
                title={item?.title}
                description={item?.industryContent?.description}
                icon={item?.industryContent?.industryIcon?.selectedIcon}
                image={
                  item?.industryContent?.industryIcon?.uploadedIcon?.sourceUrl
                }
                link={getIndustryLink(item?.uri, null)}
              />
            ))}
          </IndustriesCards>
          <UnderlinedLink href={link?.url || '/services'}>
            {link?.title || 'View all services'}
          </UnderlinedLink>
        </IndustriesHolder>
      </ContainerDefault>
    </IndustriesWrapper>
  );
};

export default IndustriesSection;
