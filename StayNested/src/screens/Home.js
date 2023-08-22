import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import roomData from "../components/Rooms";

const Home = () => {
  return (
    <>
      <Navbar />
      <br />
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {roomData.map((room, index) => (
          <div className="col" key={index}>
            <Link to={`/details/${index}`}>
              <div className="card">
                <img src={room.image} height={210} alt={room.title} />
                <div className="card-body">
                  <h5 className="card-title">{room.title}</h5>
                  <p className="card-text">{room.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Home;
