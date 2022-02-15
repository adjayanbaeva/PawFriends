import "./Sidebar.css";
import { RssFeed, Chat, PlayCircle } from "@mui/icons-material";
import { Users } from "../../dummyData";
import CloseFriends from "../closeFriends/CloseFriends";

export default function Sidebar() {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
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
        {/* <button className="sidebar-button">Show more</button> */}
        <hr className="sidebar-hr" />
        {/* <ul className="sidebar-friendlist">
          {Users.map((user) => (
            <CloseFriends key={user.id} user={user} />
          ))}
        </ul> */}
        <h4 className="rightbar-user-dogs">User Dogs</h4>
        <div className="rightbar-user-dogs">
          <div className="rightbar-user-dog">
            <img
              src={`${PublicFolder}dog1.jpeg`}
              alt=""
              className="rightbar-user-dog-img"
            />
            <span className="rightbar-user-dog-name">Dexter</span>
            <span className="rightbar-user-dog-bio">
              Dexter is a happy and smart dog
            </span>
          </div>
          <div className="rightbar-user-dog">
            <img
              src={`${PublicFolder}dog2.jpeg`}
              alt=""
              className="rightbar-user-dog-img"
            />
            <span className="rightbar-user-dog-name">Iris</span>
            <span className="rightbar-user-dog-bio">
              Smart and High energetic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
