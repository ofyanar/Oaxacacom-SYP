$(document).ready(function() { 
	var cat = localStorage.category;
	var itemData = JSON.parse(localStorage.itemData);
	var category = document.getElementById("category");
	var itemImage = document.getElementById("images");
	var itemDesc = document.getElementById("descriptions");
	var itemQuan = document.getElementById("quantity");
	if (cat == 'tacos'){
		category.innerHTML += "<p>Tacos</p>"
	} else if (cat == 'burritos'){
		category.innerHTML += "<p>Burritos</p>"
	} else if (cat == 'sides'){
		category.innerHTML += "<p>Sides</p>"
	} else if (cat == 'deserts'){
		category.innerHTML += "<p>Desserts</p>"
	} else if (cat == 'drinks'){
		category.innerHTML += "<p>Drinks</p>"
	}
	
	for (let i = 0 ; i<itemData.length ; i++){
		data = (itemData[i]+'').split(",");
		if (i%3 == 0 && data[1] == cat){
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
								+ "£" + data[5]
								+"</p></div>";
								
			//quantity select drop-down menu
			itemQuan.innerHTML += "<form><div><select id='"+data[0]+"q"+"'>"
								+ "<option value='"+data[0]+"v"+"' style='background-color:rgb(0, 104, 71);color: rgb(230, 230, 230);font-weight:800;' selected disabled>"
								+"Select Quantity</option>"
								+"</select></div>";
			var dropMenu = document.getElementById(data[0]+"q");
			for (let i = 0 ; i<=data[4] ; i++){
				dropMenu.innerHTML += "<option value='"+i+"v"+"'>"
									+i+"</option>";
			}
			itemQuan.innerHTML += "<div><button id = '"+data[0]+"b"+"'class='addItem' type='submit' name='submit' style='font-weight:900;'>Add to Basket</button> </div></form>";
			
			
		}
	}
});