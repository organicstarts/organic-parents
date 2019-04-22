import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import { getUser } from "../../stores/actions/user";
import defaultImg from "../../images/image.png";
import ReactHtmlParser from "react-html-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

class ThreadDetail extends Component {
  constructor() {
    super();
    this.state = {
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitReply = this.submitReply.bind(this);
  }

  handleChange(value) {
    this.setState({ content: value });
  }
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
    console.log("hi", replyInfo);
    this.props.getReplies(replyInfo);
  }
  showReplies() {
    const { thread } = this.props;
    if (!thread.replies) {
      return "";
    }
    return thread.replies.map(reply => {
      return (
        <Comment key={reply._id}>
          <Comment.Avatar
            src={`http://localhost:3001/users/${reply.owner}/avatar`}
          />
          <Comment.Content>
            <Comment.Author as="a">
              {reply.ownerName !== "[deleted]" && reply.ownerName ? (
                <Link
                  to="/userprofile"
                  onClick={() =>
                    this.props.getUser(reply.owner, this.props.token)
                  }
                >
                  {reply.ownerName}
                </Link>
              ) : (
                reply.ownerName
              )}
            </Comment.Author>
            <Comment.Metadata>
              <div>{moment(reply.updatedAt).format("LLL")}</div>
            </Comment.Metadata>
            <Comment.Text>{ReactHtmlParser(reply.content)}</Comment.Text>
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
        <Grid style={{ margin: "25px 0" }}>
          <Grid.Row columns={2}>
            <Grid.Column width={2}>
              <Image
                src={`http://localhost:3001/users/${thread.owner}/avatar`}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = defaultImg;
                }}
                circular
                size="medium"
              />
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              {thread.ownerName !== "[deleted]" && thread.ownerName ? (
                <Link
                  to="/userprofile"
                  onClick={() =>
                    this.props.getUser(thread.owner, this.props.token)
                  }
                >
                  {thread.ownerName}
                </Link>
              ) : (
                thread.ownerName
              )}
              {thread.updatedAt}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div style={{ wordBreak: "break-all" }}>
                {ReactHtmlParser(thread.content)}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ReactQuill
          readOnly={this.props.thread.lock ? true : false}
          value={this.state.content}
          onChange={this.handleChange}
          theme="snow"
          placeholder="What are your thoughts..."
        />

        <Button
          disabled={this.props.thread.lock ? true : false}
          type="submit"
          fluid
          size="large"
          onClick={this.submitReply}
          color="teal"
        >
          Add Reply
        </Button>
        <Comment.Group
          style={{
            margin: "25px 0",
            borderTop: "1px solid black",
            maxWidth: "100%",
            padding: "25px"
          }}
        >
          {this.showReplies()}
        </Comment.Group>
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
  { postReply, getReplies, getUser }
)(ThreadDetail);
