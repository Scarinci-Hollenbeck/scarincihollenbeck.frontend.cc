import React, { Fragment } from 'react';
import {
  SubHeaderKeyContactsButtons,
  SubHeaderKeyContactsCards,
} from 'styles/subheader/SubHeaderKeyContacts.style';
import empty from 'is-empty';
import AttorneyCard from 'components/shared/AttorneyCard';
import { globalColor } from 'styles/global_styles/Global.styles';
import { QRCodesBoxForPDF } from 'styles/common/PrintStyles.style';
import { FaFilePdf } from 'react-icons/fa6';
import { OutlinedButton, StandardBlueButton } from 'styles/Buttons.style';
import { useDispatch } from 'react-redux';
import { SubHeaderInteractive } from 'styles/subheader/SubHeader.style';
import { handleModalOpener } from '../../redux/slices/modals.slice';

const SubHeaderKeyContacts = ({
  keyContacts,
  isPrint,
  handlePrint,
  printButtonText = 'Print page',
}) => {
  if (empty(keyContacts)) return null;
  const dispatch = useDispatch();

  return (
    <SubHeaderInteractive $bg={globalColor.blue.blue6002}>
      <h2>Key Contacts</h2>

      <SubHeaderKeyContactsCards>
        {keyContacts?.slice(0, 1)?.map((keyContact) => (
          <Fragment key={keyContact.databaseId}>
            <AttorneyCard
              link={keyContact.uri || keyContact.link}
              name={keyContact.display_name || keyContact.title}
              designation={keyContact.designation}
              image={keyContact.profileImage}
              officeLocations={keyContact.officeLocation}
              number={keyContact.phoneNumber}
              email={keyContact.email}
              width={300}
              height={300}
              isPrint={isPrint}
            />
            {isPrint
              && (!empty(keyContact.qrCodeLinkedin)
                || !empty(keyContact.qrCodeBioPage)) && (
                <QRCodesBoxForPDF>
                  {!empty(keyContact.qrCodeLinkedin) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={keyContact.qrCodeLinkedin?.sourceUrl}
                      alt="LinkedIn"
                      width={92}
                      height={80}
                    />
                  )}
                  {!empty(keyContact.qrCodeBioPage) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={keyContact.qrCodeBioPage?.sourceUrl}
                      alt="The bio page"
                      width={92}
                      height={80}
                    />
                  )}
                </QRCodesBoxForPDF>
            )}
          </Fragment>
        ))}
      </SubHeaderKeyContactsCards>

      <SubHeaderKeyContactsButtons>
        <StandardBlueButton
          onClick={() => dispatch(
            handleModalOpener({
              active: true,
            }),
          )}
          $isLightHover
        >
          <span>Contact now</span>
        </StandardBlueButton>
        {handlePrint && (
          <OutlinedButton onClick={handlePrint}>
            <FaFilePdf size={24} />
            {printButtonText}
          </OutlinedButton>
        )}
      </SubHeaderKeyContactsButtons>
    </SubHeaderInteractive>
  );
};

export default SubHeaderKeyContacts;
