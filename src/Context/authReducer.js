const AuthReducer = (state, action) => {
  switch (action.type) {
    case "ISFETCHING_ACTIVE":
      return {
        ...state,
        isFetching: true,
      };
    case "ISFETCHING_DEACTIVE":
      return {
        ...state,
        isFetching: false,
      };
    case "UPDATE_USER_INFO":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        isMobileView: state.isMobileView,
        IsCreatePostActive: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        isMobileView: state.isMobileView,
        IsCreatePostActive: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        isMobileView: state.isMobileView,
        IsCreatePostActive: false,
      };
    case "ISMOBLEVIEW_TRIGGER":
      return {
        ...state,
        isMobileView: true,
      };
    case "IS_CREATE_POST_TRIGGERED":
      return {
        ...state,
        IsCreatePostActive: true,
      };
    case "IS_CREATE_POST_TRIGGERED_CLOSE":
      return {
        ...state,
        IsCreatePostActive: false,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
