import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  Button,
  Segment,
  Header,
  Grid,
  List,
  Image
} from "semantic-ui-react";
import { createNewThread } from "../../stores/actions/post";
import categories from "../../config-client/categories.json";
import logo from "../../images/organic-parents-logo.png";
import axios from "axios";
import CustomTextEditor from "../common/CustomTextEditor";

class ThreadForm extends Component {
  constructor() {
    super();
    this.state = {
      subject: "",
      content: "",
      category: "",
      urlIds: JSON.parse(localStorage.getItem("urlIds")) || [],
      isDirty: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.createThread = this.createThread.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleUrlId = this.handleUrlId.bind(this);
  }

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
      isDirty: e.target.value ? true : false
    });
  handleContentChange(value) {
    this.setState({ content: value, isDirty: value ? true : false });
  }
  handleUrlId = value => {
    this.setState({ urlIds: value });
  };
  handleSelectChange = (e, data) => this.setState({ [data.name]: data.value });

  createThread() {
    const { urlIds, subject, category, content } = this.state;
    this.setState({ isDirty: false });
    urlIds.map(async id => {
      if (!content.includes(id)) {
        await axios.delete(`image/${id}`);
      }
    });
    const threadInfo = {
      subject,
      category,
      content,
      token: this.props.token
    };
    this.props.createNewThread(threadInfo);

    localStorage.removeItem("urlIds");
  }

  render() {
    const { content, urlIds, isDirty } = this.state;
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column computer={12} mobile={16}>
            <Header as="h1">Create a post</Header>

            <Form onSubmit={this.createThread} size="large">
              <Form.Select
                placeholder="Select Category"
                name="category"
                options={categories}
                onChange={this.handleSelectChange}
                value={this.state.category}
                required
              />
              <Segment>
                <Form.Input
                  fluid
                  placeholder="Title"
                  name="subject"
                  type="text"
                  value={this.state.subject}
                  onChange={this.handleChange}
                  required
                  autoFocus
                />

                <CustomTextEditor
                  isDirty={isDirty}
                  content={content}
                  urlIds={urlIds}
                  handleContentChange={this.handleContentChange}
                  handleUrlId={this.handleUrlId}
                />

                <Button type="submit" fluid size="large" color="teal">
                  Submit
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
          <Grid.Column computer={4} mobile={16}>
            <Header style={{ marginTop: "15px" }} as="h4">
              {" "}
              Statistics
            </Header>
            <Segment>
              <p>{this.props.userCount} MEMBERS</p>
              <p>{this.props.threadCount} THREAD</p>
              <p>{this.props.repliesCount} REPLIES</p>
            </Segment>
            <Segment>
              <Image src={logo} size="tiny" inline verticalAlign="bottom" />{" "}
              Before posting
              <List ordered celled size="medium">
                <List.Item>Remember the human</List.Item>
                <List.Item>Behave like you would in real life</List.Item>
                <List.Item>Look for the original source of content</List.Item>
                <List.Item>Search for duplicates before posting</List.Item>
                <List.Item>Read the community’s rules</List.Item>
              </List>
            </Segment>
            <Segment>
              <Header as="h4">2019 · Organic Parents</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ authState, userState, postState }) {
  return {
    token: authState.token,
    userCount: userState.usersCount,
    threadCount: postState.threadCount,
    repliesCount: postState.repliesCount
  };
}

export default connect(
  mapStateToProps,
  { createNewThread }
)(ThreadForm);
