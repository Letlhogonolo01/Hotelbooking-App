import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddRoom() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [rooms, setRooms] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedRoom, setEditedRoom] = useState(null);
  const [originalRoom, setOriginalRoom] = useState(null);
  const navigate = useNavigate();

  // Fetch rooms from the backend API and update the state
  useEffect(() => {
    fetch("http://localhost:8080/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  // Handle file input change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("pricePerNight", pricePerNight);

    try {
      // Make a POST request to your backend API
      const response = await fetch("http://localhost:8080/rooms", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Redirect to admin page after successful room addition
        navigate("/admin");
      } else {
        console.error("Error adding room");
      }
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  // Handle room deletion
  const handleDelete = async (roomId) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (confirmDelete) {
      try {
        // Make a DELETE request to your backend API
        const response = await fetch(`http://localhost:8080/rooms/${roomId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // If deletion is successful, update the rooms state
          setRooms((prevRooms) =>
            prevRooms.filter((room) => room._id !== roomId)
          );
        } else {
          console.error("Error deleting room");
        }
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    } else {
      // User clicked cancel, do nothing
    }
  };

  // Handle opening the edit form
  const handleEdit = (room) => {
    setEditedRoom(room);
    setOriginalRoom(room);
    setShowEditForm(true);
  };

  // Handle closing the edit form
  const handleCloseEditForm = () => {
    setEditedRoom(null);
    setShowEditForm(false);
  };

  // Handle editing the room
  const handleEditSubmit = async () => {
    try {
      // Create an object to store only the fields that have changed
      const updatedFields = {};

      // Check if each field is different from the original data
      if (editedRoom.title !== originalRoom.title) {
        updatedFields.title = editedRoom.title;
      }

      if (editedRoom.description !== originalRoom.description) {
        updatedFields.description = editedRoom.description;
      }

      if (editedRoom.pricePerNight !== originalRoom.pricePerNight) {
        updatedFields.pricePerNight = editedRoom.pricePerNight;
      }

      // Make a PUT request to your backend API with the edited fields
      const response = await fetch(
        `http://localhost:8080/rooms/${editedRoom._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        }
      );

      if (response.ok) {
        // If the update is successful, you can handle the response as needed
        const updatedRoom = await response.json();
        console.log("Room updated successfully:", updatedRoom);

        // After successful edit, update the rooms state
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room._id === editedRoom._id ? { ...room, ...updatedRoom } : room
          )
        );

        // Close the edit form
        handleCloseEditForm();
      } else {
        console.error("Error updating room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Add Room</h2>
              </div>
              <div className="card-body">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Price Per Night</label>
                    <input
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <button className="btn btn-success" type="submit">
                      Add Room
                    </button>
                    <Link to="/admin" className="btn btn-danger">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <br />
      <div className="col-lg-12">
        <h3>Newly Added Rooms:</h3>
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {rooms.map((room) => (
            <div className="col" key={room._id}>
              <div className="card">
                <img
                  src={`http://localhost:8080/uploads/${room.image}`}
                  height={210}
                  alt={room.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{room.title}</h5>
                  <p className="card-text">{room.description}</p>
                  {/* Add the delete button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </button>
                  {/* Add the edit button */}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      {/* Edit Room Form */}
      {showEditForm && (
        <div className="edit-form">
          <div className="card" style={{ maxWidth: "400px" }}>
            <div className="card-body">
              <h3 className="card-title">Edit Room</h3>
              <form onSubmit={handleEditSubmit}>
                {/* Add text inputs for editing image, title, description, and pricePerNight */}
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={editedRoom.title}
                    onChange={(e) =>
                      setEditedRoom({ ...editedRoom, title: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={editedRoom.description}
                    onChange={(e) =>
                      setEditedRoom({
                        ...editedRoom,
                        description: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Price Per Night</label>
                  <input
                    type="text"
                    value={editedRoom.pricePerNight}
                    onChange={(e) =>
                      setEditedRoom({
                        ...editedRoom,
                        pricePerNight: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>
                {/* Add a submit button to save the changes */}
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                {/* Add a cancel button to close the edit form */}
                <button
                  type="button"
                  onClick={handleCloseEditForm}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddRoom;
