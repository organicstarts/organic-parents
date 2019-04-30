import React, { Component } from "react";
import { connect } from "react-redux";

import LoginSignUp from "./LoginSignUp";

class Auth extends Component {
  render() {
    const { children } = this.props;

    if (this.props.token) {
      return <React.Fragment>{children}</React.Fragment>;
    } else {
      return <LoginSignUp />;
    }
  }
}

const mapStateToProps = ({ authState }) => {
  return {
    token: authState.token
  };
};

export default connect(
  mapStateToProps,
  null
)(Auth);
