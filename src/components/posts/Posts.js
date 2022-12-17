import React, { useState, useContext, useEffect } from "react";
import "./post.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { format } from "timeago.js";
import { AuthContext } from "../../Context/authContext";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import defaultpic from "../../util/assets/dp_ss.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";

//functional componet
const Posts = ({ posts }) => {
  let navigate = useNavigate();

  const { user, isMobileView } = useContext(AuthContext);

  //so the intial state of like is what the post.like array gives from the db
  const [like, setlike] = useState(posts.likes.length);
  const [isliked, setisliked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  useEffect(() => {
    const intialLike = posts.likes.find((e) => e === user._id);

    if (intialLike) {
      setisliked(true);
    }
  }, [posts.likes, user._id]);

  const liked = () => {
    setisliked(!isliked);
    setlike(isliked ? like - 1 : like + 1);

    try {
      const editlikes = async () => {
        await axios({
          method: "put",
          url: `https://social-index-restapi.onrender.com/api/posts/${posts._id}/like`,
          data: {
            userId: `${user._id}`,
          },
        });
      };
      editlikes();
    } catch (e) {
      console.log(e);
    }
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlepost = () => {
    try {
      const deletepost = async () => {
        await axios({
          method: "delete",
          url: `https://social-index-restapi.onrender.com/api/posts/${posts._id}`,
          data: {
            userId: `${user._id}`,
          },
        });
      };
      deletepost();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const handlePostnavigation = () => {
    navigate(`/Profile/${posts.userId}`);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div
            className="postTopLeft"
            data-aos="flip-left"
            onClick={handlePostnavigation}
          >
            <img
              className="postProfileImg"
              src={
                posts.profilePicture !== "" ? posts.profilePicture : defaultpic
              }
              alt=""
              style={{ cursor: "pointer" }}
            />
            <span className="postUsername">{posts.username}</span>
          </div>
          <div className="postTopRight">
            <span className="postDate">{format(posts.createdAt)}</span>
            {posts.userId === user._id && (
              <MoreVertIcon
                onClick={isMobileView ? showDrawer : handleClick}
                style={{ cursor: "pointer" }}
              />
            )}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handlepost}>delete</MenuItem>
            </Menu>
            <Drawer
              placement={"bottom"}
              closable={false}
              onClose={onClose}
              open={open}
              key={"bottom"}
              height={70}
              bodyStyle={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "cursive",
                fontWeight: "800",
              }}
            >
              <p onClick={handlepost}>delete</p>
            </Drawer>
          </div>
        </div>

        {isMobileView ? (
          <div className="postCenter">
            <div className="right-post-center">
              <div className="right-post-center-inner-top">{posts?.title}</div>
            </div>
            <div className="left-post-center">
              <div className="img-container" data-aos="fade-down">
                <img className="postImg" src={posts.img} alt="img" />
              </div>

              <div className="postText" data-aos="fade-up">
                <span dangerouslySetInnerHTML={{ __html: posts?.desc }}></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="postCenter">
            <div className="left-post-center">
              <div className="img-container" data-aos="fade-down">
                <img className="postImg" src={posts.img} alt="img" />
              </div>

              <div className="postText" data-aos="fade-up">
                <span dangerouslySetInnerHTML={{ __html: posts?.desc }}></span>
              </div>
            </div>
            <div className="right-post-center">
              <div className="right-post-center-inner-top">{posts?.title}</div>
              <div className="right-post-center-inner-below"></div>
            </div>
          </div>
        )}

        <div className="postBottom">
          <div className="postBottomLeft">
            {isliked ? (
              <FavoriteIcon className="likeIcon" onClick={liked} />
            ) : (
              <FavoriteBorderOutlinedIcon
                className="likeIcon"
                onClick={liked}
              />
            )}
            <span className="postlikecounter">{like} likes</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">{posts.comment} comments</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
