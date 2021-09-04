import Nav from "./Nav.js";
import React, { Component } from "react";
import axios from "axios";

class Create extends Component {
  state = {
    content: "",
    image: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("image", this.state.image, this.state.image.name);
    form_data.append("description", this.state.content);
    let url = "http://localhost:8000/api/v1/posts/";
    axios
      .post(url, form_data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then(res=>{
        window.location.reload();

      })
      .catch((err) => {
        window.location.reload();
      });
      
  };

  render() {
    return (
      <div className="Create">
        <Nav
          link="/"
          text="Home"
          createlink="/my-posts"
          createtext="My Posts"
        />
        <form onSubmit={this.handleSubmit} className="post-box">
          <p>
            <input
              type="text"
              placeholder="Description"
              id="content"
              value={this.state.content}
              onChange={this.handleChange}
              required
            />
          </p>
          <p>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={this.handleImageChange}
              required
            />
          </p>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Create;
