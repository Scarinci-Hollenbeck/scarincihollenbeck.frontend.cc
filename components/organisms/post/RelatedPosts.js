import empty from 'is-empty';
import SectionHeader from 'components/atoms/SectionHeader';
import DisclaimerText from 'components/atoms/DisclaimerText';
import { RelatedPostsContainer } from '../../../styles/Post/RelatedPosts.style';
import RelatedPostsSlider from './RelatedPostsSlider';

const RelatedPosts = ({
  posts,
  title = 'Related Posts',
  link = '/library',
}) => {
  if (empty(posts)) return null;

  return (
    <RelatedPostsContainer>
      <SectionHeader title={title} link={link} linkText="See all" />
      <RelatedPostsSlider items={posts} />
      <DisclaimerText
        text="No Aspect of the advertisement has been approved by the Supreme Court.
        Results may vary depending on your particular facts and legal
        circumstances."
      />
    </RelatedPostsContainer>
  );
};

export default RelatedPosts;
