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
 * The data is sent from the js program using the POST method so the id of the branch, employee id, position, the new and old
 * passwords of the employee account to be updated is accessed through the $_POST super global variable.
 */
$branch = $_POST["branch"];
$position = $_POST["position"];
$empid = $_POST["empId"];
$oldpw = $_POST["oldPW"];
$newpw = $_POST["newPW"];

// The array below is used to store the outcome of this php program and return to the calling js script.
$final = array();
// $pwDB is used to temporarily store the password field of the account to be updated from employee table.
$pwDB = "";

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

// A query to fetch the password field from the employee database table for the account with $empid that works at $branch.
$query = "SELECT password FROM employee WHERE employee_id = ". $empid . " AND br_id = " . $branch;
$result = mysqli_query($conn, $query);

/*
 * The loop assigns each row of the result to $row, through which you can access the field value.
 * The 'password' field of the row is assigned to $pwDB.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
	$pwDB = $row['password'];
}

/*
 * Before an account is updated succesfully, there are three cases we have to consider. Case 1: the account
 * with $empid does not exist in the system. Case 2: the account exists, but the 'old password' provided to
 * confirm the update process doesn't match with the actual password of the account. Case 3: both the 
 * user exists and the passwords match, in which case the account is deleted.
 *
 */
if ($pwDB == ""){
	// "false username" pushed into $final if account doesn't exist
	array_push($final, "false username");
}else {
	if ($pwDB != $oldpw){
		// "false password" pushed into $final if passwords don't match
		array_push($final, "false password");
	} else{
		// A query is made to update the account with the data provided
		$query2 = "UPDATE employee SET password = '" . $newpw . "', position = '" . $position . "' WHERE employee_id = ". $empid . ";";
		mysqli_query($conn, $query2);
		// "completed" pushed into $final if account update is completed
		array_push($final, "completed");
	}
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
