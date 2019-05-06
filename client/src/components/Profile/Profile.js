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
      about: this.props.user.about ? this.props.user.about : "",
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
    if (window.confirm("are you sure you want to delete account?")) {
      this.props.deleteAccount(this.props.token);
      this.props.logout(this.props.token);
    } else {
      return false;
    }
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
    this.props.setSingleThread(data[0]);
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
          <Table.Cell>
            <Icon name="folder" /> {this.findThread(reply.thread)}
          </Table.Cell>
          <Table.Cell>
            <div
              style={{
                minHeight: "50px",
                maxHeight: "100px",
                overflow: "hidden"
              }}
            >
              {ReactHtmlParser(reply.content)}
            </div>
          </Table.Cell>
          <Table.Cell textAlign="right">
            {moment(reply.updatedAt).format("LLL")}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { enableEdit } = this.state;
    const { user } = this.props;
    return (
      <Container>
        <Grid centered stackable>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2">My Profile</Header>
              <Segment>
                <Grid verticalAlign="middle">
                  <Grid.Column computer={4} tablet={6} mobile={6}>
                    <Image
                      bordered
                      size="large"
                      circular
                      src={`http://192.168.0.9:3001/users/${user.id}/avatar`}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = blankImg;
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column computer={12} tablet={10} mobile={10}>
                    <Header as="h3" style={{ wordBreak: "break-all" }}>
                      {`${user.firstName} ${user.lastName}`}
                      <Header.Subheader>
                        {user.email}
                        <p>
                          Joined: {moment(user.createdAt).format("MM/DD/YYYY")}{" "}
                          <br />
                          Group: {user.role}
                        </p>
                      </Header.Subheader>
                    </Header>

                    <Button
                      circular
                      toggle
                      color="red"
                      icon="trash"
                      size="tiny"
                      floated="left"
                      onClick={this.deleteAccount}
                    />

                    <Button
                      circular
                      toggle
                      icon="edit"
                      color="teal"
                      size="tiny"
                      floated="left"
                      onClick={this.enableEdit}
                    />
                    <Button
                      circular
                      color="orange"
                      onClick={() => {
                        document.getElementById("getFile").click();
                      }}
                      icon="camera"
                      size="tiny"
                      floated="left"
                    />

                    <input
                      id="getFile"
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      capture="camera"
                      onChange={this.fileHandler}
                    />
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ marginBottom: "25px" }}>
            <Grid.Column>
              <Segment>
                <Header as="h3">About Me</Header>
                {this.state.enableEdit ? (
                  <TextArea
                    style={{ width: "100%" }}
                    name="about"
                    placeholder="Write something about yourself..."
                    value={this.state.about}
                    onChange={this.handleChange}
                  />
                ) : (
                  <div style={{ textIndent: "2em" }}>{this.state.about}</div>
                )}
                <Form onSubmit={this.saveChanges}>
                  {this.state.enableEdit && (
                    <div>
                      <Form.Group inline>
                        <Form.Input
                          label="First Name:"
                          transparent
                          placeholder={user.firstName}
                          name="firstName"
                          type="text"
                          value={
                            enableEdit ? this.state.firstName : user.firstName
                          }
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          label="Last Name:"
                          transparent
                          placeholder={user.lastName}
                          name="lastName"
                          type="text"
                          value={
                            enableEdit ? this.state.lastName : user.lastName
                          }
                          onChange={this.handleChange}
                        />
                      </Form.Group>
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
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
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
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ authState, userState, postState }) {
  return {
    user: userState.user,
    token: authState.token,
    myReplies: postState.myReplies,
    threads: postState.threads
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    {
      uploadPhoto,
      deleteAccount,
      logout,
      updateUser,
      getMyReplies,
      setSingleThread
    }
  )(Profile)
);
