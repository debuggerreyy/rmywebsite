<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection settings
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "reservation_db"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        $name = $data['name'];
        $number = $data['contact_number'];
        $address = $data['address'];
        $type = $data['planting_type'];
        $date = $data['reservation_date'];
        $hectares = $data['hectares'];
        $cost = $data['total_cost'];

        // Insert the data into the database
        $sql = "INSERT INTO reservations (name, number, address, type, date, hectares, cost) 
                VALUES ('$name', '$number', '$address', '$type', '$date', '$hectares', '$cost')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Reservation saved successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
        }

        $conn->close();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid data received."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
