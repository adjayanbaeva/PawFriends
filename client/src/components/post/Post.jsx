import "./Post.css";
import { MoreVert, Pets, FavoriteBorder } from "@mui/icons-material";

export default function Post() {
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="post-profile-img"
            />
            <span className="post-user-name">Jane Doe</span>
            <span className="post-date">5 min ago</span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">Hey! This is my first post</span>
          <img className="post-img" src="assets/post/1.jpeg" alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <Pets className="like-icon" />
            <FavoriteBorder className="like-icon" />
            <span className="post-like-counter">32</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">6 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
