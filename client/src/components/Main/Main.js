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
import { getThreads, setSingleThread } from "../../stores/actions/post";

import categories from "../../config-client/categories.json";

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
      .map(data => {
        return (
          <Segment
            color={data.color}
            key={data._id}
            onClick={() => this.openThread(data)}
          >
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
                    <Header as="h1">{data.subject}</Header>
                  </Grid.Row>

                  <Grid.Row>
                    {`By: ${data.ownerName} - Updated on ${data.updatedAt}`}
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
            <Link to={"thread"}>new thread</Link>
            <h4> Statistics</h4>
            <Segment>
              <p>16 MEMBERS</p>
              <p>{this.props.threadCount} THREAD</p>
              <p>12 REPLIES</p>
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
    threads: postState.threads,
    threadCount: postState.threadCount
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    { getThreads, setSingleThread }
  )(Main)
);
