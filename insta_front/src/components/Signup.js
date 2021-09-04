import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "../assets/css/login.css";
import { useState } from "react";

function Signup() {
  const history = useHistory();

  const [message, setMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const { username, password, confirm } = e.target.elements;
    if (password.value === confirm.value) {
      axios
        .post("http://127.0.0.1:8000/api/v1/accounts/signin/", {
          username: username.value,
          password: password.value,
        })
        .then((res) => {
          if (res.status === 200) {
            axios
              .post("http://127.0.0.1:8000/api/token/", {
                username: username.value,
                password: password.value,
              })
              .then((res) => {
                localStorage.setItem("token", res.data.access);
                history.push("/");
              });
          }
        })
        .catch((err) => {
          setMessage("username already taken");
        });
    } else {
      setMessage("passwords do not match");
    }
  }
  return (
    <div className="main">
      <div className="formbox">
        <form onSubmit={handleSubmit}>
          <h4 className="logo"></h4>
          <input
            required
            type="text"
            id="username"
            placeholder="username"
            autocomplete="off"
          />
          <br />
          <input
            required
            type="password"
            id="password"
            placeholder="password"
          />
          <br />
          <input required type="password" id="confirm" placeholder="confirm" />
          <br />
          <input type="submit" value="Sign up" />
          <p className="message">{message}</p>
        </form>

      </div>
      <div className="do-not">
        Already have account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
