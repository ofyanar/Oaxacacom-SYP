$(document).ready(function() {
	var tacos =  document.getElementById("tacos")
	var burritos =  document.getElementById("burritos")
	var sides =  document.getElementById("sides")
	var deserts =  document.getElementById("deserts")
	var drinks =  document.getElementById("drinks")

	$.ajax({
		type: "POST",
		url: '../php/cust_menu.php',
		dataType:'json',
		complete:function(result){
				var menu = [];
				var value = $.parseJSON(JSON.stringify(result));
				var jArray = value.responseJSON;

				for(var j in jArray){
					menu.push(jArray[j]+"");
				}

				var dish = [];

				for ( let i = 0; i<menu.length; i++){
					dish = (menu[i]+'').split(",");
					if (dish[2] == "tacos"){
						tacos.innerHTML += ("<div>" + dish[1] + "</div>");
						tacos.innerHTML += ("<div>" + dish[3] + "</div>");
						tacos.innerHTML += ("<div>" + dish[4] + "</div>");

					    var j = 5;
						while(dish[j] != null && dish[j] != undefined){
						    if(dish[j] != "Vegan" && dish[j] != "Vegetarian" && dish[j] != " Vegetarian" && dish[j] != "Normal"){
						        tacos.innerHTML += dish[j];
						    }
						    j++;
						}


					} else if (dish[2] == "burritos"){
						burritos.innerHTML += ("<div>" + dish[1] + "</div>");
						burritos.innerHTML += ("<div>" + dish[3] + "</div>");
						burritos.innerHTML += ("<div>" + dish[4] + "</div>");

					    var j = 5;
						while(dish[j] != null && dish[j] != undefined){
						    if(dish[j] != "Vegan" && dish[j] != "Vegetarian" && dish[j] != " Vegetarian" && dish[j] != "Normal"){
						        burritos.innerHTML += dish[j];
						    }
						    j++;
						}

					} else if (dish[2] == "sides"){
						sides.innerHTML += ("<div>" + dish[1] + "</div>");
						sides.innerHTML += ("<div>" + dish[3] + "</div>");
						sides.innerHTML += ("<div>" + dish[4] + "</div>");

					    var j = 5;
						while(dish[j] != null && dish[j] != undefined){
						    if(dish[j] != " Vegan" && dish[j] != " Vegetarian" && dish[j] != "Normal"){
						        sides.innerHTML += dish[j];
						    }
						    j++;
						}

					} else if (dish[2] == "deserts"){
						deserts.innerHTML += ("<div>" + dish[1] + "</div>");
						deserts.innerHTML += ("<div>" + dish[3] + "</div>");
						deserts.innerHTML += ("<div>" + dish[4] + "</div>");

					    var j = 5;
						while(dish[j] != null && dish[j] != undefined){
						    //deserts.innerHTML += dish[j];
						    if(dish[j] != " Vegan" && dish[j] != " Vegetarian" && dish[j] != "Normal"){
						        deserts.innerHTML += dish[j];
						    }
						    j++;
						}

					} else if (dish[2] == "drinks"){
						drinks.innerHTML += ("<div>" + dish[1] + "</div>");
						drinks.innerHTML += ("<div>" + dish[3] + "</div>");
						drinks.innerHTML += ("<div>" + dish[4] + "</div>");
                        drinks.innerHTML += ("<div>" + dish[8] + "</div>");

					}
				}

			}
	});
});



