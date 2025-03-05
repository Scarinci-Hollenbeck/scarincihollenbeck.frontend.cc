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
import { handleModalOpener } from '../../../redux/slices/modals.slice';
import SocialShare from '../library/SocialShare';

const GetInTouchSidebar = ({ handlePrint, isPrintBtn = false }) => {
  const dispatch = useDispatch();

  return (
    <GetInTouchHolder>
      <GetInTouchDescription>
        <GetInTouchText>
          <p>
            OUR commitment to excellence, combined with our mission to deliver
            outstanding client service, has earned our firm a solid reputation.
          </p>
          <p>
            Scarinci Hollenbeck is a business law firm based in New Jersey, New
            York, and Washington, D.C servicing clients worldwide.
          </p>
        </GetInTouchText>

        <GetInTouchQuote>
          <p>
            If you have a legal need that is not mentioned, please contact us to
            discuss how we may help you.
          </p>
          <p>Contact us today to learn more about how we can assist you.</p>
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
