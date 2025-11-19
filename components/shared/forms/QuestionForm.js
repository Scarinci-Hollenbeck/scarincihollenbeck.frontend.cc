import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormContainer } from 'styles/Forms.style';
import { StandardBlueButton } from 'styles/Buttons.style';
import {
  LIBRARY_QUESTION_FORM_API,
  questionFormFields,
  RECAPTCHA_SITE_KEY,
  THANKS_MESSAGE,
} from 'utils/constants';
import RenderInputs from 'components/shared/forms/RenderInputs';

export default function QuestionForm({
  blockName = 'default-question-form',
  buttonText = 'Submit form',
  attorneys,
}) {
  const router = useRouter();
  const [isCheckedDisclaimer, setIsCheckedDisclaimer] = useState('');

  const handleCheck = (event) => {
    const target = event.target;
    const isChecked = target.checked;

    if (blockName === target.dataset.id) {
      setIsCheckedDisclaimer(isChecked ? blockName : '');
    }
  };

  return (
    <FormContainer>
      <form
        action={LIBRARY_QUESTION_FORM_API}
        className="kwes-form d-print-none"
        // eslint-disable-next-line react/no-unknown-property
        has-recaptcha-v3=""
        // eslint-disable-next-line react/no-unknown-property
        recaptcha-site-key={RECAPTCHA_SITE_KEY}
        // eslint-disable-next-line react/no-unknown-property
        success-message={THANKS_MESSAGE.title}
      >
        <RenderInputs
          arrayOfAttributes={questionFormFields}
          attorneySlug={router.asPath}
          attorneys={attorneys}
        />
        <p className="form-disclaimer">*Disclaimer</p>
        <fieldset
          data-kw-group="true"
          rules="required"
          className="form-checkboxes"
        >
          <label htmlFor={`disclaimer-${blockName}`} className="form-checkbox">
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
