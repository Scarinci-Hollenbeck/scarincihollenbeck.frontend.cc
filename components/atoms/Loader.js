import ClockLoader from 'react-spinners/ClockLoader';
import { globalColor } from 'styles/global_styles/Global.styles';

const Loader = () => (
  <div
    className="d-flex flex-colum justify-content-center align-items-center loader"
    style={{ height: '300px' }}
  >
    <ClockLoader size={200} color={globalColor.grayLite.grayLite60} />
  </div>
);

export default Loader;
