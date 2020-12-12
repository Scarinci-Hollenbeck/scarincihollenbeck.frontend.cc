import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';

export default function ArchiveAttorneyFitlersLocation({ locations, onSelect }) {
  return (
    <NavDropdown
      title={(
        <>
          Filter by location
          <FontAwesomeIcon
            icon={faCaretDown}
            className="ml-5 icon-w8px-h20px"
          />
        </>
      )}
      id="basic-nav-dropdown"
      className="bg-white rounded"
    >
      {locations.map((location) => (
        <NavDropdown.Item
          key={location.ID}
          type="button"
          name="location"
          className="btn btn-link w-100"
          onClick={(e) => onSelect(e, location.title)}
        >
          {location.title}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}
