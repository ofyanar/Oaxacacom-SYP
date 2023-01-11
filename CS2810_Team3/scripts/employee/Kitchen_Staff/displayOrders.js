$(document).ready(function() { 
	// ordersDiv is used to access the element with id 'orders'
	var ordersDiv = document.getElementById("orders");
	/*
	 * The $.ajax function below calls the fetchUnprepared.php program to access orders where the 
	 * ready_status field on the relevant db table is 'false'. Upon fetching these orders array
	 * the array is decoded from JSON format and its elements are pushed into the 'orders' array
	 */
	$.ajax({
		type: "POST",
		url: '../../../php/employee/Kitchen_Staff/fetchUnprepared.php',
		dataType:'json',
		data: {branch: localStorage.branch_id},
		complete:function(result){
			var orders = [];
			var value = $.parseJSON(JSON.stringify(result))
			var jArray = value.responseJSON;
			
			for(var j in jArray){
				orders.push(jArray[j]+"");
			}
			
			/*
			 * The 'orders' array is looped through, and each of its elements are inserted into the inner HTML of the
			 * element with ordersDiv id, where appropriate.
			 */
			for (let i = 0 ; i < orders.length ; i++){
				var order = orders[i].split(",");
				var id = order[0] + "b" +order[3] + ""; // order number + basket number
				
				ordersDiv.innerHTML += "<div class='order' id = '"+id+"'>"
									+ "<p>"+order[0]+"</p>"
									+ "<p>"+order[1]+"</p>"
									+ "<p>"+order[2]+"</p>"
									+ "<button id = '" + id + "' >View Order</button>"
									+"</div>";
			}
		}
	});
});