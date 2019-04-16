import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Segment,
  Grid,
  Container,
  Image,
  Header,
  Form,
  Button,
  Table,
  Icon,
  Card
} from "semantic-ui-react";
import moment from "moment";
import blankImg from "../../images/image.png";

class UserProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <Container>
        <Card fluid>
          <Image
            circular
            style={{ margin: "15px auto" }}
            src={`http://localhost:3001/users/${user._id}/avatar`}
            onError={e => {
              e.target.onerror = null;
              e.target.src = blankImg;
            }}
          />
          <Card.Content>
            <Card.Header>{`${user.firstName} ${user.lastName}`}</Card.Header>
            <Card.Meta>
              <span className="date">
                Joined in {moment(user.createdAt).format("LL")}
              </span>
            </Card.Meta>
            <Card.Description>
              <Header as="h3">About Me</Header>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Vestibulum aliquam vulputate
              eleifend. Curabitur rhoncus eleifend auctor. Curabitur posuere,
              justo sit amet faucibus condimentum, nunc justo fringilla neque,
              quis dapibus felis felis ut quam. Nullam vitae interdum urna.
              Phasellus porttitor dapibus sapien, sit amet iaculis magna
              porttitor at. Proin imperdiet malesuada justo, ut faucibus eros
              imperdiet at. Nam ultrices convallis dui, sit amet suscipit sapien
              vehicula nec. Suspendisse eros tortor, ultrices sed leo et,
              pellentesque semper velit. Curabitur suscipit purus in ex euismod,
              nec varius elit bibendum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Phasellus at enim sed ex euismod fermentum. Sed
              sit amet elit vitae magna rutrum commodo consequat eget lorem. Nam
              molestie libero metus, in tincidunt odio semper commodo. Donec
              vehicula imperdiet risus. Quisque porta, enim at dictum semper,
              ante nibh iaculis velit, vitae convallis tortor libero sit amet
              nisi. Sed auctor ex eget ipsum pulvinar aliquam. Nam viverra,
              dolor id volutpat hendrerit, mi turpis iaculis eros, eu tincidunt
              mauris nulla vitae ex. Sed vel tempus ligula, ac malesuada tortor.
              Integer tincidunt ante quis tortor eleifend cursus. Suspendisse
              sodales odio sagittis, elementum odio quis, fringilla lectus.
              Mauris dapibus ac nibh quis ornare.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>

        <Segment>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Cell>
                  <Header as="h3">Your Posts</Header>
                </Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>
                  <Icon name="folder" /> Lorem Ipsum
                </Table.Cell>
                <Table.Cell>post title name</Table.Cell>
                <Table.Cell collapsing textAlign="right">
                  10 hours ago
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>
                  <Icon name="folder" /> Lorem Ipsum
                </Table.Cell>
                <Table.Cell>post title name</Table.Cell>
                <Table.Cell collapsing textAlign="right">
                  10 hours ago
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>
                  <Icon name="folder" /> Lorem Ipsum
                </Table.Cell>
                <Table.Cell>post title name</Table.Cell>
                <Table.Cell collapsing textAlign="right">
                  10 hours ago
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps({ authState, userState }) {
  return {
    token: authState.token,
    user: userState.otherUser
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(UserProfile)
);
