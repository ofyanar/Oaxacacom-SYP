$(document).ready(function() { 
	/*
	 * In the case where localStorage.hasReservation's value is 'true', the user
	 * is redirected to the cust_main.htm page.
	 */
	if (localStorage.hasReservation == 'true'){
		window.confirm("You have a reserved table");
		window.location.href = 'cust_main.htm';
		
	}
});
