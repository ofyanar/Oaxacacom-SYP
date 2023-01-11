$(document).ready(function() { 
	 /*
	  * The function below is executed if anywhere on the page is clicked.
	  */
	 document.addEventListener("click",function(e) {
		// target is used to store the most prominent element which was clicked on to trigger this function. 
		var target = e.target;
		
		function requestHandled(tableNum){
			/*
			 * This $.ajax Post function calls the requestHandled.php program with the table number of the
			 * customer who placed the request, along with their branch id.
			 * the php program removes the request from the relevant DB table.
			 */
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Waiter/requestHandled.php',
				dataType:'json',
				data: {table:tableNum , branch: localStorage.branch_id},
				complete:function(){
					window.location.reload();
				}
			});
			
		}
		/*
		 * the type of the element along with its id are fetched. we aim to execute requestHandled() only and only
		 * if the element clicked was both a button and included the character 'r' in its id.
		 */
		if (target.nodeName == "BUTTON" && target.id.includes('r')){
			// if so, we get the index of it and slice the preceeding substring to access the table number of the customer
			var tableNum = target.id.slice(0, -1);
			// a confirmation alert is sent and upon confirmation requestHandled() is called
			if (window.confirm("Confirm #"+tableNum+"'s request was handled")){
				requestHandled(tableNum);
			}
		}
		
    });

});
