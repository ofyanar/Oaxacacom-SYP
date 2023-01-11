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
 * The data is sent from the js program using the POST method so the id of the branch in which 
 * the manager works is accessed through the $_POST super global variable.
 */
$branch = $_POST["branch"];

//The variable below is initialised to be used to temporarily store the open-status of the branch.
$status = "";

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query to fetch the is_open field from the Branches database table. 
 * This value is either 'true' or 'false' depending on whether the branch is open or not.
 */
$query = "SELECT is_open FROM Branches WHERE br_id = " . $branch . ";";
// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query );

// The is_open field of the Branches table for the branch is assigned to $status.
while (($row = mysqli_fetch_assoc($result)) != null){
		 $status = $row["is_open"];
}

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

// The value of $status is returned as a boolean flag.
echo $status;
?>
