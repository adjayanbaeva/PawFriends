import "./Feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
// import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/timeline/620aeba09adad933dafeaa3a");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div className="feed">
      <div className="feed-wrapper"></div>
      <Share />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
