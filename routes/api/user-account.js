const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserAccount = require("../../models/UserAccount");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// router.get("/test", (req, res) => res.json({ msg: "User account works!" }));
router.post("/register", (req, res) => {
  UserAccount.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new UserAccount({
          name: req.body.name,
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
  // Find user by email
  UserAccount.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          //*****/ GENERATE A TOKEN***********
          // Create a payload
          const payload = { id: user.id, name: user.name, email: user.email };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrPrivateKey,
            { expiresIn: 900 },
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

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({ msg: "Success" });
  }
);

module.exports = router;
