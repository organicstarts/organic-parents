import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  Segment,
  Grid,
  Container,
  Image,
  Header,
  Form,
  Button,
  Table,
  Icon
} from "semantic-ui-react";
import defaultImg from "../../images/image.png";
import { ClipLoader } from "react-spinners";
import {
  getThreads,
  setSingleThread,
  deleteThread,
  getRepliesCount,
  lockThread
} from "../../stores/actions/post";
import { getUsersCount, getUser } from "../../stores/actions/user";
import categories from "../../config-client/categories.json";
import ReactHtmlParser from "react-html-parser";

class Main extends Component {
  constructor() {
    super();
    this.openThread = this.openThread.bind(this);
  }

  openThread(data) {
    this.props.setSingleThread(data);
    this.props.history.push("/threaddetail");
  }
  componentDidMount() {
    this.props.getThreads(this.props.token);
    this.props.getRepliesCount(this.props.token);
    this.props.getUsersCount(this.props.token);
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
    return this.props.threads
      .map((data, index) => {
        return (
          <Segment color={data.color} key={data._id} style={{borderRadius: "15px"}}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={3}>
                  <Image
                    src={`http://localhost:3001/users/${data.owner}/avatar`}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = defaultImg;
                    }}
                    circular
                    size="small"
                  />
                </Grid.Column>
                <Grid.Column width={13}>
                  <Grid.Row>
                    <Header as="h1" onClick={() => this.openThread(data)}>
                      {data.subject}
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    {data.ownerName !== "[deleted]" && data.ownerName ? (
                      <Link
                        to="/userprofile"
                        onClick={() =>
                          this.props.getUser(data.owner, this.props.token)
                        }
                      >
                        {`By: ${data.ownerName} - Created on ${data.createdAt}`}
                      </Link>
                    ) : (
                      `By: ${data.ownerName} - Created on ${data.createdAt}`
                    )}
                  </Grid.Row>
                  <Grid.Row style={{ marginTop: "5px" }}>
                    <div
                      style={{
                        backgroundColor: data.color,
                        height: "15px",
                        width: "15px",
                        borderRadius: "15%",
                        float: "left",
                        marginRight: "5px"
                      }}
                    />
                    {data.categories}
                  </Grid.Row>
                  <Grid.Row
                    className="fade-up"
                    style={{
                      maxHeight: "200px",
                      wordBreak: "break-all",
                      overflow: "hidden"
                    }}
                  >
                    {ReactHtmlParser(data.content)}
                  </Grid.Row>
                  <Grid.Column>
                    <Icon
                      link
                      name="comment alternate outline"
                      onClick={() => this.openThread(data)}
                    /> {data.repliesCount} Comments
                  </Grid.Column>
                  <Grid.Column>
                    {this.props.role === "admin" ? (
                      <div>
                        <Icon
                          link
                          name="trash alternate outline"
                          onClick={() =>
                            this.props.deleteThread(
                              data._id,
                              this.props.token,
                              index
                            )
                          }
                        />
                        <Icon
                          link
                          name="lock"
                          onClick={() =>
                            this.props.lockThread(data._id, this.props.token)
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Grid.Column>
                </Grid.Column>
              </Grid.Row>
              {/* <Grid.Row>
                <Grid.Column>
                  <Segment style={{ wordBreak: "break-all" }}>
                    {ReactHtmlParser(data.content)}
                  </Segment>
                </Grid.Column>
              </Grid.Row> */}
            </Grid>
          </Segment>
        );
      })
      .reverse();
  }
  render() {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>{this.renderThreads()}</Grid.Column>
          <Grid.Column width={4}>
            <Link to={"thread"}>new thread</Link> <br />
            <Link to={"banlist"}>Ban List</Link>
            <h4> Statistics</h4>
            <Segment>
              <p>{this.props.userCount} MEMBERS</p>
              <p>{this.props.threadCount} THREAD</p>
              <p>{this.props.repliesCount} REPLIES</p>
            </Segment>
            <h4>Categories</h4>
            <div>{this.renderCategories()}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const styles = {
  margin: { padding: "50px" }
};

function mapStateToProps({ authState, userState, postState }) {
  return {
    token: authState.token,
    firstName: userState.firstName,
    lastName: userState.lastName,
    id: userState._id,
    role: userState.role,
    threads: postState.threads,
    threadCount: postState.threadCount,
    repliesCount: postState.repliesCount,
    userCount: userState.usersCount
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
      getUser
    }
  )(Main)
);
