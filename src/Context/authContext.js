import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

//INITIAL_STATE similar to store in redux
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  isMobileView: false,
  IsCreatePostActive: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  //usereducer always takes 2 things global state and reducer, dispatch here is similar to setState in useState

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    //we are sharing all the values down below with the whole app using appcontext provider in our index.js
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        isMobileView: state.isMobileView,
        IsCreatePostActive: state.IsCreatePostActive,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
