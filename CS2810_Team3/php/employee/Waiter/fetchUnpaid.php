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
 * The data is sent from the js program using the POST method and the id of the branch where the
 * waiter works in is accessed through the $_POST super global variable.
 */
$branch = $_POST['branch'];

// The array below is used to store information of a unprepared orders on the customer_orders DB table.
$final = array();

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

//  A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query to order_number, table_number, order_time and basket_no fields from 
 * the customer_orders database table where the served_status and the ready_status fields are 'true'.
 */
$query = "SELECT order_number, table_number, order_time, basket_no FROM customer_orders WHERE br_id = ". $branch." AND served_status = 'true' AND receipt_asked = 'true';";

// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query);

/*
 * The loop assigns each row of the result to $row. through which you can access field values.
 * These values are then inserted into $final. The loop carries on until a null row is encountered,
 * i.e. all the rows have been looped through.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
	array_push($final, $row["order_number"] . "," . $row["table_number"] . "," . $row["order_time"]. "," . $row["basket_no"]);
} 

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);


/*
 * The $final array contains all the data we aimed to fetch from the database.
 * Though, we cannot just return the $final array to the js script which called this php
 * program since both are different programming languages. In order to send the data in a 
 * js suitable format we encode it to the Javascript Object Notation.
 */
echo json_encode($final);
?>
