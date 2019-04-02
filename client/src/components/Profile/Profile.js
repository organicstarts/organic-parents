import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Segment,
  Grid,
  Container,
  Image,
  Header,
  Form,
  Button,
  Table,
  Icon
} from "semantic-ui-react";
import blankImg from "../../images/image.png";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      enableEdit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  enableEdit() {
    this.setState({ enableEdit: !this.state.enableEdit });
  }

  checkError() {
    return this.state.password !== this.state.rePassword;
  }

  render() {
    const { enableEdit } = this.state;
    return (
      <Container>
        <Grid centered>
          <Grid.Row divided columns={"equal"}>
            <Grid.Column>
              <Segment>
                <Image style={{ marginBottom: "15px" }} src={blankImg} />
                <Header as="h2" floated="left">
                  My Profile{" "}
                </Header>
                <Button circular floated="right">
                  Add Photo
                </Button>
                <Button circular toggle icon="edit" onClick={this.enableEdit} />{" "}
                <Header as="h4">{this.props.email}</Header>
                <Form>
                  <Form.Group inline>
                    <Form.Input
                      label="First Name:"
                      transparent
                      placeholder={this.props.firstName}
                      name="firstName"
                      type="text"
                      value={
                        enableEdit ? this.state.firstName : this.props.firstName
                      }
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      label="Last Name:"
                      transparent
                      placeholder={this.props.lastName}
                      name="lastName"
                      type="text"
                      value={
                        enableEdit ? this.state.lastName : this.props.lastName
                      }
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  {this.state.enableEdit && (
                    <div>
                      <Form.Input
                        label={
                          this.checkError()
                            ? "New Password ***Password does not match***"
                            : "New Password"
                        }
                        transparent
                        error={this.checkError()}
                        placeholder="new password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        label="Re-Type Password:"
                        transparent
                        placeholder="re-type new password"
                        name="rePassword"
                        type="password"
                        value={this.state.rePassword}
                        onChange={this.handleChange}
                      />

                      <Button circular fluid disabled={this.checkError()}>
                        Save
                      </Button>
                    </div>
                  )}
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row style={{ marginBottom: "25px" }}>
                <Grid.Column>
                  <Segment>
                    <Header as="h3">About Me</Header>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Vestibulum aliquam vulputate
                    eleifend. Curabitur rhoncus eleifend auctor. Curabitur
                    posuere, justo sit amet faucibus condimentum, nunc justo
                    fringilla neque, quis dapibus felis felis ut quam. Nullam
                    vitae interdum urna. Phasellus porttitor dapibus sapien, sit
                    amet iaculis magna porttitor at. Proin imperdiet malesuada
                    justo, ut faucibus eros imperdiet at. Nam ultrices convallis
                    dui, sit amet suscipit sapien vehicula nec. Suspendisse eros
                    tortor, ultrices sed leo et, pellentesque semper velit.
                    Curabitur suscipit purus in ex euismod, nec varius elit
                    bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Phasellus at enim sed ex euismod fermentum. Sed sit
                    amet elit vitae magna rutrum commodo consequat eget lorem.
                    Nam molestie libero metus, in tincidunt odio semper commodo.
                    Donec vehicula imperdiet risus. Quisque porta, enim at
                    dictum semper, ante nibh iaculis velit, vitae convallis
                    tortor libero sit amet nisi. Sed auctor ex eget ipsum
                    pulvinar aliquam. Nam viverra, dolor id volutpat hendrerit,
                    mi turpis iaculis eros, eu tincidunt mauris nulla vitae ex.
                    Sed vel tempus ligula, ac malesuada tortor. Integer
                    tincidunt ante quis tortor eleifend cursus. Suspendisse
                    sodales odio sagittis, elementum odio quis, fringilla
                    lectus. Mauris dapibus ac nibh quis ornare.
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h3">Your Posts</Header>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell collapsing>
                            <Icon name="folder" /> Lorem Ipsum
                          </Table.Cell>
                          <Table.Cell>post title name</Table.Cell>
                          <Table.Cell collapsing textAlign="right">
                            10 hours ago
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell collapsing>
                            <Icon name="folder" /> Lorem Ipsum
                          </Table.Cell>
                          <Table.Cell>post title name</Table.Cell>
                          <Table.Cell collapsing textAlign="right">
                            10 hours ago
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell collapsing>
                            <Icon name="folder" /> Lorem Ipsum
                          </Table.Cell>
                          <Table.Cell>post title name</Table.Cell>
                          <Table.Cell collapsing textAlign="right">
                            10 hours ago
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ authState }) {
  return {
    email: authState.email,
    firstName: authState.firstName,
    lastName: authState.lastName
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Profile)
);
