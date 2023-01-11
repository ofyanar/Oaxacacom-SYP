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
 * The array below is used to store the gross revenue from the sales made 
 * along with the number of sales made in the branch.
 */
$revData = array();

/*
 * The data is sent from the js program using the POST method so the id of the branch in which 
 * the manager works is accessed through the $_POST super global variable.
 */
$branch = $_POST["branch"];

/*
 * The variable below are initialised to be used to temporarily store the gross revenue
 * of sales and the number of sales made.
 */
$total = 0.0;
$orders = 0;

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query to fetch the total field from the sales database table. These values are the total revenue
 * from each individual sale.
 */
$query = "SELECT total FROM sales WHERE br_id = " . $branch . ";";
// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query );

/*
 * The loop increments $total with the 'total' field of each 'sale' DB table row. The final result is the gross revenue made
 * in the branch. $orders increments in each iteration to evaluate the number of sales made in the branch.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
		 $total += floatval($row["total"]);
		 $orders++;
}

// Total is formatted to have 2 decimal places
$total = number_format((float)$total, 2, '.', '');

// The string values of $total and $orders are pushed into $revData.
array_push($revData, strval($total) . "," . strval($orders)); 

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

/*
 * The $revData array contains all the data we aimed to fetch from the database.
 * Though, we cannot just return the $revData array to the js script which called this php
 * program since both are different programming languages. In order to send the data in a 
 * js suitable format we encode it to the Javascript Object Notation.
 */
echo json_encode($revData);
?>
