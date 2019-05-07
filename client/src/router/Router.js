import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import {
  Profile,
  Main,
  ThreadForm,
  ThreadDetail,
  UserProfile,
  BanList,
  Auth,
  LoginSignUp,
  MemberList,
  Message
} from "../components/";

class Router extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="login" component={LoginSignUp} />
          <Auth>
            <Route path="/profile" component={Profile} />
            <Route path="/message" component={Message} />
            <Route path="/userprofile" component={UserProfile} />
            <Route path="/memberlist" component={MemberList} />
            <Route path="/thread" component={ThreadForm} />
            <Route path="/threaddetail" component={ThreadDetail} />
            {this.props.role !== "user" && (
              <Route path="/banlist" component={BanList} />
            )}
          </Auth>
        </Switch>
      </main>
    );
  }
}

function mapStateToProps({ userState }) {
  return {
    role: userState.role
  };
}

export default connect(
  mapStateToProps,
  null
)(Router);
