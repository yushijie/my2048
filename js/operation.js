//
var beginBtn = document.getElementById("login");
beginBtn.addEventListener('touchend', function(event) {
	event.preventDefault();
	
	$('#dialog_login').hide();
	$('#cover').hide();
	
});