import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import calculateTotalAmount from "../components/TotalAmount";
import Navbar from "../components/Navbar";
import roomData from "../components/Rooms";

function BookingDetails() {
  // Get room data based on index
  const { roomIndex } = useParams();
  const room = roomData[roomIndex];

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState(1);

  const handleIncrement = () => {
    setNumOfGuests((prevNum) => prevNum + 1);
  };

  const handleDecrement = () => {
    if (numOfGuests > 1) {
      setNumOfGuests((prevNum) => prevNum - 1);
    }
  };

  const totalAmount = calculateTotalAmount(
    room.pricePerNight,
    checkInDate,
    checkOutDate,
  );

  return (
    <>
      <Navbar />
      <br />
      <Link to="/" className="back-icon">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
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
              <p className="card-text">Price per Night: R{room.pricePerNight}</p>
              <div className="date-picker-container">
                <div className="align-left">
                  <p>Select Check-in Date:</p>
                </div>
                <div className="date-picker">
                  <FontAwesomeIcon icon={faCalendar} />
                  <DatePicker
                    selected={checkInDate}
                    placeholderText="Select Date:"
                    onChange={(date) => setCheckInDate(date)}
                  />
                </div>
              </div>
              <div className="date-picker-container">
                <div className="align-left">
                  <p>Select Check-out Date:</p>
                </div>
                <div className="date-picker">
                  <FontAwesomeIcon icon={faCalendar} />
                  <DatePicker
                    selected={checkOutDate}
                    placeholderText="Select Date: "
                    onChange={(date) => setCheckOutDate(date)}
                  />
                </div>
              </div>
              <div className="guest-counter">
                <p className="guest-count">Number of Guests:</p>
                <button
                  className="counter-button btn btn-danger"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <p>{numOfGuests}</p>
                <button
                  className="counter-button btn btn-primary"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <div className="total-amount">
                <p>Total Amount: R{totalAmount}</p>
              </div>
              <Link to="/payment" className="btn btn-primary">
                Confirm Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetails;
