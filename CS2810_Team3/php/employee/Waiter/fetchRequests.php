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

// The array below is used to store information of requests made on the request_waiter DB table.
$final = array();
// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

//  A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query to request_time and table_num fields from 
 * the request_waiter database table for the branch the waiter works in.
 */
$query = "SELECT request_time, table_num FROM request_waiter WHERE br_id = ". $branch.";";

// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query);


/*
 * The loop assigns each row of the result to $row. through which you can access field values.
 * These values are then inserted into $final. The loop carries on until a null row is encountered,
 * i.e. all the rows have been looped through.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
	array_push($final, $row["request_time"] . "," . $row["table_num"]);
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