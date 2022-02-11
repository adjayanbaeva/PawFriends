import "./Feed.css";
import Share from "../share/Share";
import Post from "../post/Post";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feed-wrapper"></div>
      <Share />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
