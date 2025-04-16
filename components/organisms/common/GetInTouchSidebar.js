import React from 'react';
import {
  GetInTouchDescription,
  GetInTouchHolder,
  GetInTouchMobileBtn,
  GetInTouchQuote,
  GetInTouchText,
} from 'styles/GetInTouchSidebar.style';
import { MdTouchApp } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import { SERVICES_SIDEBAR_DEFAULT_CONTENT } from 'utils/constants';
import { handleModalOpener } from '../../../redux/slices/modals.slice';
import SocialShare from '../library/SocialShare';

const GetInTouchSidebar = ({
  handlePrint,
  isPrintBtn = false,
  sidebarContent,
}) => {
  const dispatch = useDispatch();

  return (
    <GetInTouchHolder>
      <GetInTouchDescription>
        <GetInTouchText>
          <JSXWithDynamicLinks
            HTML={sidebarContent?.text || SERVICES_SIDEBAR_DEFAULT_CONTENT.text}
          />
        </GetInTouchText>

        <GetInTouchQuote>
          <JSXWithDynamicLinks
            HTML={
              sidebarContent?.quote || SERVICES_SIDEBAR_DEFAULT_CONTENT.quote
            }
          />
        </GetInTouchQuote>

        <SocialShare isPrintBtn={isPrintBtn} handlePrint={handlePrint} />
      </GetInTouchDescription>
      <GetInTouchMobileBtn
        onClick={() => dispatch(handleModalOpener({ active: true }))}
      >
        <span>Click here to contact</span>
        <MdTouchApp />
      </GetInTouchMobileBtn>
    </GetInTouchHolder>
  );
};
export default GetInTouchSidebar;
