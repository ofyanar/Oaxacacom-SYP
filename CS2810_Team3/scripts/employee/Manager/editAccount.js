$(document).ready(function() { 
	/*
	 *The function below is executed when the form in the employee login page is submitted through the 'sign in' button.
	 */
	 $("form").submit(function(e) {
        e.preventDefault(); // prevents default execution of the program

		/*
		 * The values of the input fields for the employees position, id and old password and new password
		 * confirmation are assigned to the variables.
		 */
        var p = document.getElementById("position");
		var position = p.options[p.selectedIndex].text;
		var empId = document.getElementById("empid").value;
		var oldPW = document.getElementById("oldpw").value;
		var newPW = document.getElementById("newpw").value;
		
		
		function updateInfo(){
			/*
			 * The $.ajax post function below calls the updateInfo.php program 
			 * and provides it the values of the input fields for the branch id of the user (so only accounts in the 
			 * same branch as the user can be updated), the id of the account to be updated along with its new and old password,
			 * through the php POST method. 
			 */
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Manager/updateInfo.php',
				dataType:'json',
				data: {branch: localStorage.branch_id, position: position, empId: empId, oldPW: oldPW, newPW: newPW},
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
					 * The outcome displays one of three cases, either the user id or old password doesn't match the values
					 * in the database or the updating of the account is successful. The outcome is dsplayed in a window alert.
					 */
					if (outcome[0] == "false username"){
						window.alert("The employee with ID: " + empId + " does not work at this branch");
					} else if (outcome[0] == "false password"){
						window.alert("The Old Password you entered is incorrect");
					} else{
						if (window.confirm("Operation completed")){
							window.location.reload();
						}
					}
					
				}
			});
		}
		/*
		 * The user is notified if the 'position' selected from the drop down menu is the default value.
		 * so they can re-try.
		 */
		if ( position == 'Select Position'){
			if(window.confirm('Please select a position to proceed')){
				window.location.reload();
			}
		} else if(window.confirm('These changes will be permanent, do you wish to proceed?')){
				//else, updateInfo() is called on confirming the confirmation alert.
				updateInfo();
			}
		
		

    });

});
