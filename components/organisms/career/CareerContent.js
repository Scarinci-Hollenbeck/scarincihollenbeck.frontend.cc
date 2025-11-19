import BackArrow from 'components/atoms/BackArrow';
import CareerForm from 'components/shared/forms/CareerForm';
import {
  ArticleContent,
  ArticleContentHolder,
  ArticleContentSections,
  ArticleContentSidebar,
} from 'styles/Article.style';
import { ContainerDefault } from 'styles/Containers.style';
import ContentSection from 'components/molecules/ContentSection';
import empty from 'is-empty';
import { Title20 } from 'styles/common/Typography.style';
import SubscriptionSidebar from '../common/SubscriptionSidebar';
import CareerHeader from './CareerHeader';

const CareerContent = ({ sections, locations, duration }) => (
  <ArticleContent>
    <ContainerDefault>
      <ArticleContentHolder>
        <ArticleContentSections>
          <BackArrow href="/careers" />
          <CareerHeader locations={locations} duration={duration} />
          {!empty(sections)
            && sections?.map(({ title, content, link }) => (
              <ContentSection
                key={title}
                title={title}
                content={content}
                link={link}
                TitleComponent={Title20}
                contentGap="8px"
              />
            ))}
          <CareerForm />
        </ArticleContentSections>
        <ArticleContentSidebar>
          <SubscriptionSidebar isFirmLinks />
        </ArticleContentSidebar>
      </ArticleContentHolder>
    </ContainerDefault>
  </ArticleContent>
);

export default CareerContent;
