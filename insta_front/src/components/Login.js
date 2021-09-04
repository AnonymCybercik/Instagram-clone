import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "../assets/css/login.css";
import { useState } from "react";
import FacebookLogin from "react-facebook-login";

function Login() {
  const history = useHistory();

  const [message, setMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = e.target.elements;
    axios
      .post("http://127.0.0.1:8000/api/token/", {
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access);
        history.push("/");
      })
      .catch((err) => {
        setMessage("Sorry, your password was incorrect.");
      });
  }
  const responseFacebook = (response) => {
    var username = response.email;
    var password = response.email;

    axios
      .post("http://127.0.0.1:8000/api/v1/accounts/signin/", {
        username: username,
        password: password,
      })
      .then((res) => {
          axios
            .post("http://127.0.0.1:8000/api/token/", {
              username: username,
              password: password,
            })
            .then((res) => {
              localStorage.setItem("token", res.data.access);
              history.push("/");
            });
      })
      .catch(err => {
        axios
        .post("http://127.0.0.1:8000/api/token/", {
          username: username,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.access);
          history.push("/");
        });
      })
  };
  return (
    <div className="main">
      <div className="formbox">
        <form onSubmit={handleSubmit}>
          <h4 className="logo"></h4>
          <input
            type="text"
            id="username"
            placeholder="username"
            autocomplete="off"
          />
          <br />
          <input type="password" id="password" placeholder="password" />
          <br />
          <input type="submit" value="Login" />
          <p className="message">{message}</p>
        </form>
        <div className="or">or</div>

        <div className="social">
          <FacebookLogin
            appId="4205426782868188"
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
      </div>
      <div className="do-not">
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
