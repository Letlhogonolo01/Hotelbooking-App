import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Payment from "./screens/Payment";
import BookingDetails from "./screens/BookingDetails";
import About from "./screens/About";

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
          <Route path="/details" element={<BookingDetails />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/" element={<Footer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
