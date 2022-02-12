import "./Online.css";

export default function Online({ user }) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbar-friend">
      <div className="rightbar-profile-img-container">
        <img
          className="rightbar-profile-img"
          src={PublicFolder + user.profilePicture}
          alt=""
        />
        <span className="rightbar-online"></span>
      </div>

      <span className="rightbar-username">{user.username}</span>
    </li>
  );
}
