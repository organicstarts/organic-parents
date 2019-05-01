import React, { Component } from "react";
import {
  Menu,
  Button,
  Container,
  Icon,
  Image,
  Search,
  Label,
  Segment,
  Grid
} from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./stores/actions/auth";
import Router from "./router/Router";
import logo from "./images/organic-parents-logo.png";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Responsive from "react-responsive";

const resultRenderer = ({ subject, content }) => {
  return (
    <Segment>
      <Label content={subject} />
      {ReactHtmlParser(content)}
    </Segment>
  );
};

// const Desktop = props => <Responsive {...props} minWidth={992} />;
// const Tablet = props => <Responsive {...props} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

class App extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.subject });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.subject);
      console.log(isMatch);
      this.setState({
        isLoading: false,
        results: _.filter(this.props.threads, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div className="App">
        <Menu
          fixed="top"
          size="mini"
          borderless
          style={{ paddingLeft: "25px", height: "90px", width: "100%" }}
        >
          <Menu.Item href="/">
            <Image
              src={logo}
              style={{ height: "75px", width: "auto" }}
              alt="Organic Parents"
            />
          </Menu.Item>
          <Default>
            <Menu.Item href="/thread">
              <Button animated="vertical" circular color="teal" size="small">
                <Button.Content hidden>
                  <Icon name="pencil" />
                </Button.Content>
                <Button.Content visible>Create Thread</Button.Content>
              </Button>
            </Menu.Item>
            {/* <Menu.Item>
              <Search
                input={{ icon: "search", iconPosition: "left" }}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                fluid
                size="small"
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                {...this.props}
              />
            </Menu.Item> */}
            <Menu.Item
              position="right"
              fitted="horizontally"
              style={{ marginRight: "25px" }}
            >
              {this.props.role !== "user" && (
                <Button
                  as={Link}
                  to="/banlist"
                  circular
                  icon="eraser"
                  color="teal"
                  size="mini"
                  label="Ban List"
                  style={{ marginRight: "25px", height: "25px" }}
                />
              )}

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
              {this.props.token ? (
                <Button
                  circular
                  icon="power off"
                  color="red"
                  size="mini"
                  onClick={() => this.props.logout(this.props.token)}
                />
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  circular
                  color="olive"
                  size="mini"
                >
                  Sign In/Register
                </Button>
              )}
            </Menu.Item>
          </Default>
          <Mobile>
            <Menu.Item position="right">
              <Grid width="equal" verticalAlign="middle">
                <Grid.Row>
                  <Grid.Column as={Link} to="/thread">
                    <Icon name="pencil" />
                  </Grid.Column>
                  {this.props.role !== "user" && (
                    <Grid.Column as={Link} to="/banlist">
                      <Icon name="eraser" color="teal" />
                    </Grid.Column>
                  )}
                  <Grid.Column as={Link} to="/profile">
                    <Icon name="user" color="grey" />
                  </Grid.Column>
                  <Grid.Column>
                    {this.props.token ? (
                      <Icon
                        name="power off"
                        color="red"
                        onClick={() => this.props.logout(this.props.token)}
                      />
                    ) : (
                      <Button
                        as={Link}
                        to="/login"
                        circular
                        compact
                        color="olive"
                        size="mini"
                      >
                        Sign In/Register
                      </Button>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Menu.Item>
          </Mobile>
        </Menu>
        <Container style={{ marginTop: "150px" }}>
          <Router />
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ authState, userState, postState }) {
  return {
    token: authState.token,
    role: userState.user.role,
    threads: postState.threads
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(App)
);
