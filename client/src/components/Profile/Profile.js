import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import {
  Segment,
  Grid,
  Container,
  Image,
  Header,
  Form,
  Button,
  Table,
  Icon,
  TextArea
} from "semantic-ui-react";
import {
  uploadPhoto,
  deleteAccount,
  updateUser
} from "../../stores/actions/user";
import { getMyReplies, setSingleThread } from "../../stores/actions/post";
import { logout } from "../../stores/actions/auth";
import blankImg from "../../images/image.png";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      about: this.props.about ? this.props.about : "",
      email: "",
      password: "",
      rePassword: "",
      enableEdit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    this.props.getMyReplies(this.props.token);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  enableEdit() {
    this.setState({ enableEdit: !this.state.enableEdit });
  }

  checkError() {
    return this.state.password !== this.state.rePassword;
  }

  deleteAccount() {
    this.props.deleteAccount(this.props.token);
    this.props.logout(this.props.token);
  }

  fileHandler = e => {
    const fileInfo = {
      avatar: e.target.files[0],
      token: this.props.token
    };
    this.props.uploadPhoto(fileInfo);
  };

  saveChanges() {
    const { firstName, lastName, password, about } = this.state;
    const updateInfo = {};
    if (firstName) updateInfo.firstName = firstName;
    if (lastName) updateInfo.lastName = lastName;
    if (password) updateInfo.password = password;
    if (about !== this.props.about) updateInfo.about = about;

    this.props.updateUser(updateInfo, this.props.token);
  }

  findThread(id) {
    const { threads } = this.props;
    let title = threads.filter(thread => thread._id === id);

    if (!title[0]) {
      title = "[deleted]";
    } else {
      title = title[0].subject;
    }

    return title;
  }
  openThread(id) {
    const { threads } = this.props;
    const data = threads.filter(thread => thread._id === id);
    if (!data[0]) return false;
    this.props.setSingleThread(data);
    this.props.history.push("/threaddetail");
  }

  renderPost() {
    const { myReplies } = this.props;
    if (myReplies.length < 1) return "loading";
    return myReplies.map(reply => {
      return (
        <Table.Row
          key={reply.createdAt}
          onClick={() => this.openThread(reply.thread)}
        >
          <Table.Cell collapsing>
            <Icon name="folder" /> {this.findThread(reply.thread)}
          </Table.Cell>
          <Table.Cell>{ReactHtmlParser(reply.content)}</Table.Cell>
          <Table.Cell collapsing textAlign="right">
            {moment(reply.updatedAt).format("LLL")}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { enableEdit } = this.state;
    return (
      <Container>
        <Grid centered>
          <Grid.Row divided columns={"equal"}>
            <Grid.Column>
              <Segment>
                <Image
                  circular
                  style={{ margin: "15px auto" }}
                  src={`http://localhost:3001/users/${this.props.id}/avatar`}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = blankImg;
                  }}
                />
                <Header as="h2" floated="left">
                  My Profile{" "}
                </Header>
                <Button
                  circular
                  floated="right"
                  onClick={() => {
                    document.getElementById("getFile").click();
                  }}
                >
                  Add Photo
                </Button>
                <input
                  id="getFile"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  capture="camera"
                  onChange={this.fileHandler}
                />
                <Button circular toggle icon="edit" onClick={this.enableEdit} />{" "}
                <Header as="h4">{this.props.email}</Header>
                <Form onSubmit={this.saveChanges}>
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
                        label="Confirm Password:"
                        transparent
                        placeholder="confirm new password"
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
                <Button circular onClick={this.deleteAccount}>
                  Delete Account
                </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row style={{ marginBottom: "25px" }}>
                <Grid.Column>
                  <Segment>
                    {this.state.enableEdit ? (
                      <TextArea
                        style={{ width: "100%" }}
                        name="about"
                        value={this.state.about}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <div>
                        <Header as="h3">About Me</Header>
                        {this.state.about}
                      </div>
                    )}
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
                      <Table.Body>{this.renderPost()}</Table.Body>
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

function mapStateToProps({ authState, userState, postState }) {
  return {
    email: userState.email,
    firstName: userState.firstName,
    lastName: userState.lastName,
    about: userState.about,
    id: userState._id,
    token: authState.token,
    myReplies: postState.myReplies,
    threads: postState.threads
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    { uploadPhoto, deleteAccount, logout, updateUser, getMyReplies, setSingleThread }
  )(Profile)
);
