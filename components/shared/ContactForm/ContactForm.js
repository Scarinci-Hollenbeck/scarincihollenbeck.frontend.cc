import { useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { FormContainer } from 'styles/attorney-page/GetInTouchForm.styles';
import { StandardBlueButton } from 'styles/Buttons.style';
import {
  GET_IN_TOUCH_FORM_API,
  inputsGetInTouchAttributes,
  RECAPTCHA_SITE_KEY,
  THANKS_MESSAGE,
} from 'utils/constants';
import empty from 'is-empty';
import RenderInputs from './RenderInputs';

export default function ContactForm({
  isPositionRelativeProp,
  blockName = 'default',
  buttonText = 'Submit form',
}) {
  const [isCheckedDisclaimer, setIsCheckedDisclaimer] = useState('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const handleCheck = (event) => {
    const target = event.target;
    const isChecked = target.checked;

    if (blockName === target.dataset.id) {
      setIsCheckedDisclaimer(isChecked ? blockName : '');
    }
  };

  const router = useRouter();

  return (
    <FormContainer isPositionRelative={isPositionRelativeProp && 'true'}>
      <form
        action={GET_IN_TOUCH_FORM_API}
        className="kwes-form d-print-none"
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
        <RenderInputs
          arrayOfAttributes={inputsGetInTouchAttributes}
          attorneySlug={router.asPath}
        />
        <p className="form-disclaimer">
          * The use of the Internet or this form for communication with the firm
          or any individual member of the firm does not establish an
          attorney-client relationship. Confidential or time-sensitive
          information should not be sent through this form. By providing a
          telephone number and submitting this form you are consenting to be
          contacted by SMS text message. Message & data rates may apply. Message
          frequency may vary. You can reply STOP to opt-out of further
          messaging.
          <br />
          “If you would like to submit a file, please email it directly to
          <a href="mailto:info@sh-law.com"> info@sh-law.com</a>
          .
        </p>
        {!empty(blockName) && (
          // eslint-disable-next-line react/no-unknown-property
          <fieldset
            data-kw-group="true"
            rules="required"
            className="form-checkboxes"
          >
            <label
              htmlFor={`disclaimer-${blockName}`}
              className="form-checkbox"
            >
              <input
                className="form-checkbox__input"
                type="checkbox"
                name={`disclaimer-${blockName}`}
                // eslint-disable-next-line react/no-unknown-property
                feedback="You must agree before submitting."
                value={`disclaimer-${blockName}`}
                id={`disclaimer-${blockName}`}
                label="I have read the disclaimer"
                data-id={blockName}
                checked={isCheckedDisclaimer === blockName}
                onChange={handleCheck}
                required
              />
              <span className="form-checkbox__icon" />
              <span className="form-checkbox__label">
                I have read the disclaimer
              </span>
            </label>
          </fieldset>
        )}
        <StandardBlueButton
          disabled={!(isCheckedDisclaimer === blockName)}
          type="submit"
          className="form-button"
        >
          {buttonText}
        </StandardBlueButton>
      </form>
    </FormContainer>
  );
}
