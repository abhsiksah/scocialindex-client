import React, { useState, useEffect, useContext } from "react";
import { Drawer } from "antd";
import { AuthContext } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./footer.css";

import {
  PlusCircleOutlined,
  AlignCenterOutlined,
  LogoutOutlined,
  HomeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Rightbar from "../rightbar/Rightbar";
import Share from "../shared/Share";

const Footer = () => {
  const { dispatch, IsCreatePostActive } = useContext(AuthContext);

  let navigate = useNavigate();
  let { username } = useParams();

  const [open, setOpen] = useState(false);
  const [openTopDrawer, setOpenTopDrawer] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [username]);

  const handleLogoutfooter = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const navigateHome = () => {
    navigate("/");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showTopDrawer = () => {
    setOpenTopDrawer(true);
  };
  const onCloseTopDrawer = () => {
    setOpenTopDrawer(false);
  };

  return (
    <div className="footer">
      <div className="left-footer">
        <HomeOutlined onClick={navigateHome} />
      </div>
      <div className="middle-footer">
        <PlusCircleOutlined
          className="tobehighligthed"
          onClick={showTopDrawer}
        />
      </div>
      <div className="right-footer">
        <AlignCenterOutlined onClick={showDrawer} />
      </div>

      {/*the menu drawer */}
      <Drawer
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"right"}
        width={250}
        bodyStyle={{
          backgroundImage:
            "linear-gradient(to bottom right, rgb(92, 13, 92), #773f53, #a55ed4)",
          color: "white",
          fontFamily: "cursive",
          fontWeight: "800",
        }}
      >
        <Rightbar profile />
        <LogoutOutlined
          onClick={handleLogoutfooter}
          className="drawer-logout-button"
        />
      </Drawer>

      {/*the create post drawer */}
      <Drawer
        placement={"top"}
        closable={false}
        onClose={onCloseTopDrawer}
        open={openTopDrawer}
        height={"100%"}
        bodyStyle={{
          backgroundImage:
            "linear-gradient(to bottom right, rgb(92, 13, 92), #773f53, #a55ed4)",
          color: "white",
          fontFamily: "cursive",
          fontWeight: "800",
        }}
      >
        <Share />
        <div className="close-create-post-drawer" onClick={onCloseTopDrawer}>
          <span className="close-button-create-post-drawer">close</span>
        </div>
      </Drawer>
    </div>
  );
};

export default Footer;
