$(document).ready(function() {
	var london =  document.getElementById("london")
	var manchester =  document.getElementById("manchester")
	var birmingham =  document.getElementById("birmingham")
	var edinburgh =  document.getElementById("edinburgh")
	var glasgow =  document.getElementById("glasgow")
	
	$.ajax({
		type: "POST",
		url: '../../php/customer/populate_branches.php',
		dataType:'json',
		complete:function(result){
				var locations = [];
				var value = $.parseJSON(JSON.stringify(result));
				var jArray = value.responseJSON;
				
				for(var j in jArray){
					locations.push(jArray[j]+"");
				}
				
				var loc = [];
				for ( let i = 0; i<locations.length; i++){
					loc = (locations[i]+'').split(",");
					if (loc[0].toLowerCase() == 'london'){
						if (loc[2] == 'true'){
							london.innerHTML += "<option value= " + loc[1].replace(/\s+/g, '') +">" + loc[1] + "</option>";
						} else{
							london.innerHTML += "<option value= " + loc[1].replace(/\s+/g, '') +" style='color:black;' disabled>" + loc[1] 
							+ " - is currently closed"+ "</option>";
						}
						
					} else if (loc[0].toLowerCase() == 'manchester'){
						if (loc[2] == 'true'){
							manchester.innerHTML += "<option value= " + loc[1].replace(/\s+/g, '') +">" + loc[1] + "</option>";
						} else{
							manchester.innerHTML += "<option value= " + loc[1].replace(/\s+/g, '') +" style='color:black;'disabled>" + loc[1] 
							+ " - is currently closed"+ "</option>";
						}
					} else if (loc[0].toLowerCase() == 'birmingham'){
						if (loc[2] == 'true'){
							birmingham.innerHTML += "<option value= " + loc[1].replace(/\s+/g, '') +">" + loc[1] + "</option>";
						} else{
							birmingham.innerHTML +=  "<option value= " + loc[1].replace(/\s+/g, '') +" style='color:black;' disabled>" + loc[1] 
							+ " - is currently closed"+ "</option>";
						}
					} else if (loc[0].toLowerCase() == 'edinburgh'){
						if (loc[2] == 'true'){
							edinburgh.innerHTML += "<option value= " + loc[1].replace(/\s+/g, '') +">" + loc[1] + "</option>";
						} else{
							edinburgh.innerHTML +=  "<option value= " + loc[1].replace(/\s+/g, '') +" style='color:black;' disabled>" + loc[1] 
							+ " - is currently closed"+ "</option>";
						}
					} else if (loc[0].toLowerCase() == 'glasgow'){
						if (loc[2] == 'true'){
							glasgow.innerHTML += "<option value= " + loc[1].replace(/\s+/g, '') +">" + loc[1] + "</option>";
						} else{
							glasgow.innerHTML +=  "<option value= " + loc[1].replace(/\s+/g, '') +" style='color:black;' disabled>" + loc[1] 
							+ " - is currently closed"+ "</option>";
						}
					}
				}
			}
	});
});



