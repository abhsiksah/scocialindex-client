import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import "./rightbar.css";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import defaultpic from "../../util/assets/dp_ss.jpg";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Rightbar = ({ profile, ProfileUser }) => {
  let navigate = useNavigate();
  let { username } = useParams();
  const { user, dispatch } = useContext(AuthContext);
  const [friends, setfriends] = useState([]);
  const [followed, setfollowed] = useState(false);
  const [friendlistLoading, setfriendlistLoading] = useState(false);
  const [followChangesInProgress, setFollowChangesInProgress] = useState(false);

  useEffect(() => {
    setfollowed(user.followings.includes(username));
  }, [username, user]);

  //this stupid logic is for homepage
  if (typeof username === "undefined") {
    username = user._id;
  }

  useEffect(() => {
    setfriendlistLoading(true);
    const userfriend = async () => {
      const res = await axios.get(
        `https://social-index-restapi.onrender.com/api/users/friends/${username}`
      );
      setfriendlistLoading(false);
      setfriends(res.data);
    };
    userfriend();
  }, [user, username]);

  //follow button click handle
  const followHandle = async () => {
    try {
      if (followed) {
        setFollowChangesInProgress(true);
        await axios.put(
          `https://social-index-restapi.onrender.com/api/users/${username}/unfollow`,
          {
            userId: user._id,
          }
        );
        setFollowChangesInProgress(false);
        dispatch({ type: "UNFOLLOW", payload: username });
      } else {
        setFollowChangesInProgress(true);

        await axios.put(
          `https://social-index-restapi.onrender.com/api/users/${username}/follow`,
          {
            userId: user._id,
          }
        );
        setFollowChangesInProgress(false);
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

  const ProfileRightBar = ({ ProfileUser }) => {
    return (
      <>
        {followChangesInProgress ? (
          <Spin indicator={antIcon} />
        ) : (
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
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Current City:</span>
            <span className="rightbarInfoValue">{ProfileUser?.city} 🌆 </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">BirthDay:</span>
            <span className="rightbarInfoValue">
              {ProfileUser?.dateOfBirth}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{ProfileUser?.from} 🌇 </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {ProfileUser?.relationship}
            </span>
          </div>
        </div>
        <div className="follow-and-following-container">
          <div className="follow-and-following">
            <span className="gold-mob">{ProfileUser?.followers?.length}</span>
            Followers
          </div>
          <div className="follow-and-following">
            <span className="gold-mob">{ProfileUser?.followings?.length}</span>
            Following
          </div>
        </div>

        <h4 className="rightbarTitle">User friends</h4>
        {friendlistLoading ? (
          <Spin indicator={antIcon} />
        ) : (
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
                        friend.profilePicture
                          ? friend.profilePicture
                          : defaultpic
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
        )}
      </>
    );
  };
  return (
    <>
      <div className="rightbar">
        {profile ? (
          <ProfileRightBar ProfileUser={ProfileUser} />
        ) : (
          <HomeRightbar />
        )}
      </div>
    </>
  );
};

export default Rightbar;
