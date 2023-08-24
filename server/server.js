require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const User = require("./models/user");
const Booking = require("./models/bookings");

const app = express();

// This is the Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/stay-nested");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 100000, name: "Standard" }],
  [2, { priceInCents: 130000, name: "Single" }],
  [3, { priceInCents: 160000, name: "Delux" }],
  [4, { priceInCents: 200000, name: "Family" }],
  [5, { priceInCents: 250000, name: "Suite" }],
  [6, { priceInCents: 320000, name: "Presidential Suite" }],
]);

// This API is for the Strpe payment //
app.post("/create-checkout-session", async (req, res) => {
  console.log("server.js line:28 req.body", req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        console.log("server.js line:39 item.id", storeItems.get(item.id));
        return {
          price_data: {
            currency: "zar",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (e) {
    console.log('server.js line:55 e',e)
    res.status(500).json({ error: e.message });
  }
});

app.get("/", (req, res) => {
  res.send("hi server");
});

// This API is for getting all the Users //
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

// This API is for Signing up //
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

// This API is for Login //
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the login attempt is for the admin account
    if (email === "admin@staynested.co.za" && password === "Admin@1") {
      // Respond with a success message for admin login
      return res.status(200).json({ message: "Admin login successful" });
    }

    // For non-admin users, perform the regular user login check
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Include user details in the response
    res.status(200).json({ message: "User login successful", user });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});
app.post("/login", async (req, res) => {
  try {
    res.status(200).json({ message: "User login successful", user });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

// This API is for Booking //
app.post("/booking", async (req, res) => {
  try {
    // Extract the data from the request body
    const {
      image,
      title,
      description,
      checkin,
      checkout,
      numberOfGuests,
      totalAmount,
    } = req.body;

    // Create a new booking using the Booking model
    const newBooking = new Booking({
      image,
      title,
      description,
      checkin,
      checkout,
      numberOfGuests,
      totalAmount,
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking added successfully", booking: savedBooking });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding booking" });
  }
});

app.listen(8080, () => {
  console.log(
    "server started...\nClick the url to gain access: http://10.255.66.162:8080/"
  );
});
