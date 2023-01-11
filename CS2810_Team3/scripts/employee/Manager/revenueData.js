 $(document).ready(function() {
	// revenueDiv is used to access the element with id 'revenue'	 
	var revenueDiv = document.getElementById("revenue");
	/*
	 * The $.ajax function below calls the fetchRevenue.php program to access the gross revenue of the sales
	 * and the total number of sales made in the branch. the resulting array is decoded from JSON format and 
	 * its elements are pushed into the 'salesData' array
	 */
	$.ajax({
		type: "POST",
		url: '../../../php/employee/Manager/fetchRevenue.php',
		data: {branch: localStorage.branch_id},
		dataType:'json',
		complete:function(result){
			var salesData = [];
			var value = $.parseJSON(JSON.stringify(result));
			var jArray = value.responseJSON;
			
			for(var j in jArray){
				salesData.push(jArray[j]+"");
			}
			// the element of the salesData array is split to create two seperate arrays
			var sale = salesData[0].split(",");
			/*
			 * The 'sale' array data is accessed, and each of its elements are inserted into the inner HTML of the
			 * element with revenueDiv id, where appropriate.
			 */
			revenueDiv.innerHTML += "<div id= 'salesdata'>"
								 + "<p>There have been <strong>" + sale[1] + "</strong> sales in the Past Month</p>"
								 + "<p>Gross Revenue for the Past Month: <strong>£" + sale[0] + "</strong></p>"
								 + "</div>";
		}
	});
});
