import { useRouter } from 'next/router';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import { printScreen } from 'utils/helpers';
import { PRODUCTION_URL } from 'utils/constants';
import { FaEnvelope } from 'react-icons/fa';
import { BsFacebook, BsLinkedin, BsTwitterX } from 'react-icons/bs';
import { FaFilePdf } from 'react-icons/fa6';
import CopyUrl from 'components/atoms/CopyUrl';
import {
  ShareSocialBox,
  SocialHr,
  SocialLabel,
} from '../../../styles/library/SocialShare.style';

const SocialShare = ({
  title,
  isPrintBtn = false,
  isEmailShare = false,
  isCopyBtn = true,
  customClass,
  handlePrint,
}) => {
  const router = useRouter();
  const postUrl = `${PRODUCTION_URL}${router.asPath}`;

  return (
    <ShareSocialBox className={customClass}>
      <SocialHr />
      <SocialLabel>Share</SocialLabel>
      <FacebookShareButton url={postUrl} quote={title}>
        <BsFacebook className="faceBookBtn" />
      </FacebookShareButton>
      <TwitterShareButton url={postUrl} quote={title}>
        <BsTwitterX className="twitterBtn" />
      </TwitterShareButton>
      <LinkedinShareButton url={postUrl} quote={title}>
        <BsLinkedin className="linkedIn" />
      </LinkedinShareButton>
      {isEmailShare && (
        <EmailShareButton subject={title} body={postUrl} separator="">
          <FaEnvelope />
        </EmailShareButton>
      )}
      {isPrintBtn && (
        <button
          aria-label="print"
          onClick={handlePrint ? () => handlePrint() : () => printScreen()}
          className="print-button"
        >
          <FaFilePdf />
        </button>
      )}
      {isCopyBtn && <CopyUrl />}
    </ShareSocialBox>
  );
};

export default SocialShare;
