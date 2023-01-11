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
 * The data is sent from the js program using the POST method and the id of the branch in which 
 * the customer placed an order is accessed through the $_POST super global variable.
 */
$branch = $_POST['branch'];
/*
 * The array below is used to store information of each menu item from the branch_menus DB table.
 */
$items = array();
/*
 *connection to the database established and the value is stored in $conn.
 */
$conn = mysqli_connect($servername, $username, $password, $db_name);
/*
 * A conditional statement confirms that the connection
 * was correctly established.
 */
if (!$conn) {
	/*
   * If the connection was failed, the program halts using die() and an error message is sent.
   */
  die("Connection failed: " . mysqli_connect_error());
}
/*
 * A query to fetch the menu_no, dish, dish_type, calories, diet_pref, allergies, availability and 
 * dish_price fields from the branch_menus database table.
 */
$query = "SELECT menu_no, dish, dish_type, calories, diet_pref, allergies, availability, dish_price FROM branch_menus WHERE br_id = " . $branch;
/*
 * The result is a data structure that can be looped through.
 */
$result = mysqli_query($conn, $query );
/*
 * The loop assigns each row of the result to $row. through which you can access field values.
 * These values are then inserted into $data. The loop carries on until a null row is encountered,
 * i.e. all the rows have been looped through.
 */
while (($row = mysqli_fetch_assoc($result)) != null){
	/*
	 * The array below is used to temporarily store dietary preference information of each menu item from the branch_menus DB table.
	 */
	$diet_pref = array();
	/*
	 * The array below is used to temporarily store allergen information of each menu item from the branch_menus DB table.
	 */
	$allergens = array();
	array_push($diet_pref, $row["menu_no"]. "," .$row["diet_pref"]);
	array_push($allergens, $row["menu_no"]. "," .$row["allergies"]);
	/*
	 * The desired fields of each row is pushed into $items along with the arrays $diet_pref and $allergens.
	 * This way, processing the information once it is sent back to the js script is easier.
	 */
	array_push($items, $row["menu_no"]. "," . $row["dish_type"] . "," . $row["dish"]  . "," . $row["calories"] . "," . $row["availability"]. "," . $row["dish_price"],$diet_pref ,$allergens );

}
/*
 * The connection to the database is closed so we do not encounter a connection problem in other php files.
 */
mysqli_close($conn);
/*
 * The $items array contains all the data we aimed to fetch from the database.
 * Though, we cannot just return the $items array to the js script which called this php
 * program since both are different programming languages. In order to send the data in a 
 * js suitable format we encode it to the Javascript Object Notation.
 */
echo json_encode($items);

?>