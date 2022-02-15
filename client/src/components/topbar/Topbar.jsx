import "./Topbar.css";
import { Search, Person, Chat, Notifications, Pets } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <Pets /> PawFriends
          </span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="searchbar">
          <Search className="search-icon" />
          <input
            placeholder="Search for a friend or post"
            className="search-input"
          />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-links">
          <span className="topbar-link">Homepage</span>
          <span className="topbar-link">Timeline</span>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-item">
            <Person />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Chat />
            <span className="topbar-icon-badge">2</span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
            <span className="topbar-icon-badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PublicFolder + user.profilePicture
                : PublicFolder + "person/noAvatar.png"
            }
            alt=""
            className="topbar-img"
          />
        </Link>
      </div>
    </div>
  );
}
