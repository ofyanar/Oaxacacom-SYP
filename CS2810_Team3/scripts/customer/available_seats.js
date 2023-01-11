$(document).ready(function() {
	$("#branch").on('change', function(){
		$("#table").empty()
		.append('<option value="selectt" style="background-color:rgb(0, 104, 71);color: rgb(230, 230, 230);font-weight:800;" selected disabled>Please Select a Table</option>');

		var place = document.getElementById("table");
		var e = document.getElementById("branch");
		var selected = e.options[e.selectedIndex].text;
		
		$.ajax({
			type: "POST",
			url: '../../php/customer/find_branch_table.php',
			dataType:'json',
			data: {selected:selected},
			complete:function(result){
				var tables = [];
				var value = $.parseJSON(JSON.stringify(result));
				var jArray = value.responseJSON;
				
				for(var j in jArray){
					tables.push(jArray[j]+"");
				}
				var table = [];
				for (let i = 0 ; i < tables.length ; i++){
					table = (tables[i]+'').split(",");
					if (table[1] == 'true'){
						place.innerHTML +=  "<option value= " + table[0].replace(/\s+/g, '') +"> Table - " + table[0] + "</option>";
					} else{
						place.innerHTML += "<option value= " + table[0].replace(/\s+/g, '') +" style='color:black' disabled>" +
						" Table - "+ table[0] + " is currently unavailable"+ "</option>";
					}
				}
			
		}
		
		})

		
	})
})