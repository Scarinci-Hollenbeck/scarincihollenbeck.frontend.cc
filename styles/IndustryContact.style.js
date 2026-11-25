import styled from 'styled-components';
import { ContactFormWrapper } from './ContactUs.style';
import { globalColor } from './global_styles/Global.styles';
import { media_breakpoint_down } from './mediaBreakpoints.style';

// The Contact Us card. Stacked on smaller screens it stays below the sign up
// (Contact Us puts it first), and its text stays dark on the banner's navy.
export const IndustryContactCard = styled(ContactFormWrapper)`
  height: auto;
  color: ${globalColor.blue.darkBlue};

  ${media_breakpoint_down('lg')} {
    order: 0;
  }
`;
