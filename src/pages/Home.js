import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import { AuthContext } from "../Context/authContext";
import "./home.css";

const Home = () => {
  const { isMobileView } = useContext(AuthContext);

  return (
    <div className="home">
      <Navbar />
      <div className="homecontainer">
        {!isMobileView && <Sidebar />}
        <Feed />
      </div>
    </div>
  );
};

export default Home;
