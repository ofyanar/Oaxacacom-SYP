 $(document).ready(function() {
	 /*
	  * The $.ajax Post function calls the fetchMenu.php file
	  * in order to get the menu data of the branch. The result is in JSON format therefore
	  * it is decoded, and its values are assigned to itemData array.
	  */
	$.ajax({
		type: "POST",
		url: '../../../php/customer/fetchMenu.php',
		dataType:'json',
		data: {branch : localStorage.branch_id},
		complete:function(result){
			var itemData = [];
			var value = $.parseJSON(JSON.stringify(result));
			var jArray = value.responseJSON;
			
			for(var j in jArray){
				itemData.push(jArray[j]+"");
			}
			/*
			 * It is not possible to store the itemData array directly into local storage
			 * as local storage only allows strings to be stored, therefore we stringify
			 * the array using a JSON method so that it can be used later.
			 */
			localStorage.itemData = JSON.stringify(itemData);
		}
	});
});