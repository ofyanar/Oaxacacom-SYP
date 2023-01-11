$(document).ready(function() { 
	/*
	 *The function below is executed when the form in the employee login page is submitted through the 'sign in' button.
	 */
	 $("form").submit(function(e) {
        e.preventDefault(); // prevents default execution of the program

		/*
		 * The values of the input fields for the employees position, password and password confirmation
		 * are assigned to the variables.
		 */
        var p = document.getElementById("position");
		var position = p.options[p.selectedIndex].text;
		var pw = document.getElementById("password").value;
		var cpw = document.getElementById("confirmpw").value;
		
		
		function makeAccount(){
			/*
			 * The $.ajax post function below calls the makeAccount.php program 
			 * and provides it the values of the input fields for the branch id of the user (so the account created
             * is in the same branch as the user), the position of the new account along with its password,
			 * through the php POST method. 
			 */
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Manager/makeAccount.php',
				dataType:'json',
				data: {branch: localStorage.branch_id, position: position, pw: pw},
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
					// the outcome is the employee id of the new account, which is notified to the user in an alert
					window.alert("The account created has employee ID: " + outcome[0]);
					
					
				}
			});
		}
		/*
		 * The user is notified if the 'password' and 'confirm password' fields do not match
		 * so they can re-try.
		 */
		if ( pw != cpw){
			window.alert("Please make sure the 'Password' and 'Confirm Password' fields match");
			
		} else if(window.confirm('An account will be created shortly')){
				// otherwise a confirmation alert is sent and on confirmation makeAccount() is called
				makeAccount();
			}
		
		

    });

});
