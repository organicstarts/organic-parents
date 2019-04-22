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
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import logo from "../../images/organic-parents-logo.png";

Quill.register("modules/imageResize", ImageResize);
class ThreadForm extends Component {
  constructor() {
    super();
    this.state = {
      subject: "",
      content: "",
      category: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.createThread = this.createThread.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleContentChange(value) {
    this.setState({ content: value });
  }

  handleSelectChange = (e, data) => this.setState({ [data.name]: data.value });

  createThread() {
    const { subject, category, content } = this.state;
    const threadInfo = {
      subject,
      category,
      content,
      token: this.props.token
    };
    this.props.createNewThread(threadInfo);
  }

  render() {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={12}>
            <Header as="h1">Create a post</Header>

            <Form onSubmit={this.createThread} size="large">
              <Form.Select
                style={{ width: "25em" }}
                placeholder="Select Category"
                name="category"
                options={categories}
                onChange={this.handleSelectChange}
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

                <ReactQuill
                  value={this.state.content}
                  onChange={this.handleContentChange}
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" }
                      ],
                      ["link", "image"],
                      ["clean"]
                    ],
                    imageResize: {
                      handleStyles: {
                        backgroundColor: "black",
                        border: "none",
                        color: "white"
                      },
                      modules: ["Resize", "DisplaySize", "Toolbar"]
                    }
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video"
                  ]}
                />

                <Button type="submit" fluid size="large" color="teal">
                  Submit
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
          <Grid.Column width={4}>
            <h4> Statistics</h4>
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
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column width={8}>Send Feedback</Grid.Column>
                  <Grid.Column width={3}>Report </Grid.Column>
                  <Grid.Column width={3}>Bugs </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                  <Grid.Column>About</Grid.Column>
                  <Grid.Column>Media</Grid.Column>
                  <Grid.Column>Terms</Grid.Column>
                  <Grid.Column>Privacy</Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ authState }) {
  return {
    token: authState.token
  };
}

export default connect(
  mapStateToProps,
  { createNewThread }
)(ThreadForm);
