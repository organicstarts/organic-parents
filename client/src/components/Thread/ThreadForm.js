import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { createNewThread } from "../../stores/actions/post";

class ThreadForm extends Component {
  constructor() {
    super();
    this.state = {
      subject: "",
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.createThread = this.createThread.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  createThread() {
    const { subject, content } = this.state;
    const threadInfo = {
      subject,
      content,
      token: this.props.token
    };
    this.props.createNewThread(threadInfo);
  }

  render() {
    return (
      <Form onSubmit={this.createThread} size="large">
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
