import React, { Component } from "react";
import { Menu, Button, Container, Header } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./stores/actions/auth";
import Router from "./router/Router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu fixed="top" size="massive" borderless style={{ height: "130px", padding: "0 25rem" }}>
          <Menu.Item>
            <Header>ORGANIC PARENTS</Header>
          </Menu.Item>
          <Menu.Item
            position="right"
            style={{ marginTop: "15px", marginRight: "15px" }}
          >
            <Button
              circular
              color="red"
              icon="power off"
              onClick={() => this.props.logout(this.props.token)}
            />
          </Menu.Item>
        </Menu>
        <Container fluid style={{ marginTop: "200px" }}>
          <Router />
        </Container>
        <Menu
          fixed="bottom"
          size="massive"
          borderless
          style={{ height: "130px" }}
        >
          <Menu.Item
            position="right"
            style={{ marginTop: "15px", marginRight: "15px" }}
          >
            <Button
              circular
              color="red"
              icon="power off"
              onClick={() => this.props.logout(this.props.token)}
            />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps({ authState }) {
  return {
    email: authState.email,
    token: authState.token
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(App)
);
