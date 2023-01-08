import React, { useEffect } from "react";
import Aos from "aos";
import "./style.css";

import {
  PlayCircleFilled,
  BookFilled,
  EuroCircleFilled,
  ExperimentFilled,
} from "@ant-design/icons";

const mobileAppData = [
  {
    link: "https://bejewelled-caramel-0c49d4.netlify.app/",
    icon: <PlayCircleFilled className="sidebarButton" />,
    name: "IndexTube 🌎",
  },
  {
    link: "https://abhsiksah.github.io/Notes-app-react/",
    icon: <BookFilled className="sidebarButton" />,
    name: "Notes 🔖 ",
  },
  {
    link: "https://crytotrackerreact.netlify.app/",
    icon: <EuroCircleFilled className="sidebarButton" />,
    name: "Crypto 🤑",
  },
  {
    link: "https://mrcocktail.netlify.app/",
    icon: <ExperimentFilled className="sidebarButton" />,
    name: "Cocktails 🍸",
  },
];

const MobileAppstore = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="mobile-store-container">
      <span className="mobile-store-title">My Store</span>

      <div className="mobile-store-inner-container">
        {mobileAppData.map((singleapp) => {
          return (
            <>
              <div
                className="mobile-store-card"
                onClick={() => {
                  window.open(`${singleapp.link}`, "_blank");
                }}
                data-aos="flip-left"
              >
                <div className="mobile-app-info" data-aos="zoom-in">
                  <div className="mobile-app-icon" data-aos="zoom-in-up">
                    {singleapp.icon}
                  </div>
                </div>
                <span className="mobileapp-info-text" data-aos="zoom-in-down">
                  {singleapp.name}
                </span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MobileAppstore;
