import "./Post.css";
import { MoreVert, Pets, FavoriteBorder } from "@mui/icons-material";
import { Users } from "../../dummyData";

export default function Post({ post }) {
  // console.log(post);
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <img
              src={
                Users.filter((user) => user.id === post.userId)[0]
                  .profilePicture
              }
              alt=""
              className="post-profile-img"
            />
            <span className="post-user-name">
              {Users.filter((user) => user.id === post.userId)[0].username}
            </span>
            <span className="post-date">{post.date}</span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post?.desc}</span>
          <img className="post-img" src={post.photo} alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <Pets className="like-icon" />
            <FavoriteBorder className="like-icon" />
            <span className="post-like-counter">{post.like}</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
