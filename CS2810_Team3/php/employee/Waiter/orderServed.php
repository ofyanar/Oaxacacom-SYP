 
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
 * The data is sent from the js program using the POST method and the order number of the customer
 * and the id of the branch the customer is in is  accessed through the $_POST super global variable.
 */
$order = $_POST['order'];
$branch = $_POST['branch'];

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

//  A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query update the served_status field of the customer_orders DB table for when the waiter
 * has served the customer's order.
 */
$query = "UPDATE customer_orders SET served_status = 'true' WHERE order_number = " . $order . " AND br_id = " . $branch . ";";
mysqli_query($conn, $query );

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

?>
