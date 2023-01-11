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
 * The data is sent from the js program using the POST method and the username and password of 
 * the customer is accessed through the $_POST super global variable.
 */
$user = $_POST['user'];
$pass = $_POST['pass'];

// The arrays below is used to store information of an employees account details from the 'employee' DB table.
$emp = array();
$final = array();

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

//  A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

/*
 * A query to fetch all of the fields from the employee database table.
 */
$query = "SELECT * FROM employee WHERE employee_id = ". $user.";";

// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query);

/*
 * The loop assigns each row of the result to $row. through which you can access field values.
 * These values are then inserted into $emp. The loop carries on until a null row is encountered,
 * i.e. all the rows have been looped through.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
	array_push($emp, $row["employee_id"]);
	array_push($emp, $row["password"]);
	array_push($emp, $row["br_id"]);
	array_push($emp, $row["position"]);
}

/*
 * The conditional statements below test three cases. Case 1: the employee with username provided
 * does not exist in the database. Case 2: the employee exists, but the password provided doesn't match
 * the employee's password in the database. Case 3: both the user exists and the passwords match.
 */
if (sizeof($emp) == 0){
	// if the employee doesn't exist a boolean flag 'false' is added to the $final array
	array_push($final, "false");
} else if (sizeof($emp) > 0){
	if($emp[1] != $pass){
		// if the passwords don't match, a boolean flag 'false' is added to the $final array
		array_push($final, "false");
	} else{
		// if the username and passwords match, $emp array holding account details is assigned to the $final array
		$final = $emp;
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