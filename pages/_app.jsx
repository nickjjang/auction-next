/* eslint-disable react/forbid-prop-types */

import PropTypes from "prop-types";
import React from "react";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.any,
};

MyApp.defaultProps = {
  Component: null,
  pageProps: null,
};
export default MyApp;
