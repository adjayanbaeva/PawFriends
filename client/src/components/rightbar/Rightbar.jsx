import "./Rightbar.css";
import { Cake } from "@mui/icons-material";

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        <div className="birthday-container">
          <Cake className="birthday-img" />
          <span className="birthday-text">
            <b>Anna Li</b> and <b>3 other friends</b> have birthdays today
          </span>
        </div>
        <img src="assets/ad.jpeg" alt="" className="rightbar-ad" />
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-friends-list">
          <li className="rightbar-friend">
            <div className="rightbar-profile-img-container">
              <img
                className="rightbar-profile-img"
                src="assets/person/3.jpeg"
                alt=""
              />
              <span className="rightbar-online"></span>
            </div>

            <span className="rightbar-username">Selena Gomez</span>
          </li>
          <li className="rightbar-friend">
            <div className="rightbar-profile-img-container">
              <img
                className="rightbar-profile-img"
                src="assets/person/4.jpeg"
                alt=""
              />
              <span className="rightbar-online"></span>
            </div>

            <span className="rightbar-username">Alex Smith</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
