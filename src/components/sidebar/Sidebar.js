import React from "react";
import "./Sidebar.css";

import {
  PlayCircleFilled,
  BookFilled,
  EuroCircleFilled,
  ExperimentFilled,
} from "@ant-design/icons";
// import IconButton from "@material-ui/core/IconButton";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <ul className="sidebarList">
          <li
            className="sidebarlistitems"
            onClick={() => {
              window.open(
                "https://bejewelled-caramel-0c49d4.netlify.app/",
                "_blank"
              );
            }}
          >
            <PlayCircleFilled className="sidebarButton" />
            <span className="sidebarlistitemText">My Player</span>
          </li>
          <li
            className="sidebarlistitems"
            onClick={() => {
              window.open(
                "https://abhsiksah.github.io/Notes-app-react/",
                "_blank"
              );
            }}
          >
            <BookFilled className="sidebarButton" />
            <span className="sidebarlistitemText">Notes</span>
          </li>
          <li
            className="sidebarlistitems"
            onClick={() => {
              window.open("https://crytotrackerreact.netlify.app/", "_blank");
            }}
          >
            <EuroCircleFilled className="sidebarButton" />
            <span className="sidebarlistitemText">Crypto Tracker</span>
          </li>
          <li
            className="sidebarlistitems"
            onClick={() => {
              window.open("https://mrcocktail.netlify.app/", "_blank");
            }}
          >
            <ExperimentFilled className="sidebarButton" />
            <span className="sidebarlistitemText">CockTail</span>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show more</button> */}
        <hr className="sidebarhr" />
        {/* <ul className="sidebarFriendList">
          Friends
          {Users.map((u) => {
            return (
              <li className="sidebarFirend" key={u.id}>
                <img
                  className="sidebarfriendImg"
                  src={u.profilePicture}
                  alt=""
                />
                <span className="sidebarfriendName">{u.username}</span>
              </li>
            );
          })}
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
