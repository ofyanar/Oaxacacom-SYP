

$(document).ready(function() { 
	 document.addEventListener("click",function(e) {
		var target = e.target;
		function updateBasket(quantity, itemNum){
			var basket = JSON.parse(localStorage.basket);
			var size = basket.length;
			var updated = false;
			if (size == 0){
				basket.push(itemNum + "," + quantity);
				updated = true;
			} else{
				for (let i = 0 ; i < size ; i++){
					var bItem = basket[i].split(",");
					if (bItem[0] == itemNum){
						basket[i] = itemNum + "," + quantity;
						updated = true;
					}
				} 
			}
			if (updated == false){
				basket.push(itemNum + "," + quantity);
				updated = true;
			}
			localStorage.basket = JSON.stringify(basket);
		}
		
		function addToBasket(quantity, itemNum){
			$.ajax({
				type: "POST",
				url: '../../php/customer/basketEntry.php',
				data: {basketNo:localStorage.basketNo, menuItem:itemNum, quantity: quantity},
				complete:function(){
					}
				}
			);
		}
		
		if (target.nodeName == "BUTTON" && target.id.slice(-1) == "b"){
			var itemNum = target.id.slice(0,-1);
			var q = document.getElementById(target.id.slice(0,-1)+"q");
			var quantity = q.options[q.selectedIndex].text;
			console.log(quantity + ", " + itemNum);
			
			if (quantity == 'Select Quantity' || quantity == '0'){
				window.alert("please select a valid quantity of items");
			} else{
				updateBasket(quantity, itemNum);
				addToBasket(quantity, itemNum);
				if (window.confirm("Basket update: "+quantity+" number "+itemNum+"'s")){
					window.location.reload();
				}
			}
		}
		
    });

});
