import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import { loginCall, GoogleCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  let navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, error } = useContext(AuthContext);

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
          <h3 className="loginLogo">
            Social-<span className="gold-mob">Index</span>
          </h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social-Index.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
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

            <div className="button-login-container">
              {isFetching ? (
                <CircularProgress color="secondary" />
              ) : (
                <>
                  <button
                    className="loginButton"
                    type="submit"
                    disabled={isFetching}
                    onClick={handleClick}
                  >
                    <span
                      style={{
                        color: "gold",
                        fontSize: "15px",
                        fontWeight: "500",
                        fontFamily: "Cinzel",
                      }}
                    >
                      Log In
                    </span>
                  </button>
                  <button className="loginRegisterButton" onClick={register}>
                    <span
                      style={{
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "100",
                        fontFamily: "Cinzel",
                      }}
                    >
                      Create a New Account
                    </span>
                  </button>
                </>
              )}
            </div>

            <GoogleLogin
              size="large"
              onSuccess={(credentialResponse) => {
                var decoded = jwt_decode(credentialResponse.credential);
                GoogleCall(
                  {
                    email: decoded.email,
                    password: "google_Auth",
                    username: decoded.name,
                  },
                  dispatch
                );
                navigate("/");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="square"
              width="50"
            />

            <span className="loginForgot">Forgot Password?</span>

            {error && (
              <Alert
                message="No Such Account Exists!"
                type="error"
                closable
                showIcon
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
