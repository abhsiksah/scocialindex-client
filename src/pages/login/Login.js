import "./login.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../Context/authContext";
import { loginCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    navigate("/");
  };

  const register = (e) => {
    navigate("/Register");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social-Index</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social-Index.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button
              className="loginButton"
              type="submit"
              disabled={isFetching}
              onClick={handleClick}
            >
              {isFetching ? (
                <CircularProgress
                  style={{ color: "black", fontSize: "20px" }}
                />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={register}>
              {isFetching ? (
                <CircularProgress
                  style={{ color: "black", fontSize: "20px" }}
                />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
