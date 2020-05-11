import React, { Component } from 'react';
import CarouselContainer from './Carousel';
import CookieConsentContainer from './CookieConsent';
import Search from './SimpleSearch';
import { headers } from '../utils/helpers';

const currentYear = new Date().getFullYear();

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
    };
  }

  async componentDidMount() {
    const response = await fetch(`${process.env.REACT_APP_ADMIN_SITE}/wp-json/just-in/posts`, { headers });
    const slides = await response.json();

    this.setState({ slides })
  }

  render() {
    const { slides } = this.state;

    return (
      <div className="container-fluid bk--gray d-print-none">
        <div className="just-in-container w-75">
          <CarouselContainer sliderType="JustInCarousel" slides={slides} />
        </div>
        <footer>
          <div className="container-fluid h-100 mt-5 w-75 bk--gray">
            <div className="row border--red mb-3">
              <div className="col-sm-12 col-md-3 offset-md-9 mb-2 footer-search">
                <Search />
              </div>
            </div>
            <div className="row pb-3 mb-0">
              <div className="col-sm-6">
                <p className="mr-auto proxima-bold h5 pb-0 mb-0">ATTORNEY ADVERTISING</p>
                <p className="mr-auto proxima-regular mt-0 pt-0">
                  Prior results do not guarantee a similar outcome.
                  <br />
                  ©
                  {' '}
                  {currentYear}
                  , Scarinci Hollenbeck, LLC, all rights reserved.
                </p>
              </div>
              <div className="col-sm-6 text-center">
                <ul className="d-flex justify-content-end no-dots list-inline pb-0 mb-0">
                  <li className="list-inline-item">
                    <a href="/contact" className="proxima-bold red-title h6">Contact Us</a>
                    {' '}
                    |
                    {' '}
                  </li>
                  <li className="list-inline-item">
                    <a href="/careers" className="proxima-bold red-title h6">Careers</a>
                    {' '}
                    |
                    {' '}
                  </li>
                  <li className="list-inline-item"><a href="/awards" className="proxima-bold red-title h6">Awards </a></li>
                </ul>
                <ul className="float-right no-dots list-inline mt-0 pt-0">
                  <li className="list-inline-item">
                    <a href="https://secure.lawpay.com/pages/scarincihollenbeck/operating" className="proxima-bold red-title h6">
                      Make Payment
                    </a>
                    {' '}
                    |
                    {' '}
                  </li>
                  <li className="list-inline-item">
                    <a href="https://sitemap.scarincihollenbeck.com/sitemap.xml" className="proxima-bold red-title h6">Sitemap</a>
                    {' '}
                    |
                    {' '}
                  </li>
                  <li className="list-inline-item">
                    <a href="/disclaimer" className="proxima-bold red-title h6">Disclaimer</a>
                    {' '}
                    |
                    {' '}
                  </li>
                  <li className="list-inline-item">
                    <a href="/terms-of-use" className="proxima-bold red-title h6">Terms of Use</a>
                    {' '}
                    |
                    {' '}
                  </li>
                  <li className="list-inline-item"><a href="/privacy-policy" className="proxima-bold red-title h6">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <CookieConsentContainer />
      </div>
    );
  }
}

export default Footer;
