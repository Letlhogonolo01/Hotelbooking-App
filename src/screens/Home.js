import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <br/>
      <div class="row row-cols-1 row-cols-md-3 g-3">
        <div class="col">
          <Link to="/details">
            <div className="card">
              <img src="/images/standard-room.jpg" height={210} />
              <div class="card-body">
                <h5 class="card-title">Standard</h5>
                <p class="card-text">
                  The standard room is a basic accommodation. It usually
                  includes essential amenities such as a bed, a bathroom, basic
                  furniture and often the most affordable and comfortable.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div class="col">
          <Link to="/details">
            <div className="card">
              <img src="/images/single-room.jpg" height={210} />
              <div class="card-body">
                <h5 class="card-title">Single</h5>
                <p class="card-text">
                  A single room is designed for a single occupant and typically
                  features a single bed. It provides a private space for one
                  person with basic amenities, making it suitable for solo
                  travelers.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div class="col">
          <Link to="/details">
            <div className="card">
              <img src="/images/delux-room.jpg" height={210} />
              <div class="card-body">
                <h5 class="card-title">Delux</h5>
                <p class="card-text">
                  A deluxe room offers additional space and more amenities
                  compared to standard rooms. It may include upgraded
                  furnishings, larger living areas.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div class="col">
          <Link to="/details">
            <div className="card">
              <img src="/images/family-room.jpg" height={210} />
              <div class="card-body">
                <h5 class="card-title">Family</h5>
                <p class="card-text">
                  A family room is designed to accommodate multiple guests, in a
                  single unit. It often includes separate sleeping areas for
                  adults and children, comfortable for families traveling
                  together.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div class="col">
          <Link to="/details">
            <div className="card">
              <img src="/images/suite-room.jpg" height={210} />
              <div class="card-body">
                <h5 class="card-title">Suite</h5>
                <p class="card-text">
                  A suite is a larger and more luxurious accommodation. It
                  typically consists of separate living and sleeping areas,
                  providing space and privacy, making them suitable for both
                  leisure and business travelers.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div class="col">
          <Link to="/details">
            <div className="card">
              <img src="/images/presidentialsuite-room.jpg" height={210} />
              <div class="card-body">
                <h5 class="card-title">Presidential Suite</h5>
                <p class="card-text">
                  The presidential suite is the most luxurious and spacious
                  accommodation. It is designed for high-end travelers and often
                  includes multiple bedrooms, a living area, a dining room, and
                  upscale amenities.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <br/>
      <Footer />
    </>
  );
};

export default Home;
