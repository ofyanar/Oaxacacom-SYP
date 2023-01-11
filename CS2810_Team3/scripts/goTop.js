$('#topBtn').on('click', function(e){
	/*
	 * When the user clicks on the 'top' button, the below function is executed,
	 * it takes the user to the top of the page in a smooth, animated fashion.
	 *
	 */
	$('html, body').animate(//target the body call the animate method
		{
			scrollTop:$('#container').offset().top // takes object scrollTop, take hash and call offset on it.
		}, 500
		);
});