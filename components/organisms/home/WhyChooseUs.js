import { Fragment } from 'react';
import empty from 'is-empty';
import {
  ArticleBlock,
  ArticleBoxSimple,
  ArticleList,
  FocusedServicesCards,
  WhyChooseUsHolder,
  WhyChooseUsSection,
  WhyChooseUsTitle,
} from '../../../styles/home-page/WhyChooseUs.style';
import { JSXWithDynamicLinks } from '../../atoms/micro-templates/JSXWithDynamicLinks';
import CheckIcon from '../../common/icons/CheckIcon';
import FocusedCard from '../../atoms/FocusedCard';
import { ContainerDefault } from '../../../styles/Containers.style';

const WhyChooseUs = ({ content }) => {
  const {
    title, article, serviceList, focusedServicesCards,
  } = content || {};
  return (
    <WhyChooseUsSection>
      <ContainerDefault className="d-flex">
        <WhyChooseUsHolder>
          <ArticleBlock>
            <ArticleBoxSimple>
              <WhyChooseUsTitle>{title}</WhyChooseUsTitle>
              {!empty(article) && <JSXWithDynamicLinks HTML={article} />}
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
        </WhyChooseUsHolder>
      </ContainerDefault>
    </WhyChooseUsSection>
  );
};

export default WhyChooseUs;
