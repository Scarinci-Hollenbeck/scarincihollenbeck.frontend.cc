import Link from 'next/link';
import { SITE_PHONE, SITE_EMAIL } from 'utils/constants';
import textStyles from 'styles/Text.module.css';

const TopNavLinks = () => (
  <>
    <Link href="/subscribe">
      <a className={`ml-2 ${textStyles.btn}`}>Join our mailing list</a>
    </Link>
    <a
      href="https://secure.lawpay.com/pages/scarincihollenbeck/operating"
      target="_blank"
      rel="noreferrer"
      className={`ml-2 ${textStyles.btn}`}
    >
      Make payment
    </a>
  </>
);

export default TopNavLinks;
