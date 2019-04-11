import React, { Component } from "react";
import {
  Menu,
  Button,
  Container,
  Icon,
  Image,
  Header,
  Grid,
  Segment
} from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./stores/actions/auth";
import Router from "./router/Router";
import logo from "./images/organic-parents-logo.png";
import categories from "./config-client/categories.json";

class App extends Component {
  renderCategories() {
    return categories.map(data => {
      return (
        <div>
          <p key={data.key}>
            {data.text}{" "}
            <span
              style={{
                backgroundColor: data.color,
                height: "15px",
                width: "15px",
                borderRadius: "50%",
                float: "right"
              }}
            />
          </p>
        </div>
      );
    });
  }
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
        <Container>
          <Grid style={{ marginTop: "200px" }}>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <Router />
              </Grid.Column>
              <Grid.Column width={4}>
                <Link to={"thread"}>new thread</Link>
                <h4> Statistics</h4>
                <Segment>
                  <p>16 MEMBERS</p>
                  <p>{this.props.threadCount} THREAD</p>
                  <p>12 REPLIES</p>
                </Segment>
                <h4>Categories</h4>
                <div>{this.renderCategories()}</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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

function mapStateToProps({ authState, postState }) {
  return {
    token: authState.token,
    threadCount: postState.threadCount
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(App)
);
