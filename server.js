// importing express (a library that allows to route)
const express = require("express");

// importing mongoose (a library that talks to db)
const mongoose = require("mongoose");

// creating an instance of express and storing it in app
const app = express();

// Importing models
const userAccount = require("./routes/api/user-account");
const userProfile = require("./routes/api/user-profile");

//Db config
const db = require("./config/keys").mongoURI;

//Connect to db
mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

//Use routes
app.use("/api/users", userAccount);
app.use("/api/profile", userProfile);

const port = 8000;
app.listen(port, () => console.log(`Test: Server running on port ${port}`));
// mongodb+srv://adjayanbaeva:wow707@pawfriends.iebky.mongodb.net/pawfriends?retryWrites=true&w=majority
