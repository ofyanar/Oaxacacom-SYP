$(document).ready(function() { 
	 /*
	  * The function below is executed if anywhere on the page is clicked.
	  */
	 document.addEventListener("click",function(e) {
		// target is used to store the most prominent element which was clicked on to trigger this function. 
		var target = e.target;
		
		function getBasket(basketNum){
			/*
			 * this $.ajax Post function allows us to retreive the content of the selected order's basket.
			 * The JSON result is decoded and its items are pushed into 'orders' array.
			 */
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Kitchen_Staff/fetchBasket.php',
				dataType:'json',
				data: {basket: basketNum},
				complete:function(result){
					var orders = [];
					var value = $.parseJSON(JSON.stringify(result))
					var jArray = value.responseJSON;
					
					for(var j in jArray){
						orders.push(jArray[j]+"");
					}
					/*
					 * It is not possible to store the itemData array directly into local storage
					 * as local storage only allows strings to be stored, therefore we stringify
					 * the array using a JSON method so that it can be used later.
					 */
					localStorage.custBasket = JSON.stringify(orders);
				}
			});
			
		}
		
		/*
		 * the type of the element along with its id are fetched. we aim to execute getBasket() only and only
		 * if the element clicked was both a button and included the character 'b' in its id.
		 */
		if (target.nodeName == "BUTTON" && target.id.includes('b')){
			// if the id included 'b' in its element, we get the index of it
			var indexb = target.id.indexOf('b');
			// so we can slice the preceeding sub-string from the id to access the order number of the order
			var orderNum = target.id.slice(0, indexb);
			// and slice the proceeding sub-string from the id to access the basket number of the order
			var basketNum = target.id.slice(indexb+1);
			
			// we store these values in their respective localStorage variables
			localStorage.orderNumber = orderNum;
			localStorage.basketNumber = basketNum;
			
			getBasket(basketNum);
			
			/*
				setting timeout for 25ms before redirecting to the unprepped_order.htm page to allow the ajax post 
				call to retreive the selected customer's basket to complete as the aforementioned
				page relies on this data to build itself. We do this to avoid the localStorage.custBasket variable not loading with 
				the correct data in the next page.

			*/
			setTimeout(function() {
				window.location.href = 'unprepped_order.htm';
			}, 25);
			
			
		}
		
    });

});
