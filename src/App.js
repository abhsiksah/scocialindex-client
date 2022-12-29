import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./Context/authContext";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
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
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={user ? <Home /> : <Login />} exact />
          <Route path="/Login" element={user ? <Home /> : <Login />} />
          <Route path="/Register" element={user ? <Home /> : <Register />} />
          <Route
            path="/Profile/:username"
            element={user ? <Profile /> : <Login />}
          />
          <Route path="*" element={user ? <Home /> : <Login />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
