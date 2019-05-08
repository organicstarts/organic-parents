import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  Segment,
  Grid,
  Image,
  Header,
  Button,
  Icon,
  Label
} from "semantic-ui-react";
import defaultImg from "../../images/image.png";
import { ClipLoader, SyncLoader } from "react-spinners";
import {
  getThreads,
  setSingleThread,
  deleteThread,
  getRepliesCount,
  lockThread,
  voteThread
} from "../../stores/actions/post";
import { getUsersCount, getUser } from "../../stores/actions/user";
import categories from "../../config-client/categories.json";
import ReactHtmlParser from "react-html-parser";

class Main extends Component {
  constructor() {
    super();
    this.state = { page: 0 };
    this.openThread = this.openThread.bind(this);
    this.getMoreThreads = this.getMoreThreads.bind(this);
  }

  openThread(data) {
    this.props.setSingleThread(data);
    this.props.history.push("/threaddetail");
  }
  componentDidMount() {
    this.props.getThreads(this.props.token, this.state.page);
    this.props.getRepliesCount(this.props.token);
    this.props.getUsersCount(this.props.token);
    document.addEventListener("scroll", this.getMoreThreads);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.getMoreThreads);
  }
  getMoreThreads() {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight &&
      !this.props.loading &&
      this.props.hasMore
    ) {
      let pageNum = this.state.page + 1;
      this.props.getThreads(this.props.token, pageNum);
      this.setState({ page: pageNum });
    }
  }

  renderCategories() {
    return categories.map(data => {
      return (
        <div key={data.key}>
          <p>
            {data.text}{" "}
            <span
              style={{
                backgroundColor: data.color,
                height: "10px",
                width: "10px",
                borderRadius: "15%",
                float: "right"
              }}
            />
          </p>
        </div>
      );
    });
  }
  renderThreads() {
    if (!this.props.threads) {
      return (
        <ClipLoader
          sizeUnit={"px"}
          size={34}
          color={"#36D7B7"}
          loading={true}
        />
      );
    }
    return this.props.threads.map((data, index) => {
      return (
        <Segment
          className="bird"
          color={data.color}
          key={data._id}
          style={{ borderRadius: "15px" }}
        >
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={2} textAlign="center">
                <Image
                  src={`http://192.168.0.9:3001/users/${data.owner}/avatar`}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImg;
                  }}
                  onClick={async () =>
                    await this.props.getUser(data.owner, this.props.token)
                  }
                  href="/userprofile"
                  circular
                  size="tiny"
                  style={{ minHeight: 48, minWidth: 48 }}
                />

                <div style={{ marginTop: "10px" }}>
                  <Button
                    disabled={data.lock}
                    circular
                    size="tiny"
                    basic
                    compact
                    icon="thumbs up"
                    color={
                      data.thumbVote[this.props.user._id] === 1
                        ? "orange"
                        : "grey"
                    }
                    onClick={() =>
                      this.props.voteThread(this.props.token, data._id, 1)
                    }
                  />
                  <Button
                    disabled={data.lock}
                    circular
                    size="tiny"
                    basic
                    compact
                    icon="thumbs down"
                    color={
                      data.thumbVote[this.props.user._id] === 2
                        ? "purple"
                        : "grey"
                    }
                    onClick={() =>
                      this.props.voteThread(this.props.token, data._id, 2)
                    }
                  />
                  <Label basic content={data.points} />
                </div>
              </Grid.Column>
              <Grid.Column width={14} stretched style={{ marginTop: "10px" }}>
                <Grid.Row>
                  <span
                    style={{
                      backgroundColor: data.color,
                      height: "15px",
                      width: "15px",
                      borderRadius: "50%",
                      float: "left",
                      margin: "2.5px 5px"
                    }}
                  />
                  {data.categories} {` Posted by `}
                  {data.ownerName !== "[deleted]" && data.ownerName ? (
                    <Link
                      to="/userprofile"
                      onClick={() =>
                        this.props.getUser(data.owner, this.props.token)
                      }
                      style={{ zIndex: 999 }}
                    >
                      <span> {data.ownerName} </span>
                    </Link>
                  ) : (
                    data.ownerName
                  )}
                  {data.lock ? (
                    <div style={{ textAlign: "center", float: "right" }}>
                      <Icon name="lock" fitted size="big" />{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {` - ${data.createdAt}`}
                </Grid.Row>
                <Grid.Row>
                  <Header as="h1" onClick={() => this.openThread(data)}>
                    {data.subject}
                  </Header>
                </Grid.Row>

                <Grid.Row
                  className="fade-up"
                  style={{
                    minHeight: "50px",
                    maxHeight: "200px",
                    wordBreak: "break-all",
                    overflow: "hidden"
                  }}
                  onClick={() => this.openThread(data)}
                >
                  <div style={{ marginTop: "10px", textAlign: "justify" }}>
                    {ReactHtmlParser(data.content)}
                  </div>
                </Grid.Row>
                <Grid>
                  <Grid.Column
                    style={{ marginTop: 25, color: "#999999" }}
                    width={16}
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => this.openThread(data)}
                    >
                      <Icon link name="comment alternate outline" />
                      {data.repliesCount}{" "}
                      {data.repliesCount === 1 ? "Comment" : "Comments"}
                    </span>
                    {this.props.user.role === "admin" ? (
                      <span style={{ cursor: "pointer" }}>
                        <span
                          onClick={() =>
                            this.props.deleteThread(
                              data._id,
                              this.props.token,
                              index
                            )
                          }
                        >
                          {" "}
                          <Icon link name="trash alternate outline" />
                          {`Delete `}
                        </span>
                        <span
                          onClick={() =>
                            this.props.lockThread(data._id, this.props.token)
                          }
                        >
                          <Icon link name="lock" />
                          Lock
                        </span>
                      </span>
                    ) : this.props.user.role === "moderator" ? (
                      <span
                        onClick={() =>
                          this.props.lockThread(data._id, this.props.token)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <Icon link name="lock" />
                        Lock
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    });
  }
  render() {
    return (
      <Grid centered>
        <Grid.Row columns={2}>
          <Grid.Column computer={10} mobile={16}>
            {this.renderThreads()}

            <div style={{ textAlign: "center" }}>
              <SyncLoader
                sizeUnit={"px"}
                size={24}
                color={"#36D7B7"}
                loading={this.props.loading}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={4} only="computer">
            <h4> Statistics</h4>
            <Segment>
              <p>
                <Link to="/memberlist">{this.props.userCount} MEMBERS</Link>
              </p>
              <p>{this.props.threadCount} THREAD</p>
              <p>{this.props.repliesCount} REPLIES</p>
            </Segment>
            <h4>Categories</h4>

            <Segment>{this.renderCategories()}</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ authState, userState, postState }) {
  return {
    token: authState.token,
    user: userState.user,
    threads: postState.threads,
    threadCount: postState.threadCount,
    repliesCount: postState.repliesCount,
    userCount: userState.usersCount,
    loading: postState.loading,
    hasMore: postState.hasMore
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    {
      getThreads,
      setSingleThread,
      deleteThread,
      getRepliesCount,
      getUsersCount,
      lockThread,
      getUser,
      voteThread
    }
  )(Main)
);
