import "./Register.css";
import { Pets } from "@mui/icons-material";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        user: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">
            {" "}
            <Pets />
            PawFriends
          </h3>
          <span className="login-description">
            Connect with dog owners in your neighborhood on PawFriends.
          </span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleClick}>
            <input
              placeholder="Full name"
              required
              ref={username}
              className="login-input"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="login-input"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="login-input"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Confirm password"
              required
              ref={confirmPassword}
              className="login-input"
              type="password"
            />
            <button className="login-button" type="submit">
              Sign Up
            </button>
            <button className="login-register-button">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
