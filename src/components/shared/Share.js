import React, { useContext, useEffect } from "react";
import ShareLeft from "./leftcomponentshare/ShareLeft";
import ShareMiddle from "./middlecomponentshare/ShareMiddle";
import ShareModal from "./modal-content/ShareModal";
import logo from "./logo.svg";
import "./share.css";
//*note use @material-ui/core for importing material ui components and not @mui */import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import axios from "axios";
import { AuthContext } from "../../Context/authContext";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

//for modal styling

//funcitonal component
const Share = () => {
  //getting user detail from context
  const { user, isMobileView } = useContext(AuthContext);
  //usestates for the post data and modal
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [descp, setdescp] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {}, [loader, image]);

  //node api call after getting url form cloudinary
  useEffect(() => {
    if (url) {
      try {
        const postPost = async () => {
          await axios({
            method: "post",
            url: `https://social-index-restapi.onrender.com/api/posts`,
            data: {
              userId: `${user._id}`,
              desc: `${content}`,
              title: `${descp}`,
              img: `${url}`,
            },
          });
          setLoader(false);
          window.location.reload();
        };
        postPost();
      } catch (e) {
        setLoader(false);
      }
    }
  }, [url, descp, user._id]);

  // Cloudinary post call
  const postDetails = () => {
    if (image === "" || descp === "") {
      setAlert(true);
      window.alert("Bitch, add a pic and title🙏");
    } else {
      setAlert(false);
      handleClose();
      setLoader(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "mantiscloud");
      fetch("https://api.cloudinary.com/v1_1/mantiscloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
        })
        .catch((err) => {
          setLoader(false);
        });
    }
  };

  //component render
  return (
    <>
      {!isMobileView && (
        <div className="Share">
          <div className="shareWrapper">
            <div className="shareLeft">
              <ShareLeft />
            </div>

            <div className="ShareMiddle">
              <ShareMiddle />
            </div>
            <div className="ShareRight">
              <Button onClick={handleOpen}>Create Post</Button>
            </div>
          </div>
        </div>
      )}

      {loader && (
        <div className="container-spinner">
          <img src={logo} className="spinner-logo" alt="logo" />
        </div>
      )}

      {isMobileView ? (
        <ShareModal
          setImage={setImage}
          setdescp={setdescp}
          postDetails={postDetails}
          descp={descp}
          setContent={setContent}
          content={content}
        />
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ShareModal
            setImage={setImage}
            setdescp={setdescp}
            postDetails={postDetails}
            descp={descp}
            setContent={setContent}
            content={content}
          />
        </Modal>
      )}
    </>
  );
};

export default Share;
