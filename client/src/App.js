import React, { Component } from "react";
import { Menu, Button, Container, Icon, Image, Header } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./stores/actions/auth";
import Router from "./router/Router";
import logo from "./images/organic-parents-logo.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu
          fixed="top"
          size="massive"
          borderless
          style={{ height: "130px", padding: "0 25rem" }}
        >
          <Menu.Item href="/">
            <Image
              src={logo}
              style={{ height: "100px", width: "auto" }}
              alt="Organic Parents"
            />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/profile"
            style={{ marginTop: "15px", marginRight: "15px" }}
          >
            <Button circular color="olive" icon="user" label="My Account" />
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
            <Header as="h4">Copyright 2019 Organic Parents</Header>
          </Menu.Item>
          <Menu.Item
            position="right"
            style={{ marginTop: "15px", marginRight: "15px" }}
          >
            <Icon name="instagram" size="huge" />
            <Icon name="facebook" size="huge" />
            <Icon name="youtube" size="huge" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps({ authState }) {
  return {
    token: authState.token
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(App)
);
