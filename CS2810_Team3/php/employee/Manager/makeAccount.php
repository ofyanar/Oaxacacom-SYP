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
 * The data is sent from the js program using the POST method so the id of the branch, position and password 
 * of the employee account to be created is accessed through the $_POST super global variable.
 */
$branch = $_POST["branch"];
$position = $_POST["position"];
$pw = $_POST["pw"];

// The array below is used to store the final value of the employee id assigned to the newly created account.
$final = array();

// The variable below is used to temporarily store the value of the employee id to be assigned to the newly created account.
$empid = "";

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}

// A query to fetch the current_value field from the number_tracker database table for the 'empid' number tracker.
$query = "SELECT current_value FROM number_tracker WHERE track_for = 'empid'";
// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query);

/*
 * The loop assigns each row of the result to $row, through which you can access the field value.
 * The 'current_value' field of the row is assigned to $empid.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
	$empidInt = intval($row['current_value']);
	// First, the empid's int value is incremented by one.
	$empidInt++;
	// The string value of the incremented empid number is re-assigned to $empid.
	$empid = strval($empidInt);
	// A query is made to update the current_value field of the empid tacker so no two employees employee id.
	$query2 = "UPDATE number_tracker SET current_value = " . $empid . " WHERE track_for = 'empid'";
	mysqli_query($conn, $query2);
}

// The $empid of the employee is then pushed into $final.
array_push($final, $empid);

/*
 * A query is made to insert a new row on the employee DB table with the aforementioned field values.
 */
$query3 = "INSERT INTO employee (employee_id, br_id, password, position) VALUES (" . $empid . ", " . $branch . ", '" . $pw . "', '" . $position . "');";
mysqli_query($conn, $query3);

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
