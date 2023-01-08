import React, { useEffect } from "react";
import ShareLeft from "../shared/leftcomponentshare/ShareLeft";
import ShareMiddle from "../shared/middlecomponentshare/ShareMiddle";
import Aos from "aos";
import "./style.css";

const MobSocialndex = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="mob-S-I-container">
      <span>Your Global Index</span>
      <div className="S-I-inner-container" data-aos="flip-left">
        <div className="graph-container" data-aos="fade-down-left">
          <ShareLeft />
        </div>
        <div data-aos="fade-down-right">
          <ShareMiddle />
        </div>
      </div>
      <div className="note-container-index" data-aos="flip-up">
        <span>
          In order to increase your Social-index follow more people and post
          good content to get more followers ❤️
        </span>
      </div>
    </div>
  );
};

export default MobSocialndex;
