import axios from "axios";
import Nav from "./Nav";
import Card from "./Card";
import '../assets/css/loader.css'
import { useEffect,useState } from 'react';



function Myposts(){

    const [posts, setPosts] = useState([])
    useEffect(()=>{
    
        axios.get("http://127.0.0.1:8000/api/v1/posts/",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        }).then((res) => {
          setPosts(res.data);
        });
      },[])
    return (
        <>
        <div className="box">
          {posts &&
            posts.map((item) => (
                
              <Card
                key={item.id}
                id={item.id}
                description={item.post_description}
                image={item.post_image}
                time={item.uploaded_date}
                delete={true}
              />
            ))}
        </div>
        <Nav link="/" text="Home" createlink="/post-create" createtext="Create"/>
            
        </>
    )
}

export default Myposts;