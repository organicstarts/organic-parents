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

class Main extends Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          forum: "News & Announcements",
          topics: 10,
          posts: 41,
          activity: "2 Months, 3 Weeks Ago"
        },
        {
          forum: "General Discussion",
          topics: 99,
          posts: 521,
          activity: "1 Months, 3 Weeks Ago"
        },
        {
          forum: "Formula",
          topics: 55,
          posts: 68,
          activity: "2 Months, 3 Weeks Ago"
        },
        {
          forum: "Recommendations",
          topics: 5,
          posts: 5,
          activity: "3 Months, 3 Weeks Ago"
        }
      ]
    };
  }
  renderCategories() {
    return this.state.categories.map(data => {
      return (
        <Table.Row className="hover"key={data.forum} verticalAlign="middle">
          <Table.Cell style={styles.margin}>
            <Header as={Link} to="/profile">{data.forum}</Header>
          </Table.Cell>
          <Table.Cell style={styles.margin}>
            <Header>{data.topics}</Header>
          </Table.Cell>
          <Table.Cell style={styles.margin}>
            <Header>{data.posts}</Header>
          </Table.Cell>
          <Table.Cell style={styles.margin}>
            <Header>{data.activity}</Header>
          </Table.Cell>
        </Table.Row>
      );
    });
  }
  render() {
    return (
      <Container>
        <Header as="h1" style={{marginBottom: "55px"}}>Forums</Header>
        <Table padded="very" size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Forum</Table.HeaderCell>
              <Table.HeaderCell>Topics</Table.HeaderCell>
              <Table.HeaderCell>Posts</Table.HeaderCell>
              <Table.HeaderCell>Activity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderCategories()}</Table.Body>
        </Table>
      </Container>
    );
  }
}

const styles = {
  margin: { padding: "50px" }
};

function mapStateToProps({ authState }) {
  return {
    email: authState.email,
    firstName: authState.firstName,
    lastName: authState.lastName
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Main)
);
