<?php
/*
 * The variables below are used to store the mail address of the receiver and sender
 * along with the name, subject, message, and header of the email.
 */
$to = 'oaxacarestaurantsuk@gmail.com';
$from = $_POST['mail'];
$name =$_POST['name'];
$subject1 =$_POST['subject'];
$message1 = $_POST['message'];
$header1 = "FROM: " . $from;

/*
 * The variables below are used to send an automated e-mail to the previous
 * e-mails sender.
 */
$subject2 = "This is an automated e-mail, please DO NOT REPLY";
$message2 = "Dear ". $_POST['name'].",\n" ."we have received your message, our customer support team will return to you shortly." 
	."\n\n" . "OAXACA RESTAURANTS UK";
$header2 = "FROM: " . $to;

/*
 * The mail() function allows the script to send an email over an SMTP server. The return value
 * of calling this method is either true or false, depending on success.
 */
$toMe = mail($to, $subject1, $message1, $header1);
$toCust = mail($from, $subject2, $message2, $header2);

/*
 * A boolean value is sent to the js script calling this program
 * to notify it whether the process was successful or not.
 */
if ($toMe && $toCust){
	echo 'true';
} 
?>