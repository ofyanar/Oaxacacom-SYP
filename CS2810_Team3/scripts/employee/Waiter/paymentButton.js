$(document).ready(function() { 
	/*
     * The function below is executed if anywhere on the page is clicked.
     */
	 document.addEventListener("click",function(e) {
		// target is used to store the most prominent element which was clicked on to trigger this function. 
		var target = e.target;
		
		function PaymentConfirmed(orderNum, basketNum){
			/*
			 * this $.ajax Post function calls the orderPaid.php program in to remove the customer's order
			 * from relevant DB tables and insert a row into the 'sales' DB table with the details
			 * of the order, so that the order is completed.
			 */
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Waiter/orderPaid.php',
				dataType:'json',
				data: {orderNo:orderNum, basketNo:basketNum , branch: localStorage.branch_id},
				complete:function(){
					if (window.confirm("Order #" + orderNum + "'s payment has been received")){
						window.location.reload();
					}
				}
			});
			
		}
		/*
		 * the type of the element along with its id are fetched. we aim to execute PaymentConfirmed() only and only
		 * if the element clicked was both a button and included the character 'u' in its id.
		 */
		if (target.nodeName == "BUTTON" && target.id.includes('u')){
			// if so, we get the index of it
			var indexb = target.id.indexOf('u');
			// so we can slice the preceeding sub-string from the id to access the order number of the order
			var orderNum = target.id.slice(0, indexb);
			// and slice the proceeding sub-string from the id to access the basket number of the order
			var basketNum = target.id.slice(indexb+1);
			// a confirmation alert is sent to the user to confirm proceeding, and if so, PaymentConfirmed() is called
 			if (window.confirm("Confirm to mark order #"+orderNum+" as Paid For")){
				PaymentConfirmed(orderNum, basketNum);
			}
		}
		
    });

});
