$(document).ready(function() { 
	/*
     * The function below is executed if anywhere on the page is clicked.
     */
	 document.addEventListener("click",function(e) {
		 // target is used to store the most prominent element which was clicked on to trigger this function. 
		var target = e.target;
		
		/*
		 * this $.ajax Post function calls the reStock.php program to update the 
		 * availability field, i.e. the stock, of the menu item the user selected to restock.
		 */
		function reStock(id, newStock){
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Manager/reStock.php',
				dataType:'json',
				data: {menuNo:id, stock:newStock, branch: localStorage.branch_id},
				complete:function(){
					/*
					 * setting timeout for 25ms before reloading the page to allow the ajax post 
					 * call to complete, as, on page reload there will be another $.ajax call. we want
					 * to avoid executing them simultaneously to avoid errors.
					 */
					setTimeout(function() {
						window.location.reload();
					}, 25);
					
				}
			});
			
		}
		/*
		 * the type of the element along with its id are fetched. we aim to reStock getBasket() only and only
		 * if the element clicked was both a button and included the character 'b' in its id.
		 */
		if (target.nodeName == "BUTTON" && target.id.includes('b')){
			/* if so, we get the index of it
			 * so we can slice the preceeding sub-string from the id to access the menu number of the menu-item to restock
			 * and slice the proceeding sub-string from the id to access the quantity of the order menu-item we wish to restock.
			 */
			var bIndex = target.id.indexOf('b');
			var id = target.id.slice(0,bIndex);
			var quantity = target.id.slice(bIndex+1);
			// the newStock value is the value of the current stock incremented by 5
			var newStock = (parseInt(quantity) + 5).toString();
			/*
			 * The button containing a 'b' is the 'RESTOCK' button, in which case we alert the user
			 * to confirm proceeding. if confirmed, reStock() is called.
			 */
			if (window.confirm("Restocking will add 5 to the item number #" + id +"'s quantity")){
				reStock(id, newStock);
			}
		}
		
    });

});
