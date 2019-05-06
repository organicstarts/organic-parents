import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers, banUser, getUser } from "../../stores/actions/user";
import { Card, Image, Icon, Container } from "semantic-ui-react";
import defaultImg from "../../images/image.png";
import moment from "moment";

class MemberList extends Component {
  componentDidMount() {
    this.props.getAllUsers(this.props.token);
  }

  renderBannedUsers() {
    const { allUsers } = this.props;
    return allUsers.map(user => {
      return (
        <Card key={user._id}>
          <Image
            src={`http://192.168.0.9:3001/users/${user._id}/avatar`}
            onError={e => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
            onClick={async () =>
              await this.props.getUser(user._id, this.props.token)
            }
            href="/userprofile"
            style={{ minHeight: "250px" }}
          />
          <Card.Content>
            <Card.Header>
              {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Meta>
              <span className="date">
                Joined in {moment(user.createdAt).format("LL")}
              </span>
            </Card.Meta>
            <Card.Description>{user.about}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.role && this.props.role !== "user" && (
              <Icon
                link
                name="ban"
                color={user.ban ? "red" : "grey"}
                onClick={() => this.props.banUser(user._id, this.props.token)}
              />
            )}
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <Container>
        <Card.Group>
          {this.props.allUsers && this.renderBannedUsers()}
        </Card.Group>
      </Container>
    );
  }
}

function mapStatesToProp({ authState, userState }) {
  return {
    allUsers: userState.allUsers,
    token: authState.token,
    role: userState.user.role
  };
}
export default connect(
  mapStatesToProp,
  { getAllUsers, banUser, getUser }
)(MemberList);
