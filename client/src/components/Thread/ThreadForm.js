import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Segment } from "semantic-ui-react";
import { createNewThread } from "../../stores/actions/post";
import categories from "../../config-client/categories.json";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  <Segment>
        <Form onSubmit={this.createThread} size="large">
          <Form.Select
            placeholder="Select Category"
            name="category"
            options={categories}
            onChange={this.handleSelectChange}
            required
          />
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
          />
  
          <Button type="submit" fluid size="large" color="teal">
            Submit
          </Button>
        </Form>
  </Segment>
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
