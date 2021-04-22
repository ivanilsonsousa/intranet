import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

import { Context } from "../context/AuthContext";
function RouteWrapper({
  redirectTo,
  isPrivate,
  authTo,
  component: Component,
  ...rest
}) {
  const { loading, authenticated } = useContext(Context);

  if (loading && isPrivate) return <span>Loading...</span>;

  if (authenticated && authTo) return <Redirect to={authTo} />;
  else if (!authenticated && isPrivate) return <Redirect to={redirectTo} />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  redirectTo: PropTypes.string,
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  redirectTo: "/",
  isPrivate: false,
};

export default RouteWrapper;
