import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createMarkup, checkIEBrowser } from '../utils/helpers';


const SingleSubHeader = (props) => {
  const {
    title, subtitle, imageWebp, imageJPG, height,
  } = props;

  let image = '';
  const ieBrowser = checkIEBrowser();

  image = imageWebp;

  if(ieBrowser) {
    image = imageJPG;
  }

  const HeaderBckGround = styled.div`
    background: linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), url(${image}) no-repeat 50%;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);
    clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);
   ${height}
  `;

  const BgBlack = styled.div`
    background-color: rgba(0,0,0,.5);
    border-radius: 4px;
    -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);
    clip-path: polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0);
    overflow: visible;
    border: 1px solid black;
  `;

  return (
    <HeaderBckGround className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <BgBlack className="col-sm-12 col-md-7 offset-md-2 text-white">
            <div className="p-3">
              <span id="red-block" />
              <h1 className="text-white proxima-bold border-bottom">{title}</h1>
              <h2 className="proxima-regular mt-3 mb-5 h2-italic" dangerouslySetInnerHTML={createMarkup(subtitle)} />
            </div>
          </BgBlack>
        </div>
      </div>
    </HeaderBckGround>
  );
};

SingleSubHeader.propTypes = {
  imageWebp: PropTypes.string,
  imageJPG: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  height: PropTypes.string,
};

SingleSubHeader.defaultProps = {
  imageWebp: '',
  imageJPG:'',
  title: '',
  subtitle: '',
  height: '',
};

export default SingleSubHeader;
