import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendar } from "@fortawesome/free-solid-svg-icons"; // Added faCalendar
import DatePicker from "react-datepicker";
import calculateTotalAmount from "../components/TotalAmount";

function BookingDetails() {
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
    numOfGuests,
    checkInDate,
    checkOutDate
  );

  return (
    <>
      <br />
      <Link to="/" className="back-icon">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <div className="card mb-3" style={{ margin: 10 }}>
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src="/images/standard-room.jpg"
              className="img-fluid rounded-start"
              alt="room"
              style={{ width: "100%", height: "100%" }} // Resize styles
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">Standard</h5>
              <p className="card-text">
                The Standard Room is a basic lodging option offered by hotels,
                providing essential amenities like a bed and bathroom. It's the
                most affordable choice, catering to budget-conscious travelers
                seeking a comfortable place to stay. <br /> The room is simple
                in decor and furnishings, often including a writing desk, TV,
                and climate control. It's widely available and suitable for
                short stays, appealing to solo travelers, couples, and business
                travelers looking for practical accommodations without luxury
                extras.
              </p>
              <div className="date-picker-container">
                <div className="align-left">
                  <p>Select Check-in Date:</p>
                </div>
                <div className="date-picker">
                  <FontAwesomeIcon icon={faCalendar} />
                  <DatePicker
                    selected={checkInDate}
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
                    onChange={(date) => setCheckOutDate(date)}
                  />
                </div>
              </div>
              <div className="room-counter">
                <p className="room-count">Number of Guests:</p>
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
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetails;
