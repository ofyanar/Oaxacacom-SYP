
$(document).ready(function() { 
	 $("form").submit(function(e) {
        e.preventDefault();

        var b = document.getElementById("branch");
		var branch = b.options[b.selectedIndex].text;
		var	table = document.getElementById("table").value;
		
		function storeData(){
			$.ajax({
				type: "POST",
				url: '../../php/customer/fill_table.php',
				async:false,
				dataType:'json',
				data: {branch:branch, table:table},
				complete:function(result){
					var reservedInfo = [];
					var value = $.parseJSON(JSON.stringify(result))
					var jArray = value.responseJSON;
					
					for(var j in jArray){
						reservedInfo.push(jArray[j]+"");
					}
					localStorage.branchId = reservedInfo[0];
					localStorage.branchName = branch;
					localStorage.basketNo = reservedInfo[1];
					localStorage.table = table;
					
				}
			});
		}
		if ( branch === 'Select Branch' || table === 'selectt'){
			if(window.confirm('PLEASE SELECT A BRANCH AND AN AVAILABLE SEAT TO PROCEED')){
				window.location.reload();
			}
		} else{
			if(window.confirm('Please confirm to proceed')){
				storeData();
				window.location.href = 'cust_main.htm';
				localStorage.basket = JSON.stringify([]);
				localStorage.checkout = 'false';
				localStorage.RequestWaiter = 'false';
				localStorage.hasReservation = 'true';
			}
		
		}

    });

});
