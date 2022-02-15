const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//Delete account
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all friends of specific user
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

//Creates Profile
router.post(
  "/:id/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    // To find out who the current user is
    profileFields.user = req.user.id;
    // if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.profilePicture)
      profileFields.profilePicture = req.body.profilePicture;
    if (req.body.desc) profileFields.desc = req.body.desc;
    if (req.body.coverPicture)
      profileFields.coverPicture = req.body.coverPicture;
    if (req.body.postalCode) profileFields.postalCode = req.body.postalCode;

    // Check if there's already a user profile in Db
    User.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        User.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //Create
        //Check if handle exists (to make sure if handle exists)
        User.findOne({ id: profileFields.id }).then((profile) => {
          if (profile) {
            return res.status(400).json("User already has an account");
          }
          new User(profileFields).save().then((profile) => res.json(profile));
        });
      }
    });
  }
);

//POST Route to Add a Dog to a Profile
router.post(
  "/:id/dog",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Locate the Profile first
    User.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        errors.nonprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      const newDog = {
        name: req.body.name,
        age: req.body.age,
        avatar: req.body.avatar,
        bio: req.body.bio,
      };

      //Add to dog array
      profile.dog.unshift(newDog);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

module.exports = router;
