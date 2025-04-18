import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { Form } from 'react-bootstrap';
import {
  AttorneySelectFieldDropdown,
  AttorneySelectFieldDropdownItem,
  AttorneySelectFieldWrapper,
} from 'styles/AttorneysSelectField.style';

const AttorneySelectField = ({
  name,
  attorneys = [],
  onChange,
  ...attributes
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredAttorneys, setFilteredAttorneys] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInputValue(value);
      setShowDropdown(true);
      setFilteredAttorneys(
        attorneys.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())),
      );
      onChange(e, name);
    },
    [attorneys, onChange, name],
  );

  const handleSelect = useCallback(
    (attorney) => {
      setInputValue(attorney);
      setShowDropdown(false);
      const fakeEvent = {
        target: {
          value: attorney,
          attributes: {
            type: { value: 'text' },
          },
        },
      };
      onChange(fakeEvent, name);
    },
    [onChange, name],
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <AttorneySelectFieldWrapper ref={dropdownRef}>
      <Form.Control
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        autoComplete="off"
        {...attributes}
      />
      {showDropdown && filteredAttorneys.length > 0 && (
        <AttorneySelectFieldDropdown>
          {filteredAttorneys.map((attorney) => (
            <AttorneySelectFieldDropdownItem
              key={attorney?.id}
              onClick={() => handleSelect(attorney?.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSelect(attorney?.title);
                }
              }}
              tabIndex={0}
            >
              {attorney?.title}
            </AttorneySelectFieldDropdownItem>
          ))}
        </AttorneySelectFieldDropdown>
      )}
    </AttorneySelectFieldWrapper>
  );
};

export default AttorneySelectField;
