import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/authContext";
import "./index.css";

const ShareMiddle = () => {
  const [indexvalue, setIndexvalue] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    try {
      const SocialIndex = async () => {
        const data = await axios({
          method: "post",
          url: `https://social-index-restapi.onrender.com/api/users/IndexValue/stats`,
          data: {
            _id: `${user._id}`,
          },
        });

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
      <div className="middle-content">
        <h1>{indexvalue.SocialIndex?.toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default ShareMiddle;
