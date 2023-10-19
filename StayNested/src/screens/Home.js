import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import roomData from "../components/Rooms";

const Home = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms from the backend API and update the state
    fetch("http://localhost:8080/allrooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

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
      <div>
      
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {rooms.map((room) => (
          <div className="col" key={room._id}>
            <div className="card">
            <img src={room.image} height={210} alt={room.title} />
            </div>
            <div className="card-body">
            <h3 className="card-title">{room.title}</h3>
            <p className="card-text">{room.description}</p>
            <p className="card-text">R {room.pricePerNight}</p>
            </div>
          </div>
        ))}
        </div>
      
    </div>
      <br />
      <Footer />
    </>
  );
};

export default Home;
