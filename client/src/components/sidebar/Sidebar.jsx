import "./Sidebar.css";
import { RssFeed, Chat, PlayCircle } from "@mui/icons-material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <RssFeed className="sidebar-icon" />
            <span className="sidebar-list-item-text">Feed</span>
          </li>
          <li className="sidebar-list-item">
            <Chat className="sidebar-icon" />
            <span className="sidebar-list-item-text">Chats</span>
          </li>
          <li className="sidebar-list-item">
            <PlayCircle className="sidebar-icon" />
            <span className="sidebar-list-item-text">Videos</span>
          </li>
        </ul>
        <button className="sidebar-button">Show more</button>
        <hr className="sidebar-hr" />
        <ul className="sidebar-friendlist">
          <li className="sidebar-friend">
            <img
              className="sidebar-friend-img"
              src="/assets/person/2.jpg"
              alt=""
            />
            <span className="sidebar-friend-name">Jane Doe</span>
          </li>
          <li className="sidebar-friend">
            <img
              className="sidebar-friend-img"
              src="/assets/person/3.jpeg"
              alt=""
            />
            <span className="sidebar-friend-name">Selena Gomez</span>
          </li>
          <li className="sidebar-friend">
            <img
              className="sidebar-friend-img"
              src="/assets/person/4.jpeg"
              alt=""
            />
            <span className="sidebar-friend-name">Alex Smith</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
