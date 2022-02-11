import "./Rightbar.css";
import { Cake } from "@mui/icons-material";
import { Users } from "../../dummyData";
import Online from "../online/Online";

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
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}
