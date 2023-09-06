import React, { useState, useEffect } from "react";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    title: "",
    description: "",
    checkin: "",
    checkout: "",
    numberOfGuests: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    // Fetch user bookings data when the component mounts
    fetch("http://localhost:8080/userbookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching user bookings:", error);
      });
  }, []); // Empty dependency array to fetch data once on component mount

  function logout() {
    window.location.href = "/login";
  }

  // Function to open the edit form and set the current booking
  function handleEditClick(booking) {
    setEditingBooking(booking);
    setIsEditing(true);

    // Initialize the form data with the booking details
    setFormData({
      full_name: booking.full_name,
      email: booking.email,
      title: booking.title,
      description: booking.description,
      checkin: booking.checkin,
      checkout: booking.checkout,
      numberOfGuests: booking.numberOfGuests,
      totalAmount: booking.totalAmount,
    });
  }

  // Function to handle input changes and recalculate the total amount
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Recalculate the total amount when relevant fields change
    if (
      name === "numberOfGuests" ||
      name === "checkin" ||
      name === "checkout"
    ) {
      calculateTotal();
    }
  }

  // Function to calculate the total amount based on numberOfGuests, checkin, and checkout
  function calculateTotal() {
    // Implement your calculation logic here based on formData
    // Example calculation: totalAmount = basePrice * numberOfGuests + additionalFees
    const basePrice = 1000; // Replace with your base price
    const additionalFees = 50; // Replace with any additional fees

    const totalAmount =
      basePrice * parseInt(formData.numberOfGuests, 10) + additionalFees;

    setFormData({
      ...formData,
      totalAmount: totalAmount,
    });
  }

  // Function to handle updating the booking
  async function handleUpdateClick() {
    try {
      // Send a PUT request to update the booking
      const response = await fetch(
        `http://localhost:8080/userbookings/${editingBooking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Update the state with the updated booking
        const updatedBooking = await response.json();
        setEditingBooking(null);
        setIsEditing(false);

        // Find the index of the updated booking in the array
        const index = bookings.findIndex(
          (b) => b._id === updatedBooking.booking._id
        );

        if (index !== -1) {
          // Create a new array with the updated booking
          const updatedBookings = [...bookings];
          updatedBookings[index] = updatedBooking.booking;

          // Set the state with the updated bookings
          setBookings(updatedBookings);
        }
      } else {
        console.error("Error updating booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  }

  // Function to handle canceling the edit
  function handleCancelClick() {
    setEditingBooking(null);
    setIsEditing(false);
  }

  // Function to handle delete confirmation
  function handleDeleteConfirmation(bookingId) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirmation) {
      // If the admin confirms, proceed with the deletion
      handleDeleteClick(bookingId);
    } else {
      // If the admin cancels, do nothing
    }
  }

  // Function to handle deleting the booking
  async function handleDeleteClick(bookingId) {
    try {
      // Send a DELETE request to delete the booking by its ID
      const response = await fetch(
        `http://localhost:8080/userbookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted booking from the state
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      } else {
        console.error("Error deleting booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-card">
        <div className="table-responsive">
          <table className="room-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room Image</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Room Name</th>
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>Number of Guests</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>
                    <img
                      src={booking.image}
                      alt={`Room ${booking.title}`}
                      className="room-image"
                    />
                  </td>
                  <td>{booking.full_name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.title}</td>
                  <td>{new Date(booking.checkin).toDateString()}</td>
                  <td>{new Date(booking.checkout).toDateString()}</td>
                  <td>{booking.numberOfGuests}</td>
                  <td>R{parseFloat(booking.totalAmount).toFixed(2)}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(booking)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteConfirmation(booking._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isEditing && (
          <div>
            <h3>Edit Booking</h3>
            <form>
              {/* Input fields for editing booking details */}
              <div>
                <label>Customer Name:</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Customer Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Room Name:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Check-In Date:</label>
                <input
                  type="date"
                  name="checkin"
                  value={formData.checkin}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Check-Out Date:</label>
                <input
                  type="date"
                  name="checkout"
                  value={formData.checkout}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Number of Guests:</label>
                <input
                  type="number"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Total Amount:</label>
                <input
                  type="text"
                  name="totalAmount"
                  value={`R${parseFloat(formData.totalAmount).toFixed(2)}`}
                  readOnly
                />
              </div>
              <button onClick={handleUpdateClick}>Update</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </form>
          </div>
        )}
      </div>
      <button className="logout-button btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Admin;
