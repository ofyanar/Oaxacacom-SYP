 $(document).ready(function() { 
   /*
	* The event listener below is fired when the "Request Receipt" button is clicked on the /order.htm page
	*/
	document.getElementById("getreceipt").addEventListener('click',function (e){
		e.preventDefault();
		
		function requestReceipt(){
			$.ajax({
				type: "POST",
				url: '../../php/customer/requestReceipt.php',
				data: {order:localStorage.orderNo, branch:localStorage.branchId},
				complete:function(){
					window.alert("Your receipt is on its way");
					window.location.reload();
				}
			});
		}
		if(localStorage.receipt != 'true'){
			localStorage.receipt = 'true';
			requestReceipt();
		} else{
			window.alert("Your receipt is on its way");
		}
	}) 
	
   /*
	* The event listener below is fired when the "Confirm Payment" button is clicked on the /order.htm page
	*/
	document.getElementById("confirmpay").addEventListener('click',function (e){
		e.preventDefault(); // Prevents default actions to be executed
		
		function cancelRev(){
			$.ajax({
				type: "POST",
				url: '../../php/customer/unfill_table.php',
				data: {id:localStorage.branchId , table:localStorage.table},
				complete:function(){
					localStorage.clear();
					window.location.href = "../../oaxaca.htm";
				}
			});
		}
		
		if(localStorage.receipt == 'true'){
			if (window.confirm("Confirm payment as complete")){
				cancelRev();
			}
		} else{
			window.alert("Please request your receipt first")
		}
	}) 
	
})

