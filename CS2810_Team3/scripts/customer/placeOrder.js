$(document).ready(function() {
	var totalDiv = document.getElementById("total");
	function createOrder(){
		$.ajax({
				type: "POST",
				url: '../../php/customer/placeOrder.php',
				data: {
					basketNo:localStorage.basketNo, 
					branch:localStorage.branchId, 
					total: localStorage.basketTotal, 
					time: localStorage.timeOfOrderDB,
					table: localStorage.table
					},
				dataType:'json',
				complete:function(result){
					var orderData = [];
					var value = $.parseJSON(JSON.stringify(result))
					var jArray = value.responseJSON;
					
					for(var j in jArray){
						orderData.push(jArray[j]+"");
					}
					
					localStorage.qNo = orderData[0];
					localStorage.orderNo = orderData[1];
					
				}
			});
	}
	if (localStorage.orderPlaced == 'false'){
		localStorage.orderPlaced = 'true';
		createOrder();
	}
	setTimeout(function() {
		totalDiv.innerHTML += "<p>Order #" + localStorage.orderNo
						+ "</p>";
	}, 25);
	
})
