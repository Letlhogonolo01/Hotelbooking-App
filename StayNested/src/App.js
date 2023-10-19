import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import About from "./screens/About";
import SignUp from "./screens/SignUp";
import Payment from "./screens/Payment";
import AddRoom from "./screens/AddRoom";
import BookingDetails from "./screens/BookingDetails";
import ConfirmBooking from "./screens/ConfirmBooking";
import Admin from "./screens/Admin";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Profile from "./screens/Profile";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center"></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/details/:roomIndex"
            element={<BookingDetails />}
          ></Route>
          <Route
            path="/confirm/:roomIndex"
            element={<ConfirmBooking />}
          ></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/AddRoom" element={<AddRoom />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/cancel" element={<Cancel />}></Route>
          <Route path="/" element={<Footer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
