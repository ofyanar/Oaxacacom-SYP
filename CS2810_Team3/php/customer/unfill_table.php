
<?php
/*
 * The variables below are used to store the server name, username, password and
 * db name of the database we use, in order to establish a connection.
 *
 */
$servername = "localhost";
$username = "oaxaca123";
$password = "Oaxaca123123$";
$db_name = "oaxacauk";

/*
 * The data is sent from the js program using the POST method and the id of the branch and the table which 
 * the customer reserved is accessed through the $_POST super global variable.
 */
$branch = $_POST['id'];
$table = $_POST['table'];

// Connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query to update the 'availabile' field of the table which the customer chose to reserve as 'true'.
 * This way other customers can be aware of free tables when making reservations.
 */
$query = "UPDATE branch_tables SET available = 'true' WHERE br_id = " . $branch . " AND table_number = " . $table;
mysqli_query($conn, $query);

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

// A boolean value is echoed back to the js script to be processed
echo 'true';

?>