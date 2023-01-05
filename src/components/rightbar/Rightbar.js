import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import "./rightbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultpic from "../../util/assets/dp_ss.jpg";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

//fucntional component
const Rightbar = ({ profile }) => {
  let navigate = useNavigate();
  let { username } = useParams();
  const { user, dispatch } = useContext(AuthContext);
  const [friends, setfriends] = useState([]);
  const [followed, setfollowed] = useState(false);

  useEffect(() => {
    setfollowed(user.followings.includes(username));
  }, [username, user]);

  //this stupid logic is for homepage
  if (typeof username === "undefined") {
    username = user._id;
  }

  useEffect(() => {
    const userfriend = async () => {
      const res = await axios.get(
        `https://social-index-restapi.onrender.com/api/users/friends/${username}`
      );
      setfriends(res.data);
    };
    userfriend();
  }, [user, username]);

  //follow button click handle
  const followHandle = async () => {
    try {
      if (followed) {
        await axios.put(
          `https://social-index-restapi.onrender.com/api/users/${username}/unfollow`,
          {
            userId: user._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: username });
      } else {
        await axios.put(
          `https://social-index-restapi.onrender.com/api/users/${username}/follow`,
          {
            userId: user._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: username });
      }
      setfollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <>
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture ? friend.profilePicture : defaultpic
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };

  //Following -  the people whom you follow
  //Followers are those who follow your account

  const ProfileRightBar = () => {
    const { isMobileView, user } = useContext(AuthContext);

    return (
      <>
        <div className="mobile-purpose-only">
          {username !== user._id &&
            (followed ? (
              <Button
                style={{
                  border: "3px solid white",
                  margin: "6rem",
                  color: "white",
                }}
                onClick={followHandle}
              >
                Unfollow user
              </Button>
            ) : (
              <Button
                style={{
                  border: "3px solid white",
                  margin: "6rem",
                  color: "white",
                }}
                onClick={followHandle}
              >
                Follow user
              </Button>
            ))}
        </div>

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Current City:</span>
            <span className="rightbarInfoValue">{user.city} 🌆 </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">BirthDay:</span>
            <span className="rightbarInfoValue">{user.dateOfBirth}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from} 🌇 </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <>
                <div
                  className="rightbarFollowing"
                  onClick={() => {
                    navigate(`/Profile/${friend._id}`);
                  }}
                >
                  <img
                    src={
                      friend.profilePicture ? friend.profilePicture : defaultpic
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="rightbar">
        {profile ? <ProfileRightBar /> : <HomeRightbar />}
      </div>
    </>
  );
};

export default Rightbar;
