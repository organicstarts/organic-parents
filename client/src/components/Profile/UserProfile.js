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
import ReactHtmlParser from "react-html-parser";
import blankImg from "../../images/image.png";
import { setSingleThread } from "../../stores/actions/post";
import { banUser, changeRole } from "../../stores/actions/user";

class UserProfile extends Component {
  findThread(id) {
    const { threads } = this.props;
    let title = threads.filter(thread => thread._id === id);

    if (!title[0]) {
      title = "[deleted]";
    } else {
      title = title[0].subject;
    }

    return title;
  }

  openThread(id) {
    const { threads } = this.props;
    const data = threads.filter(thread => thread._id === id);
    if (!data[0]) return false;
    this.props.setSingleThread(data[0]);
    this.props.history.push("/threaddetail");
  }

  renderPost() {
    const { user } = this.props;
    if (!user.replies) return <div>""</div>;
    return user.replies.map(reply => {
      return (
        <Table.Row
          key={reply.createdAt}
          onClick={() => this.openThread(reply.thread)}
        >
          <Table.Cell collapsing>
            <Icon name="folder" /> {this.findThread(reply.thread)}
          </Table.Cell>
          <Table.Cell>{ReactHtmlParser(reply.content)}</Table.Cell>
          <Table.Cell collapsing textAlign="right">
            {moment(reply.updatedAt).format("LLL")}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { user, role } = this.props;

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
              <span>
                <strong>
                  {user.role} - {user.ban ? "Banned" : ""}
                </strong>
              </span>
              <br />
              <span>Joined in {moment(user.createdAt).format("LL")}</span>
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
          {role === "admin" && (
            <Card.Content extra>
              <Icon
                link
                name="ban"
                color={user.ban ? "red" : "grey"}
                onClick={() => this.props.banUser(user._id, this.props.token)}
              />
              <Icon
                link
                name="bolt"
                color={user.role === "moderator" ? "yellow" : "grey"}
                onClick={() =>
                  this.props.changeRole(user._id, this.props.token)
                }
              />
            </Card.Content>
          )}
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
            <Table.Body>{this.renderPost()}</Table.Body>
          </Table>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps({ authState, userState, postState }) {
  return {
    token: authState.token,
    user: userState.otherUser,
    role: userState.role,
    threads: postState.threads
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { setSingleThread, banUser, changeRole }
  )(UserProfile)
);
