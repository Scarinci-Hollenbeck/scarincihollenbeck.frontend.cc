import { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { BsPaperclip } from 'react-icons/bs';
import { globalColor } from 'styles/global_styles/Global.styles';
import {
  UploadContainer,
  UploadIcon,
  UploadRow,
  UploadTitle,
} from '../../styles/UploadFileInput.style';

const UploadFileInput = ({ onChange, ...attributes }) => {
  const ref = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      ref.current.click();
    }
  };

  return (
    <UploadContainer>
      {attributes.label && (
        <UploadTitle>
          {attributes.label}
          {attributes.rules?.includes('required') && (
            <span> (This field is required)</span>
          )}
        </UploadTitle>
      )}
      <UploadRow>
        <UploadIcon>
          <BsPaperclip color={globalColor.gray.gray500} size={20} />
        </UploadIcon>
        <Form.Control
          placeholder={attributes.placeholder || 'Attach the file'}
          ref={ref}
          htmlSize={0}
          {...attributes}
          role="button"
          tabIndex="0"
          onKeyDown={handleKeyDown}
        />
      </UploadRow>
    </UploadContainer>
  );
};

export default UploadFileInput;
