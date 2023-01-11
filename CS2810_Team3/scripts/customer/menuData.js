 $(document).ready(function() {
	$.ajax({
		type: "POST",
		url: '../../php/customer/fetchMenu.php',
		dataType:'json',
		data: {branch : localStorage.branchId},
		complete:function(result){
			var itemData = [];
			var value = $.parseJSON(JSON.stringify(result));
			var jArray = value.responseJSON;
			
			for(var j in jArray){
				itemData.push(jArray[j]+"");
			}
			console.log(itemData);
			localStorage.itemData = JSON.stringify(itemData);
			//JSON.parse(localStorage.itemData) --> to decode array
		}
	});
});