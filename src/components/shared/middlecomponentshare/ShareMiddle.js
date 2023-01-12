import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { AuthContext } from "../../../Context/authContext";
import "./index.css";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ShareMiddle = () => {
  const [indexvalue, setIndexvalue] = useState({});
  const [indexRes, setIndexRes] = useState(false);

  const { user, isMobileView } = useContext(AuthContext);

  useEffect(() => {
    try {
      setIndexRes(true);
      const SocialIndex = async () => {
        const data = await axios({
          method: "post",
          url: `https://social-index-restapi.onrender.com/api/users/IndexValue/stats`,
          data: {
            _id: `${user._id}`,
          },
        });
        setIndexRes(false);
        setIndexvalue(data.data);
      };
      SocialIndex();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="share-middle-wrapper">
      <div className="middle-title">Your Social Index:</div>

      {indexRes ? (
        <div className="middle-content">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div className="middle-content">
          {!isMobileView ? (
            <h1>{indexvalue.SocialIndex?.toFixed(2)}</h1>
          ) : (
            <h2>{indexvalue.SocialIndex?.toFixed(2)}</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default ShareMiddle;
