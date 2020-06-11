
import SubscriptionFormWithButton from './subscription-form-with-button';
import { shDiamondPNG } from '../utils/next-gen-images';

export default function SubscriptionMessage(props){
  return (
    <div className="w-100 mt-4">
      <div className="sidebar-title">
        Get the latest from our attorneys!
      </div>
      <div className="off-white mh-375">
        <img src={shDiamondPNG} alt="Subscribe Scarinci Hollenbeck attorneys" className="mx-auto d-block py-4 w-50" />
        <p className="proxima-bold text-center px-3">
          Please fill out our short form to get the latest articles
          from the Scarinci Hollenbeck attorneys weekly on the cutting-edge legal topics.
        </p>
        <SubscriptionFromWithButton />
      </div>
    </div>
  );
};
