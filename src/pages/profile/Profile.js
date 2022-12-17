import React, { useEffect, useState, useContext } from "react";
import "./profile.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import defaultpic from "../../util/assets/dp_ss.jpg";
import { AuthContext } from "../../Context/authContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  let { username } = useParams();
  const { isMobileView } = useContext(AuthContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://social-index-restapi.onrender.com/api/users/${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      {!isMobileView && <Navbar />}
      <div className="profile">
        {!isMobileView && <Sidebar />}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : "https://res.cloudinary.com/mantiscloud/image/upload/v1646843458/Default-Social-Media-Background-2_yfzhsc.webp"
                }
                alt="img"
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? user.profilePicture : defaultpic}
                alt="img"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">Always Winning!!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <div className="bottomLeft">
              <Feed profileuser={user} />
            </div>
            {!isMobileView && (
              <div className="bottomRight">
                <div className="rightbarText">
                  <Rightbar profile />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
