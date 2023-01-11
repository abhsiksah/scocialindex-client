import React, { useState, useEffect, useContext, useRef } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import logo from "./logo.svg";
import { AuthContext } from "../../../Context/authContext";
import { SendOutlined, DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import "./style.css";
import axios from "axios";

const Comments = ({ posts }) => {
  const [comment, setComment] = useState("");
  const [checkCommentDelete, setCheckCommentDelete] = useState(false);
  const [commentCollection, setCommentCollection] = useState(posts.comments);
  const commentRef = useRef(null);
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  //check how to solve this prob of scroll into view vbecause on intial render it takes
  //m,e to last post with last comment
  //   useEffect(() => {
  //     if (commentRef.current !== null) {
  //       commentRef.current.scrollIntoView({
  //         behavior: "smooth",
  //       });
  //     }
  //   }, [commentCollection]);

  const onCommentSubmit = async () => {
    const newComment = {
      content: comment,
      userIdWhoCommented: user._id,
      commentProfilePic: user.profilePicture,
      postId: posts._id,
      nestedComments: [],
      status: "pending",
      likes: [],
      commentid: Date.now().toString(36) + Math.random().toString(36).substr(2),
    };
    if (commentCollection.length === 0) setCommentCollection([newComment]);
    else setCommentCollection([...commentCollection, newComment]);

    try {
      const updatedCommentsResponse = await axios.put(
        `https://social-index-restapi.onrender.com/api/posts/${posts._id}/comment`,
        { ...newComment, status: "done" }
      );

      setCommentCollection(updatedCommentsResponse.data.comments);
    } catch (e) {
      console.log(e);
    }

    setComment("");
  };

  const handleDeleteComment = async (singleComment) => {
    try {
      setCheckCommentDelete(true);
      const updatedCommentsResponse = await axios.put(
        `https://social-index-restapi.onrender.com/api/posts/${posts._id}/comment`,
        singleComment
      );
      setCheckCommentDelete(false);
      setCommentCollection(updatedCommentsResponse.data.comments);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="comments-container" data-aos="flip-up">
      <span data-aos="zoom-in-up">{commentCollection.length} Comments</span>

      {checkCommentDelete ? (
        <div className="container-spinner">
          <img src={logo} className="spinner-logo" alt="logo" />
        </div>
      ) : (
        <>
          <div className="comments-showcase-container">
            {[...commentCollection].reverse().map((singleComment) => {
              return (
                <div className="comment-container">
                  {singleComment.status === "pending" ? (
                    <>
                      <div>
                        <h3>loading...</h3>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="comment-container-controlls"
                        ref={commentRef}
                      >
                        <img
                          className="comment-container-image"
                          src={singleComment.commentProfilePic}
                          alt=""
                          onClick={() =>
                            navigate(
                              `/Profile/${singleComment.userIdWhoCommented}`
                            )
                          }
                        />
                        <DeleteOutlined
                          className="controls-on-comment"
                          onClick={() => handleDeleteComment(singleComment)}
                        />
                        {/* <HeartOutlined className="controls-on-comment" /> */}
                      </div>
                      <div className="comment-text">
                        <span>{singleComment.content}</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="input-comments-container">
        <Input
          value={comment}
          placeholder="Type your comment..."
          allowClear={true}
          className="input-comments-box"
          bordered={false}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onPressEnter={onCommentSubmit}
        />
        <div className="submit-comment" onClick={onCommentSubmit}>
          <SendOutlined />
        </div>
      </div>
    </div>
  );
};

export default Comments;
