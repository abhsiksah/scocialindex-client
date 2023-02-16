import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./Context/authContext";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

function App() {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const screenWidth = getWindowDimensions();
    if (screenWidth.width <= 700) {
      dispatch({ type: "ISMOBLEVIEW_TRIGGER" });
    }
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId="1086667640884-5ksmvk66bbuijpo7nm1beiecroaherb5.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <>
              <Route path="/" element={user ? <Home /> : <Login />} exact />
              <Route path="/Login" element={user ? <Home /> : <Login />} />
              <Route
                path="/Register"
                element={user ? <Home /> : <Register />}
              />
              <Route
                path="/Profile/:username"
                element={user ? <Profile /> : <Login />}
              />
              <Route path="*" element={user ? <Home /> : <Login />} />
            </>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
