import { getIcon } from 'utils/getIcon';
import { FocusedCardBox } from '../../styles/home-page/WhyChooseUs.style';
import { JSXWithDynamicLinks } from './micro-templates/JSXWithDynamicLinks';

const FocusedCard = ({ icon, title, text }) => (
  <FocusedCardBox>
    <>{getIcon(icon)}</>
    <h3 className="focused-card-title">{title}</h3>
    <JSXWithDynamicLinks HTML={text} />
  </FocusedCardBox>
);

export default FocusedCard;
