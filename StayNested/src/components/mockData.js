// src/mockData.js
const mockRooms = [
  {
    id: 1,
    customerName: "Peter",
    roomName: "Single",
    numberOfGuests: 2,
    checkInDate: new Date("2023-08-01"),
    checkOutDate: new Date("2023-08-05"),
    totalAmount: 450,
  },
  {
    id: 2,
    customerName: "Parker",
    roomName: "Standard",
    numberOfGuests: 1,
    checkInDate: new Date("2023-08-02"),
    checkOutDate: new Date("2023-08-06"),
    totalAmount: 450,
  },
  // ... other rooms
];

export default mockRooms;
