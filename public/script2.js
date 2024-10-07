const API_ENDPOINT = '/api/reservations'; // Replace with your actual endpoint

fetch(API_ENDPOINT)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const reservations = data.results.map(reservation => ({
      reservationId: reservation._id,
      guestName: reservation.guest.fullName,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut
    }));
    console.log(reservations); // You can use or manipulate `reservations` as needed
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });