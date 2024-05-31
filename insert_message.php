<!-- Connect DB -->
<?php
$servername = "127.0.0.1:3306";
$username = "root";
$password = "";
$database = "kad_kahwin";

$connection = mysqli_connect($servername, $username, $password);

if (!$connection) {
    die("Connection Failed: " . mysqli_connect_error());
}

mysqli_select_db($connection, $database);

// Add data into database
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process the form submission
    $name = mysqli_real_escape_string($connection, $_POST['name']);
    $message = mysqli_real_escape_string($connection, $_POST['message']);

    $query = "INSERT INTO ucapan_kahwin (nama_tetamu, ucapan_tetamu) VALUES ('$name', '$message')";

    if (mysqli_query($connection, $query)) {
        echo "success";
    } else {
        echo "<script>alert('Terjadi kesilapan: " . mysqli_error($connection) . "');</script>";
    }
}
mysqli_close($connection);
?>
