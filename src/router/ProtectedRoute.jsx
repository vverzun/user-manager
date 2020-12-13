import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
  const isLoggedIn = localStorage.getItem('jwtToken');

  if (isLoggedIn) {
    return <Component />;
  }

  return <Redirect to="/login" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired
};

export default ProtectedRoute;
