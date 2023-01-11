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
 * The data is sent from the js program using the POST method so the basket number, the order 
 * number and the id of the branch in which it was reserved is accessed through the $_POST super global variable.
 */
$order = $_POST['orderNo']; // int
$basketNo = $_POST['basketNo']; // int
$branch = $_POST['branch']; // int

/*
 * A set of variables initialised to be used to hold the sale number for the customer,
 * additionally the total cost of the customer's order
 * when inserting into the sales DB table.
 */
$saleNo = "";
$total = "";

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}

// A query to fetch the current_value field from the number_tracker database table for the 'sale' number tracker.
$query = "SELECT current_value FROM number_tracker WHERE track_for = 'sale'";
// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query);

/*
 * The loop assigns each row of the result to $row, through which you can access the field value.
 * The 'current_value' field of the row is assigned to $saleNo.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
		// Then the sale number's int value is incremented by one.
		$saleInt = intval($row["current_value"]);
		$saleInt++;
		// The string value of the incremented sale number is re-assigned to $order.
		$saleNo = strval($saleInt);
		// A query is made to update the current_value field of the sale number tacker so no two customers have the same sale number.
		$qry = "UPDATE number_tracker SET current_value = " . $saleNo . " WHERE track_for = 'sale';";
		mysqli_query($conn, $qry);
}

// A query to fetch the total of the order of a customer from the customer_orders DB table.
$query2 = "SELECT total FROM customer_orders WHERE order_number = " . $order . " AND br_id = " . $branch . ";";
// The result is a data structure that can be looped through.
$result2 = mysqli_query($conn, $query2);

/*
 * The loop assigns each row of the result to $row, through which you can access the field value.
 * The 'total' field of the row is assigned to $total.
 */
while (($row = mysqli_fetch_assoc($result2)) != null){
		$total = $row["total"];
}

/*
 * A query is made to insert a new row on the sales DB table with the aforementioned field values.
 */
$query3 = "INSERT INTO sales (sale_no, br_id, total) VALUES (" . $saleNo . ", " . $branch . ", " . $total . ");";
mysqli_query($conn, $query3);

/*
 * Another query is made to delete the customer's basket from the Basket DB table 
 * since the sale to the customer has been completed by the waiter.
 */
$query4 = "DELETE FROM basket WHERE basket_no = " . $basketNo .";";
mysqli_query($conn, $query4);

/*
 * A final query is made to delete the customer's order from the customer_orders DB table 
 * since the sale to the customer has been completed by the waiter.
 */
$query5 = "DELETE FROM customer_orders WHERE order_number = ". $order . " AND br_id = ". $branch ." AND basket_no = " . $basketNo .";";
mysqli_query($conn, $query5);

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

?>