
var countDownDate = new Date(localStorage.arrivalTime).getTime();
	
var myfunc = setInterval(function(){
	
	var now = new Date().getTime()
	var timeleft = countDownDate - now;
	
	var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
	
	document.getElementById("mins").innerHTML = minutes + " minutes" 
	document.getElementById("secs").innerHTML = seconds + " seconds"
	
	if (timeleft < 0) {
		clearInterval(myfunc);
		document.getElementById("mins").innerHTML = "00 minutes"
		document.getElementById("secs").innerHTML = "00 seconds"
	}
	
	if(minutes % 1 ==0 && seconds == 0){
		window.location.reload();
	}
	
}, 1000)

