import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          "https://social-index-restapi.onrender.com/api/auth/register",
          user
        );
        navigate("/Login");
      } catch (err) {}
    }
  };

  const back2login = (e) => {
    navigate("/Login");
  };

  return (
    <div className="Register">
      <div className="RegisterWrapper">
        <div className="RegisterLeft">
          <h3 className="RegisterLogo">Social-Index</h3>
          <span className="RegisterDesc">
            Connect with friends and the world around you on Social-Index.
          </span>
        </div>
        <div className="RegisterRight">
          <form className="registerbox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />

            <div className="button-register-container">
              <button className="signup-button" type="submit">
                Sign Up
              </button>
              <button className="back-2-login" onClick={back2login}>
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
