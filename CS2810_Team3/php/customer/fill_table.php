
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
 * The data is sent from the js program using the POST method and the city of the branch in which 
 * the customer reserved a table is accessed through the $_POST super global variable.
 */
$branch = $_POST['branch'];
/*
 * The data is sent from the js program using the POST method and the number of the table which 
 * the customer chose to reserve is accessed through the $_POST super global variable.
 */
$table = $_POST['table'];
/*
 * The array below is used to store the basket number and the branch id for the customer.
 */
$custInfo = array();

// Connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}
/*
 * A query to update the 'availabile' field of the table which the customer chose to reserve as 'false'.
 * This way other customers can be aware of occupied tables when making reservations.
 */
$query = "UPDATE branch_tables SET available = 'false' WHERE location = '" . $branch . "' AND table_number = " . $table;
mysqli_query($conn, $query);
/*
 * A query to fetch the current_value field from the number_tracker database table for the 'basket' number tracker.
 */
$query2 = "SELECT current_value FROM number_tracker WHERE track_for = 'Basket'";
/*
 * The result is a data structure that can be looped through.
 */
$result2 = mysqli_query($conn, $query2 );
/*
 * A variable is initialised to temporarily store the customer's basket number.
 */
$basketNo = '';
/*
 * The loop assigns each row of the result to $row. through which you can access field values.
 * These values are then inserted into $custInfo. The loop carries on until a null row is encountered,
 * i.e. all the rows have been looped through.
 */
while (($row = mysqli_fetch_assoc($result2)) != null){
		 $basketNo = $row["current_value"];
}
/*
 * After in order to keep the tracked basket numbers in the database up to date, we increment the retreived value by one.
 */
$basketNo_Int = (int)$basketNo;
$basketNo_Int++;
/*
 * The string value of the incremented basket number is assigned to $basketNo.
 */
$basketNo = strval($basketNo_Int);
/*
 * A query is made to update the current_value field of the number tracker for 'basket'.
 * The previously incremented value is assigned to the current_value.
 * As a result, no two customers will be assigned the same basket number.
 */
$query3 = "UPDATE number_tracker SET current_value = " . $basketNo . " WHERE track_for = 'Basket'";
mysqli_query($conn, $query3 );

/*
 * A query to fetch the br_id field from the Branches database table, to access the branch id of the restaurant
 * the customer reserved their table in.
 */
$query4 = "SELECT br_id FROM Branches WHERE location = '" . $branch . "'";
/*
 * The result is a data structure that can be looped through.
 */
$result4 = mysqli_query($conn, $query4 );
/*
 * The loop assigns each row of the result to $row. through which you can access field values.
 * These values are then inserted into $custInfo. The loop carries on until a null row is encountered,
 * i.e. all the rows have been looped through.
 */
while (($row = mysqli_fetch_assoc($result4)) != null){
	/*
	 * Branch id pushed into $custInfo so it can be assigned to the customer.
	 */
	array_push($custInfo, $row["br_id"]);
}
/*
 * Basket number pushed into $custInfo so it can be assigned to the customer.
 */
array_push($custInfo, $basketNo);

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);
/*
 * The $custInfo array contains all the data we aimed to fetch from the database.
 * Though, we cannot just return the $custInfo array to the js script which called this php
 * program since both are different programming languages. In order to send the data in a 
 * js suitable format we encode it to the Javascript Object Notation.
 */
echo json_encode($custInfo);


?>