import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import logo from "./logo.svg";
import defaultpic from "../../util/assets/dp_ss.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import "./ListOfUsersMobile.css";

const { TextArea } = Input;

const ListOfUsersMobile = () => {
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();
  const [listForUserstemp, setListForUserstemp] = useState([]);
  const [loader, setLoader] = useState(false);
  const [listForUsers, setListForUsers] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

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
    const fetchUserDetails = async () => {
      setLoader(true);

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
    <div className="list-of-user-modal-container-mobile">
      {loader && (
        <div className="container-spinner">
          <img src={logo} className="spinner-logo" alt="logo" />
        </div>
      )}
      <div className="top-loum-mobile">
        <textarea
          maxLength={100}
          style={{
            height: 80,
            width: 200,
            fontSize: 25,
            resize: "none",
            color: "white",
            marginLeft: 10,
            background: "transparent",
            outline: "none",
            border: "none ",
          }}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Search by Name..."
          bordered={false}
        />
      </div>
      <div className="middle-loum-mobile">
        {listForUsers.map((singleuser) => {
          return (
            <>
              <div
                className="userlist-container-mobile"
                onClick={() => handleprofile(singleuser._id)}
              >
                <img
                  className="search-img-mobile"
                  src={
                    singleuser.profilePicture != ""
                      ? singleuser.profilePicture
                      : defaultpic
                  }
                  alt="img"
                />

                <div className="username-userlist-mobile">
                  <span>{singleuser.username}</span>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListOfUsersMobile;
