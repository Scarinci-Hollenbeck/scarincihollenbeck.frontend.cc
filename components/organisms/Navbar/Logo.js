import Image from 'next/image';
import { SITE_TITLE } from 'utils/constants';
import { CombinedLogo } from 'styles/SiteLogo.style';
import SHDiamond from '../../../public/images/sh-mini-diamond-PNG.svg';
import LogoLetters from '../../../public/images/lattersLogo.png';
import LogoLettersBlack from '../../../public/images/lettarsLogoblack.png';

const Logo = ({ whiteVariant, isPrint = false }) => (
  <>
    <CombinedLogo href="/" passHref>
      {isPrint ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="logo-diamond"
          alt={`${SITE_TITLE}, LLC`}
          width={32}
          height={32}
          src="/images/logo-diamond-print.png"
        />
      ) : (
        <Image
          className="logo-diamond"
          alt={`${SITE_TITLE}, LLC`}
          width={170}
          height={147}
          preload
          quality={100}
          src={SHDiamond}
          loading="eager"
        />
      )}
      {whiteVariant ? (
        <Image
          className="logo-letters"
          alt={`${SITE_TITLE}, LLC`}
          width={320}
          height={50}
          preload
          quality={100}
          src={LogoLetters}
          loading="eager"
        />
      ) : (
        <Image
          className="logo-letters"
          alt={`${SITE_TITLE}, LLC`}
          width={320}
          height={50}
          preload
          quality={100}
          src={LogoLettersBlack}
          loading="eager"
        />
      )}
    </CombinedLogo>
  </>
);

export default Logo;
