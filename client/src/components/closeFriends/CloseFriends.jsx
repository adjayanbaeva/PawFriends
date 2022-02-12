import "./CloseFriends.css";

export default function CloseFriends({ user }) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebar-friend">
      <img
        className="sidebar-friend-img"
        src={PublicFolder + user.profilePicture}
        alt=""
      />
      <span className="sidebar-friend-name">{user.username}</span>
    </li>
  );
}
