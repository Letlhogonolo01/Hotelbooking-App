require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect("mongodb://127.0.0.1:27017/stay-nested");

app.get("/", (req, res) => {
  res.send("hi server");
});

app.get("/userdata", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { full_name, email, password, phone } = req.body;

    // Create a new user using the User model
    const newUser = new User({
      full_name,
      email,
      password,
      phone,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while signing up" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Include user details in the response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

app.listen(8080, () => {
  console.log(
    "server started...\nClick the url to gain access: http://10.255.66.162:8080/"
  );
});
