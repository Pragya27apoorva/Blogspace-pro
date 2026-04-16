import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}