import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login, signUp } from "../../stores/actions/auth";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class LoginSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      showLoginForm: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  login() {
    const { email, password } = this.state;
    const loginInfo = {
      email,
      password
    };
    this.props.login(loginInfo);
  }

  signUp() {
    const { firstName, lastName, email, password } = this.state;
    const signUpInfo = {
      firstName,
      lastName,
      email,
      password
    };
    this.props.signUp(signUpInfo);
  }

  toggleForm = e => {
    if (e.target.name === "login") {
      this.setState({ showLoginForm: true });
    } else {
      this.setState({ showLoginForm: false, email: "", password: "" });
    }
  };
  onChange = e => {
    this.setState({ [e.name]: [e.value] });
  };

  renderForm() {
    const { showLoginForm } = this.state;
    if (showLoginForm) {
      return (
        <Segment>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form onSubmit={this.login} size="large">
            {this.props.error ? (
              <Header as="h3" color="red">
                {this.props.error}
              </Header>
            ) : (
              ""
            )}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="email"
              name="email"
              type="email"
              value={this.state.pin}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <Form.Input
              fluid
              icon="key"
              iconPosition="left"
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <Button type="submit" fluid size="large" color="teal">
              Log In
            </Button>
          </Form>
        </Segment>
      );
    } else {
      return (
        <Segment>
          <Form onSubmit={this.signUp} size="large">
            <Header as="h2" color="orange" textAlign="center">
              Sign Up for Free
            </Header>
            <Form.Input
              placeholder="First Name"
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <Form.Input
              placeholder="Last Name"
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <Form.Input
              error={this.props.error ? true : false}
              label={this.props.error ? this.props.error : null}
              placeholder="email"
              name="email"
              type="email"
              value={this.state.pin}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <Form.Input
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <Button type="submit" fluid size="large" color="orange">
              Create Account
            </Button>
          </Form>
        </Segment>
      );
    }
  }

  render() {
    return (
      <div className="login-form">
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 550 }}>
            <Button
              color="teal"
              name="login"
              content="Login"
              onClick={this.toggleForm}
            />
            <Button
              color="orange"
              name="signup"
              content="Sign Up"
              onClick={this.toggleForm}
            />

            {this.renderForm()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ authState }) => {
  return {
    token: authState.token,
    email: authState.email,
    loading: authState.loading,
    error: authState.error
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { login, signUp }
  )(LoginSignUp)
);
