import React from 'react';
import empty from 'is-empty';
import Link from 'next/link';
import {
  ContactsPrintVersion,
  ContactsWrapperPrintVersion,
  FooterPrintVersionContainer,
} from 'styles/common/PrintStyles.style';
import { CURRENT_DOMAIN, SITE_PHONE } from '../../../utils/constants';
import Logo from '../../organisms/Navbar/Logo';

const FooterPrintVersion = ({ locations }) => {
  const qrCodeProduction = '/images/qrCodeHome.png';

  return (
    <FooterPrintVersionContainer>
      <div className="advertising-block">
        <div className="d-flex flex-column">
          <p className="advertising-title-print">ATTORNEY ADVERTISING</p>
          <p className="advertising-text-print">
            No Aspect of the advertisement on this website or any of its pages,
            including awards and accolades, has been approved by the Supreme
            Court of NJ or NY.
          </p>
        </div>
        <Logo whiteVariant isPrint />
      </div>

      <ContactsWrapperPrintVersion>
        <ContactsPrintVersion>
          <div className="d-flex flex-column align-items-end">
            <div className="location-print-list mb-1">
              {!empty(locations)
                && locations.data?.map((location) => (
                  <Link
                    href={location.uri}
                    key={location.databaseId}
                    className="location-print-item"
                  >
                    {location.title}
                  </Link>
                ))}
            </div>
            <div className="location-print-list">
              <Link className="location-print-item" href={`${CURRENT_DOMAIN}/`}>
                {CURRENT_DOMAIN.replace(/^https?:\/\//, '')}
              </Link>
              <a className="location-print-item" href={`tel:${SITE_PHONE}`}>
                {SITE_PHONE}
              </a>
            </div>
          </div>
        </ContactsPrintVersion>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrCodeProduction}
            alt="the Bio page"
            width={120}
            height={100}
          />
        </div>
      </ContactsWrapperPrintVersion>
    </FooterPrintVersionContainer>
  );
};

export default FooterPrintVersion;
