
$(document).ready(function() { 
		var hand = document.getElementById("handRaise");
		var handVal = document.getElementById("hand");
		
	document.getElementById("handRaise").addEventListener('click',function (b){
		b.preventDefault();
		
		function requestWaiter(){
			$.ajax({
				type: "POST",
				url: '../../php/customer/requestWaiter.php',
				async:false,
				dataType:'json',
				data: {date : localStorage.timeOfRequest, branch : localStorage.branchId, table : localStorage.table},
				complete:function(){
				}
			});
		}
		
		function cancelRequest(){
			
			$.ajax({
				type: "POST",
				url: '../../php/customer/unRequestWaiter.php',
				async:false,
				dataType:'json',
				data: {date : localStorage.timeOfRequest, branch : localStorage.branchId, table : localStorage.table},
				complete:function(){
				}
			});
		}
		
		
		
		if(localStorage.RequestWaiter == 'false'){
			localStorage.timeOfRequest = new Date().toISOString().substr(0, 19).replace('T', ' ');
			requestWaiter();
			handVal.innerHTML = "Cancel Request <br><i class='fas fa-regular fa-hand-sparkles'>";
			handVal.style.fontcolor = 'rgb(0, 104, 71)';
			localStorage.RequestWaiter = 'true';
		} else if (localStorage.RequestWaiter == 'true'){
			cancelRequest();
			handVal.innerHTML = "Request Waiter <br><i class='fas fa-regular fa-hand-point-up'>";
			handVal.style.fontcolor = null;
			localStorage.RequestWaiter = 'false';
		}
	}); 
	
	if(localStorage.RequestWaiter == 'true'){
			handVal.innerHTML = "Cancel Request <br><i class='fas fa-regular fa-hand-sparkles'>";
			handVal.style.fontcolor = 'rgb(0, 104, 71)';
		} else if (localStorage.RequestWaiter == 'false'){
			handVal.innerHTML = "Request Waiter <br><i class='fas fa-regular fa-hand-point-up'>";
			handVal.style.fontcolor = null;
		}

});
