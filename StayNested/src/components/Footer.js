import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div class="card text-center">
      <div class="card-footer text-body-secondary">{`Copyright © StayNested ${year}`}</div>
    </div>
  );
}

export default Footer;
