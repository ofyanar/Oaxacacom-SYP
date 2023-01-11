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
 * The data is sent from the js program using the POST method so the basket number, the reserved 
 * table number and the id of the branch in which it was reserved, the order total and the
 * time at which the customer placed their order is accessed through the $_POST super global variable.
 */
$basketNo = $_POST['basketNo'];
$table = $_POST['table']; 
$branch = $_POST['branch'];
$total = $_POST['total'];
$time  = $_POST['time'];  
/*
 * A set of variables initialised to be used to hold order and queue numbers for the customer,
 * additionally the served status, ready status and receipt_asked fields will have initial values of 'false'
 * when inserting into the customer_orders DB table.
 */
$queue = '';
$order = '';
$served = 'false'; 
$ready = 'false'; 
$receipt = 'false'; 
/*
 * The array below is used to store the order number and queue number assigned to the customer.
 */
$extra_info = array();
 
 // A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name); // A connection to the database established and the value is stored in $conn.

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}

// A query to fetch the current_value field from the number_tracker database table for the 'queue' number tracker.
$query = "SELECT current_value FROM number_tracker WHERE track_for = 'queue'";
// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query );
/*
 * The loop assigns each row of the result to $row, through which you can access the field value.
 * The 'current_value' field of the row is assigned to $queue.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
		 $queue = $row["current_value"];
}
// Then the queue number's int value is incremented by one.
$queueNo_Int = (int)$queue;
$queueNo_Int++;
// The string value of the incremented queue number is re-assigned to $queue.
$queue = strval($queueNo_Int);
// The queue number of the customer is then pushed into $extra_info.
array_push($extra_info, $queue);

// A query is made to update the current_value field of the queue number tacker so no two customers have the same queue number.
$query2 = "UPDATE number_tracker SET current_value = " . $queue . " WHERE track_for = 'queue'";
mysqli_query($conn, $query2);

// A query to fetch the current_value field from the number_tracker database table for the 'order' number tracker.
$query3 = "SELECT current_value FROM number_tracker WHERE track_for = 'order'";
// The result is a data structure that can be looped through.
$result3 = mysqli_query($conn, $query3 );
/*
 * The loop assigns each row of the result to $row, through which you can access the field value.
 * The 'current_value' field of the row is assigned to $order.
 */
while (($row = mysqli_fetch_assoc($result3)) != null){
		 $order = $row["current_value"];
}
// Then the order number's int value is incremented by one.
$orderNo_Int = (int)$order;
$orderNo_Int++;
// The string value of the incremented queue number is re-assigned to $order.
$order = strval($orderNo_Int);
// The order number of the customer is then pushed into $extra_info.
array_push($extra_info, $order);

// A query is made to update the current_value field of the order number tacker so no two customers have the same order number.
$query4 = "UPDATE number_tracker SET current_value = " . $order . " WHERE track_for = 'order'";
mysqli_query($conn, $query4);

/*
 * A query is made to insert a new row on the customer_orders DB table with the aforementioned field values.
 */
$query5 = "INSERT INTO customer_orders(queue_number, served_status, ready_status, order_number, basket_no, total, order_time, table_number, br_id, receipt_asked)" 
		." VALUES(". $queue .", '". $served ."', '" . $ready ."', " . $order.", ".$basketNo.", '". $total."', '".$time."', ".$table.", ".$branch.", '".$receipt."');";
mysqli_query($conn, $query5 );
/*
 * The connection to the database is closed so we do not encounter a connection problem in other php files.
 */
mysqli_close($conn);
/*
 * The $extra_info array contains all the data we aimed to fetch from the database.
 * Though, we cannot just return the $extra_info array to the js script which called this php
 * program since both are different programming languages. In order to send the data in a 
 * js suitable format we encode it to the Javascript Object Notation.
 */
echo json_encode($extra_info);

?>