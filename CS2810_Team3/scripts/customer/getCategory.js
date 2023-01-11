
$(document).ready(function() {
	document.getElementById("tacos").addEventListener('click',function (e){
		e.preventDefault();
		localStorage.category = 'tacos';
		window.location.href = 'cust_items.htm';

	});
	document.getElementById("burritos").addEventListener('click',function (e){
			e.preventDefault();
			localStorage.category = 'burritos';
			window.location.href = 'cust_items.htm';

		});
	document.getElementById("sides").addEventListener('click',function (e){
			e.preventDefault();
			localStorage.category = 'sides';
			window.location.href = 'cust_items.htm';

		});
	document.getElementById("desserts").addEventListener('click',function (e){
			e.preventDefault();
			localStorage.category = 'deserts';
			window.location.href = 'cust_items.htm';

		});
	document.getElementById("drinks").addEventListener('click',function (e){
			e.preventDefault();
			localStorage.category = 'drinks';
			window.location.href = 'cust_items.htm';

		});
	
});