 $(document).ready(function() {
	 // stocksDiv is used to access the element with id 'stocks'
	 var stocksDiv = document.getElementById("stocks");
	 /*
	  * The $.ajax function below calls the fetchStocks.php program to access orders where the 
	  * relevant data from the branch_menus is fetched to show the stocks of each menu-item. 
	  * Upon fetching these orders the array, it is decoded from JSON format and its elements are pushed into the 'itemData' array
	  */
	$.ajax({
		type: "POST",
		url: '../../../php/employee/Manager/fetchStocks.php',
		dataType:'json',
		data: {branch: localStorage.branch_id},
		complete:function(result){
			var itemData = [];
			var value = $.parseJSON(JSON.stringify(result));
			var jArray = value.responseJSON;
			
			for(var j in jArray){
				itemData.push(jArray[j]+"");
			}
			/*
			 * The 'itemData' array is looped through, and each of its elements are inserted into the inner HTML of the
			 * element with stocksDiv id, where appropriate. The button created will have a div which is a string
			 * concatenation of the menu number and its availability.
			 */
			for (let i = 0 ; i < itemData.length ; i++){
				item = itemData[i].split(",");
				stocksDiv.innerHTML += "<div class = 'item'>"
									+"<p>" + item[0]+"</p>"
									+"<p>" + item[1]+"</p>"
									+"<p>" + item[2]+"</p>"
									+"<p>" + item[3]+"</p>"
									+"<button id = '" + item[0] +"b" + item[3]+"'>"
									+"RESTOCK</button></div>";
				
			}
			
		}
	});
});