<?php
/*
 *The variables below are used to store the server name, username, password and
 *db name of the database we use, in order to establish a connection.
 *
 */
$servername = "localhost";
$username = "oaxaca123";
$password = "Oaxaca123123$";
$db_name = "oaxacauk";

/*
 * The data is sent from the js program using the POST method and the table number of the customer
 * and the id of the branch the customer is in is  accessed through the $_POST super global variable.
 */
$branch = $_POST['branch'];
$table = $_POST['table'];

$conn = mysqli_connect($servername, $username, $password, $db_name);

//  A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query is made to delete the handled waiter-request from the request_waiter DB table
 * which a customer had placed.
 */
$query = "DELETE FROM request_waiter WHERE br_id = ". $branch." AND table_num = " . $table .";";
mysqli_query($conn, $query);

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);


?>