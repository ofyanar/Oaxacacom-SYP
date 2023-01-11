$(document).ready(function() { 
	// requestDiv is used to access the element with id 'request'
	var requestDiv = document.getElementById("request");
	 /*
	 * The $.ajax function below calls the fetchRequests.php program to requests for waiter assistance placed by customers.
	 * Upon fetching the array containing the requests data, the array is decoded from JSON format and its elements are pushed into the 'orders' array
	 */
	$.ajax({
		type: "POST",
		url: '../../../php/employee/Waiter/fetchRequests.php',
		dataType:'json',
		data: {branch: localStorage.branch_id},
		complete:function(result){
			var orders = [];
			var value = $.parseJSON(JSON.stringify(result))
			var jArray = value.responseJSON;
			
			for(var j in jArray){
				orders.push(jArray[j]+"");
			}
			
			//order_number | table_number | order_time | basket_no
			// We loop through the 'orders' array
			for (let i = 0 ; i < orders.length ; i++){
				var request = orders[i].split(",");
				var idR = request[1] + "r";
				/*
				 * Each of the elements in 'orders' are inserted into the inner HTML of the
				 * element with requestDiv id, where appropriate. The button added next to each
				 * request, and its data, holds an id with the table that placed the request. which allows
				 * us to handle each request once the 'request handled' button is clicked.
				 */
				requestDiv.innerHTML += "<div class='request' id = '"+idR+"'>"
									+ "<p>"+request[0]+"</p>"
									+ "<p>"+request[1]+"</p>"
									+ "<button id = '" + idR + "' >Request Handled</button>"
									+"</div>";
			}
		}
	});
});