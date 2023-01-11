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
 * The data is sent from the js program using the POST method and the basket number, id of the branch
 * where the customer has a reservation and their order number is accessed through the $_POST super global variable.
 */
$basketNo = $_POST['basketNo']; 
$branch = $_POST['branch']; 
$order = $_POST['orderNo']; 

// Connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query to fetch the menu_no, quantity fields from the Basket database table.
 * These are the items currently in the customers basket.
 */
$query = "SELECT menu_no, quantity FROM basket WHERE basket_no = " .$basketNo .";";
// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query);

/*
 * The loop assigns each row of the result to $row. through which you can access field values.
 * The loop carries on until a null row is encountered,
 * i.e. all the rows have been looped through.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
	/*
	 * Another query fetches the availability, from the branch_menus DB table, 
	 * of each of the menu items that are in the basket.
	 */
	$query2 = "SELECT availability FROM branch_menus WHERE br_id = " . $branch ." AND menu_no = ". $row['menu_no'] .";";
	$row2 = mysqli_fetch_assoc(mysqli_query($conn, $query2));
	$av = $row2['availability'];
	// The availability is then inremented by the quantity of the menu item that is in the basket.
	$av = intval($av) + intval($row['quantity']); 
	/*
	 * The final query updates the availability of the menu item, on the branch_menus table. 
	 * As a result, the availability of each item is up to date for the branch and so
	 * customers can be aware of the availability of each menu item inside a branch.
	 */
	$query3 = "UPDATE branch_menus SET availability = ". $av . " WHERE br_id = ". $branch. " AND menu_no = ". $row['menu_no'] .";";
	mysqli_query($conn, $query3);
}

/*
 * A query is made to delete the customer's basket from the Basket DB table 
 * since the customer has cancelled their order and the basket should not occupy
 * memory on the database.
 */
$query4 = "DELETE FROM basket WHERE basket_no = " . $basketNo .";";
mysqli_query($conn, $query4);

/*
 * A final query is made to delete the customer's order from the customer_orders DB table 
 * since the customer has cancelled their order.
 */
$query5 = "DELETE FROM customer_orders WHERE order_number = ". $order . " AND br_id = ". $branch ." AND basket_no = " . $basketNo .";";
mysqli_query($conn, $query5);

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

?>
