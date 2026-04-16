import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FollowButton from "../components/FollowButton";

export default function Profile(){
  const {id} = useParams();
  const [user,setUser]=useState(null);

  useEffect(()=>{
    axios.get(`/api/user/${id}`)
      .then(res=>setUser(res.data));
  },[]);

  if(!user) return <p>Loading...</p>;

  return(
    <div className="container p-3">
      <h2>{user.username}</h2>
      <p>{user.followers.length} Followers</p>
      <p>{user.following.length} Following</p>

      {/* 👇 FOLLOW BUTTON USED HERE */}
      <FollowButton id={id}/>
    </div>
  )
}