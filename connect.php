-- Active: 1733365910375@@127.0.0.1@3306@reservation_db
<?php
// Database connection settings
$servername = "localhost"; // Your database server (usually localhost)
$username = "root"; // Your database username (default is 'root' for XAMPP)
$password = ""; // Your database password (default is '' for XAMPP)
$dbname = "reservation_db"; // Name of the database you created

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully"; // If the connection is successful
?>
