import axios from "axios";
import { useState } from "react";

export default function FollowButton({id}){
  const [follow,setFollow]=useState(false);

  const toggle=async()=>{
    if(follow){
      await axios.post(`/api/user/unfollow/${id}`, {}, {
        headers:{Authorization:localStorage.getItem("token")}
      });
    }else{
      await axios.post(`/api/user/follow/${id}`, {}, {
        headers:{Authorization:localStorage.getItem("token")}
      });
    }
    setFollow(!follow);
  };

  return(
    <button 
      onClick={toggle}
      className="bg-blue-500 px-4 py-2 rounded mt-2"
    >
      {follow ? "Unfollow" : "Follow"}
    </button>
  )
}