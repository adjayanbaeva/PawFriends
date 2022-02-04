const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const passport = require("passport");

// Get UserProfile and UserAccount models
const UserProfile = require("../../models/UserProfile");
const UserAccount = require("../../models/UserAccount");

// Get User Profile API
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    UserProfile.findOne({ user: req.user.id })
      // populate is like JOIN in SQL
      .populate("user", ["name"])
      .then((profile) => {
        if (!profile) {
          errors.nonprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);
// Create User profile API
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    // To find out who the current user is
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.avatar) profileFields.avatar = req.body.avatar;
    if (req.body.bio) profileFields.bio = req.body.bio;

    // Check if there's already a user profile in Db
    UserProfile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        UserProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //Create
        //Check if handle exists (to make sure if handle exists)
        UserProfile.findOne({ handle: profileFields.handle }).then(
          (profile) => {
            if (profile) {
              // errors.handle = 'That handle already exists';
              return res.status(400).json("Handle exists");
            }
            new UserProfile(profileFields)
              .save()
              .then((profile) => res.json(profile));
          }
        );
      }
    });
  }
);

//POST Route to Add a Dog to a Profile
router.post(
  "/dog",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Locate the Profile first
    UserProfile.findOne({ user: req.user.id }).then((profile) => {
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

// Get all profiles
router.get(
  "/all",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    UserProfile.find()
      .populate("user", ["name"])
      .then((profiles) => {
        if (!profiles) {
          errors.nonprofile = "There are no profiles";
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch((err) =>
        res.status(404).json({ profile: "There are no profiles" })
      );
  }
);

//Filter Users by location
router.get("/location/:location", (req, res) => {
  // const errors = {}
  UserProfile.find({ location: req.params.location })
    .populate("user", ["name"])
    .then((profile) => {
      if (!profile) {
        // errors.noprofile = ''
        res.status(404).json("There is no profile for this user");
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
