$(document).ready(function() { 
	/*
     * The function below is executed if the element with the 'cancelRev' id is clicked
     */
	document.getElementById("cancelRev").addEventListener('click',function (e){
		e.preventDefault(); // prevents default execution of the program
		
		function cancelReservation(){
			/*
			 * variables are used to store the branch id and table number of the user.
			 * these values are accessed from their respective localStorage variables.
			 */
			var id = localStorage.branchId;
			var table = localStorage.table;
			/*
			 * this $.ajax Post function calls the unfill_table.php program to update the 
			 * available field of branch_tables DB table to 'true'.
			 */
			$.post("../../php/customer/unfill_table.php", {id:id, table:table}, function(){
				// on completion, a confirmation message is sent and the user is redirected to Oaxaca.htm
				if(window.confirm('Your reservation has been cancelled')){
					window.location.href = '../../oaxaca.htm';
				}
				// The users localStorage is cleared so no future errors occur.
				localStorage.clear();
			})
				
		}
		/*
		 * cancelReservation() is called only if the 'checkout' button on the basket.htm page hasnt already been clicked.
		 * we can check this by checking the localStorage.checkout variable.
		 */
		if (localStorage.checkout != 'true'){
			// if so, upon confirming the alert, cancelReservation() is called
			if(window.confirm("Confirm to cancel reservation")){
				localStorage.hasReservation = 'false';
				cancelReservation();
			}
		} else{
			// else, an alert asking the user to cancel their order is sent 
			window.alert("Please cancel your order before cancelling your reservation.");
		}
		
		

	}); 

});