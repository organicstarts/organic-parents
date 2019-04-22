import React, { Component } from "react";
import { connect } from "react-redux";
import { getBannedUsers, banUser } from "../../stores/actions/user";
import { Card, Image, Icon, Container } from "semantic-ui-react";
import defaultImg from "../../images/image.png";
import moment from "moment";
class BanList extends Component {
  componentDidMount() {
    this.props.getBannedUsers(this.props.token);
  }

  renderBannedUsers() {
    const { bannedUsers } = this.props;
    return bannedUsers.map(user => {
      return (
        <Card>
          <Image
            src={`http://localhost:3001/users/${user._id}/avatar`}
            onError={e => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
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
            <Icon
              link
              name="ban"
              color={user.ban ? "red" : "grey"}
              onClick={() => this.props.banUser(user._id, this.props.token)}
            />
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return <Container><Card.Group>{this.renderBannedUsers()}</Card.Group></Container>;
  }
}

function mapStatesToProp({ authState, userState }) {
  return {
    bannedUsers: userState.bannedUsers,
    token: authState.token
  };
}
export default connect(
  mapStatesToProp,
  { getBannedUsers, banUser }
)(BanList);
