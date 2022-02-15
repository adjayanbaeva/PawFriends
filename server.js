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

//Use routes
// app.use("/api/users", userAccount);
// app.use("/api/profile", userProfile);
app.use("/api/posts", userPost);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = 8000;
app.listen(port, () => console.log(`Test: Server running on port ${port}`));
// mongodb+srv://adjayanbaeva:wow707@pawfriends.iebky.mongodb.net/pawfriends?retryWrites=true&w=majority
