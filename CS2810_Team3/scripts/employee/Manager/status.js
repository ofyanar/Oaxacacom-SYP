$(document).ready(function() { 
	// statusDiv is used to access the element with id 'status'
	var statusDiv = document.getElementById("status");
	 /*
	  * The $.ajax function below calls the fetchStatus.php program to access the is_open field 
	  * from the Branches which shows whether the branch is currently open or not. 
	  * Upon fetching the data, it is decoded from JSON format into a boolean and assigned to 'value'.
	  */
	$.ajax({
		type: "POST",
		url: '../../../php/employee/Manager/fetchStatus.php',
		data: {branch: localStorage.branch_id},
		dataType:'json',
		complete:function(result){
			var value = ($.parseJSON(JSON.stringify(result))).responseJSON;
			/*
			 * if 'value' indicates the branch is currently closed, this is displayed in text and 
			 * a button to open the branch is created which are then inserted into the inner HTML of the
			 * element with stocksDiv id.
			 */
			if (value == false){
				statusDiv.innerHTML += "<div class = 'stat'><p>The Branch Status is currently CLOSED</p>"
									+ "<button id = 'open'>Click Here to Change the Status to Open</button>"
									+"</div>";
			/*
			 * if 'value' indicates the branch is currently open, this is displayed in text and 
			 * a button to close the branch is created which are then inserted into the inner HTML of the
			 * element with stocksDiv id.
			 */
			} else if (value == true){
				statusDiv.innerHTML += "<div class = 'stat'><p>The Branch Status is Currently OPEN</p>"
									+ "<button id = 'close'>Click Here to Change the Status to Closed</button>"
									+"</div>";
			}
			
		}
	});
});
