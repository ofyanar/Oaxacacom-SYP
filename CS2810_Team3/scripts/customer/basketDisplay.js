$(document).ready(function() { 
	var basket = JSON.parse(localStorage.basket) ;
	var itemData = JSON.parse(localStorage.itemData);
	var itemImage = document.getElementById("images");
	var itemDesc = document.getElementById("descriptions");
	var itemQuan = document.getElementById("quantity");
	var itemTotal = document.getElementById("total");
	var total = 0;
	
	for (let j = 0 ; j < basket.length ; j++){
		var bItem = (basket[j]+"").split(",");
		for (let i = 0 ; i<itemData.length ; i++){
			data = (itemData[i]+'').split(",");
			if (i%3 == 0 && data[0] == bItem[0]){
				data = (itemData[i]+'').split(",");
				diet = (itemData[i+1]+'').split(",");
				allergens = (itemData[i+2]+'').split(",");
				
				//image
				itemImage.innerHTML += "<div  class='images'><img src='../../image/menu-items/"+data[0]+".jpg'/></div>";

				//description
				itemDesc.innerHTML += "<div><p><br>"+data[0]+". "+ data[2]+"<br><br>"
								+ "Calories: "+ data[3]+"<br><br>"
								+ "Dietary Preference: <br>"+ diet.join(', ').slice(3)+"<br><br>"
								+ "Allergens: <br>"+ allergens.join(', ').slice(3)+"<br><br>"
								+ "Subtotal: £" + Number(((parseFloat(data[5]))*(parseFloat(bItem[1]))).toFixed(2))+""
								+"</p></div>";
				//quantity select drop-down menu
				itemQuan.innerHTML += "<form><div><select id='"+data[0]+"q"+"'>"
									+ "<option value='"+data[0]+"v"+"' style='background-color:rgb(0, 104, 71);color: rgb(230, 230, 230);font-weight:800;' selected disabled>"
									+"Select Quantity</option>"
									+"</select></div>";
				var dropMenu = document.getElementById(data[0]+"q");
				for (let m = 0 ; m<=data[4] ; m++){
					if (m == bItem[1]){
						dropMenu.innerHTML += "<option value='"+m+"v"+"' style='background-color:rgb(230, 230, 230);color: rgb(0, 104, 71);font-weight:800;' selected disabled>"
											+m+"</option>";
					} else{
						dropMenu.innerHTML += "<option value='"+m+"v"+"'>"
											+m+"</option>";
					}
				}
				itemQuan.innerHTML += "<div><button id = '"+data[0]+"b"+"'class='addItem' type='submit' name='submit' style='font-weight:900;'>Update Basket</button> </div></form>";
				
				//total
				total += ((parseFloat(data[5]))*(parseFloat(bItem[1])));
				localStorage.basketTotal = total;
			}
		}
	}
	itemTotal.innerHTML += "<p>Your Total: £"+Number(total.toFixed(2))+""+"</p>";
});