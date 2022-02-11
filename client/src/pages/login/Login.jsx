import "./Login.css";
import { Pets } from "@mui/icons-material";

export default function Login() {
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <Pets className="login-logo" />
          <h3 className="login-logo">PawFriends</h3>
          <span className="login-description">
            Connect with dog owners in your neighborhood on PawFriends.
          </span>
        </div>
        <div className="login-right">
          <div className="login-box">
            <input placeholder="Email" className="login-input" />
            <input placeholder="Password" className="login-input" />
            <button className="login-button">Log In</button>
            <button className="login-register-button">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
