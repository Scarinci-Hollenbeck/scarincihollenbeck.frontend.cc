import dynamic from 'next/dynamic';
import { ContainerContent } from 'styles/practices-special-style/commonForSpecial.style';
import { ArticlesSection } from 'styles/practices-special-style/ent-adn-media/ArticlesBlock.style';
import {
  LinkToCategory,
  PostsBox,
  TitleButtonBox,
} from '../../../styles/practices-special-style/ArticlesBlock.style';

const PostList = dynamic(import('components/molecules/PostList'));

const ArticlesBlock = ({ paginationData }) => (
  <ArticlesSection>
    <ContainerContent>
      <TitleButtonBox>
        <h3>Related Articles</h3>
        <LinkToCategory href="/library/category/entertainment-and-sports">
          Read more
        </LinkToCategory>
      </TitleButtonBox>
      <PostsBox>
        <PostList
          classNameForCard="entertainment-news"
          content={paginationData}
          isProfile="true"
          isVertical="true"
          justArrow
        />
      </PostsBox>
    </ContainerContent>
  </ArticlesSection>
);

export default ArticlesBlock;
