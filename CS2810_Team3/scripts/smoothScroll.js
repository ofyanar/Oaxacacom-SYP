$('#container a').on('click',function(e){//grab links in navbar. function takes event parameter

	if(this.hash!==''){//even if hash (the console log after clicking link) is undefined
		
		e.preventDefault();//do not do default action
		
		const hash = this.hash;
		
		$('html, body').animate(//target the body call the animate method
		{
			scrollTop:$(hash).offset().top // takes object scrollTop, take hash and call offset on it.
		}, 800
		);
	}
	
});