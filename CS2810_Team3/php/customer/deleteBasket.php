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
 * The data is sent from the js program using the POST method and the basket number
 * of the customer is accessed through the $_POST super global variable.
 */
$basketNo = $_POST['basketNo'];

// Connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}


/*
 * A query is made to delete the customer's basket from the Basket DB table 
 * upon the customer clicking the 'empty basket' button on the page where they
 * can view their basket, i.e. basket.htm
 */
$query = "DELETE FROM basket WHERE basket_no = " . $basketNo . ";";
mysqli_query($conn, $query);

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

?>
