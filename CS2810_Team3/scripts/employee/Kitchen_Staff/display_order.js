$(document).ready(function() { 
	/*
	 * The variables below hold arrays that were previously put in JSON string format.
	 * They are decoded using the JSON.parse() function. These functions will help populate the unprepped_order.htm
	 * page with the data they contain.
	 */
	var basket = JSON.parse(localStorage.custBasket);
	var itemData = JSON.parse(localStorage.itemData);
	// details is used to access the element with id 'details'
	var details = document.getElementById("details");
	// order is used to access the element with id 'order'
	var order = document.getElementById("order");
	// a paragraph element is inserted into the details div that displays the order number of the order being viewed
	details.innerHTML += "<div id='title'><p>Order #"
						+localStorage.orderNumber
						+"</p></div>";
	// we loop through the basket array
	for (let j = 0 ; j < basket.length ; j++){
		var bItem = (basket[j]+"").split(",");
		// and the itemData array
		for (let i = 0 ; i<itemData.length ; i++){
			data = (itemData[i]+'').split(",");
			// the basket items where the menu-number matches with the menu-number of an item in itemData
			if (i%3 == 0 && data[0] == bItem[0]){
				// are assigned to 'data' to be processed
				data = (itemData[i]+'').split(",");
				/*
				 * Each of its elements in 'data' are inserted into the inner HTML of the
				 * element with details id, where appropriate.
				 */
				details.innerHTML += "<div id='info'>"
								+"<p>"+(j+1)+"</p>"
								+ "<p>"+  data[2]+"</p>"
								+ "<p>Quantity: " + bItem[1]+""
								+"</p></div>";
				
				
			}
		}
	}
	// a button to mark order as ready to serve is added to the bottom of the page below basket data
	order.innerHTML += "<div id='servebutton'><button id='serve'>Mark Order as Ready To Serve</button></div>";
	

});

