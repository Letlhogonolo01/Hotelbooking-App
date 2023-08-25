import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="card text-center">
      <div className="card-footer text-body-secondary">{`Copyright © StayNested ${year}`}</div>
    </div>
  );
}

export default Footer;
