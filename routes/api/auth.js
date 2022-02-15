const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.post("/register", (req, res) => {
  //Validation
  // const { errors, isValid } = validateRegisterInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        //Hashing the password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  //Validation
  // const { errors, isValid } = validateLoginInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  // Find user by email
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          //*****/ GENERATE A TOKEN***********
          // Create a payload
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrPrivateKey,
            { expiresIn: 3000 },
            (err, token) => {
              return res.json({
                token: "Bearer " + token,
              });
            }
          );
          //************************************
          //return res.json({ msg: "You have been successfully logged in!" });
        } else {
          return res.status(400).json({ password: "Password is incorrect" });
        }
      });
    }
  });
});

module.exports = router;
