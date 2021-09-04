import axios from "axios";
import "../assets/css/card.css";

function Card(props) {
  function del(id) {
    axios.delete(`http://127.0.0.1:8000/api/v1/posts/${id}/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    window.location.reload();
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <img src={"http://127.0.0.1:8000" + props.image} alt="rover" />
        </div>
        <div className="card-body">
          <p>{props.description}</p>
          <div className="user">
            <div className="user-info">
              <small>uploaded at {props.time.slice(0, 10)}</small>
            </div>
          </div>
          <br />
          {props.delete ? (
            <button className="btn btn-danger" onClick={(e) => del(props.id)}>
              <i className="fa fa-trash"></i>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
