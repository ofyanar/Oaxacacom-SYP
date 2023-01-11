/*
 * This script checks, on mouse scroll, if the position of the frame is greater than 100 pixels.
 * In which case the 'Top Button' is made visible in 'block' format. Else, its visibility is hidden.
 *
 */
$(window).on('scroll', function(e){
	if($('body').scrollTop()>100 || $(document.documentElement).scrollTop()>100){
		$('#topBtn').css("display","block");
	}
	else{
		$('#topBtn').css("display","none");
	}
});
