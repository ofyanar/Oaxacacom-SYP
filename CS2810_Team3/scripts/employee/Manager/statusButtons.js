$(document).ready(function() { 
	/*
     * The function below is executed if anywhere on the page is clicked.
     */
	 document.addEventListener("click",function(e) {
		// target is used to store the most prominent element which was clicked on to trigger this function. 
		var target = e.target;
		
		function openBranch(){
			/*
			 * this $.ajax Post function calls the openBranch.php program to update the is_open field
			 * of the Branches DB table to 'true'.
			 */
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Manager/openBranch.php',
				dataType:'json',
				data: {branch: localStorage.branch_id},
				complete:function(){
					if (window.confirm("Branch is now open")){
						/*
						 * setting timeout for 25ms before reloading the page to allow the ajax post 
						 * call to complete, as, on page reload there will be another $.ajax call. we want
						 * to avoid executing them simultaneously to avoid errors.
						 */
						setTimeout(function() {
							window.location.reload();
						}, 25);
					}
				}
			});
			
		}
		/*
		 * this $.ajax Post function calls the closeBranch.php program to update the is_open field
		 * of the Branches DB table to 'false'.
		 */
		function closeBranch(){
			$.ajax({
				type: "POST",
				url: '../../../php/employee/Manager/closeBranch.php',
				dataType:'json',
				data: {branch: localStorage.branch_id},
				complete:function(){
					if (window.confirm("Branch is now closed")){
						/*
						 * setting timeout for 25ms before reloading the page to allow the ajax post 
						 * call to complete, as, on page reload there will be another $.ajax call. we want
						 * to avoid executing them simultaneously to avoid errors.
						 */
						setTimeout(function() {
							window.location.reload();
						}, 25);
					}
				}
			});
			
		}
		/*
		 * the type of the element along with its id are fetched. we aim to execute closeBranch() only and only
		 * if the element clicked was both a button and its id is 'close'.
		 */
		if (target.nodeName == "BUTTON" && target.id == "close"){
			// if so, a confirmation alert is sent and on confirmation closeBranch() is called
			if (window.confirm("Confirm to CLOSE the Branch")){
				closeBranch();
			}
		/*
		 * the type of the element along with its id are fetched. we aim to execute openBranch() only and only
		 * if the element clicked was both a button and its id is 'open'.
		 */
		} else if (target.nodeName == "BUTTON" && target.id == "open"){
			// if so, a confirmation alert is sent and on confirmation openBranch() is called
			if (window.confirm("Confirm to OPEN the Branch")){
				openBranch();
			}
		}
		
    });

});
