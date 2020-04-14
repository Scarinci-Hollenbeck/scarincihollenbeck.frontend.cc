import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

import PropTypes from 'prop-types';

const AttorneyCard = (props) => {
  const {
    link, image, name, title, number, email, height, width,
  } = props;

  const Card = styled.div`
    height: ${height};
    overflow: hidden;
    border: .9px solid #e9e9e9;
    width: 100%;
  `;

  return (
    <Card className="d-flex flex-row attorney-card">
      <a href={link}>
        <img rel="preload" src={image} alt={name} className="mr-1" style={{ width }} />
      </a>
      <div className="mt-3 ml-3">
        <a href={link}>
          <p className="text-uppercase red-title small-excerpt">
            <strong>{name}</strong>
          </p>
          <p className="mb-1 small-excerpt">
            <strong>
              {title}
            </strong>
          </p>
        </a>
        <div className="small-excerpt">
          <FontAwesomeIcon icon={faPhone} />
          {' '}
          {number}
          <br />
          <FontAwesomeIcon icon={faEnvelope} />
          {' '}
          {email}
        </div>
      </div>
    </Card>
  );
};

AttorneyCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.string,
  email: PropTypes.string,
  link: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

AttorneyCard.defaultProps = {
  image: '',
  name: '',
  title: '',
  number: '',
  email: '',
  link: '',
  height: '',
  width: '',
};

export default AttorneyCard;
