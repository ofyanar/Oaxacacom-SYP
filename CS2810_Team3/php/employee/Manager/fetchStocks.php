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

/*
 * The array below is used to store the current information of each menu-item
 * on the branch_menus DB table, i.e. its number, type, name and availability.
 */
$items = array();

// A connection to the database established and the value is stored in $conn.
$conn = mysqli_connect($servername, $username, $password, $db_name);

// A conditional statement confirms that the connection was correctly established.
if (!$conn) {
	// If the connection was failed, the program halts using die() and an error message is sent.
  die("Connection failed: " . mysqli_connect_error());
}

// A query to fetch the menu_no, dish, dish_type and availability fields from the branch_menus database table. 
$query = "SELECT menu_no, dish, dish_type, availability FROM branch_menus WHERE br_id = " . $branch . ";";
// The result is a data structure that can be looped through.
$result = mysqli_query($conn, $query );

// The string concatenation of the fetched fields is then pushed into $items.
while (($row = mysqli_fetch_assoc($result)) != null){
	array_push($items, $row["menu_no"]. "," . $row["dish_type"] . "," . $row["dish"]  .  "," .$row["availability"]);

}

// The connection to the database is closed so we do not encounter a connection problem in other php files.
mysqli_close($conn);

/*
 * The $items array contains all the data we aimed to fetch from the database.
 * Though, we cannot just return the $items array to the js script which called this php
 * program since both are different programming languages. In order to send the data in a 
 * js suitable format we encode it to the Javascript Object Notation.
 */
echo json_encode($items);

?>