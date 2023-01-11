$(document).ready(function() { 
	// ordersDiv is used to access the element with id 'orders'
	var ordersDiv = document.getElementById("orders");
	/*
	 * this $.ajax Post function calls the fetchUnpaid.php program which allows us to retreive the 
	 * customer orders where the ready_status, served_status and receipt_requested
	 * fields are all 'true'. The fetched array is decoded from JSON format and its elements are
	 * pushed into the 'orders' array.
	 */
	$.ajax({
		type: "POST",
		url: '../../../php/employee/Waiter/fetchUnpaid.php',
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
			/*
			 * The 'orders' array is looped through, and each of its elements are inserted into the inner HTML of the
			 * element with ordersDiv id, where appropriate, along with a button that has an id which is a string
			 * concatenation of the order number and basket number of the customer.
			 */
			for (let i = 0 ; i < orders.length ; i++){
				var order = orders[i].split(",");
				var idU = order[0] + "u" +order[3] + ""; // order number + basket number
				
				ordersDiv.innerHTML += "<div class='order' id = '"+idU+"'>"
									+ "<p>"+order[0]+"</p>"
									+ "<p>"+order[1]+"</p>"
									+ "<p>"+order[2]+"</p>"
									+ "<button id = '" + idU + "' >Confirm Payment</button>"
									+"</div>";
			}
		}
	});
});