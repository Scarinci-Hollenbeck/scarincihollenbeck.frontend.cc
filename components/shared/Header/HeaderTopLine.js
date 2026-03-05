import { ContainerDefault } from 'styles/Containers.style';
import { MAKE_A_PAYMENT } from 'utils/constants';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getIcon } from 'utils/getIcon';
import HeaderSearch from './HeaderSearch';
import {
  HeaderTopLineIcon,
  HeaderTopLineItem,
  HeaderTopLineItems,
  HeaderTopLineLink,
  HeaderTopLineWrapper,
} from '../../../styles/Header.style';
import { handleSubscriptionModalOpener } from '../../../redux/slices/modals.slice';

const twoButtons = (dispatch) => (
  <Fragment key="two-items">
    <HeaderTopLineItem>
      <button
        onClick={() => dispatch(handleSubscriptionModalOpener({ active: true }))}
        className="header-subscription-btn"
      >
        <HeaderTopLineIcon>{getIcon('MailingList')}</HeaderTopLineIcon>
        Join our mailing list
      </button>
    </HeaderTopLineItem>

    <HeaderTopLineItem>
      <HeaderTopLineLink href={MAKE_A_PAYMENT} target="_blank" rel="noreferrer">
        <HeaderTopLineIcon>{getIcon('Payment')}</HeaderTopLineIcon>
        Make payment
      </HeaderTopLineLink>
    </HeaderTopLineItem>
  </Fragment>
);

const HeaderTopLine = ({ isOpenSearch, setIsOpenSearch, viewportWidth }) => {
  const dispatch = useDispatch();
  return (
    <HeaderTopLineWrapper>
      <ContainerDefault>
        <HeaderTopLineItems>
          {!isOpenSearch && viewportWidth > 768 && twoButtons(dispatch)}
          {viewportWidth <= 768 && twoButtons(dispatch)}
          <HeaderTopLineItem className="mobile-hide" $open={isOpenSearch}>
            <HeaderSearch
              isOpenSearch={isOpenSearch}
              setIsOpenSearch={setIsOpenSearch}
            />
          </HeaderTopLineItem>
        </HeaderTopLineItems>
      </ContainerDefault>
    </HeaderTopLineWrapper>
  );
};
export default HeaderTopLine;
