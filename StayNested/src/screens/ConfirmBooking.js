import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import roomData from "../components/Rooms";
import Navbar from "../components/Navbar";
import PaymentButton from "../components/PaymentButton";

function ConfirmBooking() {
  const { roomIndex } = useParams();
  const room = roomData[roomIndex];
  const location = useLocation();
  const bookingDetails = location.state;

  useEffect(() => {
    // Check the URL path to determine success or cancellation
    if (window.location.pathname === "/home-success") {
      // Show a pop-up alert for successful booking
      alert("Congratulations! Your booking was successful.");
      // Redirect to the home screen
      window.location.href = "/";
    } else if (window.location.pathname === "/home-cancel") {
      // Show a pop-up alert for booking cancellation
      alert("Your booking has been canceled.");
      // Redirect to the ConfirmBooking screen
      window.location.href = "/";
    }
  }, [roomIndex]);

  return (
    <>
      <Navbar />
      <br />
      <Link to={`/details/${roomIndex}`} className="back-icon">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className="card mb-3" style={{ margin: 10 }}>
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={room.image}
              className="img-fluid rounded-start"
              alt={room.title}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{room.title}</h5>
              <p className="card-text">{room.description}</p>
              <p>Check-in Date: {bookingDetails.checkInDate}</p>
              <p>Check-out Date: {bookingDetails.checkOutDate}</p>
              <p>Number of Guests: {bookingDetails.numOfGuests}</p>
              <p>Total Amount: R{bookingDetails.totalAmount}</p>
              <PaymentButton
                booking={{
                  id: roomIndex,
                  checkInDate: bookingDetails.checkInDate,
                  checkOutDate: bookingDetails.checkOutDate,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmBooking;
