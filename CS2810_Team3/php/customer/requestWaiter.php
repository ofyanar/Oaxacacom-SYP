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
 * The data is sent from the js program using the POST method and the id of the branch and table number 
 * the customer is currently occupying along with the exact date in which they requested a waiter
 * is accessed through the $_POST super global variable.
 */
$date = $_POST['date'];
$branch = $_POST['branch'];
$table = $_POST['table'];

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query is made to insert a row into the request_waiter DB table upon the customer
 * clicking the 'request waiter' button.
 */
$query = "INSERT INTO request_waiter(request_time, br_id, table_num) VALUES ('". $date ."', " . $branch . ", " . $table .");";
mysqli_query($conn, $query);
// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

?>








