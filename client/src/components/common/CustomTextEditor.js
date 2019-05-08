import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

Quill.register("modules/imageResize", ImageResize);
class CustomTextEditor extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.addEventListener("beforeunload", e => {
      if (this.props.isDirty) {
        e.returnValue = "Are you sure you want to leave?";
      }
    });
    window.addEventListener("unload", this.unloadImage());
  }

  unloadImage() {
    const { urlIds } = this.props;
    urlIds.map(id => {
      var client = new XMLHttpRequest();
      client.open("DELETE", `/image/${id}`, false);
      client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      client.send();
    });
    localStorage.removeItem("urlIds");
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", e => {
      e.returnValue = "Are you sure you want to leave?";
    });
    window.removeEventListener("unload", this.unloadImage());
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
    let addImg = this.props.content;
    let urlId = [...this.props.urlIds];
    urlId.push(url);
    addImg = addImg + `<Image src="http://192.168.0.9:3001/imgFile/${url}" />`;
    this.props.handleUrlId(urlId);
    this.props.handleContentChange(addImg);
    // this.setState({ content: addImg, urlIds: urlId }, () => {
    localStorage.setItem("urlIds", JSON.stringify(urlId));
    // });
  };

  render() {
    console.log(this.props.content)
    return (
      <ReactQuill
        value={this.props.content}
        onChange={this.props.handleContentChange}
        theme="snow"
        placeholder="Write something..."
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
    );
  }
}

export default CustomTextEditor;
