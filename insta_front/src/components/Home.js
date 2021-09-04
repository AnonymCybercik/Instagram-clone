import axios from "axios";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";
import Card from "./Card";
import '../assets/css/loader.css'
import { useEffect,useState } from 'react';


function Home() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

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
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/v1/all-posts/").then((res) => {
      setPosts(res.data);
      setLoading(false);
      
    });
  },[])
  if (loading) {

    return (
        <div className="div">
  
            <span>↓</span>
            <span className="arr1" >↓</span>
            <span className="arr2" >↓</span>
            <span className="arr3" >↓</span>
            <span className="arr4" >↓</span>
        
        </div>
    )
  }
  else {
    return (
      <div>
        <div className="box">
          {posts &&
            posts.map((item) => (
              <Card
                key={item.id}
                description={item.post_description}
                image={item.post_image}
                time={item.uploaded_date}
                delete={false}
              />
            ))}
        </div>
        <Nav link="/my-posts" text="My Posts" />

      </div>

    );
  }
}

export default Home;
