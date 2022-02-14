const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");
const UserProfile = require("../../models/UserProfile");
// Profile model
const Profile = require("../../models/UserProfile");

// // Get all posts
// router.get("/", (req, res) => {
//   Post.find()
//     .sort({ date: -1 })
//     .then((posts) => res.json(posts))
//     .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
// });

// //Create a post

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const newPost = new Post(req.body);
//     try {
//       const savedPost = await newPost.save();
//       res.status(200).json(savedPost);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );

//Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await UserProfile.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
