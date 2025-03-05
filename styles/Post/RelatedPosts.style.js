import styled from 'styled-components';
import { ContainerDefault } from 'styles/Containers.style';
import { sectionPadding } from 'styles/Article.style';

export const RelatedPostsContainer = styled(ContainerDefault)`
  ${sectionPadding};
  display: flex;
  flex-direction: column;
  gap: 24px;

  .disclaimer {
    margin: 0;
    text-align: center;
  }
`;

export const RelatedPostsSliderWrapper = styled.div`
  .slide {
    > article {
      height: 100%;
    }
  }
`;
