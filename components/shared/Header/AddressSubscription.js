import { BsFillEnvelopePlusFill } from 'react-icons/bs';
import { AddressSubscriptionContainer } from '../../../styles/Header.style';
import ContactBoxTemplate from '../../atoms/ContactBox';
import SubscriptionModal from '../../molecules/subscription/SubscriptionModal';

const AddressSubscription = () => (
  <AddressSubscriptionContainer>
    <ContactBoxTemplate number="201-896-4100" email="info@sh-law.com" />
    <SubscriptionModal customClass="header-subscription-btn">
      <>
        <BsFillEnvelopePlusFill />
        Join our mailing list
      </>
    </SubscriptionModal>
  </AddressSubscriptionContainer>
);

export default AddressSubscription;