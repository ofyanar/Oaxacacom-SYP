$(document).ready(function() { 
	/*
     * The function below is executed if anywhere on the page is clicked.
     */
	 document.addEventListener("click",function(e) {
		// target is used to store the most prominent element which was clicked on to trigger this function. 
		var target = e.target;
		
		/*
		 * this $.ajax Post function calls the orderServed.php program to update the 
		 * served_status of a customer order to 'true'.
		 */
		function orderServed(orderNum){
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Waiter/orderServed.php',
				dataType:'json',
				data: {order:orderNum, branch: localStorage.branch_id},
				complete:function(){
					if (window.confirm("Order #" + orderNum + " has been served")){
						window.location.reload();
					}
				}
			});
			
		}
		/*
		 * this $.ajax Post function calls the cancelOrder.php program in to remove the customer's order
		 * from relevant DB tables, so that the order is cancelled.
		 */
		function cancelOrder(basketNum, orderNum){
			$.ajax({
				type: "POST",
				url: '../../../php/customer/cancelOrder.php',
				dataType:'json',
				data: {basketNo: basketNum, orderNo:orderNum, branch: localStorage.branch_id},
				complete:function(){
					console.log(orderNum);
					if (window.confirm("Order #" + orderNum + " Was Cancelled")){
						window.location.reload();
					}
				}
			});
			
		}
		/*
		 * the type of the element along with its id are fetched. we aim to execute getBasket() only and only
		 * if the element clicked was both a button and included the character 's' or a 'c' in its id.
		 */
		if (target.nodeName == "BUTTON" && target.id.includes('s')){
			/* if so, we get the index of it
			 * so we can slice the preceeding sub-string from the id to access the order number of the order
			 * and slice the proceeding sub-string from the id to access the basket number of the order
			 */
			var indexb = target.id.indexOf('s');
			var orderNum = target.id.slice(0, indexb);
			var basketNum = target.id.slice(indexb+1);
			/*
			 * The button containing a 's' is the 'order served' button, in which case we alert the user
			 * to confirm proceeding. if confirmed, orderServed() is called.
			 */
			if (window.confirm("Confirm to mark order #"+orderNum+" as Served")){
				orderServed(orderNum)
			}
		} else if (target.nodeName == "BUTTON" && target.id.includes('c')){
			/* if so, we get the index of it
			 * so we can slice the preceeding sub-string from the id to access the order number of the order
			 * and slice the proceeding sub-string from the id to access the basket number of the order
			 */
			var indexb = target.id.indexOf('c');
			var orderNum = target.id.slice(0, indexb);
			var basketNum = target.id.slice(indexb+1);
			/*
			 * The button containing a 'c' is the 'cancel order' button, in which case we alert the user
			 * to confirm proceeding. if confirmed, cancelOrder() is called.
			 */
			if (window.confirm("Confirm to cancel order #"+orderNum+"")){
				cancelOrder(basketNum, orderNum);
			}
		}
		
    });

});
