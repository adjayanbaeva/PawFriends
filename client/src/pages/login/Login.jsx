import "./Login.css";
import { Pets } from "@mui/icons-material";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">
            <Pets /> PawFriends
          </h3>
          <span className="login-description">
            Connect with dog owners in your neighborhood on PawFriends.
          </span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="login-input"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="login-input"
              ref={password}
            />
            <button className="login-button" type="submit">
              {isFetching ? "loading" : "Log In"}
            </button>
            <button className="login-register-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
