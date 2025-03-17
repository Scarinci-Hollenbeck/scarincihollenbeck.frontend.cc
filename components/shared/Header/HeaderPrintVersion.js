import Logo from 'components/organisms/Navbar/Logo';
import empty from 'is-empty';
import Link from 'next/link';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { MdLocalPhone } from 'react-icons/md';
import { HeaderPrintVersionContainer } from 'styles/common/PrintStyles.style';
import { CURRENT_DOMAIN, SITE_EMAIL, SITE_PHONE } from 'utils/constants';

const HeaderPrintVersion = ({ locations }) => (
  <HeaderPrintVersionContainer>
    <div className="contacts-list">
      <a className="contacts-item" href={`tel:${SITE_PHONE}`}>
        <span className="icon">
          <MdLocalPhone />
        </span>
        <span>{SITE_PHONE}</span>
      </a>
      <a className="contacts-item" href={`mailto:${SITE_EMAIL}`}>
        <span className="icon">
          <BsFillEnvelopeFill />
        </span>
        <span>{SITE_EMAIL}</span>
      </a>
    </div>

    <Logo isPrint />

    <div className="locations-list-wrapper">
      <div className="locations-list">
        {!empty(locations)
          && locations.data?.map((location) => (
            <Link
              href={location.uri}
              key={location.databaseId}
              className="locations-item"
            >
              {location.title}
            </Link>
          ))}
      </div>
      <Link className="locations-item" href={`${CURRENT_DOMAIN}/`}>
        {CURRENT_DOMAIN.replace(/^https?:\/\//, '')}
      </Link>
    </div>
  </HeaderPrintVersionContainer>
);

export default HeaderPrintVersion;
