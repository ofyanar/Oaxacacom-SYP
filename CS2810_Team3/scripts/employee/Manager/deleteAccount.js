$(document).ready(function() { 
	/*
	 *The function below is executed when the form in the employee login page is submitted through the 'sign in' button.
	 */
	 $("form").submit(function(e) {
        e.preventDefault(); // prevents default execution of the program
		
		/*
		 * The values of the input fields for the employees id, password and password confirmation
		 * are assigned to the variables.
		 */
		var empId = document.getElementById("empid").value;
		var pw = document.getElementById("password").value;
		var cpw = document.getElementById("confirmpw").value;
		
		
		function removeAccount(){
			/*
			 * The $.ajax post function below calls the removeAccount.php program 
			 * and provides it the values of the input fields for the branch id of the user (so only accounts in the 
			 * same branch as the user can be deleted), the id of the account to be deleted along with its password,
			 * through the php POST method. 
			 */
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Manager/removeAccount.php',
				dataType:'json',
				data: {branch: localStorage.branch_id, empId: empId, pw: pw},
				complete:function(result){
					/*
					 * The result is a Javascript Object Notation object, which cannot be immediately used. 
					 * Therefore, it is decoded and the values it holds is pushed inside the array 'outcome'
					 */
					var outcome = [];
					var value = $.parseJSON(JSON.stringify(result))
					var jArray = value.responseJSON;
					
					for(var j in jArray){
						outcome.push(jArray[j]+"");
					}
					/*
					 * The outcome displays one of three cases, either the user id or password doesn't match
					 * or the deletion of the account is successful. The outcome is dsplayed in a window alert.
					 */
					if (outcome[0] == "false username"){
						window.alert("The employee with ID: " + empId + " does not work at this branch");
					} else if (outcome[0] == "false password"){
						window.alert("The Password you entered is incorrect");
					} else{
						if (window.confirm("Operation completed Account with ID: "+empId +" removed")){
							window.location.reload();
						}
					}
					
				}
			});
		}
		/*
		 * The user is notified if the 'password' and 'confirm password' fields do not match
		 * so they can re-try.
		 */
		if ( pw != cpw){
			window.alert("Please make sure the 'Password' and 'Confirm Password' fields match");
			
		} else if(window.confirm('These changes will be permanent, do you wish to proceed?')){
				// otherwise a confirmation alert is sent and on confirmation removeAccount() is called
				removeAccount();
			}
		
		

    });

});
