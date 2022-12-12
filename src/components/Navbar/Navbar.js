import React, { useContext } from "react";
import PersonIcon from "@material-ui/icons/Person";
import DeckOutlinedIcon from "@material-ui/icons/DeckOutlined";
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

//functional component
const Navbar = () => {
  const { user, isMobileView } = useContext(AuthContext);
  let { username } = useParams();

  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
    navigate("/Login");
    window.location.reload();
  };

  const handleprofile = () => {
    navigate(`/Profile/${user._id}`);
  };

  return (
    <div className="navbar">
      {isMobileView ? (
        <div className="navbarleftmobile">hello {`${user.username}`} 💞</div>
      ) : (
        <div className="navbarleft">
          <span className="logo">
            <DeckOutlinedIcon fontSize="large" />
            <h4>Sah'Social</h4>
          </span>
        </div>
      )}

      <div className="navbarcenter">
        {username === undefined && (
          <div className="searchbar">
            <SearchIcon className="searchicon" style={{ color: "black" }} />

            <input
              placeholder="Search for friends..."
              className="searchInput"
              onClick={() => {
                showModal();
              }}
            ></input>
          </div>
        )}
      </div>
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
          keepMounted
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
  );
};

export default Navbar;
