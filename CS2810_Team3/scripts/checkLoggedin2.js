$(document).ready(function() { 
	/*
	 * In the case where localStorage.loggedin's value is 'true', the user
	 * is redirected to the respective employee page depending on their position.
	 */
	if (localStorage.loggedin == 'true'){
		window.alert("You have an active session");
		if (localStorage.position == "Waiter"){
			window.location.href = "other_web_pages/employee/Waiter/waiter.htm"
		} else if(localStorage.position == "Kitchen Staff"){
			window.location.href = "other_web_pages/employee/Kitchen_Staff/chef.htm"
		} else if(localStorage.position == "Manager"){
			window.location.href = "other_web_pages/employee/Manager/manager.htm"
		}
	}
});
