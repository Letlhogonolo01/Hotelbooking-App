function calculateTotalAmount(
  pricePerNight,
  checkInDate,
  checkOutDate,
  // numOfGuests
) {
  if (!checkInDate || !checkOutDate) {
    return 0; // Return 0 if check-in/out dates are not selected or numOfGuests is invalid
  }

  const numberOfNights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  );

  const totalAmount = pricePerNight * numberOfNights;

  return totalAmount;
}

export default calculateTotalAmount;
