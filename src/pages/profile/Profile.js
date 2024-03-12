import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Feed from "../../components/feed/Feed";
import Footer from "../../components/footer/Footer";
import Rightbar from "../../components/rightbar/Rightbar";
import useUserProfile from "../../hooks/use-profile";
import defaultpic from "../../util/assets/dp_ss.jpg";
import "./profile.css";

const Profile = () => {
  const { isMobileView, isFetching, user } = useUserProfile();

  return (
    <>
      {!isMobileView && <Navbar />}
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : "https://wallpaperaccess.com/full/1445537.jpg"
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
                  <Rightbar profile ProfileUser={user} />
                </div>
              </div>
            )}
          </div>
        </div>
        {isMobileView && !isFetching && <Footer ProfileUser={user} />}
      </div>
    </>
  );
};

export default Profile;
