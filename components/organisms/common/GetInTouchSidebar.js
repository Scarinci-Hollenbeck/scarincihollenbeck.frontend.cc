import React from 'react';
import {
  GetInTouchDescription,
  GetInTouchHolder,
  GetInTouchMobileBtn,
  GetInTouchQuote,
  GetInTouchText,
} from 'styles/GetInTouchSidebar.style';
import { MdTouchApp } from 'react-icons/md';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import { SERVICES_SIDEBAR_DEFAULT_CONTENT } from 'utils/constants';
import ContactModalOpener from 'components/atoms/ContactModalOpener';
import SocialShare from '../library/SocialShare';

const GetInTouchSidebar = ({
  handlePrint,
  isPrintBtn = false,
  sidebarContent,
}) => (
  <GetInTouchHolder>
    <GetInTouchDescription>
      <GetInTouchText>
        <JSXWithDynamicLinks
          HTML={sidebarContent?.text || SERVICES_SIDEBAR_DEFAULT_CONTENT.text}
        />
      </GetInTouchText>

      <GetInTouchQuote>
        <JSXWithDynamicLinks
          HTML={sidebarContent?.quote || SERVICES_SIDEBAR_DEFAULT_CONTENT.quote}
        />
      </GetInTouchQuote>

      <SocialShare isPrintBtn={isPrintBtn} handlePrint={handlePrint} />
    </GetInTouchDescription>

    <ContactModalOpener asComponent={GetInTouchMobileBtn}>
      <span>Click here to contact</span>
      <MdTouchApp />
    </ContactModalOpener>
  </GetInTouchHolder>
);
export default GetInTouchSidebar;
