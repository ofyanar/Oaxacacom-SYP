
$(document).ready(function() { 

	var reserveInfo = document.getElementById('reservation');
	reserveInfo.innerHTML = 'Branch ' + localStorage.branchId + ', ' + localStorage.branchName + '\n Table ' + localStorage.table + ' Reserved';
	
});