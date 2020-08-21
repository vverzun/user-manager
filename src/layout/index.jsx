import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../containers/Modal';

const RootLayout = ({ header, content }) => (
  <>
    <div className="container">
      {
        header && <div>{ header }</div>
      }
      {
        content && <div>{ content }</div>
      }
    </div>
    <Modal />
  </>
);

RootLayout.propTypes = {
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
};

export default RootLayout;
