import React, { Component } from "react";
import { Segment, Grid, Menu, Container } from "semantic-ui-react";

class Message extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.renderMessage = this.renderMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => {
    this.setState({ value: e.target.getAttribute("custom-name") });
  };
  renderMessage() {
    switch (this.state.value) {
      case "inbox":
        return <Container>this is private message board</Container>;
      default:
        return <div>default message</div>;
    }
  }

  render() {
    console.log(this.state.value);
    return (
      <Segment>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={2}>
              <Menu vertical fluid>
                <Menu.Item custom-name="inbox" onClick={this.handleClick}>
                  Inbox
                </Menu.Item>
                <Menu.Item custom-name="sent" onClick={this.handleClick}>
                  Sent
                </Menu.Item>
                <Menu.Item custom-name="trash" onClick={this.handleClick}>
                  Trash
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column>{this.renderMessage()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Message;
