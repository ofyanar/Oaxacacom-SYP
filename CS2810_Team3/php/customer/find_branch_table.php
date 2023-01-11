
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
 * The data is sent from the js program using the POST method and the city of the branch which 
 * the customer wants to reserve a table in is accessed through the $_POST super global variable.
 */
$branch = $_POST['selected'];
/*
 * The array below is used to store the number of tables and their availability of the branch
 * selected by a customer.
 */
$tables = array();

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
	die("Connection failed: " . mysqli_connect_error());
}
/*
 * A query to fetch the table_number field, i.e. number of table, and their availability from the branch_tables database 
 * table. So the correct number of table is displayed for each branch selected by the customer.
 */
$query = "SELECT table_number, available FROM branch_tables WHERE location = '" . $branch . "'";
//  The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query );
/*
 * The loop assigns each row of the result to $row. through which you can access field values.
 * These values are then inserted into $tables. The loop carries on until a null row is encountered,
 * i.e. all the rows have been looped through.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
	/*
	 * Each row of the 'branch_tables' table contains information on the table number and its availability.
	 * The string concatenation of each table number and its availability is assigned to $tables as an element.
	 */
	array_push($tables, strval($row["table_number"]) . "," . $row["available"]);
}
// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);
/*
 * The $tables array contains all the data we aimed to fetch from the database.
 * Though, we cannot just return the $tables array to the js script which called this php
 * program since both are different programming languages. In order to send the data in a 
 * js suitable format we encode it to the Javascript Object Notation.
 */
echo json_encode($tables);
?>