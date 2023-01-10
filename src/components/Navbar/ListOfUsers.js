import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import logo from "./logo.svg";
import defaultpic from "../../util/assets/dp_ss.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

import "./listusermodal.css";

const { TextArea } = Input;

const ListOfUsers = () => {
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();
  const [listForUserstemp, setListForUserstemp] = useState([]);
  const [loader, setLoader] = useState(false);
  const [listForUsers, setListForUsers] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    console.log(loader);
  }, [loader]);

  useEffect(() => {
    setListForUsers(
      listForUsers.filter((e) => {
        return e.username.toLowerCase().includes(searchFilter.toLowerCase());
      })
    );
    if (searchFilter === "") {
      setListForUsers(listForUserstemp);
    }
  }, [searchFilter]);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    setLoader(true);
    const fetchUserDetails = async () => {
      let userlist = await axios.get(
        `https://social-index-restapi.onrender.com/api/users/`
      );

      let filteredlistofuser = userlist?.data.filter((e) => {
        return user._id !== e._id;
      });
      setLoader(false);
      setListForUsers(filteredlistofuser);
      setListForUserstemp(filteredlistofuser);
    };

    fetchUserDetails();
  }, []);

  const handleprofile = (id) => {
    navigate(`/Profile/${id}`);
  };

  return (
    <div className="list-of-user-modal-container">
      {loader && (
        <div className="container-spinner">
          <img src={logo} className="spinner-logo" alt="logo" />
        </div>
      )}

      <div className="inner-container-list-of-user" data-aos="flip-left">
        <div className="top-loum">
          <TextArea
            maxLength={100}
            style={{
              height: 120,
              width: 600,
              fontSize: 50,
              resize: "none",
              color: "white",
            }}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by Name..."
            bordered={false}
          />
        </div>
        <div className="middle-loum">
          {listForUsers.map((singleuser) => {
            return (
              <>
                <div
                  className="userlist-container"
                  onClick={() => handleprofile(singleuser._id)}
                >
                  <img
                    className="search-img"
                    src={
                      singleuser.profilePicture != ""
                        ? singleuser.profilePicture
                        : defaultpic
                    }
                    alt="img"
                  />

                  <div className="username-userlist">
                    <span>{singleuser.username}</span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListOfUsers;
