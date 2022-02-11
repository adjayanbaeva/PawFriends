import "./Sidebar.css";
import { RssFeed, Chat, PlayCircle } from "@mui/icons-material";
import { Users } from "../../dummyData";
import CloseFriends from "../closeFriends/CloseFriends";

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
          {Users.map((user) => (
            <CloseFriends key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}
