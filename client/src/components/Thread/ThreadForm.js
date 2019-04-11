import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { createNewThread } from "../../stores/actions/post";
import categories from "../../config-client/categories.json";

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
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

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
        <Form.TextArea
          placeholder="content"
          name="content"
          type="text"
          value={this.state.content}
          onChange={this.handleChange}
          required
          autoFocus
        />

        <Button type="submit" fluid size="large" color="teal">
          Submit
        </Button>
      </Form>
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
