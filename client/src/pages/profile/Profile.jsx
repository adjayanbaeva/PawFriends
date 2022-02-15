import "./Profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                className="profile-cover-img"
                src={`${PublicFolder}post/10.jpeg`}
                alt=""
              />
              <img
                className="profile-user-img"
                src={`${PublicFolder}person/4.jpeg`}
                alt=""
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">User Name</h4>
              <span className="profile-info-description">Hi all!</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed username="Christopher Li" />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
