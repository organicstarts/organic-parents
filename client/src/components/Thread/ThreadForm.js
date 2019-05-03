import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  Button,
  Segment,
  Header,
  Grid,
  List,
  Image
} from "semantic-ui-react";
import { createNewThread } from "../../stores/actions/post";
import categories from "../../config-client/categories.json";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import logo from "../../images/organic-parents-logo.png";
import axios from "axios";

Quill.register("modules/imageResize", ImageResize);
class ThreadForm extends Component {
  constructor() {
    super();
    this.state = {
      subject: localStorage.getItem("subject") || "",
      content: localStorage.getItem("content") || "",
      category: localStorage.getItem("category") || "",
      urlIds: JSON.parse(localStorage.getItem("urlIds")) || []
    };
    this.handleChange = this.handleChange.bind(this);
    this.createThread = this.createThread.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value }, () => {
      localStorage.setItem("subject", this.state.subject);
    });
  handleContentChange(value) {
    this.setState({ content: value }, () => {
      localStorage.setItem("content", this.state.content);
    });
  }

  handleSelectChange = (e, data) =>
    this.setState({ [data.name]: data.value }, () => {
      localStorage.setItem("category", this.state.category);
    });

  createThread() {
    const { urlIds, subject, category, content } = this.state;
    urlIds.map(async id => {
      if (!content.includes(id)) {
        await axios.delete(`image/${id}`);
      }
    });
    const threadInfo = {
      subject,
      category,
      content,
      token: this.props.token
    };
    this.props.createNewThread(threadInfo);

    localStorage.removeItem("content");
    localStorage.removeItem("subject");
    localStorage.removeItem("category");
    localStorage.removeItem("urlIds");
    
  }

  imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type) && file.size < 1000000) {
        this.saveToServer(file);
      } else {
        alert("File is too large");
      }
    };
  };

  saveToServer = async file => {
    let formData = new FormData();
    formData.append("imgFile", file);
    await axios
      .post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(img => {
        this.insertToEditor(img.data._id);
      })
      .catch(e => {
        alert("FILE TOO LARGE");
      });
  };

  insertToEditor = async url => {
    let addImg = this.state.content;
    let urlId = [...this.state.urlIds];
    urlId.push(url);
    addImg = addImg + `<Image src="http://192.168.0.9:3001/imgFile/${url}" />`;

    this.setState({ content: addImg, urlIds: urlId }, () => {
      localStorage.setItem("urlIds", JSON.stringify(this.state.urlIds));
    });
  };

  render() {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column computer={12} mobile={16}>
            <Header as="h1">Create a post</Header>

            <Form onSubmit={this.createThread} size="large">
              <Form.Select
                placeholder="Select Category"
                name="category"
                options={categories}
                onChange={this.handleSelectChange}
                value={this.state.category}
                required
              />
              <Segment>
                <Form.Input
                  fluid
                  placeholder="Title"
                  name="subject"
                  type="text"
                  value={this.state.subject}
                  onChange={this.handleChange}
                  required
                  autoFocus
                />

                <ReactQuill
                  value={this.state.content}
                  onChange={this.handleContentChange}
                  theme="snow"
                  modules={{
                    toolbar: {
                      container: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" }
                        ],
                        ["link", "image"],
                        ["clean"]
                      ],
                      handlers: { image: this.imageHandler }
                    },
                    imageResize: {
                      handleStyles: {
                        backgroundColor: "black",
                        border: "none",
                        color: "white"
                      },
                      modules: ["Resize", "DisplaySize", "Toolbar"]
                    }
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video"
                  ]}
                />

                <Button type="submit" fluid size="large" color="teal">
                  Submit
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
          <Grid.Column computer={4} mobile={16}>
            <Header style={{ marginTop: "15px" }} as="h4">
              {" "}
              Statistics
            </Header>
            <Segment>
              <p>{this.props.userCount} MEMBERS</p>
              <p>{this.props.threadCount} THREAD</p>
              <p>{this.props.repliesCount} REPLIES</p>
            </Segment>
            <Segment>
              <Image src={logo} size="tiny" inline verticalAlign="bottom" />{" "}
              Before posting
              <List ordered celled size="medium">
                <List.Item>Remember the human</List.Item>
                <List.Item>Behave like you would in real life</List.Item>
                <List.Item>Look for the original source of content</List.Item>
                <List.Item>Search for duplicates before posting</List.Item>
                <List.Item>Read the community’s rules</List.Item>
              </List>
            </Segment>
            <Segment>
              <Header as="h4">2019 · Organic Parents</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ authState, userState, postState }) {
  return {
    token: authState.token,
    userCount: userState.usersCount,
    threadCount: postState.threadCount,
    repliesCount: postState.repliesCount
  };
}

export default connect(
  mapStateToProps,
  { createNewThread }
)(ThreadForm);
