import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import { AuthContext } from "../Context/authContext";
import "./home.css";
import Footer from "../components/footer/Footer";

const Home = () => {
  const { isMobileView, isFetching, user } = useContext(AuthContext);

  return (
    <div className="home">
      <Navbar />
      <div className="homecontainer">
        {!isMobileView && <Sidebar />}
        <Feed />
        {isMobileView && !isFetching && <Footer ProfileUser={user} />}
      </div>
    </div>
  );
};

export default Home;
