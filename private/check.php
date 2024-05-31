<!-- Connect DB -->
<?php
$servername = "127.0.0.1:3306";
$username = "root";
$password = "";
$database = "kad_kahwin";

$connection = mysqli_connect($servername, $username, $password, $database);

if (!$connection) {
    die("Connection Failed: " . mysqli_connect_error());
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/check.css">
    <title>Semak Data</title>
</head>

<body>
    <div class="kehadiran">
        <div class="hadir">
            <h1 class="title">Jumlah tetamu hadir:</h1>
            <?php
            $query = mysqli_query($connection, "SELECT jumlah_kehadiran FROM kehadiran");
            if ($query) {
                $row = mysqli_fetch_assoc($query);
                $data = $row['jumlah_kehadiran'];
                echo '<span>' . $data . '</span>';
            }
            ?>
        </div>
        <div class="tidak-hadir">
            <h1 class="title">Jumlah tetamu tidak hadir:</h1>
            <?php
            $query = mysqli_query($connection, "SELECT jumlah_tidak_hadir FROM kehadiran");
            if ($query) {
                $row = mysqli_fetch_assoc($query);
                $data = $row['jumlah_tidak_hadir'];
                echo '<span>' . $data . '</span>';
            }
            ?>
        </div>
    </div>
    <div class="ucapan">
        <table>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Ucapan</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $query = mysqli_query($connection, "SELECT * FROM ucapan_kahwin");

                if ($query) {
                    while ($row = mysqli_fetch_assoc($query)) {
                        $name = $row["nama_tetamu"];
                        $message = $row["ucapan_tetamu"];
                        echo '<tr>';
                        echo '<td>' . $name . '</td>';
                        echo '<td>' . $message . '</td>';
                        echo '</tr>';
                    }
                }
                ?>
            </tbody>
        </table>
    </div>
</body>

</html>