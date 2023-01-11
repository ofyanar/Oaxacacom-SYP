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
 * The data is sent from the js program using the POST method and the basket number, the menu-number of the 
 * selected menu item and the selected quantity of said item is accessed through the $_POST super global variable.
 */
$basketNo = $_POST['basketNo'];
$menuItem = $_POST['menuItem'];
$quantity = $_POST['quantity'];

// Connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query is made to delete any rows with matching menu-item number and basket number
 * in the case where a customer decides to change the quantity of the said item they want in their basket.
 */
$query = "DELETE FROM basket WHERE basket_no = ".$basketNo. " AND menu_no = ". $menuItem .";";
mysqli_query($conn, $query);

/*
 * Another query is made to insert a row into the basket DB table for the menu-item and its selected quantity.
 * 
 */
$query2 = "INSERT INTO basket(basket_no, menu_no, quantity) VALUES (". $basketNo .", " . $menuItem . ", " . $quantity .");";
mysqli_query($conn, $query2);

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

?>