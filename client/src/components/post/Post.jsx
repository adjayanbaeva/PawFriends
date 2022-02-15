import "./Post.css";
import { MoreVert, Pets, FavoriteBorder } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <img
              src={user.profilePicture || PublicFolder + "person/noAvatar.png"}
              alt=""
              className="post-profile-img"
            />
            <span className="post-user-name">{user.username}</span>
            <span className="post-date">{post.date}</span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post?.desc}</span>
          <img className="post-img" src={PublicFolder + post.photo} alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <Pets className="like-icon" onClick={likeHandler} />
            <FavoriteBorder className="like-icon" onClick={likeHandler} />
            <span className="post-like-counter">{like}</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
