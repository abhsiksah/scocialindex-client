import React, { useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Modal } from "antd";
import Menu from "@material-ui/core/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import MenuItem from "@material-ui/core/MenuItem";
import ListOfUsers from "./ListOfUsers";
import defaultpic from "../../util/assets/dp_ss.jpg";
import { useParams } from "react-router-dom";
import "./Navbar.css";
import ListOfUsersMobile from "./ListOfUsersMobile";
import PersonalPage from "../personal_info_page/PersonalPage";

const Navbar = () => {
  const { user, isMobileView } = useContext(AuthContext);
  const truncate = (input) =>
    input.length > 5 ? `${input.substring(0, 9)}...` : input;
  let { username } = useParams();
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [profilePageOpen, setProfilePageOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleprofile = () => {
    setProfilePageOpen(true);
    setAnchorEl(null);
  };
  const handleMobileProfilePage = () => {
    navigate(`/Profile/${user._id}`);
  };

  return (
    <>
      <div className="navbar">
        {isMobileView ? (
          <div className="navbarleftmobile" onClick={handleMobileProfilePage}>
            hello {`${truncate(user.username)}`} 💞
          </div>
        ) : (
          <div className="navbarleft">
            <span className="logo">
              <h4>Social-Index</h4>
            </span>
          </div>
        )}
        <div className="navbarcenter">
          {username === undefined && (
            <div className="searchbar" onClick={showModal}>
              <SearchIcon className="searchicon" style={{ color: "black" }} />
              <span className="serachbar-text">Search for friends...</span>
            </div>
          )}
        </div>
        {isMobileView && (
          <div
            className="mobile-profile-icon-container"
            onClick={handleprofile}
          >
            <img
              className="navimg"
              src={user.profilePicture ? user.profilePicture : defaultpic}
              alt="img"
            />
          </div>
        )}
        <div className="navbarright">
          <div className="topbarLinks">
            <span className="topbarLink" onClick={() => navigate("/")}>
              HomePage
            </span>
            <span
              className="topbarLink"
              onClick={() => navigate(`/Profile/${user._id}`)}
            >
              Timeline
            </span>
          </div>
          <img
            className="navimg"
            src={user.profilePicture ? user.profilePicture : defaultpic}
            alt="img"
            onClick={handleClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleprofile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

        {isMobileView ? (
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={300}
            bodyStyle={{ height: 405 }}
          >
            <ListOfUsersMobile />
          </Modal>
        ) : (
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={800}
          >
            <ListOfUsers />
          </Modal>
        )}
      </div>
      <Modal
        open={profilePageOpen}
        onCancel={() => {
          setProfilePageOpen(false);
        }}
        footer={false}
        bodyStyle={{ height: "90vh" }}
        centered={true}
        width={1520}
      >
        <PersonalPage setProfilePageOpen={setProfilePageOpen} />
      </Modal>
    </>
  );
};

export default Navbar;
