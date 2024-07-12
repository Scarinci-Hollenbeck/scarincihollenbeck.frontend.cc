import { Fragment } from 'react';
import empty from 'is-empty';
import {
  ArticleBlock,
  ArticleBoxSimple,
  ArticleList,
  FocusedServicesCards,
  WhyChooseUsSection,
} from '../../../styles/home-page/WhyChooseUs.style';
import { JSXWithDynamicLinks } from '../../atoms/micro-templates/JSXWithDynamicLinks';
import CheckIcon from '../../common/icons/CheckIcon';
import FocusedCard from '../../atoms/FocusedCard';
import { ContainerDefault } from '../../../styles/Containers.style';

const WhyChooseUs = ({ content }) => {
  const {
    title, article, serviceList, focusedServicesCards,
  } = content;
  return (
    <WhyChooseUsSection>
      <ContainerDefault className="d-flex">
        <ArticleBlock>
          <ArticleBoxSimple>
            <h3>{title}</h3>
            <JSXWithDynamicLinks HTML={article} />
          </ArticleBoxSimple>
          {!empty(serviceList) && (
            <ArticleList>
              {serviceList.map(({ service }, idx) => (
                <li key={idx++}>
                  <CheckIcon />
                  <p>{service}</p>
                </li>
              ))}
            </ArticleList>
          )}
        </ArticleBlock>
        {!empty(focusedServicesCards) && (
          <FocusedServicesCards>
            {focusedServicesCards.map(({ title, icon, text }) => (
              <li key={title}>
                <FocusedCard title={title} icon={icon} text={text} />
              </li>
            ))}
          </FocusedServicesCards>
        )}
      </ContainerDefault>
    </WhyChooseUsSection>
  );
};

export default WhyChooseUs;