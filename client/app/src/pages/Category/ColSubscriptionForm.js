/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkboxes } from '../../utils/categories';

const Checkbox = ({
  property,
  name,
  onChange,
}) => (
  <input type="checkbox" property={property} name={name} onChange={onChange} />
);


class SubscriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      categories: [],
      message: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    if (name === 'firstName') {
      this.setState({ firstName: value });
    }

    if (name === 'lastName') {
      this.setState({ lastName: value });
    }

    if (name === 'email') {
      this.setState({ email: value });
    }
  }

  handleCategoryChange(e) {
    const { categories } = this.state;
    const value = e.target.name;
    const property = e.target.getAttribute('property');
    const isChecked = e.target.checked;

    if (isChecked === true) {
      this.setState({
        categories: [...categories, { property, value }],
      });
    }

    if (isChecked === false) {
      this.setState({ categories: categories.filter((a) => a.value !== value) });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      categories,
    } = this.state;
    const categoryValues = categories.map((c) => c.value);

    const subscriberData = {
      firstName,
      lastName,
      email,
      categoryValues,
      siteUrl: window.location.href,
    };

    fetch(`${process.env.REACT_APP_FORMS_API}/shlaw/site/subscription/form`, {
      method: 'post',
      body: JSON.stringify(subscriberData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        const { status } = data;

        if (status === 200) {
          this.setState({ message: true });
        }
      });
  }

  render() {
    const {
      email,
      message,
      lastName,
      firstName,
    } = this.state;


    return (
      <div className="w-100">
        {(message) && (
          <p className="text-success">Thank you for subscribing!</p>
        )}
        <form onSubmit={this.handleSubmit} method="post" className="mt-3">
          <div className="form-group">
            <label htmlFor="firstName" className="sr-only"> Email:</label>
            <input id="firstName" name="firstName" type="text" value={firstName} onChange={this.handleChange} className="form-control" aria-describedby="firstName" placeholder="Enter first name" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="sr-only"> last Name:</label>
            <input id="lastName" name="lastName" type="text" value={lastName} onChange={this.handleChange} className="form-control" aria-describedby="lastName" placeholder="Enter last name" />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="sr-only"> Email:</label>
            <input id="email" name="email" type="text" value={email} onChange={this.handleChange} className="form-control" aria-describedby="email" placeholder="Enter email" required />
          </div>
          <div className="form-group mb-0">
            <p className="small-excerpt">Please select a category(s) below:</p>
          </div>
          <ul className="no-dots two-column mt-3 ml-0">
            {checkboxes.map((item) => (
              <li key={item.key} className="small-excerpt mb--1">
                <label htmlFor={item.name}>
                  <Checkbox id={item.name} className="d-block" name={item.name} property={item.property} onChange={this.handleCategoryChange} />
                  {' '}
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
          <input type="submit" className="btn btn-danger" value="Submit" />
        </form>
      </div>
    );
  }
}

Checkbox.propTypes = {
  property: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  property: '',
  name: '',
  onChange: () => {},
};

SubscriptionForm.propTypes = {
  hideSubscription: PropTypes.func,
};

SubscriptionForm.defaultProps = {
  hideSubscription: () => {},
};

export default SubscriptionForm;
