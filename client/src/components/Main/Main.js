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
import { ClipLoader } from "react-spinners";
import { getThreads, setSingleThread } from "../../stores/actions/post";

class Main extends Component {
  constructor() {
    super();
    this.openThread = this.openThread.bind(this);
  }

  openThread(data) {
    this.props.setSingleThread(data)
    this.props.history.push('/threaddetail')
  }
  componentDidMount() {
    this.props.getThreads(this.props.token);
  }
  renderCategories() {
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
          <Segment color={data.color} key={data._id} onClick={() => this.openThread(data)}>
            <Header as="h1">{data.subject}</Header>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={2}>
                  <Image
                    src={`http://localhost:3001/users/${data.owner}/avatar`}
                    circular
                    size="tiny"
                  />
                </Grid.Column>
                <Grid.Column>
                  {data.ownerName} <br />
                  {data.updatedAt}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Segment style={{ wordBreak: "break-all" }}>
                    {data.content}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        );
      })
      .reverse();
  }
  render() {
    return <div>{this.renderCategories()}</div>;
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
    threads: postState.threads
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    { getThreads, setSingleThread }
  )(Main)
);
