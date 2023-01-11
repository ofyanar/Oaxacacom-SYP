$(document).ready(function() { 
	/*
	 * In the case where localStorage.checkout's value is 'true', the user
	 * is redirected to the order.htm page depending on their position as their permissions are limited after checking out.
	 */
	if (localStorage.checkout == 'true'){
		if (window.confirm("You already have a standing order")){
			window.location.href = 'order.htm';
		}
	}
});