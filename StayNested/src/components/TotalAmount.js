function calculateTotalAmount(pricePerNight, checkInDate, checkOutDate) {
  // Return 0 if check-in/out dates are not selected
  if (!checkInDate || !checkOutDate) {
    return 0;
  }

  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  // Calculate the time difference in milliseconds
  const timeDifference = endDate - startDate;

  // Convert time difference to days
  const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate total amount
  const totalAmount = pricePerNight * numberOfNights;

  return totalAmount;
}

export default calculateTotalAmount;
