import React, { useState, useEffect, useContext } from "react";
import { Drawer, Modal } from "antd";
import { AuthContext } from "../../Context/authContext";
import { useNavigate, useParams } from "react-router-dom";

import "./footer.css";

import {
  PlusCircleOutlined,
  AlignCenterOutlined,
  LogoutOutlined,
  HomeOutlined,
  RadarChartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Rightbar from "../rightbar/Rightbar";
import Share from "../shared/Share";
import MobileAppstore from "../mobile_app_store/MobileAppstore";
import MobSocialndex from "../mobile-social-index-modal/MobSocialndex";

const Footer = ({ ProfileUser }) => {
  // const { dispatch, IsCreatePostActive } = useContext(AuthContext);
  const [openSocialIndexModal, setopenSocialIndexModal] = useState(false);
  const [mobileAppStoretrigger, setMobileAppStoretrigger] = useState(false);

  const [openTopDrawer, setOpenTopDrawer] = useState(false);

  let navigate = useNavigate();
  let { username } = useParams();

  const [open, setOpen] = useState(false);

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
        <RadarChartOutlined onClick={() => setopenSocialIndexModal(true)} />
        <HomeOutlined onClick={navigateHome} />
      </div>
      <div className="middle-footer">
        <PlusCircleOutlined
          className="tobehighligthed"
          onClick={showTopDrawer}
        />
      </div>
      <div className="right-footer">
        <AppstoreOutlined onClick={() => setMobileAppStoretrigger(true)} />
        <AlignCenterOutlined onClick={showDrawer} />
      </div>

      {/* modal for social index*/}

      <Modal
        open={openSocialIndexModal}
        onCancel={() => {
          setopenSocialIndexModal(false);
        }}
        footer={false}
        bodyStyle={{ height: "50vh" }}
        centered={true}
        width={1520}
      >
        <MobSocialndex />
      </Modal>

      {/* modal for all the apps */}

      <Modal
        open={mobileAppStoretrigger}
        onCancel={() => {
          setMobileAppStoretrigger(false);
        }}
        footer={false}
        bodyStyle={{ height: "50vh" }}
        centered={true}
        width={1520}
      >
        <>
          <MobileAppstore />
        </>
      </Modal>

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
            "linear-gradient(to bottom right, rgb(94, 82, 24), black, rgb(43, 37, 9))",
          color: "white",
          fontFamily: "cursive",
          fontWeight: "800",
        }}
      >
        <Rightbar profile ProfileUser={ProfileUser} />
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
