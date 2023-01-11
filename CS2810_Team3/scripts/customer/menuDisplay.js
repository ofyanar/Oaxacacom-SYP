$(document).ready(function() {
	var menu =  document.getElementById("menu");
	
	function menuDisplay(){
		
		for (let i = 1 ; i <= 5 ; i++){
			
			if (i == 1){
				menu.innerHTML += "<div class = 'main'><img class='main-img' src='../../image/dish-type/1.jpg'><p id = '1' class='main-desc'>Our Authentic Tacos</p></div>";
			} else if (i == 2){
				menu.innerHTML += "<div class = 'main'><img class='main-img' src='../../image/dish-type/2.jpg'><p id = '2' class='main-desc'>Our Delicious Burritos</p></div>";
			} else if (i == 3){
				menu.innerHTML += "<div class = 'main'><img class='main-img' src='../../image/dish-type/3.jpg'><p id = '3' class='main-desc'>Grab a Side</p></div>";
			} else if (i == 4){
				menu.innerHTML += "<div class = 'main'><img class='main-img' src='../../image/dish-type/4.jpg'><p id = '4' class='main-desc'>Desserts to Sweeten You</p></div>";
			} else if (i == 5){
				menu.innerHTML += "<div class = 'main'><img class='main-img' src='../../image/dish-type/5.jpg'><p id = '5' class='main-desc'>Cool Down With a Drink</p></div>";
			}
			
		}
		localStorage.goBack = false;
	}
	
	$("#mainbuttons").empty();
	$("#menuitems").empty();
	menuDisplay();
	
	
	
});