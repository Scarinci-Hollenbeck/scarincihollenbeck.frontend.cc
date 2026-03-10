import empty from 'is-empty';
import { getIcon } from 'utils/getIcon';
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
import FocusedCard from '../../atoms/FocusedCard';
import { ContainerDefault } from '../../../styles/Containers.style';

const WhyChooseUs = ({ content }) => {
  const {
    title, article, serviceList, focusedServicesCards,
  } = content || {};
  return (
    <WhyChooseUsSection data-testid="why-choose-us">
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
                    {getIcon('Check')}
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
