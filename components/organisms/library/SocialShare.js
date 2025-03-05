import { useRouter } from 'next/router';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import Button from 'react-bootstrap/Button';
import { printScreen } from 'utils/helpers';
import { PRODUCTION_URL } from 'utils/constants';
import { FaEnvelope } from 'react-icons/fa';
import {
  BsFacebook,
  BsFillPrinterFill,
  BsLinkedin,
  BsTwitterX,
} from 'react-icons/bs';
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
      {isPrintBtn
        && (handlePrint ? (
          <button
            aria-label="print"
            onClick={handlePrint}
            className="print-button"
          >
            <FaFilePdf />
          </button>
        ) : (
          <Button
            variant="link"
            className="m-0 p-0 text-dark"
            aria-label="Print Page"
            onClick={() => printScreen()}
          >
            <BsFillPrinterFill />
          </Button>
        ))}
      {isCopyBtn && <CopyUrl />}
    </ShareSocialBox>
  );
};

export default SocialShare;
