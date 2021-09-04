import { Link } from "react-router-dom";
import "../assets/css/Nav.css"
import { useHistory } from "react-router-dom";
import axios from "axios";

function Nav(props){

  let history = useHistory();

    axios
    .get("http://127.0.0.1:8000/api/v1/get-user/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .catch((err) => {
      if (err) {
        history.push("/login");
      }
    });

  function logout(e) {
    localStorage.removeItem('token');
  }

  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Instagram</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={props.link}>{props.text}</Link>
          </li>
          {props.createlink ? (
            <Link className="nav-link" to={props.createlink}>{props.createtext}</Link>
          ) : (
            ""
          )}
          
        </ul>
      </div>
        <div>
        <a href="" onClick={() => logout() }> <i className="fa fa-sign-out"></i> </a>

        </div>
    </nav>
  </div>


  )
}

export default Nav;