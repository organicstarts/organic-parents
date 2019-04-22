import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  Profile,
  Main,
  ThreadForm,
  ThreadDetail,
  UserProfile,
  BanList
} from "../components/";

class Router extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/profile" component={Profile} />
          <Route path="/userprofile" component={UserProfile} />
          <Route path="/thread" component={ThreadForm} />
          <Route path="/threaddetail" component={ThreadDetail} />
          {(this.props.role === "admin" || this.props.role === "moderator") && (
            <Route path="/banlist" component={BanList} />
          )}
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
