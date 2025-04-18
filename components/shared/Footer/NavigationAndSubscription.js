import Link from 'next/link';
import { ContainerDefault } from 'styles/Containers.style';
import { ButtonRed } from 'styles/Buttons.style';
import MailingListIcon from 'components/common/icons/MailingListIcon';
import { useDispatch } from 'react-redux';
import {
  FooterNavigation,
  NavHolder,
  NavWrapper,
} from '../../../styles/Footer.style';
import { footerNavList } from '../../../utils/constants';
import { handleSubscriptionModalOpener } from '../../../redux/slices/modals.slice';

const NavigationAndSubscription = () => {
  const dispatch = useDispatch();
  return (
    <NavWrapper className="d-print-none">
      <ContainerDefault>
        <NavHolder>
          <FooterNavigation>
            <ul>
              {footerNavList.map(({ linkTitle, link, id }) => (
                <li key={id}>
                  <Link href={link}>{linkTitle}</Link>
                </li>
              ))}
            </ul>
          </FooterNavigation>
          <button
            onClick={() => dispatch(handleSubscriptionModalOpener({ active: true }))}
            className="footer-subscription-btn"
          >
            <ButtonRed as="span">
              <MailingListIcon />
              Join our mailing list
            </ButtonRed>
          </button>
        </NavHolder>
      </ContainerDefault>
    </NavWrapper>
  );
};

export default NavigationAndSubscription;
