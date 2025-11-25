import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { Form } from 'react-bootstrap';
import {
  AttorneysSelectFieldDropdown,
  AttorneysSelectFieldDropdownItem,
  AttorneysSelectFieldWrapper,
} from 'styles/AttorneysSelectField.style';

const AttorneysSelectField = ({
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

      if (!value.trim()) {
        setFilteredAttorneys([]);
        setShowDropdown(false);
        onChange(e, name);
        return;
      }

      setFilteredAttorneys(
        attorneys.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())),
      );
      setShowDropdown(true);
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

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AttorneysSelectFieldWrapper ref={dropdownRef}>
      <Form.Control
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        onBlur={(e) => {
          if (
            !e.relatedTarget
            || !dropdownRef.current.contains(e.relatedTarget)
          ) {
            setShowDropdown(false);
          }
        }}
        autoComplete="off"
        {...attributes}
      />
      {showDropdown && filteredAttorneys.length > 0 && (
        <AttorneysSelectFieldDropdown>
          {filteredAttorneys.map((attorney) => (
            <AttorneysSelectFieldDropdownItem
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
            </AttorneysSelectFieldDropdownItem>
          ))}
        </AttorneysSelectFieldDropdown>
      )}
    </AttorneysSelectFieldWrapper>
  );
};

export default AttorneysSelectField;
