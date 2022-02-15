import "./Rightbar.css";
import { Cake, Add, Remove } from "@mui/icons-material";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  }, [currentUser, user.id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

  const handleFollowClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user.id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user.id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

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
        {user.username !== currentUser.username && (
          <button
            className="rightbar-follow-button"
            onClick={handleFollowClick}
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbar-title">User Information Title</h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Location:</span>
            <span className="rightbar-info-value">{user.location}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Bio:</span>
            <span className="rightbar-info-value">{user.desc}</span>
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

        <h4 className="rightbar-user-dogs">Friends</h4>
        <div className="rightbar-user-dogs">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbar-user-dog">
                <img
                  src={
                    friend.profilePicture
                      ? PublicFolder + friend.profilePicture
                      : PublicFolder + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbar-user-friend-img"
                />
                <span className="rightbar-user-dog-name">
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
