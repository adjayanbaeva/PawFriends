import "./Register.css";
import { Pets } from "@mui/icons-material";

export default function Register() {
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
            <input placeholder="Username" className="login-input" />
            <input placeholder="Email" className="login-input" />
            <input placeholder="Password" className="login-input" />
            <input placeholder="Confirm password" className="login-input" />
            <button className="login-button">Sign Up</button>
            <button className="login-register-button">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
