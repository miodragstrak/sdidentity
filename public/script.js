document.addEventListener('DOMContentLoaded', function () {
    // Fetch reservations data from your API

        fetch('/api/reservations') // Replace with your actual endpoint
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })

        .then(data => {
            console.log(data);
            const tableBody = document.querySelector('#reservations-table tbody');
            tableBody.innerHTML = ''; // Clear the table body

            // Check if data has reservations property and loop through it
            if (data.results) {
                data.results.forEach(reservation => {
                    const row = document.createElement('tr');

                    // Create cells for each column
                    const reservationIdCell = document.createElement('td');
                    const guestNameCell = document.createElement('td');
                    const checkInCell = document.createElement('td');
                    const checkOutCell = document.createElement('td');

                    // Fill cells with data
                    reservationIdCell.textContent = results._id; // Adjust based on the response structure
                    guestNameCell.textContent = results.guestId; // Adjust based on the response structure
                    checkInCell.textContent = results.listingId; // Adjust based on the response structure
                    checkOutCell.textContent = results.confirmationCode; // Adjust based on the response structure

                    // Append cells to the row
                    row.appendChild(reservationIdCell);
                    row.appendChild(guestNameCell);
                    row.appendChild(checkInCell);
                    row.appendChild(checkOutCell);

                    // Append the row to the table body
                    tableBody.appendChild(row);
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="4">No reservations found.</td></tr>';
            }
        })
        .catch(error => console.error('Error fetching reservations:', error));
});