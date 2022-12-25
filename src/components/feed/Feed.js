import React, { useEffect, useState, useContext } from "react";
import Aos from "aos";
import Share from "../shared/Share";
import Post from "../posts/Posts";
import axios from "axios";
import "aos/dist/aos.css";
import logo from "./logo.svg";
import mock from "./mock.gif";

import "./feed.css";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../Context/authContext";

//* imp note on feed we are going to have 2 cases 1.home 2.profile, now if we have anything in username prop then we will call profile api or else home page api wiz timeline api

const Feed = ({ profileuser }) => {
  const { user, isMobileView } = useContext(AuthContext);
  const [posts, setposts] = useState([]);
  const [isProfile, setIsProfile] = useState(false);
  const [loader, setLoader] = React.useState(false);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = profileuser
        ? await axios.get(
            `https://social-index-restapi.onrender.com/api/posts/profile/${profileuser._id}`
          )
        : await axios.get(
            `https://social-index-restapi.onrender.com/api/posts/timeline/${user._id}`
          );

      setposts(res.data);
      setLoader(false);
    };
    if (profileuser) setIsProfile(true);
    setLoader(true);
    fetchPosts();
  }, [user, profileuser]);

  //watch this .slice(0).reverse() for getting the post in descending order
  return (
    <div className="feed">
      {!isMobileView && (
        <div className="feedwrapper">{!isProfile && <Share />}</div>
      )}
      <div className="postSection">
        {loader && (
          <div className="container-spinner">
            <img src={logo} className="spinner-logo" alt="logo" />
          </div>
        )}

        {posts.length === 0 ? (
          <div className="mocking-no-post-container">
            <img src={mock} alt="damn!" className="mock-img"></img>
            <span className="no-postdiv">wow so empty!</span>
          </div>
        ) : (
          posts
            .slice(0)
            .reverse()
            .map((p) => {
              return (
                <div>
                  <Post posts={p} key={p._id} />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default Feed;
