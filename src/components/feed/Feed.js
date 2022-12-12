import React, { useEffect, useState, useContext } from "react";
import Aos from "aos";
import "./feed.css";
import Share from "../shared/Share";
import Post from "../posts/Posts";
import axios from "axios";
import "aos/dist/aos.css";
import { AuthContext } from "../../Context/authContext";

//* imp note on feed we are going to have 2 cases 1.home 2.profile, now if we have anything in username prop then we will call profile api or else home page api wiz timeline api

const Feed = ({ profileuser }) => {
  const { user, isMobileView } = useContext(AuthContext);
  const [posts, setposts] = useState([]);
  const [isProfile, setIsProfile] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = profileuser
        ? await axios.get(
            `http://localhost:8001/api/posts/profile/${profileuser._id}`
          )
        : await axios.get(
            `http://localhost:8001/api/posts/timeline/${user._id}`
          );
      setposts(res.data);
    };
    if (profileuser) setIsProfile(true);
    fetchPosts();
  }, [user, profileuser]);

  //watch this .slice(0).reverse() for getting the post in descending order
  return (
    <div className="feed">
      {!isMobileView && (
        <div className="feedwrapper">{!isProfile && <Share />}</div>
      )}
      <div className="postSection">
        {posts
          .slice(0)
          .reverse()
          .map((p) => {
            return (
              <div>
                <Post posts={p} key={p._id} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Feed;
