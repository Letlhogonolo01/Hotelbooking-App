import React from "react";
import mockRooms from "../components/mockData";

function Admin() {
  function logout() {
    window.location.href = "/login";
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-card">
        <table className="room-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Image</th>
              <th>Custer Name</th>
              <th>Room Name</th>
              <th>Number of Guests</th>
              <th>Check-In Date</th>
              <th>Check-Out Date</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.image}</td>
                <td>{room.customerName}</td>
                <td>{room.roomName}</td>
                <td>{room.numberOfGuests}</td>
                <td>{room.checkInDate.toDateString()}</td>
                <td>{room.checkOutDate.toDateString()}</td>
                <td>R{room.totalAmount.toFixed(2)}</td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="logout-button btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Admin;
