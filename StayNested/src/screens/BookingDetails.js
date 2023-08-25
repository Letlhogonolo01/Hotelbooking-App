import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import calculateTotalAmount from "../components/TotalAmount";
import Navbar from "../components/Navbar";
import roomData from "../components/Rooms";

function BookingDetails() {
  const { roomIndex } = useParams();
  const room = roomData[roomIndex];
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numOfGuests, setNumOfGuests] = useState(1);

  const handleIncrement = () => {
    setNumOfGuests((prevNum) => prevNum + 1);
  };

  const handleDecrement = () => {
    if (numOfGuests > 1) {
      setNumOfGuests((prevNum) => prevNum - 1);
    }
  };

  const currentUser = localStorage.getItem("currentUser");
  const user = currentUser ? JSON.parse(currentUser) : null;

  const handleConfirmBooking = () => {
    const calculatedTotalAmount = calculateTotalAmount(
      room.pricePerNight,
      checkInDate,
      checkOutDate
    );

    const bookingDetails = {
      room: room,
      image: room.image,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numOfGuests: numOfGuests,
      totalAmount: calculatedTotalAmount,
    };
    console.log(bookingDetails);

    const booking = {
      image: room.image,
      full_name: user.full_name,
      email: user.email,
      title: room.title,
      description: room.description,
      checkin: checkInDate,
      checkout: checkOutDate,
      numberOfGuests: numOfGuests,
      totalAmount: calculatedTotalAmount,
    };
    console.log('bt.js line:59 user.full_name', user.full_name)

    fetch("http://localhost:8080/booking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(booking),
    });

    navigate(`/confirm/${roomIndex}`, { state: bookingDetails });
  };

  const totalAmount = calculateTotalAmount(
    room.pricePerNight,
    checkInDate,
    checkOutDate
  );

  return (
    <>
      <Navbar />
      <br />
      <Link to="/" className="back-icon">
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
              <p className="card-text">
                Price per Night: R{room.pricePerNight}
              </p>
              <div className="date-picker-container">
                <div className="date-picker">
                  <label
                    className="align-left"
                    style={{ marginBottom: "10px" }}
                  >
                    Select Check-in Date:
                    <br />
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(event) => setCheckInDate(event.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="date-picker-container">
                <div className="date-picker">
                  <label
                    className="align-left"
                    style={{ marginBottom: "10px" }}
                  >
                    Select Check-out Date:
                    <br />
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(event) => setCheckOutDate(event.target.value)}
                    />
                  </label>
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
              <button
                className="btn btn-primary"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetails;
