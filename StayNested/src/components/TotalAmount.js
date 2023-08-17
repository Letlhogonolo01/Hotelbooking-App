function calculateTotalAmount(numOfGuests, checkInDate, checkOutDate) {
  // Define your pricing logic here
  const basePricePerNight = 900;
  const numberOfNights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  );
  const totalAmount = basePricePerNight * numberOfNights * numOfGuests;

  return totalAmount;
}

export default calculateTotalAmount;
