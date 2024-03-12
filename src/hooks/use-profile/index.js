import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";

const useUserProfile = () => {
  let { username } = useParams();
  const { isMobileView, isFetching } = useContext(AuthContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://social-index-restapi.onrender.com/api/users/${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return {
    username,
    isMobileView,
    isFetching,
    user,
    setUser,
  };
};

export default useUserProfile;
