// const express = require("express");
// const router = express.Router();
// //const mongoose = require("mongoose");
// const passport = require("passport");

// // Get Dog profile model
// const DogProfile = require("../../models/DogProfile");

// // Create User profile API
// router.post(
//   "/dog",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const dogProfileFields = {};
//     const newDog = new DogProfile({
//       name: req.body.name,
//       avatar: req.body.avatar,
//       age: req.body.age,
//       bio: req.body.bio,
//     });

//     newDog
//       .save()
//       .then((dog) => res.json(dog))
//       .catch((err) => console.log(err));
//   }
// );

// module.exports = router;
