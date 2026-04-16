import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed(){
  const [blogs,setBlogs]=useState([]);

  useEffect(()=>{
    axios.get("/api/blog/feed",{
      headers:{Authorization:localStorage.getItem("token")}
    }).then(res=>setBlogs(res.data));
  },[]);

  return(
    <div className="container p-3">
      {blogs.map(b=>(
        <div className="card" key={b._id}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>
          <p>👤 {b.author.username}</p>
        </div>
      ))}
    </div>
  )
}