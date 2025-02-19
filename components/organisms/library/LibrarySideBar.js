import Link from 'next/link';
import { FacebookShareButton, LinkedinShareButton } from 'react-share';
import { BsFacebook, BsLinkedin } from 'react-icons/bs';
import PopularList from './PopularList';
import { CLIENT_ALERTS, SOCIAL_MEDIA_LINKS } from '../../../utils/constants';
import { SideBarContainer } from '../../../styles/LibraryArticles.style';
import { ShareSocialBox } from '../../../styles/Post/SocialShare.style';

const LibrarySideBar = ({
  isAuthor,
  profileUrl,
  childrenOfCurrentCategory,
  popularCategories,
}) => (
  <SideBarContainer>
    <ShareSocialBox>
      <h4>Follow us:</h4>
      <hr className="second-hr" />
      <FacebookShareButton
        url={SOCIAL_MEDIA_LINKS[1].url}
        quote={SOCIAL_MEDIA_LINKS[1].label}
      >
        <BsFacebook className="faceBookBtn" />
      </FacebookShareButton>
      <LinkedinShareButton
        url={SOCIAL_MEDIA_LINKS[0].url}
        quote={SOCIAL_MEDIA_LINKS[1].label}
      >
        <BsLinkedin className="linkedIn" />
      </LinkedinShareButton>
    </ShareSocialBox>
    {isAuthor && profileUrl && (
      <Link
        data-testid="link-to-profile"
        className="mb-3"
        href={profileUrl}
        passHref
      >
        <strong>
          <u>Visit Attorney&apos;s Profile</u>
          {' '}
          &raquo;
        </strong>
      </Link>
    )}
    {childrenOfCurrentCategory.length > 0 && (
      <PopularList term="Related Categories" list={childrenOfCurrentCategory} />
    )}
    <PopularList term="Popular Categories" list={popularCategories} />
    <PopularList term="Client Alerts" list={CLIENT_ALERTS} />
  </SideBarContainer>
);

export default LibrarySideBar;
