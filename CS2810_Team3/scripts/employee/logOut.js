$(document).ready(function() { 
	/*
	 * In the case where the employee clicks the 'logout' button,
	 * all the data in their localstorage is cleared and they are redirected
	 * to the Oaxaca.htm page.
	 */
	document.getElementById("logoutEmp").addEventListener('click',function (e){
		e.preventDefault();
		
		if(window.confirm("Please confirm to proceed")){
			localStorage.clear();
			window.location.href = '../employee.htm';
		}
	})
	
})