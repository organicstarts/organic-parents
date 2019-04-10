import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  Button,
  Grid,
  Image,
  Header,
  Segment,
  Comment
} from "semantic-ui-react";
import { postReply, getReplies } from "../../stores/actions/post";

class ThreadDetail extends Component {
  constructor() {
    super();
    this.state = {
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitReply = this.submitReply.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  submitReply() {
    const { content } = this.state;
    const replyInfo = {
      content,
      threadId: this.props.thread._id,
      token: this.props.token
    };
    this.props.postReply(replyInfo);
  }

  componentDidMount() {
    const replyInfo = {
      token: this.props.token,
      threadId: this.props.thread._id
    };
    this.props.getReplies(replyInfo);
  }
  showReplies() {
    const { thread } = this.props;
    if(!thread.replies) {
      return ""
    }
    return thread.replies.map(reply => {
    
      return (
        <Comment key={reply._id}>
      <Comment.Avatar src={`http://localhost:3001/users/${reply.owner}/avatar`} />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>{reply.content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

      );
    });
  }

  render() {
    const { thread } = this.props;
    return (
      <Segment>
        <Header as="h1">{thread.subject}</Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={2}>
              <Image
                src={`http://localhost:3001/users/${thread.owner}/avatar`}
                circular
                size="tiny"
              />
            </Grid.Column>
            <Grid.Column>
              {thread.ownerName} <br />
              {thread.updatedAt}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <p style={{ wordBreak: "break-all" }}>{thread.content}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Comment.Group>{this.showReplies()}</Comment.Group>
        <Form
          onSubmit={this.submitReply}
          size="large"
          style={{ marginTop: "25px" }}
        >
          <Form.TextArea
            placeholder="reply..."
            name="content"
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
            required
            autoFocus
          />

          <Button type="submit" fluid size="large" color="teal">
            Add Reply
          </Button>
        </Form>
      </Segment>
    );
  }
}
function mapStateToProps({ authState, postState }) {
  return {
    token: authState.token,
    thread: postState.thread
  };
}

export default connect(
  mapStateToProps,
  { postReply, getReplies }
)(ThreadDetail);
