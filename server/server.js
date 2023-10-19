require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer"); 
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const Booking = require("./models/bookings");
const Rooms = require("./models/rooms");

const app = express();

// This is the Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/stay-nested");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [0, { priceInCents: 100000, name: "Standard" }],
  [1, { priceInCents: 130000, name: "Single" }],
  [2, { priceInCents: 160000, name: "Delux" }],
  [3, { priceInCents: 200000, name: "Family" }],
  [4, { priceInCents: 250000, name: "Suite" }],
  [5, { priceInCents: 320000, name: "Presidential Suite" }],
]);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use originalname for filename
  },
});

// Assuming your images are stored in the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


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
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
    });
    res.json({ url: session.url });
  } catch (e) {
    console.log("server.js line:55 e", e);
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
  const { full_name, email, password, phone } = req.body;
  // Create a new user using the User model
  const newUser = new User({
    full_name,
    email,
    password,
    phone,
  });
  try {
    // Save the new user to the database
    const user = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: user });
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
    const user = await User.findOne({ email: email, password: password });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Include user details in the response
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
      full_name,
      email,
      title,
      description,
      checkin,
      checkout,
      numberOfGuests,
      totalAmount,
    } = req.body;
    console.log("server.js line:148 req.body", req.body);

    // Create a new booking using the Booking model
    const newBooking = new Booking({
      image,
      full_name,
      email,
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
    res.status(500).json({ error: error });
  }
});

// This API is for getting all the User Bookings
app.get("/userbookings", async (req, res) => {
  try {
    // Retrieve all bookings from the database
    const bookings = await Booking.find();

    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user bookings" });
  }
});

// This API is for updating the User Bookings
app.put("/userbookings/:bookingId", async (req, res) => {
  try {
    // Get the booking ID from the request parameters
    const bookingId = req.params.bookingId;

    // Extract the updated booking data from the request body
    const updatedBookingData = req.body;

    // Use Mongoose to find the booking by ID and update it
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updatedBookingData,
      { new: true } // This option returns the updated booking
    );

    if (!updatedBooking) {
      // If the booking is not found, return a 404 status
      return res.status(404).json({ error: "Booking not found" });
    }

    // Send a success response with the updated booking data
    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    // Handle any errors that may occur during the update process
    res
      .status(500)
      .json({ error: "An error occurred while updating the booking" });
  }
});

// This API is for deleting a specific User Booking by ID
app.delete("/userbookings/:bookingId", async (req, res) => {
  try {
    // Get the booking ID from the request parameters
    const bookingId = req.params.bookingId;

    // Use Mongoose to delete the booking by ID
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      // If the booking is not found, return a 404 status
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the booking" });
  }
});

const upload = multer({ storage: storage });

// Example route to add a room
app.post("/rooms", upload.single("image"), async (req, res) => {
  try {
    const { title, description, pricePerNight } = req.body;
    const imagePath = req.file.filename; // Assuming the image path is stored in the 'path' property of the file

    // Create a new room instance
    const newRoom = new Rooms({
      image: imagePath,
      title,
      description,
      pricePerNight,
    });

    // Save the new room to the database
    const savedRoom = await newRoom.save();

    res.json(savedRoom);
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/rooms", async (req, res) => {
  try {
    // Retrieve all rooms from the database
    const rooms = await Rooms.find();

    // Send the rooms as a JSON response
    res.status(200).json(rooms);
  } catch (error) {
    // Handle any errors that may occur during the retrieval
    res.status(500).json({ error: "An error occurred while fetching rooms" });
  }
});

app.listen(8080, () => {
  console.log(
    "server started...\nClick the url to gain access: http://10.255.66.162:8080/"
  );
});
