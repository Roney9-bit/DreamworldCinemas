let selectedMovie = '';
let selectedShowtime = '';
let selectedSeats = [];

// Function to handle movie selection
function selectMovie(movieName, showtime) {
    selectedMovie = movieName;
    selectedShowtime = showtime;

    // Update UI with selected movie details
    document.getElementById('selected-movie-name-seat').textContent = selectedMovie;
    document.getElementById('selected-showtime-seat').textContent = selectedShowtime;

    // Show the seat selection section
    document.getElementById('movie-list').style.display = 'none';
    document.getElementById('seat-selection-section').style.display = 'block';

    // Generate seat map (for simplicity, assume 10x10 grid)
    const seatMapContainer = document.getElementById('seat-map');
    seatMapContainer.innerHTML = ''; // Clear previous seats

    for (let i = 0; i < 100; i++) {
        let seat = document.createElement('div');
        seat.id = `seat-${i + 1}`;
        seat.classList.add('available');
        seat.addEventListener('click', function() {
            toggleSeatSelection(i + 1);
        });
        seatMapContainer.appendChild(seat);
    }
}

// Function to toggle seat selection
function toggleSeatSelection(seatNumber) {
    const seat = document.getElementById(`seat-${seatNumber}`);
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
    } else {
        seat.classList.add('selected');
        selectedSeats.push(seatNumber);
    }

    // Enable the proceed button when seats are selected
    document.getElementById('continue-booking').style.display = selectedSeats.length > 0 ? 'inline-block' : 'none';
}

// Function to proceed to checkout
function proceedToCheckout() {
    // Show the ticket booking section
    document.getElementById('seat-selection-section').style.display = 'none';
    document.getElementById('booking-section').style.display = 'block';
    document.getElementById('selected-movie-name').textContent = selectedMovie;
    document.getElementById('selected-showtime').textContent = selectedShowtime;
}

// Function to handle ticket booking form submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let numTickets = parseInt(document.getElementById('num-tickets').value);
    if (numTickets < 1 || numTickets > 10) {
        alert("Please select between 1 and 10 tickets.");
        return;
    }

    // Calculate the total amount (assuming $10 per ticket)
    let totalAmount = numTickets * 10;

    // Display booking confirmation
    document.getElementById('tickets-booked').textContent = numTickets;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

    // Hide the form and show the result
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('booking-result').style.display = 'block';

    // Show food selection
    document.getElementById('food-section').style.display = 'block';
});

// Function to finalize the booking
function finalizeBooking() {
    // Simulate a QR Code (you can use qrcode.js for actual QR generation)
function showQRCode() {
    const qrCodeDiv = document.getElementById('qr-code');
    
    // Placeholder for QR Code
    qrCodeDiv.innerHTML = `<div style="background: #3498db; color: white; padding: 15px; text-align: center; font-size: 24px; border-radius: 10px;">
                             ORDER ID: ${Math.floor(Math.random() * 1000000)}
                           </div>`;
}

// Call this function after booking completion
document.getElementById('booking-result').style.display = 'block';
showQRCode();

    let foodItems = [];
    if (document.getElementById('food1').checked) foodItems.push('Burger King');
    if (document.getElementById('food2').checked) foodItems.push('Domino\'s');
    if (document.getElementById('food3').checked) foodItems.push('Starbucks');

    alert(`Booking Confirmed! Your selected food items: ${foodItems.join(', ')}`);
    showQRCode();
}
