import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Payment() {
  return (
    <div>
      <br />
      <Link to="/details" className="back-icon">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <h1>Payment</h1>
      <p>Payment will be done here</p>
    </div>
  );
}

export default Payment;
