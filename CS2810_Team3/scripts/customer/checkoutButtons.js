$(document).ready(function() { 
	/*
	 * The event listener below is fired when the "empty basket" button is clicked on the /basket.htm page
	 */
	document.getElementById("emptyIt").addEventListener('click',function (e){
		e.preventDefault(); // prevents default execution of the program
		
		/*
		 *	This function is called when we want to access the 'deleteBasket.php' file through JQuery.ajax post request in order to
		 *	delete the user's basket from the Basket DB table.
		 */
		function removeBasket(){
			$.ajax({
				type: "POST",
				url: '../../php/customer/deleteBasket.php',
				data: {basketNo:localStorage.basketNo},
				success:function(){
				}
			});
		}
		
		/*
		 * On clicking the 'clear basket' button a confirmation alert is sent to the user before they proceed.
		 * the localStorage.basket is emptied, removeBasket() is called and the page is reloaded.
		 */
		if(window.confirm("!Proceeding will clear your basket!")){
			localStorage.basket = JSON.stringify([]);
			removeBasket();
			window.location.reload();
		}
	}) 
	
	/*
	 * The event listener below is fired when the "checkout" button is clicked on the /basket.htm page
	 */
	document.getElementById("checkout").addEventListener('click',function (e){
		e.preventDefault(); // prevents default execution of the program
		
		/*
		 * The contents of the basket array are in localStorage, stored in JSON-Stringified format. 
		 * In order to use this array, we decode it using the built-in function JSON.parse
		 */
		var basket = JSON.parse(localStorage.basket);
		
		/*
		 *	This function is called when we want to access the 'editAvailability.php' file through JQuery.ajax post request in order to update the availability 
		 *	field of the branch_menus database-table. 
		*/
		function decrementAv(){
			$.ajax({
				type: "POST",
				url: '../../php/customer/editAvailability.php',
				data: {basketNo:localStorage.basketNo, branchId:localStorage.branchId},
				success:function(){
				}
			});
			
		}
		/*
		 * On clicking the 'checkout' button a confirmation alert is sent to the user before they proceed.
		 * relevant localStorage boolean flags are created and the time of the checkout is taken and also stored in localStorage.
		 * finally, the decrementAv() method is called and the user is redirected to order.htm.
		 */
		if(window.confirm("Please Confirm to Checkout")){
			localStorage.checkout ='true';
			localStorage.orderPlaced = 'false';
			var timeOfOrder = new Date();
			localStorage.arrivalTime = new Date(timeOfOrder.getTime() + 15*60000);
			localStorage.timeOfOrder = timeOfOrder;
			localStorage.timeOfOrderDB = timeOfOrder.toISOString().substr(0, 19).replace('T', ' ');
			
			decrementAv();
		
			window.location.href = 'order.htm';
		}
		
	}) 
	
})

