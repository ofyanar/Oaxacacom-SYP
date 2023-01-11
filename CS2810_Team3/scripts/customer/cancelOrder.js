$(document).ready(function() { 
	document.getElementById("cancelOrder").addEventListener('click',function (e){
		e.preventDefault();
		
		function cancelOrder(){
			$.ajax({
				type: "POST",
				url: '../../php/customer/cancelOrder.php',
				data: 
				{
					basketNo:localStorage.basketNo, 
					branch:localStorage.branchId,
					orderNo: localStorage.orderNo
				},
				complete:function(result){
				}
			});
		}
		
		
		if (window.confirm("Please confirm to cancel order")){
			localStorage.orderPlaced = null;
			localStorage.checkout = 'false';
			localStorage.basket = JSON.stringify([]);
			cancelOrder();
			window.alert("Your order has been cancelled");
			window.location.href = 'cust_main.htm';
		}
		
	});

});

