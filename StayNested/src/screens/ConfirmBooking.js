import React from "react";
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
                  id:roomIndex,
                  checkInDate:bookingDetails.checkInDate,
                  checkOutDate:bookingDetails.checkOutDate,
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
