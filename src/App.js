import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import HeaderMenu from "./Components/Header/HeaderMenu";
import "./Components/CSS/CommonStyle.css";

function App() {
  const navigate = useNavigate();

  const blogPage = () => {
    navigate("/blogs");
  };

  return (
    <>
      <HeaderMenu />

      <div className="main_div">
        <img src="/blog.jpg" alt="Blog" className="bgimg" />
        <br />
        <button className="btn_blog" onClick={blogPage}>
          Continue to Blogging
        </button>
      </div>
    </>
  );
}

export default App;
