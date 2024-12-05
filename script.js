function proceedToReservation() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('form').style.display = 'block';
}

function calculateCost() {
    // Get the planting type and hectares input values
    const type = document.getElementById('type').value;
    const hectares = parseFloat(document.getElementById('hectares').value) || 0;

    let costPerHectare = 0;

    // Determine cost per hectare based on planting type
    if (type === 'inbred') costPerHectare = 7000;
    else if (type === 'hybrid') costPerHectare = 8000;

    // Calculate the total cost
    const totalCost = costPerHectare * hectares;

    // Format the cost with a peso sign and .00
    const formattedCost = `₱${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    // Update the Total Cost input field
    document.getElementById('cost').value = formattedCost;
}

function submitReservation() {
    // Get all form inputs
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const address = document.getElementById('address').value;
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;
    const hectares = document.getElementById('hectares').value;

    // Get formatted cost from the Total Cost field
    const formattedCost = document.getElementById('cost').value;

    // Update summary fields with the provided inputs
    document.getElementById('summaryName').innerText = name;
    document.getElementById('summaryNumber').innerText = number;
    document.getElementById('summaryAddress').innerText = address;
    document.getElementById('summaryType').innerText = type;
    document.getElementById('summaryDate').innerText = date;
    document.getElementById('summaryHectares').innerText = hectares;
    document.getElementById('summaryCost').innerText = formattedCost;

    // Hide form and display the summary
    document.getElementById('form').style.display = 'none';
    document.getElementById('summary').style.display = 'block';
}

function saveReservation() {
    const costText = document.getElementById("summaryCost").innerText;
    const numericCost = parseFloat(costText.replace(/[^\d.-]/g, ''));

    const reservationData = {
        name: document.getElementById("summaryName").innerText,
        contact_number: document.getElementById("summaryNumber").innerText,
        address: document.getElementById("summaryAddress").innerText,
        planting_type: document.getElementById("summaryType").innerText,
        reservation_date: document.getElementById("summaryDate").innerText,
        hectares: document.getElementById("summaryHectares").innerText,
        total_cost: numericCost, // Send numeric cost to PHP
    };

    fetch('http://localhost/rice_reservation/save_reservation.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Reservation saved successfully.");
                showThankYouPage(); // Proceed to Thank You page
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Failed to save reservation. Check console for more details.");
        });
}

function showThankYouPage() {
    document.getElementById("summary").style.display = "none";
    const thankYouPage = document.getElementById("thankYou");
    thankYouPage.style.display = "block";
}

function newReservation() {
    document.getElementById("thankYou").style.display = "none";
    document.getElementById("form").style.display = "block";
    document.getElementById("reservationForm").reset(); // Clear form fields
}

function exitWebsite() {
    window.close(); // Attempt to close the browser tab
}


function editReservation() {
    // Hide the summary and show the form again
    document.getElementById('summary').style.display = 'none';
    document.getElementById('form').style.display = 'block';

    // Populate form fields with the current reservation summary values
    document.getElementById('name').value = document.getElementById('summaryName').innerText;
    document.getElementById('number').value = document.getElementById('summaryNumber').innerText;
    document.getElementById('address').value = document.getElementById('summaryAddress').innerText;
    document.getElementById('type').value = document.getElementById('summaryType').innerText;
    document.getElementById('date').value = document.getElementById('summaryDate').innerText;
    document.getElementById('hectares').value = document.getElementById('summaryHectares').innerText;

    // Recalculate and update the cost field
    calculateCost();
}
