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
          color: "blue",
          thread: "News & Announcements",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet mauris diam, a interdum ipsum ullamcorper quis. Duis a dolor lorem. Ut vel ex non nisl rhoncus efficitur. Nullam finibus felis quis purus tristique, mattis luctus mauris placerat. Pellentesque mattis ante lorem, convallis lacinia magna pharetra vel. Nulla consectetur commodo mi ac imperdiet. Nam dapibus massa nunc, ac ornare sapien aliquam at. Ut ultricies malesuada nisi, sed aliquet massa cursus eu. Suspendisse lacinia tellus purus. Mauris facilisis pellentesque arcu, ut maximus orci sagittis at. Duis sit amet mi vitae nisl gravida volutpat et nec sem.",
          activity: "2 Months, 3 Weeks Ago"
        },
        {
          color: "olive",
          thread: "General Discussion",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet mauris diam, a interdum ipsum ullamcorper quis. Duis a dolor lorem. Ut vel ex non nisl rhoncus efficitur. Nullam finibus felis quis purus tristique, mattis luctus mauris placerat. Pellentesque mattis ante lorem, convallis lacinia magna pharetra vel. Nulla consectetur commodo mi ac imperdiet. Nam dapibus massa nunc, ac ornare sapien aliquam at. Ut ultricies malesuada nisi, sed aliquet massa cursus eu. Suspendisse lacinia tellus purus. Mauris facilisis pellentesque arcu, ut maximus orci sagittis at. Duis sit amet mi vitae nisl gravida volutpat et nec sem.",
          activity: "1 Months, 3 Weeks Ago"
        },
        {
          color: "red",
          thread: "Formula",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet mauris diam, a interdum ipsum ullamcorper quis. Duis a dolor lorem. Ut vel ex non nisl rhoncus efficitur. Nullam finibus felis quis purus tristique, mattis luctus mauris placerat. Pellentesque mattis ante lorem, convallis lacinia magna pharetra vel. Nulla consectetur commodo mi ac imperdiet. Nam dapibus massa nunc, ac ornare sapien aliquam at. Ut ultricies malesuada nisi, sed aliquet massa cursus eu. Suspendisse lacinia tellus purus. Mauris facilisis pellentesque arcu, ut maximus orci sagittis at. Duis sit amet mi vitae nisl gravida volutpat et nec sem.",
          activity: "2 Months, 3 Weeks Ago"
        },
        {
          color: "purple",
          thread: "Recommendations",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet mauris diam, a interdum ipsum ullamcorper quis. Duis a dolor lorem. Ut vel ex non nisl rhoncus efficitur. Nullam finibus felis quis purus tristique, mattis luctus mauris placerat. Pellentesque mattis ante lorem, convallis lacinia magna pharetra vel. Nulla consectetur commodo mi ac imperdiet. Nam dapibus massa nunc, ac ornare sapien aliquam at. Ut ultricies malesuada nisi, sed aliquet massa cursus eu. Suspendisse lacinia tellus purus. Mauris facilisis pellentesque arcu, ut maximus orci sagittis at. Duis sit amet mi vitae nisl gravida volutpat et nec sem.",
          activity: "3 Months, 3 Weeks Ago"
        }
      ]
    };
  }
  renderCategories() {
    return this.state.categories.map(data => {
      return (
        <Segment color={data.color}>
          <Header as="h1">{data.thread}</Header>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={2}>
                <Image
                  src={`http://localhost:3001/users/${this.props.id}/avatar`}
                  circular
                  size="tiny"
                />
              </Grid.Column>
              <Grid.Column>
                {this.props.firstName} {this.props.lastName} <br/>
                {data.activity}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p>{data.content}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    });
  }
  render() {
    return <div>{this.renderCategories()}</div>;
  }
}

const styles = {
  margin: { padding: "50px" }
};

function mapStateToProps({ authState, userState }) {
  return {
    email: authState.email,
    firstName: userState.firstName,
    lastName: userState.lastName,
    id: userState._id
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Main)
);
