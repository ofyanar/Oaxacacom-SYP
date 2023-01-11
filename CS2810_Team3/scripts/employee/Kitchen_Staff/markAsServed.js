$(document).ready(function() { 
	/*
	 * This function is executed when the 'mark order as ready to serve' button is clicked by the 
	 * kitchen staff to mark an order as ready to be served.
	 */
	document.getElementById("serve").addEventListener('click',function (e){
		e.preventDefault();
		/*
		 * This $.ajax Post function calls the changeReadyStatus.php program in order to 
		 * update the ready_status field of an order to 'true' so that the waiters are notified
		 * that the order is ready to be served.
		 */
		function markAsReady(){
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Kitchen_Staff/changeReadyStatus.php',
				data: {order: localStorage.orderNumber, branch: localStorage.branch_id},
				success:function(){
				}
			});
		}
		
		/*
		 * A confirmation alert is sent for proceeding. upon confirming, the localStorage.basket array is emptied so it won't be corrupted with
		 * irrelevant data, and the user is redirected to chef.htm after calling markAsReady() function.
		 */
		if(window.confirm("Please confirm to mark order #"+localStorage.orderNumber+" as ready to serve")){
			localStorage.basket = JSON.stringify([]);
			markAsReady();
			window.location.href = 'chef.htm';
		}
	})
	
})