// importing express (a library that allows to route)
const express = require("express");

// importing mongoose (a library that talks to db)
const mongoose = require("mongoose");

// importing body-parser(this library makes sure that data coming from user converted to json format)
const bodyparser = require("body-parser");

//Importing password(this library helps to ensure that token provided by user is valid token)
const passport = require("passport");

// creating an instance of express and storing it in app
const app = express();

//importing multer, file upload package of node.js
const multer = require("multer");
const path = require("path");

// Importing models
// const userAccount = require("./routes/api/user-account");
// const userProfile = require("./routes/api/user-profile");
const userPost = require("./routes/api/posts");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

//Db config
const db = require("./config/keys").mongoURI;

//Body-parser config
app.use(bodyparser.urlencoded({ extended: false }));
//urlencoded()makes sure that data entered by user is treated as it is (e.g. if user enters apostrophe as part of their name, js won't throw an error)
app.use(bodyparser.json());

// Passport configuration
app.use(passport.initialize());
require("./config/passport")(passport);

//Connect to db
mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

app.use("/images", express.static(path.join(__dirname, "public/images")));

//define destination, file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//creating an instance of multer and defining its path
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

//Use routes
// app.use("/api/users", userAccount);
// app.use("/api/profile", userProfile);
app.use("/api/posts", userPost);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = 8000;
app.listen(port, () => console.log(`Test: Server running on port ${port}`));
// mongodb+srv://adjayanbaeva:wow707@pawfriends.iebky.mongodb.net/pawfriends?retryWrites=true&w=majority
