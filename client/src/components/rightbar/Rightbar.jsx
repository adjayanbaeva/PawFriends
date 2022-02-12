import "./Rightbar.css";
import { Cake } from "@mui/icons-material";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthday-container">
          <Cake className="birthday-img" />
          <span className="birthday-text">
            <b>Anna Li</b> and <b>3 other friends</b> have birthdays today
          </span>
        </div>
        <img src={`${PublicFolder}ad.jpeg`} alt="" className="rightbar-ad" />
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-friends-list">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="rightbar-title">User Information Title</h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Location</span>
            <span className="rightbar-info-value">Seattle, WA</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Bio</span>
            <span className="rightbar-info-value">
              Hi, My name is Jane and I have 2 dogs
            </span>
          </div>
        </div>
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
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
