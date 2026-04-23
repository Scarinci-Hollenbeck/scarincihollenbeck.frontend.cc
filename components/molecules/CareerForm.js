import { useRouter } from 'next/router';
import { useState } from 'react';
import Script from 'next/script';
import { FormContainer } from 'styles/attorney-page/GetInTouchForm.styles';
import { StandardBlueButton } from '../../styles/Buttons.style';
import {
  THANKS_MESSAGE,
  inputsCareerForm,
  CAREERS_FORM_API,
  RECAPTCHA_SITE_KEY,
} from '../../utils/constants';
import { CareerFormContainer } from '../../styles/Careers.style';
import RenderInputs from '../shared/ContactForm/RenderInputs';

const CareerForm = ({ title }) => {
  const router = useRouter();
  const [isCheckedDisclaimer, setIsCheckedDisclaimer] = useState('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const careerHandleCheckDisclaimer = () => setIsCheckedDisclaimer(!isCheckedDisclaimer);
  const isDisabledSubmitButton = !isCheckedDisclaimer;

  return (
    <CareerFormContainer>
      <FormContainer>
        <form
          action={CAREERS_FORM_API}
          className="kwes-form d-print-none w-100"
          // eslint-disable-next-line react/no-unknown-property
          has-recaptcha-v3=""
          // eslint-disable-next-line react/no-unknown-property
          recaptcha-site-key={RECAPTCHA_SITE_KEY}
          // eslint-disable-next-line react/no-unknown-property
          success-message={THANKS_MESSAGE.title}
          onFocus={() => setRecaptchaLoaded(true)}
        >
          {recaptchaLoaded && (
            <Script
              src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
              strategy="afterInteractive"
            />
          )}
          <input
            type="hidden"
            name="currentTitle"
            value={title || 'Career Position'}
          />
          <RenderInputs
            arrayOfAttributes={inputsCareerForm}
            attorneySlug={router.asPath}
          />

          <p className="form-disclaimer">
            * The use of the Internet or this form for communication with the
            firm or any individual member of the firm does not establish an
            attorney-client relationship. Confidential or time-sensitive
            information should not be sent through this form. By providing a
            telephone number and submitting this form you are consenting to be
            contacted by SMS text message. Message & data rates may apply.
            Message frequency may vary. You can reply STOP to opt-out of further
            messaging.
          </p>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <fieldset
            data-kw-group="true"
            rules="required"
            className="form-checkboxes"
          >
            <label htmlFor="disclaimer-career-form" className="form-checkbox">
              <input
                className="form-checkbox__input"
                type="checkbox"
                name="disclaimer-career-form"
                // eslint-disable-next-line react/no-unknown-property
                feedback="You must agree before submitting."
                value="disclaimer-career-form"
                id="disclaimer-career-form"
                label="I have read the disclaimer"
                checked={isCheckedDisclaimer}
                onChange={careerHandleCheckDisclaimer}
                required
              />
              <span className="form-checkbox__icon" />
              <span className="form-checkbox__label">
                I have read the disclaimer
              </span>
            </label>
          </fieldset>

          <StandardBlueButton
            disabled={isDisabledSubmitButton}
            className="form-button"
            type="submit"
          >
            Submit form
          </StandardBlueButton>
        </form>
      </FormContainer>
    </CareerFormContainer>
  );
};

export default CareerForm;
