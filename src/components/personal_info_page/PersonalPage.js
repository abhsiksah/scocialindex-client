import React from "react";
import dayjs from "dayjs";
import { Button, Form, DatePicker, Radio, Input, Upload, Progress } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "./logo.svg";
import { Spin } from "antd";
import ImgCrop from "antd-img-crop";
import defaultpic from "../../util/assets/dp_ss.jpg";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/authContext";
import axios from "axios";
import "./style.css";
import { useEffect } from "react";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 64,
  },
};

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const PersonalPage = ({ setProfilePageOpen }) => {
  const [switchToAccountDetails, setswitchToAccountDetails] = useState(true);
  const [url, setUrl] = useState("");
  const [image, setimg] = useState("");
  const [loader, setLoader] = useState(false);
  const [uiFixProfilePic, setUiFixProfilePic] = useState(false);

  const { user, isMobileView, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (image === undefined) {
      setUiFixProfilePic(false);
    } else if (image.size > 0) {
      setUiFixProfilePic(true);
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      let values = {
        profilePicture: url,
        userId: user._id,
      };
      try {
        const postPost = async () => {
          axios
            .put(
              "https://social-index-restapi.onrender.com/api/users/updateuser",
              values
            )
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data));
              dispatch({ type: "UPDATE_USER_INFO", payload: res.data });
              setLoader(false);
              setUiFixProfilePic(false);
            });
        };
        postPost();
      } catch (e) {}
    }
  }, [url, user._id]);

  const CancelPicUpload = () => {
    setUiFixProfilePic(false);
    setimg(false);
  };

  const ConfirmPicUpload = () => {
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
        console.log(err);
      });
  };

  const uploadButton = (
    <div>
      {uiFixProfilePic ? (
        <Spin indicator={antIcon} />
      ) : (
        <img
          className="personalpage-img"
          src={user.profilePicture != "" ? user.profilePicture : defaultpic}
          alt="img"
        />
      )}
    </div>
  );

  const onFinishPerosonalPage = (formdata) => {
    setLoader(true);
    if (formdata.dateOfBirth != undefined) {
      let values = {
        ...formdata,
        dateOfBirth: formdata["dateOfBirth"].format("YYYY-MM-DD"),
        userId: user._id,
      };

      axios
        .put(
          "https://social-index-restapi.onrender.com/api/users/updateuser",
          values
        )
        .then((res) => {
          setLoader(false);
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({ type: "UPDATE_USER_INFO", payload: res.data });

          // setProfilePageOpen(false);
        });
    } else {
      let values = {
        ...formdata,
        userId: user._id,
      };
      axios
        .put(
          "https://social-index-restapi.onrender.com/api/users/updateuser",
          values
        )
        .then((res) => {
          setLoader(false);
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({ type: "UPDATE_USER_INFO", payload: res.data });
        });
    }
  };

  const onFinishAccountPage = (formdata) => {
    console.log(formdata);
    let values = {
      ...formdata,
      userId: user._id,
    };
    setLoader(true);
    axios
      .put(
        "https://social-index-restapi.onrender.com/api/users/updateuser",
        values
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "UPDATE_USER_INFO", payload: res.data });
        setLoader(false);
        // setProfilePageOpen(false);
      });
  };

  const uploadedProfilePic = (info) => {
    if (info.fileList[0] === undefined) {
      setimg(info.fileList[0]?.originFileObj);
    } else {
      setimg(info.fileList[0]?.originFileObj);
    }
  };

  return (
    <div className="personal-page-container">
      <div className="inner-personal-page-container">
        {!isMobileView && (
          <div className="inner-personal-page-container-sidebar">
            <div
              className="sideBar1"
              onClick={() => setswitchToAccountDetails(true)}
            >
              <span>Account</span>
            </div>
            <div
              className="sideBar2"
              onClick={() => setswitchToAccountDetails(false)}
            >
              <span>Personal Information</span>
            </div>
          </div>
        )}

        {switchToAccountDetails ? (
          <div className="inner-personal-page-container-hero2">
            {loader && (
              <div className="container-spinner">
                <img src={logo} className="spinner-logo" alt="logo" />
              </div>
            )}
            <div className="profileImgUpload-container">
              <div>
                <ImgCrop rotate>
                  <Upload
                    listType="picture-card"
                    onChange={uploadedProfilePic}
                    customRequest={dummyRequest}
                    showUploadList={false}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </ImgCrop>
              </div>

              {!uiFixProfilePic ? (
                <div className="chnageProfilePic-text">Change Picture</div>
              ) : (
                <>
                  <div className="confirm-or-cancel-picupload">
                    <div
                      className="chnageProfilePic-text-confirm"
                      onClick={() => ConfirmPicUpload()}
                    >
                      Confirm
                    </div>
                    <div
                      className="chnageProfilePic-text-cancel"
                      onClick={() => CancelPicUpload()}
                    >
                      Cancel
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="accountDetails-container">
              <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinishAccountPage}
                layout={"vertical"}
              >
                <Form.Item name="username" label="Your Name">
                  <Input
                    placeholder="Please type your new name here 🦹"
                    addonBefore={<>{user.username}</>}
                  />
                </Form.Item>
                <Form.Item name="email" label="Your Email">
                  <Input
                    placeholder="You cannot change your Email 🚫"
                    addonBefore={<>{user.email}</>}
                    disabled={true}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    span: 12,
                    offset: 6,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="updateprofile-button"
                  >
                    Change
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        ) : (
          <div className="inner-personal-page-container-hero1">
            {loader && (
              <div className="container-spinner">
                <img src={logo} className="spinner-logo" alt="logo" />
              </div>
            )}
            <div>
              <div className="personalinfo-container">
                <Form
                  name="validate_other"
                  {...formItemLayout}
                  onFinish={onFinishPerosonalPage}
                  layout={"vertical"}
                >
                  <Form.Item
                    name="city"
                    label="Current City"
                    rules={[
                      {
                        message: "Please enter your new city",
                      },
                    ]}
                  >
                    <Input
                      placeholder={
                        user.city === ""
                          ? "Please enter your city 🌆"
                          : "Please enter your new city 🌆"
                      }
                      addonBefore={<>{`${user.city}`}</>}
                    />
                  </Form.Item>

                  <Form.Item name="dateOfBirth" label="Date Of Birth">
                    <DatePicker
                      defaultValue={
                        user.dateOfBirth &&
                        dayjs(`${user.dateOfBirth}`, "YYYY/MM/DD")
                      }
                      format={dateFormatList}
                    />
                  </Form.Item>
                  <Form.Item name="from" label="Native Place">
                    <Input
                      placeholder={
                        user.from === ""
                          ? "Please enter your native place 🏠"
                          : "Please enter your new native place 🏠"
                      }
                      addonBefore={<>{`${user.from}`}</>}
                    />
                  </Form.Item>
                  <Form.Item
                    name="relationship"
                    label="Relationship Status"
                    rules={[
                      {
                        message: "Please enter your relationship status",
                      },
                    ]}
                  >
                    <Radio.Group defaultValue={user.relationship}>
                      <Radio value="Single">Single</Radio>
                      <Radio value="In Relationship ❤️">
                        In Relationship ❤️
                      </Radio>
                      <Radio value="Don't want to disclose!">
                        Don't want to disclose!
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      span: 12,
                      offset: 6,
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="updateprofile-button"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        )}
        {isMobileView && (
          <div className="inner-personal-page-container-sidebar">
            <div
              className="sideBar1"
              onClick={() => setswitchToAccountDetails(true)}
            >
              <span>Account</span>
            </div>
            <div
              className="sideBar2"
              onClick={() => setswitchToAccountDetails(false)}
            >
              <span>Personal Information</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalPage;
