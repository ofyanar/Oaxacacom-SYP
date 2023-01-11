$(document).ready(function() {
	/*
	 * Upon the mailing form of the 'contact.htm' page is completed and submitted,
	 * this function is triggered.
	 */
	$("form").submit(function(event){
		event.preventDefault() // Prevents default actions of the script to execute
		
		/*
		 * The variables below are used to get the values of the elements by providing the sript with their 
		 * element id's
		 */
		var name = document.getElementById("name").value
		var mail =  document.getElementById("mail").value
		var subject =  document.getElementById("subject").value
		var message =  document.getElementById("message").value
		
		/*
		 * The $.Ajax Post function allows to send data to the contactform.php program through the POST method of php.
		 * The data provided are the name of the email sender, their email, subject and message.
		 * depending on the outcome of the process a message is displayed to the user.
		 */
		$.post("../php/contactform.php", {name:name, mail:mail, subject:subject, message:message}, function(data){
			if (data == 'true'){
				if(window.confirm('Success! Your message has been sent.')){
				window.location.reload()
				}
			} else {
				if(window.confirm('Error! Your message has failed to be sent. Try re-entering a valid e-mail address or try another time.')){
				window.location.reload()
				}
			}
		})
	})
})