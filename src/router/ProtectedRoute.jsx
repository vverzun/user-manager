import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('jwtToken');

  if (isLoggedIn) {
    return (
      <Route {...rest} render={props => <Component {...props} />} />
    );
  }

  return <Redirect to="/login" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired
};

export default ProtectedRoute;
