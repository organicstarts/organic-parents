import React, { Component } from "react";
import {
  Menu,
  Button,
  Container,
  Icon,
  Image,
  Header,
  Grid,
  Form,
  Input
} from "semantic-ui-react";
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
          style={{ paddingLeft: "25px", height: "90px" }}
        >
          <Menu.Item href="/">
            <Image
              src={logo}
              style={{ height: "75px", width: "auto" }}
              alt="Organic Parents"
            />
          </Menu.Item>
          <Menu.Item>
            <Button as={Link} to="/thread" circular color="teal" size="mini">
              <Icon name="pencil" />
              Create Thread
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Form>
              <Form.Input
                style={{width: "150em"}}
                icon="search"
                iconPosition="left"
                placeholder="Search Organic Parents"
              />
            </Form>
          </Menu.Item>
          <Menu.Item position="right" fitted="horizontally"  style={{ marginRight: "25px"}}>
            <Button
              as={Link}
              to="/profile"
              circular
              color="olive"
              icon="user"
              label="My Account"
              size="mini"
              style={{ marginRight: "25px", height: "25px" }}
            />
            <Button
              circular
              icon="power off"
              color="red"
              size="mini"
              onClick={() => this.props.logout(this.props.token)}
            />
          </Menu.Item>
        </Menu>
        <Container style={{ marginTop: "150px" }}>
          <Router />
        </Container>
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
