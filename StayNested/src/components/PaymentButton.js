import React, { useState } from "react";

const PaymentButton = ({ booking }) => {
  const [error, setError] = useState(null);

  const handlePaymentClick = () => {
    const startDate = new Date(booking.checkInDate);
    const endDate = new Date(booking.checkOutDate);

    // Calculate the time difference in milliseconds
    const timeDifference = endDate - startDate;

    // Convert time difference to days
    const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    fetch("http://localhost:8080/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: parseInt(booking.id), quantity: numberOfNights }],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        if (url) {
          window.location.href = url;
        } else {
          setError("Invalid response from the server: missing URL.");
        }
      })
      .catch((e) => {
        setError(e.error || "An error occurred.");
        console.error(e.error);
      });
  };

  return (
    <div>
      <button className="btn btn-success" onClick={handlePaymentClick}>
        Make Payment
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PaymentButton;
