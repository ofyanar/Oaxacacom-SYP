$(document).ready(function() { 
	/*
	 *The function below is executed when the form in the employee login page is submitted through the 'sign in' button.
	 */
	$("form").submit(function(e) {
		e.preventDefault(); // prevents default execution of the program
		/*
		 * The values of the input fields for the employees username and password
		 * are assigned to the variables.
		 */
		var user = document.getElementById("empId").value;
		var pass = document.getElementById("passwd").value;

		function storeData(){
			/*
			 * The $.ajax post function below calls the find_username.php program 
			 * and provides it the values of the input fields through the php POST method.
			 *
			 */
			$.ajax({
				type: "POST",
				url: '../../php/employee/find_username.php',
				dataType:'json',
				data: {user:user, pass:pass},
				complete:function(result){
					/*
					 * The result is a Javascript Object Notation object, which cannot be immediately used. 
					 * Therefore, it is decoded and the values it holds is pushed inside the array 'empInfo'
					 */
					var empInfo = [];
					var value = $.parseJSON(JSON.stringify(result))
					var jArray = value.responseJSON;
					
					for(var j in jArray){
						empInfo.push(jArray[j]+"");
					}
					/*
					 * The result will contain 'false' if the outcome of calling the php file was unsuccessful,
					 * therefore we alert the user on what went wrong and reload the page.
					 */
					if(empInfo.includes("false")){
						window.alert("Your username or password is incorrect, please try again.")
						window.location.reload();
					} else{
							/*
							 * Else, we store the results returned in localStorage.employee_id, localStorage.branch_id and
							 * localStorage.position. Finally, depending on the position of the employee, we redirect
							 * them to their respective employee page.
							 */
							localStorage.employee_id = empInfo[0];
							localStorage.branch_id = empInfo[2];
							localStorage.position = empInfo[3];
							if(empInfo[3] == "Waiter"){
								window.location.href = "Waiter/waiter.htm"
							} else if(empInfo[3] == "Kitchen Staff"){
								window.location.href = "Kitchen_Staff/chef.htm"
							} else if(empInfo[3] == "Manager"){
								window.location.href = "Manager/manager.htm"
							}
						}
				}
			});
		}
		
		// if the values in the fields is empty
		if ( user === '' || pass === ''){
			// a confirmation alert is sent
			if(window.confirm('Please enter your details.')){
				// and the page is reloaded.
				window.location.reload();
			}
		} else{
			// else, the localStorage.loggedin is set to 'true' so that user permissions are limited.
			localStorage.loggedin = 'true';
			storeData();
		
	
	}

});

});