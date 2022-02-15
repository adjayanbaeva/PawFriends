import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "620aeba09adad933dafeaa3a",
    username: "Christopher Li",
    email: "christopher@mail.com",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    followings: ["620af0f4a74c024cdd00e0e9"],
    isAdmin: false,
    dog: [],
    createdAt: { $date: { $numberLong: "1644882848819" } },
    updatedAt: { $date: { $numberLong: "1644894437070" } },
    __v: { $numberInt: "0" },
    desc: "Good morning, y'all!",
    location: "Seattle, WA",
    postalCode: { $numberInt: "98124" },
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
