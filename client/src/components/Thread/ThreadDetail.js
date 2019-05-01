import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Icon,
  Button,
  Grid,
  Image,
  Header,
  Segment,
  Comment
} from "semantic-ui-react";
import { postReply, getReplies, voteThread } from "../../stores/actions/post";
import { getUser } from "../../stores/actions/user";
import defaultImg from "../../images/image.png";
import ReactHtmlParser from "react-html-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

class ThreadDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
      // toggle: this.props.thread.replies.map(reply => false)
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
            src={`http://192.168.0.9:3001/users/${reply.owner}/avatar`}
            onError={e => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
          />
          <Comment.Content>
            <Comment.Author>
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
              {/* <Comment.Action>Reply</Comment.Action> */}
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
        {thread.lock && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "linear-gradient(0deg, rgba(2,0,36,.25) 0%, rgba(9,9,121,.25) 35%, rgba(0,212,255,.25) 100%)",
              zIndex: 2
            }}
          />
        )}
        <Grid style={{ margin: "25px 0" }} stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={2} textAlign="center">
              <Image
                src={`http://192.168.0.9:3001/users/${thread.owner}/avatar`}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = defaultImg;
                }}
                onClick={() =>
                  this.props.getUser(thread.owner, this.props.token)
                }
                href="/userprofile"
                centered
                circular
                size="tiny"
              />
              <div style={{ marginTop: "10px" }}>
                <Button
                  circular
                  size="mini"
                  basic
                  compact
                  icon="thumbs up"
                  color={
                    thread.thumbVote &&
                    thread.thumbVote[this.props.user._id] === 1
                      ? "orange"
                      : "grey"
                  }
                  onClick={() =>
                    this.props.voteThread(this.props.token, thread._id, 1)
                  }
                />
                <span style={{ margin: "10px" }}>{thread.points}</span>
                <Button
                  circular
                  size="mini"
                  basic
                  compact
                  icon="thumbs down"
                  color={
                    thread.thumbVote &&
                    thread.thumbVote[this.props.user._id] === 2
                      ? "purple"
                      : "grey"
                  }
                  onClick={() =>
                    this.props.voteThread(this.props.token, thread._id, 2)
                  }
                />
              </div>
            </Grid.Column>
            <Grid.Column width={13} stretched>
              <Grid.Row>
                <span
                  style={{
                    backgroundColor: thread.color,
                    height: "15px",
                    width: "15px",
                    borderRadius: "50%",
                    float: "left",
                    margin: "2.5px 5px"
                  }}
                />
                {thread.categories} {` Posted by `}
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
                {` - ${thread.createdAt}`}
                {thread.lock ? (
                  <div
                    style={{ textAlign: "center", float: "right", zIndex: 5 }}
                  >
                    <Icon name="lock" fitted size="big" />{" "}
                  </div>
                ) : (
                  ""
                )}
              </Grid.Row>
              <Grid.Row>
                <Header as="h1">{thread.subject}</Header>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <div style={{ marginTop: "10px", wordBreak: "break-all" }}>
                    {ReactHtmlParser(thread.content)}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ReactQuill
          readOnly={this.props.thread.lock ? true : false}
          value={this.state.content}
          onChange={this.handleChange}
          theme="snow"
          placeholder="What are your thoughts..."
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

        <Button
          disabled={this.props.thread.lock ? true : false}
          type="submit"
          fluid
          size="large"
          onClick={this.submitReply}
          color={this.props.thread.lock ? "grey" : "teal"}
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
function mapStateToProps({ authState, userState, postState }) {
  return {
    token: authState.token,
    thread: postState.thread,
    user: userState.user
  };
}

export default connect(
  mapStateToProps,
  { postReply, getReplies, getUser, voteThread }
)(ThreadDetail);
